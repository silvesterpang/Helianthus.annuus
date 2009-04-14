﻿/*
    Copyright (C) 2008  向日

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @name Helianthus.Annuus 3: Main Script
// @namespace http://code.google.com/p/helianthus-annuus/
// @description by 向日
// @include http://forum*.hkgolden.com/*
// @run-at document-start
// ==/UserScript==

(function()
{

var window = (typeof unsafeWindow != 'undefined') ? unsafeWindow : this;
var AN = window.AN || (window.AN = { temp: [], mod: {} });

AN.temp.push(function()
{
	var JSON = window.JSON;
	var $, jQuery = $ = window.jQuery;

	AN.mod['Main Script'] =
	{
		ver: '1.0.0',
		fn: {

// 佈局設定 //
'63d2407a-d8db-44cb-8666-64e5b76378a2':
{
	desc: '移除廣告',
	page: { 65535: true },
	type: 3,
	once: function()
	{
		$('#HKGTopAd').remove();

		$.each(
		{
			4: function()
			{
				$('#ctl00_ContentPlaceHolder1_lb_UserName').up('table', 1).removeAttr('height');
			},
			28: function()
			{
				$('#ctl00_ContentPlaceHolder1_lb_UserName').up('tr', 1).find('tr:last').remove();
				$('#HKGBottomGoogleAd').up('table', 1).next('br').andSelf().remove();
			},
			30: function()
			{
				$('#MainPageAd2').up('tr', 1).prev().andSelf().remove();
				$('#ctl00_ContentPlaceHolder1_MainPageAd1,#MainPageAd1').up('td').prev().andSelf().remove();
			},
			32: function()
			{
				$('#ctl00_ContentPlaceHolder1_lb_UserName').up('tr', 1).nextAll().remove();
				$('#HKGTopGoogleAd,#HKGBottomGoogleAd').remove();
			},
			62: function()
			{
				$('#ctl00_ContentPlaceHolder1_MiddleAdSpace1').contents(':lt(2)').remove();
			},
			64: function()
			{
				$('#HKGBottomGoogleAd').up('table', 1).prev().andSelf().remove();
			}
		}, function(sPage)
		{
			if(sPage & AN.box.nCurPage) this();
		});
	},
	infinite: function()
	{
		$.each(
		{
			28: function()
			{
				$('span[id^=MsgInLineAd]').up('tr').remove();
			},
			32: function()
			{
				$('span[id^=MsgInLineAd]').next().andSelf().remove();
			},
			64: function()
			{
				$('span').filter('[id^=PMInLineAd],[id^=MsgInLineAd]').up('tr').remove();
				$('#ctl00_ContentPlaceHolder1_PMPersonalTable').remove().insertAfter('#ctl00_ContentPlaceHolder1_UpdatePanelPM'); // to remove the black line in IE
			}
		}, function(sPage)
		{
			if(sPage & AN.box.nCurPage) this();
		});
	}
},

// 修正修改 //
'11f1c5ca-9455-4f8e-baa7-054b42d9a2c4':
{
	desc: '自動轉向正確頁面',
	page: { 2: true },
	type: 4,
	once: function()
	{
		if(document.referrer.indexOf('/login.aspx') > 0) location.replace('/topics.aspx?type=BW');
		else if(!location.pathname.match(/^\/(?:default.aspx)?$/i)) location.reload();
	}
},

'2d4e139c-224c-44fb-824e-606170276c76':
{
	desc: '修正用戶名稱搜尋連結',
	page: { 92: true },
	type: 4,
	infinite: function(jDoc)
	{
		$.each(jDoc.topics(), function()
		{
			this.jThis.find('a:last').attr('href', '/search.aspx?st=A&searchstring=' + escape(this.sUserName));
		});
	}
},

'30673b05-557d-4343-a873-bf88c2247525':
{
	desc: '修正頁數跳轉連結地址',
	page: { 4: true },
	type: 4,
	once: function()
	{
		var sType = location.search.match(/type=[^&]+/i);
		if(sType)
		{
			$('#filter').attr('action', '/topics.aspx?' + sType[0])
			.up('tr').find('a').each(function()
			{
				this.href = this.href.replace(/\?/, '?' + sType[0] + '&');
			});
		}
	}
},

'0293c9da-468f-4ed5-a2d7-ecb0067e713f':
{
	desc: '修改引用半透明 [IE無效]',
	page: { 32: false },
	type: 4,
	options: { sQuoteOpacity: { desc: '透明度 (10 = 移除半透明)', type: 'select', defaultValue: 10, choices: [10,9,8,7,6,5,4,3,2,1,0] } },
	once: function()
	{
		AN.util.addStyle($.sprintf('blockquote { opacity: %s !important; }', AN.util.getOptions('sQuoteOpacity'), AN.util.getOptions('sQuoteOpacity') / 10));
	}
},

'd563af32-bd37-4c67-8bd7-0721c0ab0b36':
{
	desc: '優化頁數跳轉連結地址',
	page: { 32: false },
	type: 4,
	once: function()
	{
		window.changePage = function(nPageNo)
		{
			var sPage = (nPageNo) ? ('&page=' + nPageNo) : '';
			var sHighlight = (window.highlight_id) ? ('&highlight_id=' + window.highlight_id) : '';
			location.assign($.sprintf('/view.aspx?message=%s%s%s', window.messageid, sPage, sHighlight));
		};
	},
	infinite: function(jDoc)
	{
		jDoc.find('select[name=page]').each(function()
		{
			$(this).up('tr').find('a').each(function()
			{
				this.href = this.href.replace(/&(?:page=1|highlight_id=0)/g, '');
			});
		});
	}
},

'b6b232c8-1f26-449e-bb0d-2b7826bf95ef':
{
	desc: '優化圖片縮放',
	page: { 32: true },
	type: 4,
	options:
	{
		bShowSize: { desc: '指標停留在圖片上時提示大小', defaultValue: false, type: 'checkbox' },
		nMaxRatio: { desc: '最大長闊比例(1:X)', defaultValue: 0, type: 'text' }
	},
	once: function(jDoc)
	{
		window.DrawImage = $.blank;

		var bShowSize = AN.util.getOptions('bShowSize');
		var nMaxRatio = AN.util.getOptions('nMaxRatio');

		jDoc.defer(2, '縮放圖片', function() // after layout is fixed & all images are created
		{
			window.DrawImage = function(eImg)
			{
				if(eImg.width < 300)
				{
					if(bShowSize) this.title = $.sprintf('ori: %sx%s now: same', eImg.width, eImg.height);
					return;
				}

				var jImg = $(eImg);
				var nMaxWidth = jImg.up('td,div').width() - 2;

				if(!nMaxWidth) throw('no max width!');

				var nWidth = jImg.removeAttr('width').removeAttr('height')[0].width;
				var nHeight = eImg.height;

				if(nWidth <= nMaxWidth)
				{
					if(bShowSize) eImg.title = $.sprintf('ori: %sx%s now: same', nWidth, eImg.height);
				}
				else
				{
					jImg.width(nMaxWidth);
					if(bShowSize) eImg.title = $.sprintf('ori: %sx%s now: %sx%s', nWidth, nHeight, nMaxWidth, eImg.height);
				}

				if(nMaxRatio > 1 && eImg.height / nWidth > nMaxRatio)
				{
					jImg.parent().hide().after(
					$($.sprintf('<a href="javascript:" class="an-content-line">圖片長闊比例 &gt; %s, 原長闊: %sx%s, 點擊復原</a>', nMaxRatio, nWidth, nHeight)).click(function()
					{
						$(eImg).prev().show().end().remove();
					})
					);
				}
			};

			$.each(jDoc.replies(), function()
			{
				this.jTdContent.find('img[onLoad]').each(function()
				{
					if(this.complete) window.DrawImage(this);
				});
			});
		});
	}
},

'52ebe3d3-bf98-44d2-a101-180ec69ce290':
{
	desc: '移除帖子連結高亮部份',
	page: { 64: false },
	type: 4,
	infinite: function(jDoc)
	{
		$.each(jDoc.topics(), function()
		{
			this.jThis.find('a').each(function()
			{
				this.href = this.href.replace(/&highlight_id=\d+/, '');
			});
		});
	}
},

'87a6307e-f5c2-405c-8614-af60c85b101e':
{
	desc: '搜尋開新頁',
	page: { 20: true, 8: false },
	type: 4,
	once: function()
	{
		window.Search = function()
		{
			window.open($.sprintf('/search.aspx?st=%s&searchstring=%s', $('#st option:selected')[0].value, escape($('#searchstring').val())), '_blank'); // FF: bug of jQuery?
			$('#searchstring').val('');
		};
	}
},

'a93f1149-d11b-4b72-98dd-c461fd9ee754':
{
	desc: '帖子連結開新頁',
	page: { 92: false },
	type: 4,
	infinite: function(jDoc)
	{
		$.each(jDoc.topics(), function()
		{
			this.jThis.find('a:first').nextAll().andSelf().attr('target', '_blank');
		});
	}
},

'6e978310-e87b-4043-9def-076a13377c19':
{
	desc: '更換favicon(小丑icon) [部份瀏覽器無效]',
	page: { 65534: false },
	type: 4,
	once: function()
	{
		$('head').append('<link rel="shortcut icon" href="http://helianthus-annuus.googlecode.com/svn/other/hkg.ico" />');
	}
},

'e54d5c5f-47ae-4839-b4e8-6fc3733edfef':
{
	desc: '改進公司模式(假扮為Google)',
	page: { 65534: true },
	type: 4,
	once: function()
	{
		if(AN.util.cookie('companymode') == 'Y')
		{
			$('head').append('<link rel="shortcut icon" href="http://www.google.com/favicon.ico" />');
			document.title = 'Google';
		}
	}
},

// 加入物件 //
'231825ad-aada-4f5f-8adc-5c2762c1b0e5':
{
	desc: '顯示資料: 樓主名稱',
	page: { 32: false },
	type: 5,
	once: function(jDoc)
	{
		AN.util.getOpenerInfo(jDoc, function(oInfo)
		{
			AN.shared('addInfo', $.sprintf('樓主: <a target="_blank" href="/ProfilePage.aspx?userid=%s">%s</a>', oInfo.sId, oInfo.sName));
		});
	}
},

'9e181e79-153b-44d5-a482-5ccc6496a172':
{
	desc: '顯示資料: 累計在線時間',
	page: { 65534: false },
	type: 5,
	once: function()
	{
		var nLastOnTime = AN.util.data('nLastOnTime');
		var nCumulatedTime = AN.util.data('nCumulatedTime') || 0;

		if(nLastOnTime)
		{
			var nDifference = $.time() - nLastOnTime;
			nCumulatedTime += (nDifference >= 120000) ? 120000 : nDifference;
		}

		var sCumulated;
		if(nCumulatedTime > 86400000)
		{
			sCumulated = (nCumulatedTime / 86400000).toFixed(2) + ' days';
		}
		else if(nCumulatedTime > 3600000)
		{
			sCumulated = (nCumulatedTime / 3600000).toFixed(2) + ' hours';
		}
		else
		{
			sCumulated = (nCumulatedTime / 60000).toFixed(2) + ' minutes';
		}

		AN.shared('addInfo', $.sprintf('在線時間: %s', sCumulated));

		AN.util.data('nLastOnTime', $.time());
		AN.util.data('nCumulatedTime', nCumulatedTime);
	}
},

'f47e77c8-6f1a-43b2-8493-f43de222b3b4':
{
	desc: '加入伺服器狀態顯示按扭',
	page: { 65534: true },
	type: 5,
	once: function()
	{
		AN.shared('addButton', '伺服器狀態', AN.shared.serverTable);
	}
},

'aad1f3ac-e70c-4878-a1ef-678539ca7ee4':
{
	desc: '加入前往吹水台的快速連結',
	page: { 65534: true },
	type: 5,
	once: function()
	{
		//if(AN.box.sCurPage == 'topics') return;
		AN.shared('addLink', '吹水台', '/topics.aspx?type=BW', 1);
	}
},

'd0d76204-4033-4bd6-a9a8-3afbb807495f':
{
	desc: '加入前往最頂/底的按扭',
	page: { 32: true },
	type: 5,
	once: function()
	{
		AN.shared('addLink', '最頂', function(){ scrollTo(0,0); }, 0);
		AN.shared('addLink', '最底', function(){ $('body')[0].scrollIntoView(false); }, 2);
	}
},

'b78810a2-9022-43fb-9a9b-f776100dc1df':
{
	desc: '加入樓層編號',
	page: { 32: true },
	type: 5,
	infinite: function(jDoc)
	{
		var nCurPageNo = AN.util.getCurPageNo();
		var nFloor = ((nCurPageNo == 1) ? 0 : 50 * (nCurPageNo - 1) + 1) + $('.an-content-floor').length;

		$.each(jDoc.replies(), function()
		{
			this.jThis.find('span:last').append($.sprintf(' <span class="an-content-floor an-content-box">#%s</span>', nFloor++));
		});
	}
},

// 其他功能 //
'3f693a9e-e79d-4d14-b639-a57bee36079a':
{
	desc: '自動顯示伺服器狀態檢查視窗',
	page: { 1: true },
	type: 6,
	once: function()
	{
		AN.shared('serverTable');
	}
},

'4cdce143-74a5-4bdb-abca-0351638816fa':
{
	desc: '發表新帖子的主旨過長時進行提示',
	page: { 256: true },
	type: 6,
	once: function(jDoc)
	{
		if(location.search.indexOf('mt=N') != -1)
		{
			$('#aspnetForm').submit(function()
			{
				var sTitle = $('#ctl00_ContentPlaceHolder1_messagesubject').val();
				var n = 0;
				for(var i=0; i<sTitle.length; i++)
				{
					n += sTitle.charCodeAt(i) > 255 ? 2 : 1;
				}
				if(n > 50 && !confirm('主旨過長!(位元組 > 50)\n將導致帖子發表失敗或主旨被裁剪!\n\n確定要進行發表?'))
				{
					return false;
				}
			});
		}
	}
},

'e24ec5f6-5734-4c2c-aa54-320ca29a3932':
{
	desc: '移除死圖',
	page: { 32: false },
	type: 6,
	defer: 1, // after all images are created
	once: function()
	{
		this.removeDead = function()
		{
			$(this).parent().css('text-decoration', 'none').html('<a href="javascript:" class="an-content-line">死圖已被移除</a>');
		};
	},
	infinite: function(jDoc, oFn)
	{
		$.each(jDoc.replies(), function()
		{
			this.jTdContent.find('img[onLoad]').each(function()
			{
				var sSrc = this.src;
				$(this).error(oFn.removeDead).attr('src', sSrc);
			});
		});
	}
},

'eddbc42a-351c-4452-afdb-2e031bdcac76':
{
	desc: '移除同一回覆內重複的圖片',
	page: { 32: false },
	type: 6,
	infinite: function(jDoc)
	{
		$.each(jDoc.replies(), function()
		{
			var aSrcs = [];
			this.jTdContent.find('img[onLoad]').each(function()
			{
				if($(this).width() <= 100) return;

				if($.inArray(this.src, aSrcs) == -1) aSrcs.push(this.src);
				else $(this).parent().html('<a href="javascript:" class="an-content-line">重複圖片已被移除</a>');
			});
		});
	}
},

'8e1783cd-25d5-4b95-934c-48a650c5c042':
{
	desc: '屏蔽圖片 (點擊顯示)',
	page: { 32: false },
	type: 6,
	defer: 1, // after all images are created
	once: function(jDoc, oFn)
	{
		oFn.bAreMasked = true;

		AN.shared('addButton', '切換屏蔽圖片', function()
		{
			(oFn.bAreMasked = !oFn.bAreMasked) ? $('.an-maskimg').fadeOut().next().show() : $('.an-maskimg').next().hide().end().fadeIn();
		});

		this.unmaskIt = function()
		{
			var jBox = $(this).children('a');
			if(jBox.is(':visible'))
			{
				jBox.hide().prev().fadeIn();
				return false;
			}
		};
	},
	infinite: function(jDoc, oFn)
	{
		if(!this.bAreMasked) return;

		$.each(jDoc.replies(), function()
		{
			this.jTdContent.find('img[onLoad]').addClass('an-maskimg').hide().after('<a class="an-content-box" href="javascript:">點擊顯示圖片</a>').parent().css('text-decoration', 'none').click(oFn.unmaskIt);
		});
	}
},

'86d24fc8-476a-4de3-95e1-5e0eb02b3353':
{
	desc: '轉換表情碼為圖片',
	page: { 92: true },
	type: 6,
	infinite: function(jDoc)
	{
		var rSmiley = /[#[](hehe|love|ass|sosad|good|hoho|kill|bye|adore|banghead|bouncer|bouncy|censored|flowerface|shocking|photo|fire|yipes|369|bomb|slick|no|kill2|offtopic)[\]#]/g;

		var aConvertMap =
		[
			{ regex: /O:-\)/g, result: 'angel' },
			{ regex: /xx\(/g, result: 'dead' },
			{ regex: /:\)/g, result: 'smile' },
			{ regex: /:o\)/g, result: 'clown' },
			{ regex: /:-\(/g, result: 'frown' },
			{ regex: /:~\(/g, result: 'cry' },
			{ regex: /;-\)/g, result: 'wink' },
			{ regex: /:-\[/g, result: 'angry' },
			{ regex: /:-]/g, result: 'devil' },
			{ regex: /:D/g, result: 'biggrin' },
			{ regex: /:O/g, result: 'oh' },
			{ regex: /:P/g, result: 'tongue' },
			{ regex: /^3^/g, result: 'kiss' },
			{ regex: /\?_\?/g, result: 'wonder' },
			{ regex: /#yup#/g, result: 'agree' },
			{ regex: /#ng#/g, result: 'donno' },
			{ regex: /#oh#/g, result: 'surprise' },
			{ regex: /#cn#/g, result: 'chicken' },
			{ regex: /Z_Z/g, result: 'z' },
			{ regex: /@_@/g, result: '@' },
			{ regex: /\?\?\?/g, result: 'wonder2' },
			{ regex: /fuck/g, result: 'fuck' }
		];

		$.each(jDoc.topics(), function()
		{
			var jLink = this.jThis.find('a:first');
			var sOri = sText = jLink.html();

			sText = sText.replace(rSmiley, '<img style="border-width:0px;vertical-align:middle" src="/faces/$1.gif" alt="$&" />');

			$.each(aConvertMap, function()
			{
				sText = sText.replace(this.regex, '<img style="border-width:0px;vertical-align:middle" src="/faces/' + this.result + '.gif" alt="$&" />');
			});

			if(sText != sOri) jLink.html(sText);
		});
	}
},

'e33bf00c-9fc5-46ab-866a-03c4c7ca5056':
{
	desc: '智能地將文字轉換成連結',
	page: { 32: true },
	type: 6,
	infinite: function(jDoc)
	{
		var rLink = /(?:ftp|https?):\/\/[\w,./?:;~!@#$%^&*()+=-]+/i;
		var aMatch;

		var checkNode = function(nTarget)
		{
			if(nTarget.nextSibling) checkNode(nTarget.nextSibling);

			if(nTarget.nodeType == 3)
			{
				if(aMatch = rLink.exec(nTarget.data))
				{
					nTarget.splitText(RegExp.leftContext.length + aMatch[0].length);
					$(nTarget.splitText(RegExp.leftContext.length)).wrap($.sprintf('<a href="%s"></a>', aMatch[0])).parent().before('<span class="an-content-note" title="文字已轉換為連結">[L]</span>');
				}
			}
			else if(nTarget.firstChild && !$(nTarget).is('a,button,script,style'))
			{
				checkNode(nTarget.firstChild);
			}
		};

		$.each(jDoc.replies(), function()
		{
			checkNode(this.jTdContent[0].firstChild);
		});
	}
},

'7b36188f-c566-46eb-b48d-5680a4331c1f':
{
	desc: '轉換論壇連結的伺服器位置',
	page: { 32: true },
	type: 6,
	infinite: function(jDoc)
	{
		var aMatch;
		$.each(jDoc.replies(), function()
		{
			this.jTdContent.find('a')
			.filter(function(){ return (aMatch = this.hostname.match(/forum\d*.hkgolden\.com/i)) && aMatch[0] != location.hostname && !$(this).children().length; })
			.attr('hostname', location.hostname).before('<span class="an-content-note" title="已轉換伺服器位置">[C]</span>');
		});
	}
},

'8db8b611-e229-4d60-a74b-6142af1bacd8':
{
	desc: '提示可疑連結',
	page: { 32: false },
	type: 6,
	options:
	{
		sSusKey:
		{
			desc: '可疑關鍵字 [regular expression]',
			defaultValue: '[?&]r(?:ef(?:er[^=]+)?)?=|logout|tinyurl|urlpire|linkbucks|seriousurls|qvvo|viraldatabase|youfap|qkzone\\.com/t\\?',
			type: 'text'
		},
		sSusColor: { desc: '可疑關鍵字顏色', defaultValue: '#FF0000', type: 'text' }
	},
	infinite: function(jDoc, oFn)
	{
		var addBox = function()
		{
			AN.util.addStyle($.sprintf(' \
			#an-alertbox { display: none; position: absolute; border-width: 1px; } \
			#an-alertbox div { height: 2px; } \
			#an-alertbox p { margin: 0; padding: 0 0.2em; } \
			#an-alertbox span { color: %s; } \
			',
			AN.util.getOptions('sSusColor')
			));

			$('#an').append('<div id="an-alertbox" class="an-forum"><div class="an-forum-header"></div><p>發現可疑連結! keyword: <span></span></p></div>');

			oFn.showAlert = function(event)
			{
				$('#an-alertbox').find('span').text($(this).data('an-suskeyword'));
				$(document).bind('mousemove.an-alert', function(event)
				{
					var jAlert = $('#an-alertbox');
					jAlert.show().css({ top: event.pageY - jAlert.height() - 10, left: event.pageX - jAlert.width() / 2 });
				});
			};

			oFn.hideAlert = function()
			{
				$(document).unbind('.an-alert');
				$('#an-alertbox').fadeOut('fast');
			};
		};

		var rSus = RegExp(AN.util.getOptions('sSusKey'), 'i');
		var aMatch;

		$.each(jDoc.replies(), function()
		{
			this.jTdContent.find('a').each(function()
			{
				if(aMatch = rSus.exec(this.href))
				{
					if(!$('#an-alertbox').length) addBox();
					$(this).data('an-suskeyword', aMatch[0]).hover(oFn.showAlert, oFn.hideAlert);
				}
			});
		});
	}
},

'039d820f-d3c7-4539-8647-dde974ceec0b':
{
	desc: '轉換視頻網站連結為影片',
	page: { 32: true },
	type: 6,
	defer: 2, // after layout is fixed
	infinite: function(jDoc)
	{
		var nWidth, nHeight, sUrl;
		var aSites =
		[{
			regex: 'youtube\\.com/watch\\?',
			fn: function()
			{
				if(nWidth > 640) nWidth = 640;
				nHeight = nWidth / 16 * 9 + 25;
				sUrl = $.sprintf('http://www.youtube.com/v/%s&fs=1&rel=0&ap=%2526fmt%3D22', sUrl.replace(/.+?v=([^&]+).*/i, '$1'));
			}
		},
		{
			regex: 'vimeo\\.com/\\d',
			fn: function()
			{
				if(nWidth > 504) nWidth = 504;
				nHeight = nWidth / 1.5;
				sUrl = $.sprintf('http://vimeo.com/moogaloop.swf?clip_id=%s&show_title=1&fullscreen=1', sUrl.replace(/.+vimeo\.com\/(\d+).*/i, '$1'));
			}
		},
		{
			regex: 'youku\\.com/v_show/',
			fn: function()
			{
				if(nWidth > 480) nWidth = 480;
				nHeight = nWidth / 4 * 3 + 40;
				sUrl = $.sprintf('http://player.youku.com/player.php/sid/%s/v.swf', sUrl.replace(/.+?id_([^\/]+).*/i, '$1'));
			}
		},
		{
			regex: 'tudou\\.com/program/',
			fn: function()
			{
				if(nWidth > 400) nWidth = 400;
				nHeight = nWidth / 4 * 3 + 40;
				sUrl = $.sprintf('http://www.tudou.com/v/%s', sUrl.replace(/.+?view\/([^\/]+).*/i, '$1'));
			}
		}];

		var aReg = [];
		$.each(aSites, function(){ aReg.push(this.regex); });
		var rLink = RegExp(aReg.join('|'), 'i');

		$.each(jDoc.replies(), function()
		{
			this.jTdContent.find('a').filter(function(){ return rLink.test(this.href); }).each(function()
			{
				sUrl = this.href;
				nWidth = $(this).up('td,div').width();
				$.each(aSites, function()
				{
					if(RegExp(this.regex, 'i').test(sUrl))
					{
						this.fn();
						return false;
					}
				});

				$(this).replaceWith($.sprintf('<object type="application/x-shockwave-flash" width="%s" height="%s" data="%s"><param name="movie" value="%s" /><param name="wmode" value="opaque" /><param name="quality" value="best" /><param name="allowFullScreen" value="true" /></object>', nWidth, nHeight.toFixed(0), sUrl, sUrl));
			});
		});
	}
},

