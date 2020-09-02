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
			}else{
				complete();
			};
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
				'html': '<img src="images/loading.gif">'
			}).appendTo('body');
			imgLoad();
		};

		init();

	};

	loadImages();

});