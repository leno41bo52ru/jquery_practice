$(function(){

	function setMyForm(target){

		var ERROR_MESSAGE_CLASSNAME = 'errorMsg'; //エラー時のメッセージ要素のclass名
		var ERROR_INPUT_CLASSNAME = 'errorInput'; //エラー時のinput要素のclass名

		var items = []; //チェック対象となるテキスト入力要素を格納した配列
		var addressObj; //チェック対象となるselect要素のセレクタを格納した変数
		var genreObj; //チェック対象となるcheckbox要素のセレクタを格納した変数

		//項目チェックする
		function checkAll(){
			var errorCount = 0;
			//input,textareaのチェック
			for( var i=0; i<items.length; i++ ){
				if( items[i].prop('isSuccess') == false ){
					errorCount++;
				};
			};
			//selectのチェック
			if( addressObj.prop('isSuccess') == false ){
				errorCount++;
			};
			//チェックボックスのチェック
			if( genreObj.isSuccess == false ){
				errorCount++;
			};
			//エラーカウントが0であれば、エラー無し
			if( errorCount == 0 ){
				target.find('input[type=submit]').attr('disabled', false);
			}else{
				target.find('input[type=submit]').attr('disabled', true);
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

		//input,textareaの未入力チェック
		function checkEmptyText(selector, msg){
			if( selector.val() == '' ){
				addErrorMessage(selector, msg);
				selector.prop('isSuccess', false);
			}else{
				removeErrorMessage(selector);
				selector.prop('isSuccess', true);
			};
		};

		//inputのフォーマットチェック
		function checkFormatText(selector, mode, msg){
			var value = selector.val();
			switch(mode){
				//全角チェック
				case 0:
					if(value.match(/^[^ -~｡-ﾟ]*$/)){
						selector.prop('isSuccess', true);
					}else{
						selector.prop('isSuccess', false);
					};
					break;
				//ふりがなのみ
				case 1:
					if(value.match(/^[\u3040-\u309F]+$/)){
						selector.prop('isSuccess', true);
					}else{
						selector.prop('isSuccess', false);
					};
					break;
				//半角数字のみ
				case 2:
					if(value.match(/^[0-9]*$/)){
						selector.prop('isSuccess', true);
					}else{
						selector.prop('isSuccess', false);
					};
					break;
				//メールアドレス
				case 3:
					if(value.match(/^[a-zA-Z0-9!$&*.=^`|~#%'+\/?_{}-]+@([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,6}$/)){
						selector.prop('isSuccess', true);
					}else{
						selector.prop('isSuccess', false);
					};
					break;
			};
			if( selector.prop('isSuccess') == false ){
				addErrorMessage(selector, msg);
			}else{
				removeErrorMessage(selector);
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
			//submitを無効にする
			target.find('input[type=submit]').attr('disabled', true);
			//submitイベントの設定
			target.on({
				'submit': function(){
					return false;
				}
			});
			//input要素を配列に格納
			items = [
				target.find('input[name=formName]'),
				target.find('input[name=formFurigana]'),
				target.find('input[name=formTell]'),
				target.find('input[name=formMail]'),
				target.find('textarea[name=formInquiry]')
			];
			//input要素のプロパティを設定
			$.each(items, function(index){
				items[index].prop('isSuccess', false);
			});
			//enterキーでsubmitしてしまうのを防止する
			target.find('input[type=text]').on({
				'keypress': function(e){
					if( (e.keyCode == 13) ) return false;
				}
			});
			//名前
			items[0].on({
				'blur': function(){
					checkEmptyText( $(this), '名前をご入力ください。' );
					if( $(this).prop('isSuccess') ) checkFormatText( $(this), 0, '入力フォーマットが正しくありません。' );
					checkAll();
				}
			});
			//ふりがな
			items[1].on({
				'blur': function(){
					checkEmptyText( $(this), 'ふりがなをご入力ください。' );
					if( $(this).prop('isSuccess') ) checkFormatText( $(this), 1, '入力フォーマットが正しくありません。' );
					checkAll();
				}
			});
			//電話番号
			items[2].on({
				'blur': function(){
					checkEmptyText( $(this), '電話番号をご入力ください。' );
					if( $(this).prop('isSuccess') ) checkFormatText( $(this), 2, '入力フォーマットが正しくありません。' );
					checkAll();
				}
			});
			//メールアドレス
			items[3].on({
				'blur': function(){
					checkEmptyText( $(this), 'メールアドレスをご入力ください。' );
					if( $(this).prop('isSuccess') ) checkFormatText( $(this), 3, '入力フォーマットが正しくありません。' );
					checkAll();
				}
			});
			//お問い合わせ内容
			items[4].on({
				'blur': function(){
					checkEmptyText( $(this), 'お問い合わせ内容をご入力ください。' );
					checkAll();
				}
			});
			//selectの設定
			addressObj = target.find('select[name=address]');
			addressObj.prop('isSuccess', false).on({
				'change': function(){
					checkEmptySelect($(this), '都道府県を選択してください。');
					checkAll();
				}
			});
			//checkboxの設定
			genreObj = { item: target.find('input[name=formGenre]'), isSuccess: false };
			genreObj.item.on({
				change: function(){
					checkEmptyCheckBox( genreObj, 'お問い合わせ区分にチェックを入れてください。', $('#checkGenreList') );
					checkAll();
				}
			});
		};

		init();

	};

	setMyForm($('#myForm'));

});