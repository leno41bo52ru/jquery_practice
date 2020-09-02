$(function(){

	function floatingMenu(target, boxTop, boxH){

		var menuH = target.height(); //メニューの高さ
		var scrollY = 0; //スクロール量
		var posTop = 0; //移動位置
		var menuList = target.find('li'); //メニューのセレクタを格納した変数

		//メニュー設定
		menuList.on({
			'mouseover': function(){$(this).find('img').attr('src', 'images/sub_menu_ov.png');},
			'mouseout': function(){$(this).find('img').attr('src', 'images/sub_menu.png');}
		});

		//scrollイベント処理
		$(window).scroll(function(){
			scrollY = $(window).scrollTop();
			if( scrollY-boxTop > boxH-menuH ){
				posTop = boxH-menuH;
			}else{
				if( scrollY < boxTop ){
					posTop = 0;
				}else{
					posTop = scrollY-boxTop;
				};
			};
			target.stop().animate({'top':posTop}, 500);
		});

	};

	floatingMenu( $('#floating'), $('#content').offset().top, $('#content').height() );

});