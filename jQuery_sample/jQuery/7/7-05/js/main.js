$(function(){

	function loadImages(){

		var srcList = []; //画像の参照先を格納する配列
		var loadIndex = 0; //読み込み画像インデックス

		//画像を表示する
		function open(){
			$('#main').find('img').css({
				'display': 'block',
				'opacity': 0
			}).animate({'opacity': 1}, 1200);
		};

		//すべての画像の読み込み完了
		function complete(){
			$('#loading').fadeOut(1200, function(){
				$('#loading').remove();
				open();
			});
		};

		//画像の読み込み完了
		function loaded(){
			if( loadIndex != (srcList.length-1) ){
				loadIndex++;
				imgLoad();
			};
			var per = (loadIndex / (srcList.length-1) ) * 100;
			var txt; //パーセンテージのテキストを代入する
			var getParsent = function(){
				txt = parseInt( $('#loadingText').text() );
				if( per > txt ){
					txt++;
					if( txt >= per ) txt = Math.floor(per);
					$('#loadingText').text(txt+'%');
					setTimeout(getParsent, 100);
				};
			};
			setTimeout(getParsent, 100);
			$('#loadingBar').stop().animate({'width': per+'%'}, 300, function(){
				if( per >= 100 ) complete();
			});
		};

		//画像の読み込み
		function imgLoad(){
			var img = new Image();
			$(img).on('load', loaded).attr('src', srcList[loadIndex]);
		};

		//初期設定
		function init(){
			$('#main').find('img').each(function(index){
				srcList[index] = $(this).attr('src');
			});
			$('<p>', {
				'id': 'loading',
				'html': '<span id="loadingBar"></span><span id="loadingText">0%</span>'
			}).appendTo('body');
			$('#loadingBar').css('width', '0%');
			imgLoad();
		};

		//JSONデータの読み込み
		function loadJSON(){
			$.getJSON('sample.json', function(data){
				var items = [];
				for(var i in data.entry){
					items.push( '<li><img src="' + data.entry[i].img_src + '" alt="' + data.entry[i].title + '"></li>' );
				};
				$('<ul>', {
			    'class': 'imgList',
			    'html': items.join('')
			  }).appendTo('#main');
			  init();
			});
		};

		loadJSON();

	};

	loadImages();

});