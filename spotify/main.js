// 1. nav메뉴 - 토글 버튼 클릭시 동작
window.onload = function(){
    const toggle = document.querySelector("#toggle");
    const menuopen = document.querySelector(".menuopen");
    const main = document.querySelector(".main_content");

    toggle.addEventListener("click", e => {
        e.preventDefault();
        
        if (menuopen.style.visibility == 'hidden') {
            menuopen.style.visibility = 'visible';
            main.style.marginTop = '450px';
            main.style.transition = 'all 200ms linear';
        } else {
            menuopen.style.visibility = 'hidden';
            main.style.marginTop = '0';
            main.style.transition = 'all 200ms linear';
        }
    });
}


// 2. 변경시
// window.onresize = function(event) {
//     const main = document.querySelector(".col-md-10");
//     var innerWidth = window.innerWidth;
//     if (innerWidth <= "1020") {
//         main.className = 'col-md-12'
//     } else if (innerWidth > "1020") {
//         main.className = 'col-md-10'
//     }
// }