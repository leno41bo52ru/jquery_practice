$(function() {

    function setFade(className) {

        $.each($('.' + className), function() {
            //イベント設定
            $(this).on({
                'mouseover': function(e) {
                    $(e.target).stop().fadeTo(600, 0.4);
                },
                'mouseout': function(e) {
                    $(e.target).stop().fadeTo(300, 1);
                }
            });
        });

    };

    setFade('fade');

});