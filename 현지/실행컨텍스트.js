// 전역 컨텍스트가 활성화됩니다.
// 전역 컨텍스트의 environmentRecord에 { a, outer } 식별자를 저장합니다.\
// 전역 컨텍스트는 선언 시점이 없으므로 전역 컨텍스트의 outerEnvironment— Reference에는 아무것도 담기지 않습니다(this: 전역 객체).

// 1번줄: 전역 스코프에 있는 변수 a에 1을,
var a = 1;
// 2번줄: outer에 함수를 할당합니다.
var outer = function () {
  // outer 실행 컨텍스트의 environmentRecord에 { inner } 식별자를 저장합니다.
  // outerEnvironment에는 outer 함수가 선언될 당시의 LexicalEnvironment가 담깁니다.
  // outer 함수는 전역 공간에서 선언됐으므로 전역 컨텍스트의 LexicalEnvironment를 참조복사합니다.
  // 이를 [Global, {a, outer}]라고 표기 합시다. 첫 번째는 실행 컨텍스트의 이름,
  // 두 번째는 environmentRecord 객체입니다.

  // 3번줄: outer 스코프에 있는 변수 inner에 함수를 할당합니다.
  var inner = function () {
    // inner 실행 컨텍스트의 environmentRecord에 {a} 식별자를 저장합니다.
    // outerEnvironment에는 inner 함수가 선언될 당시의 LexicalEnvironment가 담깁니다.
    // inner 함수는 outer 함수 내부에서 선언됐으므로 outer 함수의 LexicalEnvironment, 즉
    // [outer, {inner}]를 참조복사합니다.

    // 식별자 a에 접근하고자 합니다. 현재 활성화 상태인 inner 컨텍스트의 environmentRecord에서
    // a를 검색합니다. a가 발견됐는데 여기에는 아직 할당된 값이 없습니다. (undefined 출력)
    console.log(a);
    // inner 스코프에 있는 변수 a에 3을 할당합니다.
    var a = 3;
    // inner 함수 실행이 종료됩니다. inner 실행 컨텍스트가 콜 스택에서 제거되고,
    // 바로 아래의 outer 실행 컨텍스트가 다시 활성화되면서, 앞서 중단했던 7번째 줄의 다음으로 이동합니다.
  };

  // 7번줄: inner 함수를 호출합니다. 이에 따라 outer 실행 컨텍스트의 코드는 7번째 줄에서
  // 임시중단되고, inner 실행 컨텍스트가 활성화되어 3번째 줄로 이동합니다.
  inner();

  // 8번줄: 식별자 a에 접근하고자 합니다. 이때 자바스크립트 엔진은 활성화된 실행 컨텍스트의
  // LexicalEnvironment에 접근합니다. 첫 요소의 environmentRecord에서 a가 있는지 찾아보고, 없으면 outerEnvironment에 있는
  // environmentRecord로 넘어가는 식으로 계속해서 검색합니다. 예제에서는 두 번째, 즉 전역 LexicalEnvironment에 a가 있으니 그 a에 저장된 값 1을 반환합니다.
  console.log(a);
  // outer 함수 실행이 종료됩니다. outer 실행 컨텍스트가 콜 스택에서 제거되고
  // 바로 아래의 전역 컨텍스트가 다시 활성화되면서, 앞서 중단했던 10번째 줄의 다음으로 이동합니다.
};

// 10번줄: outer 함수를 호출합니다. 이에 따라 전역 컨텍스트의 코드는 10번째 줄에서 임시중단되고,
// outer 실행 컨텍스트가 활성화되어 2번째 줄로 이동합니다.
outer();

// 11번줄: 식별자 a에 접근하고자 합니다. 현재 활성화 상태인 전역 컨텍스트의 environmentRecord에서 a를 검색합니다.
// 바로 a를 찾을 수 있습니다. 이로써 모든 코드의 실행이 완료됩니다.
// 전역 컨텍스트가 콜 스택에서 제거되고 종료합니다.
console.log(a);
