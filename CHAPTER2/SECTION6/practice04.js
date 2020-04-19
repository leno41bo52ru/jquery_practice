$(function() {
    // $('#btn').click(function() {
    //     $('#input').val('ボタンをクリックしました');
    // });
    $('#btn').click({ msg: 'ボタンをクリックしましたよーー' },
        function(e) {
            $('#input').val(e.data.msg);
        }
    );
});