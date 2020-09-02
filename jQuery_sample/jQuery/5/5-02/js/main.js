$(function() {

    function setMyForm(target) {

        var ERROR_MESSAGE_CLASSNAME = 'errorMsg'; //エラー時のメッセージ要素のclass名
        var ERROR_INPUT_CLASSNAME = 'errorInput'; //エラー時のinput要素のclass名

        var items = []; //チェック対象となるテキスト入力要素を格納した配列

        //項目チェックする
        function checkAll() {
            var errorCount = 0;
            //名前
            checkEmptyText(items[0], '名前をご入力ください。');
            if (items[0].prop('isSuccess')) checkFormatText(items[0], 0, '入力フォーマットが正しくありません。');
            //ふりがな
            checkEmptyText(items[1], 'ふりがなをご入力ください。');
            if (items[1].prop('isSuccess')) checkFormatText(items[1], 1, '入力フォーマットが正しくありません。');
            //電話番号
            checkEmptyText(items[2], '電話番号をご入力ください。');
            if (items[2].prop('isSuccess')) checkFormatText(items[2], 2, '入力フォーマットが正しくありません。');
            //メールアドレス
            checkEmptyText(items[3], 'メールアドレスをご入力ください。');
            if (items[3].prop('isSuccess')) checkFormatText(items[3], 3, '入力フォーマットが正しくありません。');
            //お問い合わせ内容
            checkEmptyText(items[4], 'お問い合わせ内容をご入力ください。');
            //input,textareaのチェック
            for (var i = 0; i < items.length; i++) {
                if (items[i].prop('isSuccess') == false) {
                    errorCount++;
                };
            };
            //エラーカウントが0であれば、エラー無し
            if (errorCount == 0) {
                alert('送信内容にエラーはありません。');
            };
        };

        //エラーメッセージの追加
        function addErrorMessage(selector, msg) {
            removeErrorMessage(selector);
            selector.before('<span class="' + ERROR_MESSAGE_CLASSNAME + '">' + msg + '</span>');
            selector.addClass(ERROR_INPUT_CLASSNAME);
        };

        //エラーメッセージの削除
        function removeErrorMessage(selector) {
            var msgSelector = selector.parent().find('.' + ERROR_MESSAGE_CLASSNAME);
            if (msgSelector.length != 0) {
                msgSelector.remove();
                selector.removeClass(ERROR_INPUT_CLASSNAME);
            };
        };

        //input,textareaの未入力チェック
        function checkEmptyText(selector, msg) {
            if (selector.val() == '') {
                addErrorMessage(selector, msg);
                selector.prop('isSuccess', false);
            } else {
                removeErrorMessage(selector);
                selector.prop('isSuccess', true);
            };
        };

        //文字列のフォーマットチェック
        function checkFormatText(selector, _mode, msg) {
            var value = selector.val();
            console.log(selector, _mode, msg)
            switch (_mode) {
                //全角のみ
                case 0:
                    if (value.match(/^[^ -~｡-ﾟ]*$/)) {
                        selector.prop('isSuccess', true);
                    } else {
                        selector.prop('isSuccess', false);
                    };
                    break;
                    //ふりがなのみ
                case 1:
                    if (value.match(/^[\u3040-\u309F]+$/)) {
                        selector.prop('isSuccess', true);
                    } else {
                        selector.prop('isSuccess', false);
                    };
                    break;
                    //半角数字のみ
                case 2:
                    if (value.match(/^[0-9]*$/)) {
                        selector.prop('isSuccess', true);
                    } else {
                        selector.prop('isSuccess', false);
                    };
                    break;
                    //メールアドレスかどうか
                case 3:
                    if (value.match(/^[a-zA-Z0-9!$&*.=^`|~#%'+\/?_{}-]+@([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,6}$/)) {
                        selector.prop('isSuccess', true);
                    } else {
                        selector.prop('isSuccess', false);
                    };
                    break;
            };
            if (selector.prop('isSuccess') == false) {
                addErrorMessage(selector, msg);
            } else {
                removeErrorMessage(selector);
            };
        };

        //初期設定
        function init() {
            //submitイベントの設定
            target.on({
                'submit': function() {
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
            $.each(items, function(index) {
                items[index].prop('isSuccess', false);
            });
            //enterキーでsubmitしてしまうのを防止する
            target.find('input[type=text]').on({
                'keypress': function(e) {
                    if ((e.keyCode == 13)) return false;
                }
            });
        };

        init();

    };

    setMyForm($('#myForm'));

});