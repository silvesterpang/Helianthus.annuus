$.extend(an.plugins, {

'722b69f8-b80d-4b0e-b608-87946e00cfdc':
{
	desc: '強制鎖定闊度',
	pages: { comp: [normal] },
	type: 3,
	queue: [{
		css: 'body { word-wrap: break-word; }'
	},
	{
		pages: view,
		type: always,
		css: '\
			.repliers, .repliers_right { table-layout: fixed; } \
			.repliers_right > tbody > tr:first-child > td { overflow-x: hidden; } \
		',
		js: function()
		{
			if($.pageNo() === 1) {
				$j.replies().eq(0).find('td[colspan="100%"]').attr('colspan', 2);
			}
		}
	}]
},

'4bf6619f-2cd8-4aa2-a54a-e7d72wgs8603':
{
	desc: '修正改變搜尋列時可能造成的顯示錯誤',
	pages: { on: [topics] },
	type: 3,
	queue: [{
		css: '.Topic_FunctionPanel > .ClearLeft { clear: both; } /*-> IE bug fix? ->*/ .Topic_FunctionPanel { overflow: hidden; }'
	}]
},

'5e173905-9c47-4f37-8d3f-4c31ea871115':
{
	desc: '隱藏頂部按扭',
	pages: { off: [normal] },
	type: 3,
	queue: [{
		css: '.TopMenuBox { visibility: hidden; }'
	}]
},

'7af1060d-d38c-40b9-b16b-df1bb799cb74':
{
	desc: '隱藏Logo列',
	pages: { off: [normal] },
	type: 3,
	queue: [{
		css: '.TopBannerBox { display: none; }'
	}]
},

'7ca54ba4-e2b7-489c-9adc-7ac7d62012f0':
{
	desc: '隱藏按扭列',
	pages: { off: [normal] },
	type: 3,
	queue: [{
		css: '.TopMenuPanel + .PageWidthContainer { display: none; }'
	}]
},

'd0164ba6-a5a2-4850-ab67-658b840fd3ef':
{
	desc: '隱藏繁簡轉換/addThis列',
	pages: { off: [normal] },
	type: 3,
	queue: [{
		css: '\
			.PageMiddleFunctions { height: 5px; } \
			.PageMiddleFunctions > div { display: none; } \
		'
	}]
},

'a7dc713c-2d23-4254-be8b-16cf6e9bbe8f':
{
	desc: '優化addThis組件',
	pages: { off: [normal] },
	type: 3,
	queue: [{
		css: '\
			.addthis_toolbox { padding-top: 3px; } \
			.addthis_toolbox > a, .addthis_toolbox > span { font-family: arial !important; color: black; } \
		'
	}]
},

'bbd5f176-c024-4684-ba98-b72da376a6eb':
{
	desc: '隱藏最底頁腳',
	pages: { off: [normal] },
	type: 3,
	queue: [{
		css: '.FooterPanel { display: none; }'
	}]
},

'5fd907ce-21dc-44b9-b280-3cb145c53c92':
{
	desc: '隱藏頁底空白',
	pages: { off: [normal] },
	type: 3,
	queue: [{
		css: '.FooterPanel ~ br { display: none; }'
	}]
},

'8c317615-b5e7-4b1a-a140-b7319c5b0a5b':
{
	desc: '隱藏Bookmark Bar',
	pages: { off: [normal] },
	type: 3,
	queue: [{
		css: '#hkg_bottombar { display: none; }'
	}]
},

'd1dc862f-a7b3-4b29-a50f-440fc9c5fef0':
{
	desc: '縮短Bookmark Bar',
	pages: { on: [normal] },
	type: 3,
	queue: [{
		css: '#hkg_bottombar { width: auto; }'
	}]
},

'02837e6a-3dd7-4c73-a155-90d6f6edd8f9':
{
	desc: '拉闊頁面',
	pages: { off: [normal] },
	type: 3,
	options: { nPageWidth: { desc: '頁面闊度 [可設定為auto, 80%, 1000px等]', defaultValue: 'auto', type: 'text' } },
	queue: [{
		priority: 1,
		js: function(job)
		{
			$.rules('\
			.PageWidthContainer { width: {0}; } \
			table[width="99%"], table[width="800"], td[width="801"], td[width="792"] { width: 100%; } \
			#ctl00_ContentPlaceHolder1_ProfileForm td[width="8"] { display: none; } \
			',
			job.options('nPageWidth')
			);
		}
	}]
},

'1c63cc45-21f7-40ab-905a-730dabffc2ab':
{
	desc: '隱藏高登公告',
	pages: { off: [topics | search | tags | view] },
	type: 3,
	queue: [{
		css: '\
			#ctl00_ContentPlaceHolder1_view_form > script:first-child + table + table tr:first-child, \
			#ctl00_ContentPlaceHolder1_topics_form > script:first-child + table + table tr:first-child, \
			.DivResizableBoxContainer \
				{ display: none; } \
		'
	}]
},

'b44ee3a6-950e-4b2a-b99a-399b6384bcce':
{
	desc: '隱藏搜尋列上下空白',
	pages: { off: [topics | search | tags] },
	type: 3,
	queue: [{
		css: '#ctl00_ContentPlaceHolder1_MiddleAdSpace1 > div { padding: 0 !important; }'
	}, {
		page: topics,
		css: '\
			.Topic_FunctionPanel { margin-top: 3px; } \
			#ctl00_ContentPlaceHolder1_MiddleAdSpace1 { margin-top: 5px !important; } \
		'
	}, {
		page: search | tags,
		css: '\
			td[valign="bottom"] > br:first-child { display: none; } \
			td[valign="bottom"] > p { margin: 0; } \
		'
	}]
},

'1ada74ac-9bae-47b2-914b-f1556dbab1a2':
{
	desc: '隱藏討論區選單',
	pages: { off: [topics | search | tags] },
	type: 3,
	queue: [{
		page: topics,
		css: '#forum_list, #forum_list + br { display: none; }'
	}, {
		page: search | tags,
		css: '#ctl00_ContentPlaceHolder1_topics_form > div + table table:first-child { display: none; }'
	}]
},

'4bf6619f-2cd8-4aa2-a54a-e7d7255e8603':
{
	desc: '隱藏熱門關鍵字',
	pages: { off: [main | topics | search | tags] },
	type: 3,
	queue: [{
		css: '#ctl00_ContentPlaceHolder1_lb_HitSearchs { display: none; }'
	}]
},

'a5d7f8f0-99fc-4aaf-8c65-373b17cfcf69':
{
	desc: '隱藏投票站連結(如有)',
	pages: { off: [topics | search | tags | view] },
	type: 3,
	queue: [{
		css: '#ctl00_ContentPlaceHolder1_MiddleAdSpace1 { display: none; }'
	}]
},

'f41e288e-cd1d-4649-a396-83d92d99ded8':
{
	desc: '隱藏紅人榜',
	pages: { off: [topics] },
	type: 3,
	queue: [{
		css: '#ctl00_ContentPlaceHolder1_HotPeoples, #ctl00_ContentPlaceHolder1_HotPeoples + br { display: none; }'
	}]
},

'74cd7f38-b0ad-4fca-ab39-673b0e2ee4c7':
{
	desc: '修正跳頁控件位置',
	pages: { on: [view] },
	type: 3,
	queue: [{
		css: $.format('div[style] > div[style^="{0}: center"] { margin: 0 100px; }', $.browser.msie ? 'TEXT-ALIGN' : 'text-align')
	}]
},

'0941e559-3875-445a-9c56-799987fbdf87':
{
	desc: '隱藏名稱欄物件',
	pages: { off: [view] },
	type: 3,
	options: {
		bHideNameSpace: { desc: '隱藏多餘空白', defaultValue: true, type: 'checkbox' },
		bHideAvatar: { desc: '隱藏高級會員頭像', defaultValue: false, type: 'checkbox' },
		bHideMemberLevel: { desc: '隱藏會員級別圖片', defaultValue: false, type: 'checkbox' },
		bHideAward: { desc: '隱藏(善)圖像', defaultValue: false, type: 'checkbox' }
	},
	queue: [{
		priority: 1,
		js: function(job)
		{
			var css = [];
			$.each({
				bHideAvatar: 'div[id^="ThreadUser"] > a',
				bHideMemberLevel: 'div[id^="ThreadUser"] > img',
				bHideAward: 'div[id^="ThreadUser"] ~ *'
			}, function(name, selector)
			{
				if(job.options(name)) css.push(selector);
			});

			if(job.options('bHideNameSpace')) css.push(
				job.options('bHideAvatar')
				? 'div[id^="ThreadUser"] > br'
				: 'div[id^="ThreadUser"] > br:first-child, div[id^="ThreadUser"] > br:first-child + br'
			);

			$.rules(css.join(',') + ' { display: none; }');
		}
	}]
},

'9aebeb97-8507-4553-995d-0903dc764ec3':
{
	desc: '隱藏會員級別圖片',
	pages: { off: [view] },
	type: 3,
	queue: [{
		css: 'img[src^="labels/"] { display: none; }'
	}]
},

'a0203b01-7565-46e1-a52e-260dd4d485a1':
{
	desc: '隱藏引用',
	pages: { off: [view] },
	type: 3,
	queue: [{
		css: '.repliers_right blockquote { display: none; }'
	}]
},

'd0ac656c-e602-4852-843b-f776d8a976f4':
{
	desc: '隱藏評分格',
	pages: { off: [view] },
	type: 3,
	queue: [{
		css: '#DivMarkThread { display: none; }'
	}]
},

'26eaf7f8-d260-4b42-b6d9-08b235f56d43':
{
	desc: '隱藏引用原文連結',
	pages: { off: [view] },
	type: 3,
	options: { bCDROMMode: { desc: '同時隱藏快速引用連結及登入提示 [CD-ROM專用]', defaultValue: false, type: 'checkbox' } },
	queue: [{
		priority: 1,
		js: function(job)
		{
			var sSelector = 'a[href^="post.aspx?mt=Y&rid="]';
			if(job.options('bCDROMMode')) sSelector += ',a[href*="QuoteReply("],#ct100_ContentPlaceHolder1_QuickReplyLoginTable';
			$.rules(sSelector + '{ display: none; }');
		}
	}]
},

'2c026f6b-f252-4a58-b2ac-706fcd052fb6':
{
	desc: '隱藏快速回覆組件',
	pages: { off: [view] },
	type: 3,
	options:
	{
		bRemNameRow: { desc: '隱藏名字列', defaultValue: false, type: 'checkbox' },
		bRemTopicRow: { desc: '隱藏主旨列', defaultValue: false, type: 'checkbox' },
		bRemClassicRow: { desc: '隱藏經典表情圖示列', defaultValue: false, type: 'checkbox' },
		bRemTempRow: { desc: '隱藏附加表情圖示列(如有)', defaultValue: false, type: 'checkbox' },
		bRemPreviewRow: { desc: '隱藏預覽列', defaultValue: false, type: 'checkbox' }
	},
	queue: [{
		js: function(job)
		{
			if(!$.isLoggedIn()) return;

			var jRows = $('#ctl00_ContentPlaceHolder1_QuickReplyTable tbody:eq(2)').children();
			if(job.options('bRemNameRow')) jRows.eq(0).hide();
			if(job.options('bRemTopicRow')) jRows.eq(1).hide();
			if(job.options('bRemClassicRow')) jRows.eq(3).hide();
			if(job.options('bRemTempRow') && jRows.length > 5) jRows.eq(3).nextAll(':not(:last)').hide();
			if(job.options('bRemPreviewRow')) jRows.last().hide();
		}
	}]
},

'1e2a7c96-a096-4a45-9909-c196ddabc286':
{
	desc: '隱藏紅人榜記錄',
	pages: { off: [profilepage] },
	type: 3,
	queue: [{
		css: '#ctl00_ContentPlaceHolder1_UpdatePanelPM + br, #ctl00_ContentPlaceHolder1_HotPeoples { display: none; }'
	}]
},

'c18ff3e6-b9fc-4786-95d6-1c1bc800172a':
{
	desc: '隱藏書籤',
	pages: { off: [profilepage] },
	type: 3,
	queue: [{
		priority: 1,
		css: '#ctl00_ContentPlaceHolder1_HotPeoples + br, #ctl00_ContentPlaceHolder1_BookmarkTable { display: none; }'
	}]
},

'222f0c01-1ebd-49d6-b7f4-b1b7fc60ca40':
{
	desc: '隱藏起底列表',
	pages: { off: [topics | profilepage] },
	type: 3,
	queue: [{
		css: '#ctl00_ContentPlaceHolder1_siteUpdateProgress + table { display: none; }'
	}]
},

'e424fe8d-852b-4239-b797-6aa682e68c39':
{
	desc: '修正表格闊度',
	pages: { on: [giftpage] },
	type: 3,
	queue: [{
		css: 'table[width="800"] { width: 100%; }'
	}]
}

});