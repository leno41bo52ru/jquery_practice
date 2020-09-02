$(function(){

	function setFacebookPhotos(target){

		var FACEBOOK_DOMAIN = 'http://graph.facebook.com/'; //利用するFacebookのAPIのドメイン
		var FACEBOOK_PAGE_NAME = 'TimelineSamplePhoto'; //FacebookのページID
		var FACEBOOK_ALBUMS_URL = FACEBOOK_DOMAIN + FACEBOOK_PAGE_NAME + '/albums/'; //アルバム情報を取得するまでのAPIのURLパス
		var CALLBACK_PARAM = 'callback=?'; //APIのURLに付けるパラメータ

		var photos = target.find('#photos'); //画像を表示させる親要素のセレクタを格納した変数
		var nextBtn = target.find('#nextBtn'); //nextボタンのセレクタを格納した変数
		var srcList = []; //画像の参照先を格納する配列
		var loadIndex = 0; //読み込み画像のインデックス

		var albumsList = []; //アルバムIDを格納する配列
		var albumsIndex = 0; //アルバムIDを格納する配列のインデックス
		var nextURL; //次の写真情報を取得するAPIのURLを格納した変数
		var photoIndex = 0; //html要素に追加されるul要素のid名のインデックス

		//次のjsonデータを読み込み
		function nextLoad(){
			nextBtn.off('click').fadeOut();
			loadPhoths(nextURL+'&'+CALLBACK_PARAM);
		};

		//全ての画像が読み込み完了
		function complete(){
			if( nextURL != undefined ){
				srcList = [];
				loadIndex = 0;
				photoIndex++;
				nextBtn.on('click', function(){
					nextLoad();
				}).fadeIn();
			};
		};

		//画像の読み込み完了
		function loaded(){
			var loading = $($('#photoList'+photoIndex).find('.loading')[loadIndex]);
			var img = $($('#photoList'+photoIndex).find('.photo')[loadIndex]);
			loading.fadeOut(100);
			img.css({
				'display': 'block',
				'opacity': 0
			}).animate({'opacity': 1}, 200, function(){
				loadIndex++;
				if( loadIndex >= srcList.length ){
					complete();
				}else{
					imgLoad();
				};
			});
		};

		//画像を読み込む
		function imgLoad(){
			var img = new Image();
			$(img).on('load', loaded).attr('src', srcList[loadIndex]);
		};

		//photosのjsonを読み込む
		function loadPhoths(photosURL){
			//jsonデータを取得
			$.getJSON(photosURL, function(json){
				//li要素を生成
				var items = [];
				$.each(json.data, function(index){
					srcList[index] = json.data[index]['images'][0].source;
					items.push( '<li><img src="' + json.data[index]['images'][0].source + '" class="photo"></li>' );
				});
				//ul要素を生成
				$('<ul>', {
					'id': 'photoList'+photoIndex,
					'html': items.join('')
				}).appendTo(photos);
				//ローディング要素を生成
				$('<p>', {
					'class': 'loading',
					'html': '<img src="images/loading.gif">'
				}).appendTo( $('#photoList'+photoIndex).find('li') );
				//nextページのURLを取得
				nextURL = json.paging.next;
				//画像を読み込む
				imgLoad();
			});
		};

		//albumのjsonを読み込む
		function loadAlbums(){
			//jsonデータを取得
			$.getJSON(FACEBOOK_ALBUMS_URL+'?'+CALLBACK_PARAM, function(json){
				$.each(json.data, function(index){
					albumsList[index] = {
						'id': json.data[index].id
					};
				});
				var photosURL = FACEBOOK_DOMAIN + albumsList[albumsIndex].id + '/photos/?' + CALLBACK_PARAM;
				loadPhoths(photosURL);
			});
		};

		loadAlbums();

	};

	setFacebookPhotos($('#fbPhotos'));

});