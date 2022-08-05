# 🟢 spotify
스포티파이를 클론 코딩한 pc, tab, mb **반응형 포트폴리오**입니다.
![00  메인 페이지](https://user-images.githubusercontent.com/77371139/182634125-291ce338-de21-4b40-b426-a170cc0f47a8.png)
<br/><br/>

## 🔗 Demo (URL)
https://dicodering.github.io/spotify-clone/spotify/
<br/><br/>

## 🔨 Skill
* HTML5
* CSS3
* Bootstrap
* Javascript
<br/><br/>

## 📝 Story

<br/><br/>

## 💡 Main Features
* ✅ 반응형 웹
* ✅ REST API
* ✅ 회원가입 유효성 검사
<br/><br/>

## 1) RESPONSIVE

![01_responsive](https://user-images.githubusercontent.com/77371139/182841712-c76e9fb6-3ab2-4b6a-96a4-67af8e64cf34.png)
<br/><br/>

* PC는 메뉴를 왼쪽에 고정 시킴
* TAB & MB은 드롭다운 메뉴

```html
<!--왼쪽 고정 메뉴바 -->
<div class="container-fluid">
  <div class="row">
    <div class="sidebar"> <!-- .text-primary .col-md-2 -->
      <!-- 상단메뉴 -->
      <ul id="fix" style="padding-top: 5px" class="nav nav-sidebar sidenav logo clearfix" >
        <li>
          <div>
            <img src="icon/SpotifyIcon_Green.png" style="width: 30px; margin-right: 10px;" alt=""/>
            <span>SPOTIFY</span>
          </div>
          <a id="toggle">
            <i class="fas fa-bars"></i>
          </a>
        </li>
      </ul>
      <!-- 오픈 메뉴 -->
      <div class="menuopen">
        <ul class="nav nav-sidebar sidenav">
          <li><a href="index.html" id="navlink">🏠  <span class="white-text">홈</span></a></li>
          <li><a href="search_artist.html" id="navlink">🔍  <span class="white-text">검색하기</span></a></li>
        </ul>
        <hr />
        <ul class="nav nav-sidebar sidenav">
          <li><a href="playlist.html" id="navlink">🧺  <span class="white-text">플레이리스트</span></a></li>
        </ul>
        <hr />
        <ul class="nav nav-sidebar sidenav">
          <li><a href="login.html" id="navlink">🔑  <span class="white-text">로그인/로그아웃</span></a></li>
          <li><a href="signup.html" id="navlink">🎁  <span class="white-text">회원가입</span></a></li>
          <li><a href="profile.html" id="navlink">👤  <span class="white-text">계정</span></a></li>
          <li><a href="premium.html" id="navlink">💳  <span class="white-text">프리미엄</span></a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
```


```css
/* 반응형 : 모바일 & 탭 공통  */
@media (min-width: 320px) {

  /* 상단 고정 메뉴 전체 영역 */
  .sidebar {
      background-color: black;
      height: 80px;
      box-sizing: border-box;
      width: 100%;
      margin: 0;
  }

  /* 로고 & 토글버튼 전체 영역 */
  #fix {
      border: 4px solid red;
      width: 100%;
      padding: 5px 15px 0 15px;
  }
  #fix li {
      display: flex;
      justify-content: space-between;
  }
  #fix li div {
      display: flex;
      justify-content: left;
      align-items: center;
      color: rgb(93, 216, 104);
      font-size: 25px;
      padding-bottom: 5px;
      box-sizing: border-box;
  }
  
  /* 토글 버튼 */
  #toggle {
      /* 토글 버튼 나타내기 */
      visibility: visible;
      font-size: 25px;
  }


  /* 숨겨져 있는 메뉴 내용 */
  .menuopen {
      /* 숨김 -> 오픈은 자바스크립트로 동작 */
      visibility: hidden;
      background-color: black;
      padding: 10px;
      margin: 0;
  }
  /* > 각 메뉴 영역 */
  #navlink {
      padding: 15px 10px;
      display: block;
  }
}


/* 반응형 : 데스크탑  */
@media (min-width: 1020px) {

  /* 왼쪽 고정 메뉴 */
  .sidebar {
      background-color: black;
      position: fixed;
      z-index: 4444;
      height: 100%;
      box-sizing: border-box;
      margin: 0;
      width: 15%;
  }

  /* 메뉴 내용 */
  .menuopen {
      visibility: visible;
      background-color: black;
      padding: 10px;
      margin: 0;
  }
  #fix li div {
      display: flex;
      justify-content: left;
      align-items: center;
      color: rgb(93, 216, 104);
      font-size: 20px;
      padding-bottom: 5px;
      box-sizing: border-box;
  }

  /* 토글 버튼은 숨김 */
  #toggle {
      visibility: hidden;
  }
}
```

![02_responsive](https://user-images.githubusercontent.com/77371139/182841830-878130e6-2e31-404b-9bd5-afd10181505d.png)


<br/><br/>

## 2) REST API
[Spotify Web API](https://developer.spotify.com/documentation/web-api/reference/#/)를 통해 아티스트, 노래 제목, 앨범 등의 정보를 요청합니다.
[참고 코드](https://github.com/awicks44/JavaScript-SpotifyAPI/blob/master/app.js)

### 2.1. 토큰 받아오기 (공통)
```html
  <!-- 히든토큰 (value값에 저장해두는 것) -->
  <!-- 쉽게 꺼내 쓰기 위해서(Html에 보일 필요 없음) -->
  <!-- 쉽게 말하면, 자바스크립트에서 쉽게 꺼내 쓰려고 변수를 생성한 것 -->
  <input id="hidden_token" type="hidden"></input>
```

```javascript
/**
 * token
 * - 서버 접속에 필요한 열쇠(입장권)
 * - 입장권을 보관 해야해서 html에 만들어서 저장해놓음
**/
 
/** API 컨트롤 */
const APIController = (function() {
    
    // spotify devloper ID & PW
    const clientId = 'secret';
    const clientSecret = 'secret';

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

    // 클래스여서 return따로 (위에는 하나의 정의)
    return {
        getToken() {
            return _getToken();
        }
    }
})();
```
<br/><br/>

### 2.2. 검색하기
    ☑️ 아티스트 (섬네일, 아티스트명)
    ☑️ 곡 (섬네일, 제목, 아티스트명, 앨범 제목)
    ☑️ 앨범 (섬네일, 앨범 제목, 아티스트명)
    
<details>
<summary>javascript 코드 펼치기</summary>
<div markdown="1">

```javascript
/** API 컨트롤 */
const APIController = (function() {
    // 토큰 받아오기 (생략)

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

    // 클래스여서 return따로 (위에는 하나의 정의)
    return {
        getSearch(token, query) {
            return _getSearch(token, query);
        }
    }
})();
```

```javascript
/** UI Module */
const UIController = (function() {

    //object to hold references to html selectors
    const DOMElements = {
        hfToken: '#hidden_token',     // 토큰 저장
        searchButton: '#searchBtn',   // submit 버튼
        artistResult: '#artistRes',   // 아티스트
        trackResult: '#trackRes',     // 곡
        albumResult: '#albumRes',     // 앨범

        allSong: "#allsong",          // 모두보기 버튼
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
                <!-- 플레이리스트에 추가(생략) -->
                <!-- Button trigger modal(생략) -->
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
```

```javascript
/** UI & API 컨트롤 */
const APPController = (function(UICtrl, APICtrl) {

    // get input field object ref
    const DOMInputs = UICtrl.inputField();
    // UICtrl.inputField()의 결과 : document.querySelector('#id');
    // -> document.querySelector('#id').addeventlistener('click', )

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
```
</div>
</details>
  
![01_rest](https://user-images.githubusercontent.com/77371139/182844272-e2323df9-6a50-48b7-9642-0f2bba7731c7.png)
<br/><br/>
                  
                  
### 2.3. 곡 > [모두보기] 클릭
    ☑️ 20개 이하의 곡을 출력한 새로운 페이지
    ☑️ 곡 (섬네일, 제목, 아티스트명, 앨범 제목)
                  
<details>
<summary>javascript 코드 펼치기</summary>
<div markdown="1">

```javascript
/** API 컨트롤 */
(위와 동일 생략)
  
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
                <!-- 플레이리스트에 추가(생략) -->
                <!-- Button trigger modal(생략) -->
            `;
            trackDiv.insertAdjacentHTML('beforeend', html);
            trackDiv.style.visibility = 'visible';
        }
    }
})();
```
  
```javascript
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
```
</div>
</details>

![02_rest](https://user-images.githubusercontent.com/77371139/182845242-f8b5f764-88b6-465d-b44f-9e315c61b87b.png)
<br/><br/>


### 2.4. 앨범 > [앨범] 클릭
    ☑️ 해당 앨범의 곡을 모두 출력한 새로운 페이지
    ☑️ 앨범 (섬네일, 앨범 제목, 아티스트명, 곡 제목)


[Spotify URI 및 ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)
- 앨범의 트랙을 받아오려면 **URI**와 **ID**라는 매개변수가 필요하다.
- 스포티파이 URI는 클라이언트의 검색 상자에 입력하여 아티스트, 앨범 또는 트랙을 찾을 수 있는 리소스 식별자입니다.
  - **예시** `spotify:track:6rqhFgbbKwnb9MLmUQDhG6`
- 스포티파이 ID는 아티스트, 트랙, 앨범, 재생 목록 등에 대한 Spotify URI(위 참조) 끝에서 찾을 수 있는 base-62 식별자입니다.
  - **예시** `6rqhFgbbKwnb9MLmUQDhG6`

  
<details>
<summary>javascript 코드 펼치기</summary>
<div markdown="1">

```javascript
/** API 컨트롤 */
const APIController = (function() {
    // 앨범 트랙
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

    // 앨범 ID
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
        getAlbumTrack(token, id) {
            return _getAlbumTrack(token, id);
        },

        getAlbumId(token, albumId) {
            return _getAlbumId(token, albumId);
        }
    }
})();
```
  
```javascript
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
                <!-- 플레이리스트에 추가(생략) -->
                <!-- Button trigger modal(생략) -->
            `;
            trackDiv.insertAdjacentHTML('beforeend', html);
            trackDiv.style.visibility = 'visible';
        }
    }
})();
```
  
```javascript
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

        // 토큰 받아오는거
        const res = await APICtrl.getAlbumTrack(token, id);

        var tracks = res.items;
        // console.log(items);
        // const tracks = res.items;
        console.log(tracks);
        // const res_tracks = res.tracks.total; // 곡 검색 결과



        // album > items[0] > name            앨범이름
        // album > items[0] > images[1].url   앨범 이미지 url
        var a1 = tracks[0].uri;
        var start1 = a1.indexOf('k:');
        var albumId = a1.substring(start1+2); // 앨범 id

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
```
</div>
</details>

![03_rest](https://user-images.githubusercontent.com/77371139/182844665-d5785b65-9d9d-46c7-8f73-d3814b7b20e7.png)
<br/><br/>




