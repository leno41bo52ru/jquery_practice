$(function(){

	function setYouTube(target, op){

		var YOUTUBE_EMDEB_PATH = '//www.youtube.com/embed/'; //YouTubeのパス

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
		var movie = target.find('#movie'); //YouTubeプレーヤーを追加する親要素のセレクタを格納した変数
		var yt; //YouTubeプレーヤーのセレクタを格納した変数
		var links = target.find('#links a'); //動画切り替えボタンのセレクタを格納した変数
		var nowIndex = 0; //現在再生されている動画のインデックス

		//動画を切り替える
		function change(index, videoId){
			if( index != nowIndex ){
				$(links[nowIndex]).removeClass('ac');
			};
			nowIndex = index;
			$(links[nowIndex]).addClass('ac')
			yt.attr('src', YOUTUBE_EMDEB_PATH+videoId+'/'+paramStr);
		};

		//YouTubeプレーヤー生成
		function createYoutubePlayer(){
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
			movie.append(
				'<iframe width="'+option.width+'" height="'+option.height+'" src="'+YOUTUBE_EMDEB_PATH+option.videoId+'/'+paramStr+'" frameborder="'+option.frameborder+'"'+option.allowfullscreen+'></iframe>'
			);
			yt = movie.find('iframe');
		};

		//初期設定
		function init(){
			createYoutubePlayer();
			$.each( links, function(index){
				$(this).on('click', function(){
					change( index, $(this).attr('href') );
					return false;
				});
			} );
			change( nowIndex, $(links[nowIndex]).attr('href') );
		};

	  init();

	};

	setYouTube($('#youtube'), {
		'width': 880,
		'height': 495,
		'autoplay': true,
		'allowfullscreen': false,
		'rel': false,
		'loop': true
	});

});