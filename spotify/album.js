/**
 * token
 * - 서버 접속에 필요한 열쇠(입장권)
 * - 입장권을 보관 해야해서 html에 만들어서 저장해놔야함
 */

/** API 컨트롤 */
const APIController = (function() {
    
    // spotify devloper ID & PW
    const clientId = '6f79d0fcd09845b88bd163f5e077696d';
    const clientSecret = '0085a66f5e81487fbe9810b1c23c10c2';

    // private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();

        return data.access_token;
    }

    // (추가) get album tracks
    const _getAlbumTrack = async (token, id) => {
        const result = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token 
            }
        });
        const data = await result.json();
        return data;
    }

    // (추추가)
    const _getAlbumId = async (token, albumId) => {
        const result = await fetch(`https://api.spotify.com/v1/tracks/${albumId}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token 
            }
        });
        const data = await result.json();
        return data;
    }

    // 클래스여서 return 따로 (위에는 하나의 정의)
    return {
        getToken() {
            return _getToken();
        },

        getAlbumTrack(token, id) {
            return _getAlbumTrack(token, id);
        },

        getAlbumId(token, albumId) {
            return _getAlbumId(token, albumId);
        }
    }
})();


/** UI Module */
const UIController = (function() {

    //object to hold references to html selectors
    const DOMElements = {
        hfToken: '#hidden_token',    // 토큰 저장
        artistResult: '#artistRes', // 아티스트
        trackResult: '#trackRes',    // 곡
        albumResult: '#albumRes',    // 앨범

        albumTitle: '#coverthumb', // 앨범 커버
    }

    //public methods
    return {

        storeToken(value) {
            document.querySelector(DOMElements.hfToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMElements.hfToken).value
            }
        },

        // 앨범 (커버 이미지)
        createAlbumTitle(img, album) {
            const albumTitleDiv = document.querySelector(DOMElements.albumTitle);
            const html =
            `
            <div class="pull-left coverbox">
              <a href="#">
                <img class="coverbox-img media-object" src="${img}" alt="...">
              </a>
            </div>
            <div class="media-body clearfix">
              <h4 class="media-heading pull-left">${album}</h4>
            </div>
            `;
            albumTitleDiv.insertAdjacentHTML('beforeend', html);
        },

        // 곡 (반복문 돌리는 코드)
        createTracks(tracks) {
            // this.clearTracks();
            tracks.forEach ((v, i) => { // v는 배열의 값이고 i는 인덱스 번호
                if (i < tracks.length) this.createTrack(i + 1, v.name, v.artists[0].name);
            });
        },

        // 곡 (항목 추가 코드)
        createTrack(num, title, artist) {
            const trackDiv = document.querySelector(DOMElements.trackResult);
            const html =
            ` 
            <tr class="trhover">
                <td id="td">${num}</td>
                <td id="td">
                    <div class="tdbox clearfix">
                        <div class="td-text">
                            <p>${title}</p>
                            <p class="tableartist">${artist}</p>
                        </div>
                    </div>
                </td>
                <td id="td" class="clearfix">
                <!-- 플레이리스트에 추가 -->
                <!-- Button trigger modal -->
                <button
                    type="button"
                    class="btn btn-sm pull-right add-btn"
                    data-toggle="modal"
                    data-target="#myModal"
                >
                    추가
                </button>

                <!-- Modal -->
                <div
                    class="modal fade"
                    id="myModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="myModalLabel"
                >
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true" id="close">&times;</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            플레이리스트에 추가
                        </h4>
                        </div>
                        <div class="modal-body">
                        <button type="button" id="playbtn" class="btn">
                            플레이리스트1
                        </button>
                        <button type="button" id="playbtn" class="btn">
                            플레이리스트2
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </td>
            </tr>
            `;
            trackDiv.insertAdjacentHTML('beforeend', html);
            trackDiv.style.visibility = 'visible';
        }
    }
})();


/** UI & API 컨트롤 */
const APPController = (function(UICtrl, APICtrl) {

    (async () => { 
        //get the token
        const token = await APICtrl.getToken();           
        //store the token onto the page
        UICtrl.storeToken(token);

        // 현재 url
        const url = window.location.href;
        console.log(url);

        const start = url.indexOf('m:');
        const end = url.indexOf('/tracks');
        const str = url.substring(start+2, end);

        // 아이디 파싱
        const id = decodeURIComponent(str);
        console.log(id);

        // 토큰 받아오는거
        const res = await APICtrl.getAlbumTrack(token, id);

        console.log(res);
        console.log("토큰" + token);

        var tracks = res.items;
        // console.log(items);
        // const tracks = res.items;
        console.log(tracks);
        // const res_tracks = res.tracks.total; //곡 검색 결과



        // album > items[0] > name     앨범이름
        // album > items[0] > images[1].url    앨범 url
        var a1 = tracks[0].uri;
        console.log(a1);
        var start1 = a1.indexOf('k:');
        // const end1 = url.indexOf('/tracks');
        var albumId = a1.substring(start1+2);
        console.log(albumId);

        (async () => {
            //get the token
            const token = await APICtrl.getToken();           
            //store the token onto the page
            UICtrl.storeToken(token);
            // 토큰 받아오는거
            var res1 = await APICtrl.getAlbumId(token, albumId);
            console.log(res1);

            var albumName = res1.album.name;
            var albumImgUrl = res1.album.images[1].url;

            UICtrl.createAlbumTitle(albumImgUrl, albumName);
        })();


        UICtrl.createTracks(tracks);

    })();



    return {
        init() {
            console.log('App is starting');
        }
    }

})(UIController, APIController);


// will need to call a method to load the genres on page load
APPController.init();