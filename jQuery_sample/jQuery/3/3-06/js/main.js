$(function(){

	function photoChange(target){

		var photoList = target.find('#photolist li'); //メイン画像のセレクタを格納した配列
		var current = 0; //現在表示されているインデックス
		var prevBtn = $('#prev a'); //prevボタンのセレクタを格納した変数
		var nextBtn = $('#next a'); //nextボタンのセレクタを格納した変数

		//画像のフェードイン
		function open(){
			prevBtn.off('click');
			nextBtn.off('click');
			$(photoList[current]).stop().fadeIn(1200, 'easeInQuad', checkControl);
		};

		//画像のフェードアウト
		function close(){
			$(photoList[current]).stop().fadeOut(1200, 'easeOutQuad');
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
			btn.hide();
			btn.off('click');
		};

		//コントロールボタンを表示する
		function showControl(btn){
			btn.show();
			btn.off('click').on('click',function(){ clickControl($(this).parent().attr('id')); });
		};

		checkControl();
		open();

	};

	photoChange($('#photoBox'));

});