'd761d6f7-8ef7-4d5b-84e9-db16a274f616':
{
	desc: '轉換圖片連結為圖片',
	page: { 32: false },
	type: 6,
	infinite: function(jDoc)
	{
		$.each(jDoc.replies(), function()
		{
			this.jTdContent.find('a').each(function()
			{
				if(!$(this).children().length && /jpg|gif|png|bmp/i.test(this.href))
				{
					$(this).attr('target', '_blank').html($.sprintf('<img style="border-style: none" onLoad="DrawImage(this)" src="%s" />', this.href)).before('<span class="an-content-note" title="已轉換連結為圖片">[P]</span>');
				}
			});
		});
	}
},

'ea19d7f6-9c2c-42de-b4f9-8cab40ccf544':
{
	desc: '限制回覆格高度',
	page: { 32: false },
	type: 6,
	defer: 2, // after layout is fixed
	options: { nMaxReplyHeight: { desc: '最大回覆高度(px)', defaultValue: 2000, type: 'text' } },
	infinite: function(jDoc)
	{
		var nMaxHeight = AN.util.getOptions('nMaxReplyHeight');
		$.each(jDoc.replies(), function()
		{
			var nTdWidth = this.jTdContent.width();
			this.jTdContent.wrapInner($.sprintf('<div style="max-height: %spx; width: %spx; overflow-y: auto;"><div style="width: %spx; padding-right: 1px;"></div></div>', nMaxHeight, nTdWidth + 30, nTdWidth - 1)); // that 1px is for FF3..
		});
	}
},

'fc07ccda-4e76-4703-8388-81dac9427d7c':
{
	desc: '強制顯示空白用戶名連結',
	page: { 32: true },
	type: 6,
	infinite: function(jDoc)
	{
		$.each(jDoc.replies(), function()
		{
			if(/^\s*$/.test(this.sUserName))
			{
				this.jNameLink.html('<span style="color: black">&lt;空白名稱&gt;</span>');
			}
		});
	}
},

'b2be12c7-8c97-4293-b283-51232cf91746':
{
	desc: '強制鎖定用戶名於一行',
	page: { 28: true },
	type: 6,
	infinite: function(jDoc)
	{
		$.each(jDoc.topics(), function()
		{
			this.jNameLink.parent().css('white-space', 'nowrap');
		});
	}
}

}}; // end mod

}); // end push

})(); // end anonymous