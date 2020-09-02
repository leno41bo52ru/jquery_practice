$(function(){

	function setTextTicker(target){

		var SLIDE_DELAY = 8000; //スライド後の待機時間
		var SLIDE_SPEED = 1200; //定位置までスライドする移動時間
		var TEXT_MAX_LENGTH = 65; //テキストティッカーの表示最大文字数

		var w = target.width(); //テキストティッカー領域の横幅
		var len = target.find('li').length; //テキストティッカーの数
		var nowIndex = 0; //現在表示しているインデックス
		var autoID; //setTimeout関数のID
		var isOver = false; //マウスオーバーしているかどうかの真偽値

		//自動スライドを設定する
		function setAuto(){
			clearTimeout(autoID);
			autoID = setTimeout(setSlide, SLIDE_DELAY);
		};

		//スライドアウト
		function slideOut(selector){
			selector.stop().animate({'left': -w+'px'}, SLIDE_SPEED, function(){
				$(this).css('left', w+'px');
			});
		};

		//スライドイン
		function slideIn(selector){
			selector.stop().animate({'left': 0}, SLIDE_SPEED, setAuto);
		};

		//スライドを設定する
		function setSlide(){
			if( !isOver ){
				slideOut( $(target.find('li')[nowIndex]) );
				nowIndex = ++nowIndex%len;
				slideIn( $(target.find('li')[nowIndex]) );
			};
		};

		//テキストのオーバフローチェック
		function checkTextOver(){
			$.each( target.find('li'), function(){
				if( $(this).text().length > TEXT_MAX_LENGTH ){
					var str = $(this).text().slice(0, TEXT_MAX_LENGTH-3) + '...';
					$(this).text(str);
				};
			} );
		};

		//初期設定
		function init(){
			target.on({
				'mouseenter': function(){
					isOver = true;
				},
				'mouseleave': function(){
					isOver = false;
					setAuto();
				}
			});
			checkTextOver();
			target.find('li').css('left', w+'px');
			slideIn( $(target.find('li')[nowIndex]) );
		};

		init();

	};

	setTextTicker($('.tickerList'));

});