// 1. nav메뉴 - 버튼 클릭시 동작
window.onload = function(){
    const toggle = document.querySelector("#toggle");
    const menuopen = document.querySelector(".menuopen");
    const main = document.querySelector(".main_content");


    toggle.addEventListener("click", e => {
        e.preventDefault();
        
        if (menuopen.style.visibility == 'hidden') {
            menuopen.style.visibility = 'visible';
            main.style.marginTop = '450px';
            main.style.transition = 'all 300ms linear';
        } else {
            menuopen.style.visibility = 'hidden';
            main.style.marginTop = '0';
            main.style.transition = 'all 300ms linear';
        }
    });
}
