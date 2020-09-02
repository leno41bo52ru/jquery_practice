$(function(){

	var pic = $('#pic'); //画像のセレクタ
	var intervalId;

	//画像セレクタにプロパティを設定
	pic.prop({
		w: $('#pic-box').width(), //1コマ分の横幅
		h: $('#pic-box').height(), //1コマ分の高さ
		col: 11, //コマ画像の最大横コマ数
		max: 31, //全コマ数
		num: 0 //現在のコマ数のインデックス
	});

	//画像の位置を変更
	function change(target){
		target.prop('num', target.prop('num')+1);
		if( target.prop('num') >= target.prop('max') ){
			clearInterval(intervalId);
		}else{
			target.css({
				'top': Math.floor(target.prop('num')/target.prop('col'))*target.prop('h')*-1+'px',
				'left': (target.prop('num')%target.prop('col'))*target.prop('w')*-1+'px'
			});
		};
	};

	//画像の読み込み完了
	function loaded(){
		//0.1秒毎にchange関数を実行
		intervalId = setInterval( function(){ change(pic); }, 100 );
	};

	//初期設定
	function init(){
		var img = new Image();
		$(img).on('load', loaded).attr('src', $('#pic').attr('src'));
	};

	init();

});