/**
 * @filename    : regex_helper.js
 * @author      : 김경의 (chanillekim@gmail.com)
 * @description : 정규표현식 검사 수행 후, true/flase로 해당 정규표현식 충족하는지 여부를 반환하는 함수들의 모음
 */

class RegexHelper {
  // consructor() {}

  /**
   * 값의 존재 여부를 검사한다.
   * @param {string} selector 입력요소에 해당하는 CSS 선택자
   * @param {string} msg      값이 없을 경우 표시할 메세지 내용
   * @return {boolean}        입력된 경우 true / 입력되지 않은 경우 false
   */
  value(selector, msg) {
    // 앞뒤의 공백을 제외하고 내용만 추출
    const field = document.querySelector(selector);
    const content = field.value.trim();

    if (!content) {
      // 값이 없다면?
      alert(msg);     // 메세지 표시
      field.focus();  // 대상요소에세 포커스 강제 지정
      return false;   // 실패했음을 리턴
    }
    return true; // 성공했음을 리턴
  }

  /**
   * 입력값이 지정된 글자수를 초과했는지 검사한다.
   * @param {string} selector 입력요소에 해당하는 CSS 선택자
   * @param {int} len         최대 글자수
   * @param {string} msg      값이 없을 경우 표시될 메세지
   * @return {boolean}        초과하지 않은 경우 true / 초과한 경우 false
   */
  max_length(selector, len, msg) {
    // 앞뒤의 공백을 제외하고 내용만 추출
    const field = document.querySelector(selector);
    const content = field.value.trim();
    if (content.length > len) {
      // 입력값이 주어진 길이보다 크다면?
      alert(msg); // 메세지 표시
      field.value = "";  // 입력값을 강제로 지운다.
      field.focus();     // 대상요소에게 포커스 강제 지정
      return false;      // 실패했음을 리턴
    }
    return true; // 성공했음을 리턴
  }

  /**
   * 입력값이 지정된 글자수 미만했는지 검사한다.
   * @param {string} selector 입력요소에 해당하는 CSS 선택자
   * @param {int} len         최대 글자수
   * @param {string} msg      값이 없을 경우 표시될 메세지
   * @return {boolean}        지정된 글자수 이상인 경우 true / 미만인 경우 false
   */
  min_length(selector, len, msg) {
    // 앞뒤의 공백을 제외하고 내용만 추출
    const field = document.querySelector(selector);
    const content = field.value.trim();
    if (content.length < len) {
      // 입력값이 주어진 길이보다 크다면?
      alert(msg);        // 메세지 표시
      field.value = "";  // 입력값을 강제로 지운다.
      field.focus();     // 대상요소에게 포커스 강제 지정
      return false;      // 실패했음을 리턴
    }
    return true; // 성공했음을 리턴
  }


  /**
   * 두 요소의 입력값이 동일한지 검사한다.
   * @param {string} origin_selector  원본 요소의 selector
   * @param {string} compare_selector 검사 대상 요소의 selector
   * @param {string} msg              검사에 실패할 경우 표시할 메세지
   * @return {boolean}                동일한 경우 true / 다른 경우 flase
   */
  compare_to(origin_selector, compare_selector, msg) {
    const origin = document.querySelector(origin_selector);
    const compare = document.querySelector(compare_selector);
    let src = origin.value.trim(); // 원본값을 가져온다.
    let dsc = compare.value.trim(); // 비교할 값을 가져온다.

    if (src != dsc) {
      // 두 요소의 입력값이 다르다면?
      alert(msg); // 메세지 표시
      origin.value = ""; // 원본요소의 입력값 지움
      compare.value = ""; // 검사 대상의 입력값 지움
      origin.focus(); // 원본 요소에게 포커스 강제 지정
      return false; // 실패했음을 리턴
    }
    return true; // 성공했음을 리턴
  }

  /**
   * 입력값이 정규표현식을 충족하는지 검사한다.
   * @param {string} selector   입력요소에 해당하는 CSS 선택자
   * @param {string} msg        표시할 메세지
   * @param {Object} regex_expr 검사에 정규표현식
   * @return {boolean}          표현식을 충족할 경우 true / 그렇지 않으을 경우 flase
   */
  field(selector, msg, regex_expr) {
    const field = document.querySelector(selector);
    let src = field.value.trim();

    // 입력값이 없거나 입력값에 대한 정규표현식 검사가 실패라면?
    if (!src || !regex_expr.test(src)) {
      alert(msg); // 메세지 표시
      field.value = ""; // 입력값을 강제로 지운다.
      field.focus(); // 대상요소에게 포커스 강제 지정
      return false; // 실패했음을 리턴
    }
    return true; // 성공했음을 리턴
  }

