$(function(){

	function photoChange(target){

		var photoList = target.find('#photolist li'); //メイン画像のセレクタを格納した配列
		var tnList = []; //サムネイル画像のセレクタを格納した配列
		var current = 0; //現在表示されているインデックス
		var prevBtn = $('#prev a'); //prevボタンのセレクタを格納した変数
		var nextBtn = $('#next a'); //nextボタンのセレクタを格納した変数
		var timeId; //setTimeout関数のID
		var isOver = false; //画像にマウスオーバーしているかどうかの真偽値

		//画像のフェードイン
		function open(){
			stopAuto();
			checkControl();
			$('#control a').off('click');
			tnList[current].attr('src', 'images/tn'+current+'_ac.jpg');
			$(photoList[current]).stop().fadeIn(1200, 'easeInQuad', complete);
		};

		//画像のフェードアウト
		function close(){
			tnList[current].attr('src', 'images/tn'+current+'.jpg');
			$(photoList[current]).stop().fadeOut(1200, 'easeOutQuad');
		};

		//画像のフェードイン完了コールバック関数
		function complete(){
			checkControl();
			if(!isOver) startAuto();
		};

		//オート機能の設定
		function startAuto(){
			timeId = setTimeout(change, 5000);
		};

		//オート機能のクリア
		function stopAuto(){
			clearTimeout(timeId);
		};

		//画像の切り替え
		function change(){
			close();
			current = ++current % photoList.length;
			open();
		};

		//サムネイル画像による画像切り替え
		function clickTn(num){
			if(current != num){
				close();
				current = num;
				open();
			};
		};

		//コントロールボタンによる画像切り替え
		function clickControl(type){
			close();
			switch(type){
				case 'prev':
					current--;
					break;
				case 'next':
					current++;
					break;
			};
			open();
		};

		//コントロールボタンの設定
		function checkControl(){
			switch(current){
				case 0:
					hideControl(prevBtn);
					showControl(nextBtn);
					break;
				case photoList.length-1:
					showControl(prevBtn);
					hideControl(nextBtn);
					break;
				default:
					showControl(prevBtn);
					showControl(nextBtn);
					break;
			};
		};

		//コントロールボタンを非表示にする
		function hideControl(btn){
			btn.stop().fadeOut(600,'easeOutQuad');
			btn.off('click');
		};

		//コントロールボタンを表示する
		function showControl(btn){
			btn.stop().fadeIn(600,'easeInQuad');
			btn.off('click').off('mouseenter').off('mouseleave').on({
				'click': function(){
					clickControl($(this).parent().attr('id'));
				},
				'mouseenter': function(){
					isOver = true;
					stopAuto();
				},
				'mouseleave': function(){
					isOver = false;
					startAuto();
				}
			});
		};

		//初期設定
		function init(){
			target.find('#tnlist li').each(function(index){
				tnList[index] = $($(this).find('img'));
				$($(this).find('a')).on({
					'click': function(){
						clickTn(index);
					},
					'mouseenter': function(){
						isOver = true;
						stopAuto();
					},
					'mouseleave': function(){
						isOver = false;
						startAuto();
					}
				});
			});
		};

		init();
		checkControl();
		open();

	};

	photoChange($('#photoBox'));

});