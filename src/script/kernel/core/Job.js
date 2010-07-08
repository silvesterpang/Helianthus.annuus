bolanderi.Job = function(task)
{
	$.extend(this, task);
	this.task = task;
};

bolanderi.__moduleData = function(module, dataType, id, value)
{
	var isGet = typeof id in { string:1, undefined:1 } && typeof value === 'undefined';
	var profile = bolanderi.__storage.get({ savedOrDefault: isGet ? 'both' : 'saved' });
	var paths = {
		'public': [profile, 'publicData', dataType],
		'protected': [profile, 'privateData', module.id, dataType],
		'private': [profile, 'privateData', module.id, module.__pageCode, dataType]
	};
	var data = {};

	if(isGet) {
		$.each(paths, function(modifier, path)
		{
			$.extend(data, $.dig(path));
		});
		return typeof id === 'undefined' ? data : data[id];
	}

	if(typeof id === 'string') {
		data[id] = value;
	}
	else {
		data = id;
	}

	$.each(data, function(id, value)
	{
		var dataDef = $.dig(this.module, dataType, id);

		if(dataType === 'options' && !dataDef && typeof $.dig(bolanderi.__storage.get(), 'publicData', dataType, id) === 'undefined') {
			$.log('error', 'public option with id "{0}" does not exist. {1}', id, module.title);
			return;
		}

		var container = $.make.apply(null, paths[dataDef ? dataDef.access || 'protected' : 'public'].concat({}));

		if(value === null) {
			delete container[id];
		}
		else {
			container[id] = value;
		}
	});

	bolanderi.__storage.save();
};

bolanderi.Job.prototype = {
	constructor: bolanderi.Job,

	context: function()
	{
		return bolanderi.__context;
	},

	data: function(name, value)
	{
		var data = this.module.data = this.module.data || {};

		if(typeof value === 'undefined') {
			data = $.extend({}, bolanderi.get('DATA'), data);
			return name ? data[name] : data;
		}
		else {
			data[name] = value;
		}
		return this;
	},

	database: function(id, value)
	{
		return bolanderi.__moduleData(this.module, 'database', id, value);
	},

	info: function()
	{
		return $.format('{0}, {1}, {2}{3}',
			this.module.title, this.id, this.type, this.type === 'action' ? $.format('({0})', this.service || 'unknown') : '');
	},

	options: function(id, value)
	{
		return bolanderi.__moduleData(this.module, 'options', id, value);
	},

	run: function(job, fn)
	{
		if(this.type !== 'service') {
			$.error('run() is for services only. [{0}]', this.info());
		}

		$.event.trigger('job_start', [job, this]);

		try {
			fn();
		}
		catch(e) {
			$.log('error', '{0} [{1}]', e.message, bolanderi.info(job));
		}

		$.event.trigger('job_end', [job, this]);
	}
};
