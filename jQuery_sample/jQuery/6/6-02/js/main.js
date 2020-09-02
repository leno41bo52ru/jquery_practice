$(function(){

	var kerningList = {}; //カーニング対象となる文字列の組み合わせ
	kerningList['」「'] = -1;
	kerningList['*「'] = -0.5;
	kerningList['」*'] = -0.5;
	kerningList['*（'] = -0.5;
	kerningList['）*'] = -0.5;
	kerningList['、*'] = -0.5;
	kerningList['。*'] = -0.5;
	kerningList['。（'] = -1;

	function setKerning(target){

		var html = target.html(); //対象セレクタのhtml要素
		var newHtml = ''; //カーニング調整後のhtml要素
		var value; //該当するカーニング数値
		var str; //対象文字列
		var nextstr; //対象文字列の次の文字列

		for( var i=0; i<html.length; i++ ){
			value = '';
			str = html.charAt(i);
			nextstr = html.charAt(i+1);
			if( kerningList[str+nextstr] ){
				value = kerningList[str+nextstr];
			}else{
				if( kerningList[str+'*'] ){
					value = kerningList[str+'*'];
				};
				if( kerningList['*'+nextstr] ){
					value = kerningList['*'+nextstr];
				};
			};
			if( value == '' ){
				newHtml += str;
			}else{
				newHtml += '<span style="letter-spacing:'+value+'em">'+str+'</span>';
			};
		};

		target.html(newHtml);

	};

	$.each( $('.kerning'), function(){
		setKerning($(this));
	} );

});