$(function(){

	function setModalPhotos(target){

		var nowIndex = 0; //現在表示されている画像のインデックス

		//モーダルウィンドウ内の画像を切り替える
		function changeModalPhoto(num){
			var index = nowIndex + num;
			openModal($(target.find('a')[index]).attr('href'), index);
		};

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

		//モーダルウィンドウ内のコントロールボタンを設定する
		function checkModalControl(){
			$('#modalPrevBtn').on('click', function(){changeModalPhoto(-1);});
			$('#modalNextBtn').on('click', function(){changeModalPhoto(1)});
			switch(nowIndex){
				case 0:
					$('#modalPrevBtn').hide().off('click');
					$('#modalNextBtn').fadeIn();
					break;
				case target.find('a').length-1:
					$('#modalPrevBtn').fadeIn();
					$('#modalNextBtn').hide().off('click');
					break;
				default:
					$('#modalPrevBtn').fadeIn();
					$('#modalNextBtn').fadeIn();
					break;
			};
		};

		//モーダルウィンドウ内の画像を読み込み完了
		function loadedModal(src, w, h){
			$('#modalPicture').attr('src', src);
			$('#modalLoading').fadeOut( function(){
				$('#modalPicture').fadeIn();
				checkModalControl();
			} );
			resizeModal(w, h);
		};

		//モーダルウィンドウ内の画像を読み込む
		function loadModal(src){
			var img = new Image();
			$(img).on('load', function(){ loadedModal(src, img.width, img.height); }).attr('src', src);
		};

		//モーダルウィンドウを表示する
		function openModal(src, index){
			var boxW = ( $('#modalBox').width() > 0 ) ? $('#modalBox').width() : 80 ;
			var boxH = ( $('#modalBox').height() > 0 ) ? $('#modalBox').height() : 80 ;
			nowIndex = index;
			closeModalControl();
			$('#modalPicture').hide();
			$('#modalCloseBtn').fadeIn();
			$('#modalLoading').fadeIn();
			$('#modalContent').fadeIn();
			resizeModal(boxW, boxH);
			loadModal(src);
		};

		//モーダルウィンドウを非表示にする
		function closeModal(){
			$('#modalContent').fadeOut(function(){ $('#modalContent').hide(); });
		};

		//モーダルウィンドウ内のコントロールを非表示にする
		function closeModalControl(){
			$('#modalPrevBtn').hide().off('click');
			$('#modalNextBtn').hide().off('click');
		};

		//モーダルウィンドウを生成する
		function createModal(){
			$('<div>', {
				'id': 'modalContent',
				'html': '<div id="modalOverlay"></div><div id="modalBox"><p id="modalPictureBox"><img id="modalPicture"></p><p id="modalCloseBtn"></p><p id="modalPrevBtn"></p><p id="modalNextBtn"></p><p id="modalLoading"></p></div>'
			}).appendTo('body');
			$('#modalOverlay').css({
				'background': '#000',
				'opacity': 0.8
			});
			$('#modalContent').hide();
		};

		//モーダルウィンドウ内のイベントを設定する
		function setModalEvent(){
			target.find('a').each(function(index){
				$(this).on('click', function(){
					openModal( $(this).attr('href'), index );
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