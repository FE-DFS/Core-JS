// 5-1
var outer = function () {
  var a = 1;
  var inner = function () {
    console.log(++a);
  };
  inner();
};
outer();

// 5-2
var outer1 = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner(); // inner 함수를 실행한 결과를 return 하고 있으므로 결과적으로 outer 함수의 실행 컨텍스트가 종료된 시점에는 a 변수를 참조하는 대상이 없어진다.
};

var outer2 = outer1();
console.log(`outer2: ${outer2}`);

// 5-1과 5-2는 outer 함수의 실행 컨텍스트가 종료되기 이전에 inner 함수의 실행 컨텍스트가 종료돼 있으며, 이후 별도로 inner 함수를 호출할 수 없다는 공통점이 있다.

// 5-3 외부 함수의 변수를 참조하는 내부 함수
var outer3 = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner; // 함수만 반환
};

var outer4 = outer3();
console.log(`outer4: ${outer4()}`);
console.log(`outer4: ${outer4()}`);
console.log(`outer4: ${outer4()}`);
console.log(`outer4: ${outer4()}`);
console.log(`outer4: ${outer4()}`);

// 5-4
// (1) setInterval/setTimeout
// 별도의 외부객체인 window 메서드에 전달할 콜백 함수 내부에서 지역변수를 참조한다.
(function () {
  var a = 0;
  var intervalId = null;
  var inner = function () {
    if (++a >= 10) {
      clearInterval(intervalId);
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
});

// (2) eventListener
// 별도의 외부객체인 DOM의 메서드에 등록할 핸들러 함수 내부에서 지역변수를 참조한다.
// (function () {
//   var count = 0;
//   var button = document.createElement('button');
//   button.innerText = 'click';
//   button.addEventListener('click', function () {
//     console.log(++count, 'times clicked');
//   });
//   document.body.appendChild(button);
// })();

// 두 상황 모두 지역변수를 참조하는 내부함수를 외부에 전달했기 때문에 클로저이다.

// 5-5 클로저의 메모리 관리
//(1) return에 의한 클로저의 메모리 해제
var outer5 = (function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
})();
console.log(`outer5: ${outer5()}`);
console.log(`outer5: ${outer5()}`);
outer5 = null; // outer식별자의 inner 함수 참조를 끊음

// (2) setInterval에 의한 클로저의 메모리 해제
(function () {
  var a = 0;
  var intervalId = null;
  var inner = function () {
    if (++a >= 10) {
      clearInterval(intervalId);
      inner = null;
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
})();
