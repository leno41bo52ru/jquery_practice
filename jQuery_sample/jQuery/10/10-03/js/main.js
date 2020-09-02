$(function(){

	function setYouTube(target, op){

		var option = { //iframe要素の属性値とパラメータ
			'videoId': '',
			'width': 420,
			'height': 315,
			'frameborder': 0,
			'allowfullscreen': true,
			'rel': true,
			'loop': false,
			'autoplay': false
		};
		var paramStr = ''; //文字列化したパラメータ
		var paramArr = []; //パラメーターリスト

		for( var i in op ){
			option[i] = op[i]
		};

		if( option.allowfullscreen ) option.allowfullscreen = 'allowfullscreen';
		else option.allowfullscreen = '';
		if( !option.rel ) paramArr.push('rel=0');
		if( option.loop ) paramArr.push('loop=1');
		if( option.autoplay ) paramArr.push('autoplay=1');
		paramStr = paramArr.join('&');
		if( paramStr.length > 0 ) paramStr = '?'+paramStr;

		$('<div>', {
			'html': '<iframe width="'+option.width+'" height="'+option.height+'" src="//www.youtube.com/embed/'+option.videoId+'/'+paramStr+'" frameborder="'+option.frameborder+'"'+option.allowfullscreen+'></iframe>'
		}).appendTo(target);

	};

	setYouTube($('#youtube-0'), {
		'videoId': 'V973rBbazG4',
		'width': 410,
		'height': 410,
		'autoplay': true,
		'allowfullscreen': false,
		'rel': false,
		'loop': true
	});

	setYouTube($('#youtube-1'), {
		'videoId': '4_xEgnImXTI',
		'width': 410,
		'height': 410,
		'autoplay': false
	});

	setYouTube($('#youtube-2'), {
		'videoId': 'eWdeELqRshk',
		'width': 260,
		'height': 260,
		'autoplay': false
	});

	setYouTube($('#youtube-3'), {
		'videoId': '01a65dMhYBc',
		'width': 260,
		'height': 260,
		'autoplay': false
	});

	setYouTube($('#youtube-4'), {
		'videoId': 'PUU44oFlL9c',
		'width': 260,
		'height': 260,
		'autoplay': false
	});

});