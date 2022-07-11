// @Filename regex_helper.js
// @Author 강예지
// @Description 스포티파이 폼 안에 자바스크립트 작성 시, 호출되는 함수 모음

class RegexHelper{
  // 값 입력 안했을 시 출력
  value(selector, msg){
      const field = document.querySelector(selector);
      const content = field.value.trim();
      if(!content){
          alert(msg);
          field.focus();
          return false;
      }
      return true;
  }

  // 글자 수 초과 시 출력 (최대)
  max_length(selector, len, msg){
      const field = document.querySelector(selector);
      const content = field.value.trim();
      if(content.length > len){
          alert(msg);
          field.value = '';
          field.focus();
          return false;
      }
      return true;
  }

  // 글자 수 부족 시 출력 (최소)
  min_length(selector, len, msg){
      const field = document.querySelector(selector);
      const content = field.value.trim();
      if(content.length < len){
          alert(msg);
          field.value = '';
          field.focus();
          return false;
      }
      return true;
  }

  // 비교
  compare_to(origin_selector, compare_selector, msg){
      const origin = document.querySelector(origin_selector);
      const compare = document.querySelector(compare_selector);
      var src = origin.value.trim();
      var dsc = compare.value.trim();

      if (src != dsc) {
          alert(msg);
          origin.value = '';
          compare.value = '';
          origin.focus();
          return false;
      }

      return true;
  }

  // 정규 표현식 
  field(selector, msg, regex_expr) {
      const field = document.querySelector(selector);
      var src = field.value.trim(); 
      if (!src || !regex_expr.test(src)) {
          alert(msg);
          field.value = '';
          field.focus(); 
          return false;    
      }
      return true; 
  }


  // 한글, 영어 판별
  kor_eng(selector, msg){
      return this.field(selector, msg, /^[ㄱ-ㅎ가-힣a-zA-Z]*$/);
  }
  
  // 영문
  eng_num(selector, msg){
      return this.field(selector, msg, /^[a-zA-Z0-9]*$/);
  }
  
  // 이메일 주소
  email(selector, msg){
      return this.field(selector, msg, /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
  }

  // 연락처
  phone(selector, msg){
      var check1 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
      var check2 = /^\d{2,3}\d{3,4}\d{4}$/;

      const field = document.querySelector(selector);
      var src = field.value.trim();

      if (!src ||(!check1.test(src) && !check2.test(src))) {
          alert(msg);
          field.value = '';
          field.focus();
          return false;
      }
      return true;
  }

  // select박스 체크
  check(selector, msg) { 
      const field = document.querySelector(selector); // 선택된것만 넘어왔으니까 quertySelector사용
      let checked = false; 

      if(field.value != "N"){ // select된 것의 value가 디폴트값인 N이면 if문 실행 안함
          checked = true;
          return true;
      }

      if (!checked) { // 디폴트값인 N일 시 경고 메세지 출력
          alert(msg);
          field[0].focus();
      }
      return checked;
  }
}