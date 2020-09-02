$(function() {

    function photoChange(target) {

        var items = target.find('li'); //li要素のセレクタを格納した配列
        var current = 0; //現在表示されているインデックス

        //画像のフェードイン

        function open() {
            console.log('open始まるよ')
            $(items[current]).fadeIn(1200, 'easeInQuad', function() { setTimeout(change, 1500); });
        };

        //画像のフェードアウト
        function close() {
            console.log('close始まるよ')
            $(items[current]).fadeOut(1200, 'easeOutQuad');
        };

        //画像の切り替え
        function change() {
            console.log('change始まるよ')
            close();
            console.log('current前' + current)
            current = ++current % items.length;
            open();
        };

        open();

    };

    photoChange($('#photolist'));

});