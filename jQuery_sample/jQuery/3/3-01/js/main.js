$(function(){

	var photo = $('#photo'); //画像のセレクタ

	//画像がフェードインする
	function open(){
		photo.fadeIn(3000, 'easeInQuad', function(){ setTimeout(close, 3000); });
	};

	//画像がフェードアウトする
	function close(){
		photo.fadeOut(1500, 'easeOutQuad', function(){ setTimeout(open, 1500); });
	};

	open();

});