$(function() {

    function photoChange(target) {

        var photoList = target.find('#photolist li'); //メイン画像のセレクタを格納した配列
        var tnList = []; //サムネイル画像のセレクタを格納した配列
        var current = 0; //現在表示されているインデックス

        //画像のフェードイン
        function open() {
            tnList[current].attr('src', 'images/tn' + current + '_ac.jpg');
            $(photoList[current]).stop().fadeIn(1200, 'easeInQuad');
        };

        //画像のフェードアウト
        function close() {
            tnList[current].attr('src', 'images/tn' + current + '.jpg');
            $(photoList[current]).stop().fadeOut(1200, 'easeOutQuad');
        };

        //サムネイル画像による画像切り替え
        function clickTn(num) {
            console.log(num)
            if (current != num) {
                close();
                current = num;
                open();
            };
        };

        //初期設定
        function init() {
            target.find('#tnlist li').each(function(index) {
                tnList[index] = $($(this).find('img'));
                $($(this).find('a')).on('click', function() {
                    clickTn(index);
                });
            });
        };

        init();
        open();

    };

    photoChange($('#photoBox'));

});