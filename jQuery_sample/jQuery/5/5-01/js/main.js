$(function(){

	function setMyForm(target){

		var ERROR_MESSAGE_CLASSNAME = 'errorMsg'; //エラー時のメッセージ要素のclass名
		var ERROR_INPUT_CLASSNAME = 'errorInput'; //エラー時のinput要素のclass名

		var items = []; //チェック対象となるテキスト入力要素を格納した配列

		//項目チェックする
		var checkAll = function(){
			var errorCount = 0;
			//項目：名前のチェック
			checkEmptyText( items[0], '名前をご入力ください。' );
			//項目：ふりがなのチェック
			checkEmptyText( items[1], 'ふりがなをご入力ください。' );
			//項目：電話番号のチェック
			checkEmptyText( items[2], '電話番号をご入力ください。' );
			//項目：メールアドレスのチェック
			checkEmptyText( items[3], 'メールアドレスをご入力ください。' );
			//項目：お問い合わせ内容のチェック
			checkEmptyText( items[4], 'お問い合わせ内容をご入力ください。' );
			//input,textareaのチェック
			for( var i=0; i<items.length; i++ ){
				if( items[i].prop('isSuccess') == false ){
					errorCount++;
				};
			};
			//エラーカウントが0であれば、エラー無し
			if( errorCount == 0 ){
				alert( '送信内容にエラーはありません。' );
			};
		};

		//エラーメッセージの追加
		var addErrorMessage = function(selector, msg){
			removeErrorMessage(selector);
			selector.before('<span class="'+ERROR_MESSAGE_CLASSNAME+'">'+msg+'</span>');
			selector.addClass(ERROR_INPUT_CLASSNAME);
		};

		//エラーメッセージの削除
		var removeErrorMessage = function(selector){
			var msgSelector = selector.parent().find('.'+ERROR_MESSAGE_CLASSNAME);
			if( msgSelector.length != 0 ){
				msgSelector.remove();
				selector.removeClass(ERROR_INPUT_CLASSNAME);
			};
		};

		//input,textareaの未入力チェック
		var checkEmptyText = function(selector, msg){
			if( selector.val() == '' ){
				addErrorMessage(selector, msg);
				selector.prop('isSuccess', false);
			}else{
				removeErrorMessage(selector);
				selector.prop('isSuccess', true);
			};
		};

		//初期設定
		var init = function(){
			//submitイベントの設定
			target.on({
				'submit': function(){
					checkAll();
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
		};

		init();

	};

	setMyForm($('#myForm'));

});