$(function(){

	var func = function(){};
	alert( typeof(func) );

	var _html = '';
	for( var key in $('#selector') ){
		_html += '<dl>';
		_html += '<dt>'+key+'</dt>';
		_html += '<dd>'+$('#selector')[key]+'</dd>';
		_html += '</dl>';
	};
	$('#debug').html(_html);

});