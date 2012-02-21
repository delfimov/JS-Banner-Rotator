Banner Rotator
==============


Usage
-----

~~~~~~~~~~~~~~~~~~~~
jQuery(function($) {
	// new banners(<placeID>)
	var banner = new banners('banner');
	// banner.add(<type>, <link>, <code>[|<alt image>[|<alt text]], [weight])
	banner.add('image', 'http://www.1tvrus.com', 'http://www.1tvrus.com/im/logos/channel1.png|Первый канал', 2);
	banner.add('image', 'http://www.1tvrus.com', 'http://www.1tvrus.com/im/logos/channel1.png');
	banner.add('html', 'http://www.telecafe.ru', '<span style="color:#f00;">Telecafe</span>');
	banner.add('flash', 'http://www.1tvrus.com', '/brs/rosmolodezh.swf|/brs/rosmolodezh.gif|Росмолодежь', 3);
	banner.get();
});
~~~~~~~~~~~~~~~~~~~~


SWFObject (http://code.google.com/p/swfobject/) is required to embed flash banners.

