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

    // 검색
    const _getSearch = async (token, query) => {
        // console.log(query);
        const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist,album,track&market=kr`, {
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

        getSearch(token, query) {
            return _getSearch(token, query);
        }
    }
})();


/** UI Module */
const UIController = (function() {

    //object to hold references to html selectors
    const DOMElements = {
        hfToken: '#hidden_token',    // 토큰 저장
        artistResult: '#artistRes',  // 아티스트
        trackResult: '#trackRes',    // 곡

        // 곡 h2
        h2Title: '#h2Title',        // 곡
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

        // 상위결과 > 곡 (반복문 돌리는 코드)
        createTracks(tracks) {
            // this.clearTracks();
            console.log(tracks);
            tracks.forEach ((v, i) => { // v는 배열의 값이고 i는 인덱스 번호
                if (i < 20) this.createTrack(i + 1, v.name, v.album.name, v.artists[0].name, v.album.images[0].url);
            });
        },

        // 상위결과 > 곡 (항목 추가 코드)
        createTrack(num, title, album, artist, img) {
            const trackDiv = document.querySelector(DOMElements.trackResult);
            const html =
            ` 
            <tr class="trhover">
                <td id="td">${num}</td>
                <td id="td" class="flex-box">
                    <div class="tdbox clearfix" id="flexBox">
                        <div class="td-img" class="pull-left">
                            <img src="${img}" alt="" class="pull-left">
                        </div>
                        <div class="td-text">
                            <p>${title}</p>
                            <p class="tableartist">${artist}</p>
                        </div>
                    </div>
                </td>
                <td id="td" class="tableartist albumhidden">${album}</td>
                <td id="td" class="clearfix pull-right">
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
    // get genres on page load
    const loadToken = async () => {
        //get the token
        const token = await APICtrl.getToken();           
        //store the token onto the page
        UICtrl.storeToken(token);
    }

    (async () => { 

        // e.preventDefault();
        const token = UICtrl.getStoredToken().token;

        // 현재 url
        const url = window.location.href;
        console.log(url);

        const start = url.indexOf('=');
        const end = url.indexOf('&');
        const str = url.substring(start+1, end);

        // 주소 파싱 query
        const query = decodeURIComponent(str);

        // 토큰 받아오는거
        const res = await APICtrl.getSearch(token, query);

        // 곡 제목태그 style나타나기
        const titleh2 = document.querySelector('.titleh2');
        titleh2.style.visibility ='visible';
    
        console.log(res);
        console.log(query);
    
        var {items} = res.tracks;
        const tracks = items;
        const res_tracks = res.tracks.total; //곡 검색 결과


        UICtrl.createTracks(tracks);

    })();




    return {
        init() {
            console.log('App is starting');
            loadToken();
        }
    }

})(UIController, APIController);


// will need to call a method to load the genres on page load
APPController.init();