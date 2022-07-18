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
        hfToken: '#hidden_token', // 토큰 저장
        searchButton: '#searchBtn', // submit 버튼
        artistResult: '#artistRes', // 아티스트
        trackResult: '#trackRes',    // 곡
        albumResult: '#albumRes',    // 앨범

        allSong: "#allsong",        // 모두보기 버튼
    }

    //public methods
    return {
        //method to get input fields
        inputField() {
            return {
                searchSubmit: document.querySelector(DOMElements.searchButton),
                allSong: document.querySelector(DOMElements.allSong)
            }
        },

        storeToken(value) {
            document.querySelector(DOMElements.hfToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMElements.hfToken).value
            }
        },


        // 상위결과 > 아티스트
        createArtist(img, artist) {
            
            const artistDiv = document.querySelector(DOMElements.artistResult);
            artistDiv.innerHTML = '';

            const html =
            `
                <div class="col-sm-6 col-md-4 artist-img">
                    <a href="#" id="thumbnail">
                    <img src="${img}" alt="..." />
                        <div class="caption">
                            <h3>${artist}</h3>
                            <p>아티스트</p>
                        </div>
                    </a>
                </div>
            `;

            artistDiv.insertAdjacentHTML('beforeend', html);
        },

        // 상위결과 > 노래
        createTitle(img, title) {
            
            const artistDiv = document.querySelector(DOMElements.artistResult);
            artistDiv.innerHTML = '';

            const html =
            `
                <div class="col-sm-6 col-md-4 artist-img">
                    <a href="#" id="thumbnail">
                    <img src="${img}" alt="..." />
                        <div class="caption">
                            <h3>${title}</h3>
                            <p>곡</p>
                        </div>
                    </a>
                </div>
            `;

            artistDiv.insertAdjacentHTML('beforeend', html);
        },

        // 상위결과 > 곡 (초기화 코드)
        clearTracks() {
            const trackDiv = document.querySelector(DOMElements.trackResult);
            trackDiv.innerHTML = '';
        },

        // 상위결과 > 곡 (반복문 돌리는 코드)
        createTracks(tracks) {
            this.clearTracks();
            // console.log(tracks);
            tracks.forEach ((v, i) => { // v는 배열의 값이고 i는 인덱스 번호
                if (i < 5) this.createTrack(i + 1, v.name, v.album.name, v.artists[0].name, v.album.images[0].url);
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
                            <p id="titleLength">${title}</p>
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
        },
        
        // 상위결과 > 앨범 (초기화 코드)
        clearAlbums() {
            const albumDiv = document.querySelector(DOMElements.albumResult);
            albumDiv.innerHTML = '';
        },

        // 상위결과 > 앨범 (반복문 돌리는 코드)
        createAlbums(albums) {
            this.clearAlbums();
            // console.log(albums);
            albums.forEach ((v, i) => {
                if (i < 4) this.createAlbum(v.images[0].url, v.name, v.artists[0].name, v.uri);
            });
        },

        // 상위결과 > 앨범
        createAlbum(img, album, artist, uri) {
            const albumDiv = document.querySelector(DOMElements.albumResult);
            const html =
            ` 
            <a href="search_artist_album.html?${uri}/tracks" class="albumdetail">
              <div class="col-sm-3 placeholder" id="paddingout">
                <img
                  src="${img}"
                  class="img-responsive"
                  alt="harry placeholder thumbnail"
                />
                <h4 class="albumtitle">${album}</h4>
                <span class="text-muted">${artist}</span>
              </div>
            </a>
            `;
            albumDiv.insertAdjacentHTML('beforeend', html);
        }
        
    }

})();


