$(function(){

	function setModalFrame(target){

		var nowIndex = 0; //現在表示されているiframeのインデックス

		//モーダルウィンドウ内のiframeのURLを切り替える
		function changeModalFrame(num){
			var index = nowIndex + num;
			openModal(index);
		};

		//モーダルウィンドウのリサイズ
		function resizeModal(boxW, boxH){
			var ww = $(window).width();
			var wh = $(window).height();
			var dh = $(document).height();
			if( $.isNumeric(boxW) && $.isNumeric(boxH) ){
				$('#modalFrame').width(boxW).height(boxH);
				$('#modalBox').width(boxW).height(boxH);
			};
			var boxTop = Math.floor((wh-$('#modalBox').innerHeight())/2)+$(window).scrollTop();
			var boxLeft = Math.floor((ww-$('#modalBox').innerWidth())/2);
			$('#modalBox').offset({ top: boxTop, left: boxLeft });
			$('#modalContent').width(ww).height(dh);
			$('#modalOverlay').width(ww).height(dh);
		};

		//モーダルウィンドウ内のコントロールボタンを設定する
		function checkModalControl(){
		  $('#modalPrevBtn').on('click', function(){changeModalFrame(-1);});
		  $('#modalNextBtn').on('click', function(){changeModalFrame(1)});
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
		function loadedModal(){
			$('#modalFrame').off('load');
			$('#modalLoading').fadeOut( function(){
				$('#modalFrame').fadeIn();
				checkModalControl();
			} );
			resizeModal();
		};

		//モーダルウィンドウ内の画像を読み込む
		function loadModal(src){
			$('#modalFrame').on('load', loadedModal).attr('src', src);
		};

		//モーダルウィンドウを表示する
		function openModal(index){
			nowIndex = index;
			var src = $(target.find('a')[nowIndex]).attr('href');
			var w = $(target.find('a')[nowIndex]).attr('data-width');
			var h = $(target.find('a')[nowIndex]).attr('data-height');
			closeModalControl();
			$('#modalFrame').attr('src', '').hide();
			$('#modalCloseBtn').fadeIn();
			$('#modalLoading').fadeIn();
			$('#modalContent').fadeIn();
			resizeModal(w, h);
			loadModal(src);
		};

		//モーダルウィンドウを非表示にする
		function closeModal(src){
			$('#modalContent').fadeOut(function(){
				$('#modalContent').hide();
				$('#modalFrame').attr('src', '').hide();
			});
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
				'html': '<div id="modalOverlay"></div><div id="modalBox"><iframe id="modalFrame" frameborder="0" scrolling="no"></iframe><p id="modalCloseBtn"></p><p id="modalPrevBtn"></p><p id="modalNextBtn"></p><p id="modalLoading"></p></div>'
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
					openModal(index);
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

	setModalFrame($('#photos'));

});