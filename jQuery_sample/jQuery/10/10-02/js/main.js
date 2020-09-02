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
		var imgLinks = []; //モーダルウィンドウの中に表示される画像参照先を格納した配列
		var imgNum = 0; //モーダルウィンドウの中に表示される画像のインデックス
		var nowIndex = 0; //モーダルウィンドウ内で現在表示されている画像のインデックス

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
				resizeModal();
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
				imgLinks = imgLinks.concat(srcList);
				//ul要素を生成
				$('<ul>', {
					'id': 'photoList'+photoIndex,
					'html': items.join('')
				}).appendTo(photos);
				//画像のイベント設定
				$('#photoList'+photoIndex).find('li img').each(function(){
					$(this).prop('index', imgNum).on('click', function(){
						openModal( imgLinks[$(this).prop('index')], $(this).prop('index') );
					});
					imgNum++;
				});
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

		//モーダル画面内の画像を切り替える
		function changeModalPhoto(num){
			var index = nowIndex + num;
			openModal( imgLinks[index], index);
		};

		//モーダル画面のリサイズ
		function resizeModal(imgW, imgH){
			var ww = $(window).width();
			var wh = $(window).height();
			var dh = $(document).height();
			if( $.isNumeric(imgW) && $.isNumeric(imgH) ){
				$('#modalBox').width( imgW ).height( imgH );
				$('#modalPictureBox').css({
					'margin-top': Math.floor(-imgH/2)+'px',
					'margin-left': Math.floor(-imgW/2)+'px'
				});
			};
			var boxTop = Math.floor((wh-$('#modalBox').innerHeight())/2)+$(window).scrollTop();
			var boxLeft = Math.floor((ww-$('#modalBox').innerWidth())/2);
			$('#modalBox').offset({ top: boxTop, left: boxLeft });
			$('#modalContent').width(ww).height(dh);
			$('#modalOverlay').width(ww).height(dh);
		};

		//モーダル画面内のコントロールボタンを設定する
		function checkModalControl(){
			$('#modalPrevBtn').on('click', function(){changeModalPhoto(-1);});
			$('#modalNextBtn').on('click', function(){changeModalPhoto(1)});
			switch(nowIndex){
				case 0:
					$('#modalPrevBtn').hide().off('click');
					$('#modalNextBtn').fadeIn();
					break;
				case imgLinks.length-1:
					$('#modalPrevBtn').fadeIn();
					$('#modalNextBtn').hide().off('click');
					break;
				default:
					$('#modalPrevBtn').fadeIn();
					$('#modalNextBtn').fadeIn();
					break;
			};
		};

		//モーダル画面内の画像を読み込み完了
		function loadedModal(src, w, h){
			if( h + 144 > $(window).height() ){
				var imgH = $(window).height() - 288;
				w = w * imgH / h;
				h = imgH;
			};
			$('#modalPicture').attr('src', src).width(w).height(h).hide();
			$('#modalLoading').fadeOut( function(){
				$('#modalPicture').fadeIn();
				checkModalControl();
			} );
			resizeModal(w, h);
		};

		//モーダル画面内の画像を読み込む
		function loadModal(src){
			var img = new Image();
			$(img).on('load', function(){ loadedModal(src, img.width, img.height); }).attr('src', src);
		};

		//モーダル画面を表示する
		function openModal(src, index){
			var boxW = ( $('#modalBox').width() > 0 ) ? $('#modalBox').width() : 80 ;
			var boxH = ( $('#modalBox').height() > 0 ) ? $('#modalBox').height() : 80 ;
			nowIndex = index;
			closeModalControl();
			$('#modalPicture').hide();
			$('#modalCloseBtn').fadeIn();
			$('#modalLoading').fadeIn();
			$('#modalContent').fadeIn();
			resizeModal(boxW, boxH);
			loadModal(src);
		};

		//モーダル画面を非表示にする
		function closeModal(){
			$('#modalContent').fadeOut(function(){ $('#modalContent').hide(); });
		};

		//モーダル画面内のコントロールを非表示にする
		function closeModalControl(){
			$('#modalPrevBtn').hide().off('click');
			$('#modalNextBtn').hide().off('click');
		};

		//モーダル画面を生成する
		function createModal(){
			$('<div>', {
				'id': 'modalContent',
				'html': '<div id="modalOverlay"></div><div id="modalBox"><p id="modalPictureBox"><img id="modalPicture"></p><p id="modalCloseBtn"></p><p id="modalPrevBtn"></p><p id="modalNextBtn"></p><p id="modalLoading"></p></div>'
			}).appendTo('body');
			$('#modalOverlay').css({
				'background': '#000',
				'opacity': 0.8
			});
			$('#modalContent').hide();
		};

		//モーダル画面内のイベントを設定する
		function setModalEvent(){
			target.find('a').each(function(index){
				$(this).on('click', function(){
					openModal( $(this).attr('href'), index );
					return false;
				});
			});
			$('#modalCloseBtn').on('click', closeModal);
			$('#modalOverlay').on('click', closeModal);
			$(window).on('resize', resizeModal);
		};

		//初期設定
		function init(){
			loadAlbums();
			createModal();
			setModalEvent();
		};

		init();

	};

	setFacebookPhotos($('#fbPhotos'));

});