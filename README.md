# 🟢 spotify
스포티파이를 클론 코딩한 pc, tab, mb 반응형 포트폴리오입니다.
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

![01_responsive](https://user-images.githubusercontent.com/77371139/182807711-334b97e3-e0fa-433b-bb0c-c3e2494812f6.png)
<br/><br/>

## - 반응형 메뉴
* PC는 메뉴를 왼쪽에 고정 시킴
* TAB & MB은 드롭다운 메뉴


```
<!--왼쪽 고정 메뉴바 -->
<div class="container-fluid ">
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


```
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
  #fix li a {
      margin-top: 10px;
      color: rgb(93, 216, 104);
      display: flex;
      align-items: center;
  }
  #fix li a:hover {
      color: black;
  }

  /* 토글 버튼 */
  #toggle {
      visibility: visible;
      font-size: 25px;
  }

  /* 토글  */
  .logo a {
      display: block;
      margin-top: 4px;
      color: rgb(93, 216, 104);
      margin-bottom: 20px;
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
  #navlink:hover {
      background-color:rgb(37, 37, 37);
      border-radius: 5px;
  }
  hr {
      border-top: 1px solid rgb(37, 37, 37);
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
![02_responsive](https://user-images.githubusercontent.com/77371139/182807922-ec02ca55-6d7a-48ce-a783-18dbfda93ae5.png)

## - 반응형 메뉴
* PC는 메뉴를 왼쪽에 고정 시킴
* TAB & MB은 드롭다운 메뉴
