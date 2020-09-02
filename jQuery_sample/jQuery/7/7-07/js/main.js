$(function(){

	function loadImages(){

		var srcList = []; //画像の参照先を格納する配列
		var loadIndex = 0; //読み込み画像インデックス

		//すべての画像の読み込み完了
		function complete(){
			$('#main').find('.loading').remove();
		};

		//画像の読み込み完了
		function loaded(){
			var loading = $($('#main').find('.loading')[loadIndex]);
			var img = $($('#main').find('.photo')[loadIndex]);
			loading.fadeOut(200);
			img.css({
				'display': 'block',
				'opacity': 0
			}).animate({'opacity': 1}, 800, function(){
				loadIndex++;
				if( loadIndex >= srcList.length ){
					complete();
				}else{
					imgLoad();
				};
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
				$(this).addClass('photo');
				srcList[index] = $(this).attr('src');
			});
			$('<p>', {
				'class': 'loading',
				'html': '<img src="images/loading.gif">'
			}).appendTo( $('#main').find('li') );
			imgLoad();
		};

		init();

	};

	loadImages();

});