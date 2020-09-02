$(function(){

	function setPlaceHolder(className){

		var target; //対象セレクタを格納した変数

		//要素を生成する
		function create(){
			target.wrap('<span class="input-wrap"></span>');
			target.after('<span class="placeholder-text">'+target.attr('data-placeholder')+'</span>');
		};

		//スタイルシートを設定する
		function setStyle(){
			target.parent().css({
				'display': 'inline-block',
				'position': 'relative',
				'width': target.width()+'px',
				'height': target.height()+'px'
			});
			target.css({
				'position': 'absolute',
				'top': 0
			});
			target.parent().find('.placeholder-text').css({
				'position': 'absolute',
				'top': 0,
				'left': 4+'px',
				'width': 250+'px',
				'color': '#aaa',
				'font-size': 12+'px',
				'line-height': 24+'px'
			});
		};

		//イベントを設定する
		function setEvent(selector){
			selector.on({
				'focus': function(){
					selector.parent().find('.placeholder-text').hide();
				},
				'blur': function(){
					if( selector.val() == '' ) selector.parent().find('.placeholder-text').show();
				}
			});
			selector.parent().find('.placeholder-text').on({
				'click': function(){
					selector.focus();
				}
			});
			if( selector.val().length != '' ) selector.focus();
		};

		//初期設定
		function init(){
			$.each($('.'+className), function(){
				target = $(this);
				create();
				setStyle();
				setEvent(target);
			});
		};

		init();

	};

	setPlaceHolder('placeholder');

});