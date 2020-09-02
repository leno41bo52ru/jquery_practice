$(function(){

	function setMyForm(target){

		var ERROR_MESSAGE_CLASSNAME = 'errorMsg'; //エラー時のメッセージ要素のclass名
		var ERROR_INPUT_CLASSNAME = 'errorInput'; //エラー時のinput要素のclass名

		var addressObj; //チェック対象となるselect要素のセレクタを格納した変数
		var genreObj; //チェック対象となるcheckbox要素のセレクタを格納した変数

		//項目チェックする
		function checkAll(){
			var errorCount = 0;
			//selectのチェック
			addressObj.change();
			if( addressObj.prop('isSuccess') == false ){
				errorCount++;
			};
			//チェックボックスのチェック
			genreObj.item.change();
			if( genreObj.isSuccess == false ){
				errorCount++;
			};
			//エラーカウントが0であれば、エラー無し
			if( errorCount == 0 ){
				alert( '送信内容にエラーはありません。' );
			};
		};

		//エラーメッセージの追加
		function addErrorMessage(selector, msg){
			removeErrorMessage(selector);
			selector.before('<span class="'+ERROR_MESSAGE_CLASSNAME+'">'+msg+'</span>');
			selector.addClass(ERROR_INPUT_CLASSNAME);
		};

		//エラーメッセージの削除
		function removeErrorMessage(selector){
			var msgSelector = selector.parent().find('.'+ERROR_MESSAGE_CLASSNAME);
			if( msgSelector.length != 0 ){
				msgSelector.remove();
				selector.removeClass(ERROR_INPUT_CLASSNAME);
			};
		};

		//selectのチェック
		function checkEmptySelect(selector, msg){
			if( selector.val() == '' ){
				addErrorMessage(selector, msg);
				selector.prop('isSuccess', false);
			}else{
				removeErrorMessage(selector);
				selector.prop('isSuccess', true);
			};
		};

		//checkboxのチェック
		function checkEmptyCheckBox(selector, msg, ul){
			var item = selector.item;
			var checkLen = 0;
			item.each(function(index){
				if( $(this).prop('checked') ) checkLen++;
			});
			if( checkLen == 0 ){
				addErrorMessage(ul, msg);
				selector.isSuccess = false;
			}else{
				removeErrorMessage(ul);
				selector.isSuccess = true;
			};
		};

		//初期設定
		function init(){
			//submitイベントの設定
			target.on({
				'submit': function(){
					checkAll();
					return false;
				}
			});
			//selectの設定
			addressObj = target.find('select[name=address]');
			addressObj.prop('isSuccess', false).on({
				'change': function(){
					checkEmptySelect($(this), '都道府県を選択してください。');
				}
			});
			//checkboxの設定
			genreObj = { item: target.find('input[name=formGenre]'), isSuccess: false };
			genreObj.item.on({
				change: function(){
					checkEmptyCheckBox( genreObj, 'お問い合わせ区分にチェックを入れてください。', $('#checkGenreList') );
				}
			});
		};

		init();

	};

	setMyForm($('#myForm'));

});