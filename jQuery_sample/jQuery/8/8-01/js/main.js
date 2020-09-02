$(function(){

	function setModalPhotos(target){

		//モーダルウィンドウのリサイズ
		function resizeModal(imgW, imgH){
			var ww = $(window).width();
			var wh = $(window).height();
			var dh = $(document).height();
			if( $.isNumeric(imgW) && $.isNumeric(imgH) ) $('#modalBox').width( imgW ).height( imgH );
			var boxTop = Math.floor((wh-$('#modalBox').innerHeight())/2)+$(window).scrollTop();
			var boxLeft = Math.floor((ww-$('#modalBox').innerWidth())/2);
			$('#modalBox').offset({ top: boxTop, left: boxLeft });
			$('#modalContent').width(ww).height(dh);
			$('#modalOverlay').width(ww).height(dh);
		};

		//モーダルウィンドウ内の画像を読み込み完了
		function loadedModal(src, w, h){
			$('#modalPicture').attr('src', src);
			$('#modalLoading').fadeOut( function(){ $('#modalPicture').fadeIn(); } );
			resizeModal(w, h);
		};

		//モーダルウィンドウ内の画像を読み込む
		function loadModal(src){
			var img = new Image();
			$(img).on('load', function(){ loadedModal(src, img.width, img.height); }).attr('src', src);
		};

		//モーダルウィンドウを表示する
		function openModal(src){
			$('#modalPicture').hide();
			$('#modalCloseBtn').fadeIn();
			$('#modalLoading').fadeIn();
			$('#modalContent').fadeIn();
			resizeModal(80, 80);
			loadModal(src);
		};

		//モーダルウィンドウを非表示にする
		function closeModal(){
			$('#modalContent').fadeOut(function(){ $('#modalContent').hide(); });
		};

		//モーダルウィンドウを生成する
		function createModal(){
			$('<div>', {
				'id': 'modalContent',
				'html': '<div id="modalOverlay"></div><div id="modalBox"><p id="modalPictureBox"><img id="modalPicture"></p><p id="modalCloseBtn"></p><p id="modalLoading"></p></div>'
			}).appendTo('body');
			$('#modalOverlay').css({
				'background': '#000',
				'opacity': 0.8
			});
			$('#modalContent').hide();
		};

		//モーダルウィンドウ要素のイベントを設定する
		function setModalEvent(){
			target.find('a').each(function(index){
				$(this).on('click', function(){
					openModal( $(this).attr('href') );
					return false;
				});
			});
			$('#modalCloseBtn').on('click', closeModal);
			$('#modalOverlay').on('click', closeModal);
			$(window).on('resize', resizeModal);
		};

		//初期設定
		function init(){
			createModal();
			setModalEvent();
		};

		init();

	};

	setModalPhotos($('#photos'));

});