/** UI & API 컨트롤 */
const APPController = (function(UICtrl, APICtrl) {

    // get input field object ref
    const DOMInputs = UICtrl.inputField();
    // UICtrl.inputField()의 결과 : document.querySelector('#id'); -> document.querySelector('#id').addeventlistener('click', )

    // get genres on page load
    const loadToken = async () => {
        //get the token
        const token = await APICtrl.getToken();           
        //store the token onto the page
        UICtrl.storeToken(token);
    }

    // submit버튼 클릭시 동작
    DOMInputs.searchSubmit.addEventListener('click', async (e) => {
        e.preventDefault();
        const token = UICtrl.getStoredToken().token;
        const query = document.querySelector('#query').value;
        // 토큰 받아오는거
        const res = await APICtrl.getSearch(token, query);
        // 상위결과, 곡, 앨범 제목태그 style나타나기
        const common = document.querySelectorAll('.common');
        for (let i = 0; i < common.length; i++){
            common[i].style.visibility ='visible';
        }

        console.log(res);

        console.log("토큰" + token);

        var {items} = res.albums;
        /**
         * const liverpool = { klopp : coach, yedi : {hallon : bangu}, dduni : fan2 };
         * const {yedi} = liverpool;
         * console.log(yedi); -> 결과 : {hallon : bangu}
         * const {salah} = liverpool; 결과 : error or null
         */
        const albums = items;
        const res_albums = res.albums.total; // 앨범 검색 결과 (res_albums == 0 이면 검색 결과 없음)

        var {items} = res.artists;
        const artists = items;
        const res_artists = res.artists.total; // 아티스트 검색 결과

        var {items} = res.tracks;
        const tracks = items;
        const res_tracks = res.tracks.total; //곡 검색 결과
        
        //검색결과 없을 때
        if (res_artists == 0 && res_tracks == 0) {
            //검색결과 없음
        }
        // (아티스트 검색 결과는 없는데) 곡 검색 결과가 있을 때
        else if (res_artists == 0 && res_tracks != 0) {
            UICtrl.createTitle(tracks[0].album.images[0].url, tracks[0].name);
        }
        // 아티스트 검색 결과는 있고 (곡 검색 결과는 없을 때)
        else if (res_artists != 0 && res_tracks == 0) {
            UICtrl.createArtist(artists[0].images[0].url, artists[0].name);
        }
        // 아티스트 검색 결과랑 곡 검색 결과 둘 다 있을 때
        else {
            // 검색어랑 아티스트와 곡 각각의 첫번째 검색 결과랑 비교
            // 검색어랑 아티스트 검색 결과만 일치
            if (artists[0].name == query && tracks[0].name != query) {
                UICtrl.createArtist(artists[0].images[0].url, artists[0].name);
            }
            // 검색어랑 곡 검색 결과만 일치
            else if (artists[0].name != query && tracks[0].name == query) {
                UICtrl.createTitle(tracks[0].album.images[0].url, tracks[0].name);
            }
            // 검색어랑 아티스트 검색 결과와 곡 검색 결과 모두 일치
            else {
                if (artists[0].popularity > tracks[0].popularity) {
                    // 상위결과 > 아티스트
                    UICtrl.createArtist(artists[0].images[0].url, artists[0].name);
                }
                else {
                    UICtrl.createTitle(tracks[0].album.images[0].url, tracks[0].name);
                }
            }
        }

        // 상위결과 > 곡
        // 곡 검색 결과가 없을 땐 실행X
        // 이전 검색 띄웠던거 지우기
        if (res_tracks != 0) UICtrl.createTracks(tracks);
        else UICtrl.clearTracks();

        // 상위결과 > 앨범
        // 앨범 검색 결과가 없을 땐 실행X
        // 이전 검색 띄웠던거 지우기
        if (res_albums != 0) UICtrl.createAlbums(albums);
        else UICtrl.clearAlbums();  
    });


    // 모두보기 클릭시 동작
    DOMInputs.allSong.addEventListener('click', async (e) => {
        const query = document.querySelector('#query').value;
        const type = 'allsong';
        const url = 'search_artist_all.html?' + 'search=' + query + '&type=' + type;
        const allsong = document.querySelector('#allsong');
        allsong.href = url;
    });


    // 앨범 클릭시 이동
    // 동적 태그 동작 안함
    $(document).on("click", "#albumRes > a", function() {
        
    });


    return {
        init() {
            console.log('App is starting');
            loadToken();
        }
    }

})(UIController, APIController);


// will need to call a method to load the genres on page load
APPController.init();