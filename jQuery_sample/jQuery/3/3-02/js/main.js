$(function() {

    var photo = $('#photo'); //画像のセレクタ

    //画像が右スライドする
    function slideToRight() {
        photo.animate({ 'left': 356 }, 1800, 'easeInOutQuad', function() { setTimeout(slideToLeft, 3000); });
    };

    //画像が左スライドする
    function slideToLeft() {
        photo.animate({ 'left': 0 }, 1200, 'easeOutQuad', function() { setTimeout(slideToRight, 3000); });
    };

    slideToRight();

});