$(function(){

	var SHUFFLE_STEP = 10; //シャッフルの間隔値
	var SHUFFLE_STR = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわん'; //シャッフル文字列
	var COUNT_STEP = 80; //カウントダウンの間隔値

	function setShuffleAnimate(target){

		var str = target.text(); //対象セレクタのテキスト
		var count = -1; //カウントダウン
		var txt = ''; //表示テキスト

		//シャッフルを開始する
		function start(){
			count = -1;
			var shuffleID = setInterval(
				function(){
					target.text('');
					for( var i=0; i<str.length; i++ ){
						txt = SHUFFLE_STR[ Math.floor(Math.random()*SHUFFLE_STR.length) ];
						if( count >= i ) txt = str.charAt(i);
						target.append(txt);
					};
					if( count >= str.length ){
						clearInterval(shuffleID);
						clearInterval(countID);
					};
				},
			SHUFFLE_STEP);
			var countID = setInterval(function(){count++;}, COUNT_STEP);
		};
		target.on('mouseover', start);
		start();

	};

	$.each( $('.shuffle'), function(){
		setShuffleAnimate($(this));
	} );

});