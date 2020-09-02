$(function(){

	function setModalElement(target){

		var nowIndex = 0; //現在表示されているhtmlのインデックス
		var idList = []; //id名を格納する配列

		//モーダルウィンドウ内のElementを切り替える
		function changeModalElement(num){
			var index = nowIndex + num;
			openModal(index);
		};

		//モーダルウィンドウのリサイズ
		function resizeModal(){
			var ww = $(window).width();
			var wh = $(window).height();
			var dh = $(document).height();
			var boxTop = Math.floor((wh-$('#modalBox').innerHeight())/2)+$(window).scrollTop();
			var boxLeft = Math.floor((ww-$('#modalBox').innerWidth())/2);
			$('#modalBox').offset({ top: boxTop, left: boxLeft });
			$('#modalContent').width(ww).height(dh);
			$('#modalOverlay').width(ww).height(dh);
		};

		//モーダルウィンドウ内のコントロールボタンを設定する
		function checkModalControl(){
		  $('#modalPrevBtn').on('click', function(){changeModalElement(-1);});
		  $('#modalNextBtn').on('click', function(){changeModalElement(1)});
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

		//モーダルウィンドウを表示する
		function openModal(index){
			if( !$.isEmptyObject( $('#modalHtml').html() ) ){
				$(idList[nowIndex]).html( $('#modalHtml').contents() );
			};
			nowIndex = index;
			$('#modalHtml').html( $(idList[nowIndex]).contents() );
		  closeModalControl();
		  $('#modalCloseBtn').fadeIn();
		  $('#modalContent').fadeIn();
		  resizeModal();
		  checkModalControl();
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
		    'html': '<div id="modalOverlay"></div><div id="modalBox"><div id="modalHtml"></div><p id="modalCloseBtn"></p><p id="modalPrevBtn"></p><p id="modalNextBtn"></p></div>'
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
		  	idList[index] = $(this).attr('href');
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

	setModalElement($('#photos'));

});