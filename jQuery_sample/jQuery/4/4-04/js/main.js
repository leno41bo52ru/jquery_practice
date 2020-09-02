$(function(){

	function setRollover(className, imgName){

		$.each($('.'+className), function(){

			var src = $(this).attr('src'); //元画像の参照先
			var ext = src.substring(src.lastIndexOf('.')); //拡張子
			var ovsrc = src.replace(ext, imgName+ext); //オーバー画像の参照先

			//イベント設定
			$(this).on({
				'mouseover': function(e){
					$(e.target).attr('src', ovsrc);
				},
				'mouseout': function(e){
					$(e.target).attr('src', src);
				}
			});

		});

	};

	setRollover('rollover','_ov');

});