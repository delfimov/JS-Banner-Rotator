/*
 * rotator.js - random banner javascript library 
 * http://
 *
 * Copyright (c) 2012 by Dmitry Elfimov
 * Released under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 2012-01-16


Usage:

jQuery(function($) {
	// new banners(<placeID>)
	var banner = new banners('banner');
	// banner.add(<type>, <link>, <code>[|<alt image>[|<alt text]], [weight])
	banner.add('image', 'http://www.1tvrus.com', 'http://www.1tvrus.com/im/logos/channel1.png|Первый канал', 2);
	banner.add('image', 'http://www.1tvrus.com', 'http://www.1tvrus.com/im/logos/channel1.png');
	banner.add('html', 'http://www.telecafe.ru', '<span style="color:#f00;">Telecafe</span>');
	banner.add('flash', 'http://www.1tvrus.com', '/brs/rosmolodezh.swf|/brs/rosmolodezh.gif|Росмолодеж', 3);
	banner.get();
});

SWFObject (http://code.google.com/p/swfobject/) is required to embed flash banners.

*/

function banners(placeId) {

	this.count = 0;
	this.banners = [];
	this.flashVersion = '8.0.0';
	this.prefix = 'brs';
	this.flashVars = {};
	this.flashParams = {};
	this.flashAttributes = {};
	this.flashExpressInstall = '';

	
	this.place = document.getElementById(placeId);
	
	this.add = function (type, link, code, weight) {
		weight = typeof(weight) != 'undefined' ? weight : 1;
		while (weight>0) {
			this.banners[this.count] = {
				'type'		:	type, 
				'link'		:	link, 
				'code'		:	code,
				'count'		:	this.count
			}
			this.count++;
			weight--;
		}
	}

	this.get = function () {
		var banner = this.banners[Math.floor(Math.random()*this.count)];
		var code = (banner['code'].indexOf('|')==-1) ? [banner['code']] : banner['code'].split("|");
		switch (banner['type']) {
			case 'html':
				this.addHTML(banner['link'], code[0]);
				break;
			case 'flash':
				this.addFlash(banner['link'], code, banner['count']);
				break;
			case 'image':
			default:
				this.addImage(banner['link'], code);
		}
	}
	
	this.addHTML = function (link, html) {
		this.place.innerHTML = (html.indexOf(link)==-1 || link==html) ? '<a href="'+link+'" class="'+this.prefix+'html">'+html+'</a>' : html;
	}
	
	this.addFlash = function (link, code, count) {
		this.flashVars['link1'] = link;
		if (typeof swfobject != 'undefined' && swfobject.hasFlashPlayerVersion(this.flashVersion)) {
			this.place.innerHTML = '<div class="'+this.prefix+'flash" id="'+this.prefix+'flash'+count+'"></div>';
			swfobject.embedSWF(code[0], this.prefix+'flash'+count, this.place.offsetWidth, this.place.offsetHeight, this.flashVersion, this.flashExpressInstall, this.flashVars, this.flashParams, this.flashAttributes);
		} else {
			if (typeof code[1] !== 'undefined') {
				this.addImage(link, [code[1], ((typeof code[2] !== 'undefined') ? code[2] : link)]);
			} else {
				this.addHTML(link, link);
			}
		}
	}
	
	this.addImage = function (link, code) {
		code[1] = (typeof code[1] !== 'undefined') ? code[1] : link;
		this.place.innerHTML = '<a href="'+link+'" class="'+this.prefix+'image"><img src="'+code[0]+'" alt="'+code[1]+'"></a>';
	}

};

