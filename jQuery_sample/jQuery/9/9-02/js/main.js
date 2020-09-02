$(function(){

	function slider(target){

		var box = $('#slideBox'); //スライドする画像を括っているセレクタを格納した変数
		var control = $('#control'); //nextボタン、prevボタンを括っているセレクタを格納した変数
		var prevBtn = $('#prev'); //prevボタンのセレクタを格納した変数
		var nextBtn = $('#next'); //nextボタンのセレクタを格納した変数
		var w = 0; //スライドショーの横幅
		var h = 0; //スライドショーの高さ
		var imgW; //スライドする画像の横幅
		var imgH; //スライドする画像の高さ
		var items = []; //スライド画像のセレクタを格納した配列
		var srcList = []; //画像の参照先を格納する配列
		var loadIndex = 0; //読み込み画像インデックス
		var startTouchX = 0; //指が画面に触れたタイミングで取得したx座標を格納する変数
		var endTouchX = 0; //指が画面から離れたタイミングで取得したx座標を格納する変数

		//スライド要素の複製
		function clone(selector){
				var cloneSelector = selector.clone(true);
				$(cloneSelector).attr({
					'href': selector.attr('href'),
					'target': selector.attr('target')
				});
				return cloneSelector;
		};

		//スライド
		function slide(way){
			removeEvent();
			var i;
			var cloneSelector;
			//next
			if( way < 0 ){
				cloneSelector = clone(items[0]);
				$(cloneSelector).css('left', (w*items.length+1)+'px');
				box.find('ul').append( cloneSelector );
				items.push( $(cloneSelector) );
				for( i=0; i<items.length; i++ ){
					items[i].animate( {'left': (w*i)-w}, 600);
				};
			//prev
			}else{
				cloneSelector = clone(items[items.length-1]);
				$(cloneSelector).css('left', (w*-1)+'px');
				box.find('ul').append( cloneSelector );
				items.unshift( $(cloneSelector) );
				for( i=0; i<items.length; i++ ){
					items[i].animate( {'left': w*i}, 600);
				};
			};
			var id = setTimeout( function(){
				slideComplete(way);
			}, 800 );
		};

		//フリックスライド
		function touchSlide(){
			if( startTouchX - endTouchX > 0){
				slide(-1);
			}else{
				slide(1);
			};
		};

		//スライド完了
		function slideComplete(way){
			//next
			if( way < 0 ){
				items[0].remove();
				items.shift();
			}
			//prev
			else{
				items[items.length-1].remove();
				items.pop();
			};
			addEvent();
		};

		//イベント設定
		function addEvent(){
			prevBtn.on({
				'click': function(){
					slide(1);
				}
			});
			nextBtn.on({
				'click': function(){
					slide(-1);
				}
			});
			target.on({
				'touchstart': function(){
					startTouchX = event.changedTouches[0].pageX;
				},
				'touchend': function(){
					endTouchX = event.changedTouches[0].pageX;
					touchSlide();
				}
			});
		};

		//イベント削除
		function removeEvent(){
			prevBtn.off('click');
			nextBtn.off('click');
			target.off('touchstart');
			target.off('touchend');
		};

		//位置調整
		function pos(){
			$.each(items, function(index){
				$(this).css('left', (w*index)+'px');
			});
		};

		//リサイズ
		function resize(){
			w = target.parent().width();
			h = Math.floor(w*imgH/imgW);
			target.width(w).height(h);
			box.width(w).height(h);
			box.find('ul').width(w).height(h);
			pos();
		};

		//セットアップ
		function setup(){
			imgW = box.find('img').width();
			imgH = box.find('img').height();
			control.fadeIn(1200);
			box.find('li').each(function(index){
				items[index] = $(this);
			});
			$(window).on('resize', resize);
			resize();
			addEvent();
		};

		//画像の読み込み完了
		function loaded(){
			if( loadIndex != (srcList.length-1) ){
				loadIndex++;
				imgLoad();
			}else{
				setup();
			};
		};

		//画像の読み込み
		function imgLoad(){
			var img = new Image();
			$(img).on('load', loaded).attr('src', srcList[loadIndex]);
		};

		//初期設定
		function init(){
			$.each(box.find('img'), function(index){
				srcList[index] = $(this).attr('src');
			});
			imgLoad();
		};

		init();

	};

	slider($("#slideContent"));

});