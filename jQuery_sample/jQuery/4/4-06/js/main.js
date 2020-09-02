$(function(){

	function setCrossFade(className, imgName){

		var target; //対象セレクタを格納した変数

		//要素を生成する
		function create(){
			var src = target.attr('src');
			var ext = src.substring(src.lastIndexOf('.'));
			var ovsrc = src.replace(ext, imgName+ext);
			target.wrap('<span class="img-wrap"></span>');
			target.before('<img src="'+ovsrc+'" class="ovImg">');
		};

		//スタイルシートを設定する
		function setStyle(){
			//親要素にスタイルシートを設定
			target.parent().css({
				'display': 'inline-block',
				'position': 'relative'
			});
			//元画像要素にスタイルシートを設定
			target.css({
				'position': 'relative'
			});
			//オーバー画像要素にスタイルシートを設定
			target.parent().find('.ovImg').css({
				'position': 'absolute',
				'top': 0
			});
		};

		//イベントを設定する
		function setEvent(target){
			target.parent().on({
				'mouseover': function(){
					target.parent().find('.ovImg').stop().fadeTo(600, 1);
					target.stop().fadeTo(600, 0);
				},
				'mouseout': function(){
					target.parent().find('.ovImg').stop().fadeTo(600, 0);
					target.stop().fadeTo(600, 1);
				}
			});
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

	setCrossFade('crossfade', '_ov');

});