  /** 
   * 숫자로만 이루어 졌는지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string} selector 입력요소에 해당하는 CSS 선택자
   * @param {string} msg      표시할 메세지
   * @return {boolean}        표현식을 충족할 경우 true / 그렇지 않으을 경우 flase
   */
  num(selector, msg) {
    return this.field(selector, msg, /^[0-9]{2}/)
  }

  /**
   * 영문으로만 이루어 졌는지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string} selector 입력요소에 해당하는 CSS 선택자
   * @param {string} msg      표시할 메세지
   * @return {boolean}        표현식을 충족할 경우 true / 그렇지 않으을 경우 flase
   */
  eng(selector, msg) {
    return this.field(selector, msg, /^[a-zA-Z]*$/)
  }

  /**
   * 한글로만 이루어 졌는지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string} selector 입력요소에 해당하는 CSS 선택자
   * @param {string} msg      표시할 메세지
   * @return {boolean}        표현식을 충족할 경우 true / 그렇지 않으을 경우 flase
   */
  kor(selector, msg) {
    return this.field(selector, msg, /^[ㄱ-ㅎ가-힣0-9]*$/)
  }

  /**
   * 영문과 숫자로 이루어 졌는지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string} selector 입력요소에 해당하는 CSS 선택자
   * @param {string} msg      표시할 메세지
   * @return {boolean}        표현식을 충족할 경우 true / 그렇지 않으을 경우 flase
   */
  eng_num(selector, msg) {
    return this.field(selector, msg, /^[a-zA-Z0-9]*$/)
  }

  /**
   * 한글과 숫자로만 이루어 졌는지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string} selector 입력요소에 해당하는 CSS 선택자
   * @param {string} msg      표시할 메세지
   * @return {boolean}        표현식을 충족할 경우 true / 그렇지 않으을 경우 flase
   */
  kor_num(selector, msg) {
    return this.field(selector, msg, /^[ㄱ-ㅎ가-힣0-9]*$/)
  }

  /**
   * 이메일주소 형식인지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string} selector 입력요소에 해당하는 CSS 선택자
   * @param {string} msg      표시할 메세지
   * @return {boolean}        표현식을 충족할 경우 true / 그렇지 않으을 경우 flase
   */
  email(selector, msg) {
    return this.field(selector, msg, /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i)
  }

  /**
   * 핸드폰 번호 형식인지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string} selector 입력요소에 해당하는 CSS 선택자
   * @param {string} msg      표시할 메세지
   * @return {boolean}        표현식을 충족할 경우 true / 그렇지 않으을 경우 flase
   */
  cellphone(selector, msg) {
    return this.field(selector, msg, /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/)
  }

  /**
   * 집전화 형식인지 검사하기 위해 field()를 간접적으로 호출한다.
   * @param {string} selector 입력요소에 해당하는 CSS 선택자
   * @param {string} msg      표시할 메세지
   * @return {boolean}        표현식을 충족할 경우 true / 그렇지 않으을 경우 flase
   */
  telphone(selector, msg) {
    return this.field(selector, msg, /^\d{2,3}\d{3,4}\d{4}$/)
  }

  /**
   * 핸드폰번호 형식인지 집전화번호 형식 둘중 하나를 충족하는지 검사.
   * @param {string} selector 입력요소에 해당하는 CSS 선택자
   * @param {string} msg      표시할 메세지
   * @return {boolean}        표현식을 충족할 경우 true / 그렇지 않으을 경우 flase
   */
  phone(selector, msg) {
    let check1 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/; //핸드폰 형식
    let check2 =  /^\d{2,3}\d{3,4}\d{4}$/; // 집전화 형식

    const field = document.querySelector(selector);
    let src = field.value.trim(); // 입력값을 가져온다.

    // 입력값이 없거나, 핸드폰 형식도 아니고 집전화 형식도 아니라면?
    if (!src || (!check1.test(src) && !check2.test(src))) {
      alert(msg);       // 메세지 표시
      field.value = ''; // 일력값을 강제로 지운다.
      field.focus();    // 포커스 지정
      return false;     // 실패했음을 리턴
    }
    return true;        // 성공했음을 리턴
  }
}
