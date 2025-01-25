// *** 1번 예제 ***

// 1. 객체를 생성하는데, 이때 객체 내부에는 outer 프로퍼티가 있으며, 익명함수가 연결됩니다. 이렇게 생성한 객체를 변수 obj1에 할당합니다.
var obj1 = {
  // 2. obj1.outer 함수의 실행 컨텍스트가 생성되면서 호이스팅하고, 스코프 체인 정보를 수집하고, this를 바인딩한다.
  // 이 함수는 호출할 때 함수명인 outer 앞에 점(.)이 있었으므로 메서도로서 호출한 것이다. 따라서 this에는 마지막 점 앞의 객체인 obj1이 바인딩된다.
  outer: function () {
    // 3. obj1 객체 정보가 출력된다.
    console.log(this);
    // 4. 호이스팅된 변수 innerFunc는 outer 스코프 내에서만 접근할 수 있는 지역변수이다. 이 지역변수에 익명 함수를 할당한다.
    // innerFunc() 함수의 실행 컨텍스트가 생성되면서 호이스팅, 스코프 체인 수집, this 바인딩 등을 수행한다.
    // 이 함수를 호출할 때 함수명 앞에는 점(.)이 없었다.
    // 즉 함수로서 호출한 것이므로 this가 지정되지 않았고,
    // 따라서 자동으로 스코프 체인상의 최상위 객체인 전역객체(Window)가 바인딩된다.
    var innerFunc = function () {
      //6. Window 객체 정보가 출력된다.
      console.log(this);
    };
    // 5. innerFunc()를 호출한다.
    innerFunc();
    // 7. 호이스팅된 변수 obj2 역시 outer 스코프 내에서만 접근할 수 있는 지역변수이다.
    // 여기에는 다시 객체를 할당하는데, 그 객체에는 innerMethod라는 프로퍼티가 있으며,
    // 여기에는 앞서 정의된 변수 innerFunc와 연결된 익명 함수가 연결된다.
    // 9. obj2.innerMethod 함수의 실행 컨텍스트가 생성된다.
    // 이 함수는 호출할 때 함수명인 innerMethod 앞에 (.)점이 있었으므로 메서드로서 호출한 것이다.
    // 따라서 this에는 마지막 점 앞의 객체인 obj2가 바인딩된다.
    var obj2 = {
      // 10. obj2 객체 정보 출력
      innerMethod: innerFunc,
    };
    // 8. obj2.innerMethod 호출
    obj2.innerMethod();
  },
};

// obj1.outer 호출
obj1.outer();

// *** 2번 예제 ***
// setTimeout 함수는 300ms 만큼 시간 지연을 한 뒤 콜백 함수를 실행하라는 명령이다. 0.3초 뒤 전역객체가 출력된다.
setTimeout(function () {
  console.log(this);
}, 300);

// forEach 메서드는 배열의 각 요소를 앞에서부터 차례로 하나씩 꺼내어 그 값을 콜백 함수의 첫 번째 인자로 삼아 함수를 실행하라는 명령이다.
// 전역객체와 배열의 각 요소가 총 5회 출력된다.
[1, 2, 3, 4, 5].forEach(function (x) {
  console.log(this, x);
});

// addEventListener는 지정한 HTML 엘리먼트에 'click' 이벤트가 발생할 때마다 그 이벤트 정보를 콜백 함수의 첫 번째 인자로 삼아 함수를 실행하라는 명령이다.
// 버튼을 클릭하면 앞서 지정한 엘리먼트와 클릭 이벤트에 관한 정보가 담긴 객체가 출력된다.
document.body.innerHTML += '<button id="a">클릭</button>';
document.body.querySelector('#a').addEventListener('click', function (e) {
  console.log(this, e);
});

// *** 3번 예제 ***
var report = {
  sum: 0,
  count: 0,
  add: function () {
    // add 메서드는 arguments를 배열로 변환해서 args 변수에 담고,
    var args = Array.prototype.slice.call(arguments);
    // 이 배열을 순회하면서 콜백 함수를 실행하는데
    // 이때 콜백 함수 내부에서의 this는 forEach 함수의 두 번째 인자로 전달해준 this가 바인딩된다.
    args.forEach(function (entry) {
      this.sum += entry;
      ++this.count;
    }, this);
  },
  // average는 sum 프로퍼티를 count 프로퍼티로 나눈 결과를 반환하는 메서드이다.
  average: function () {
    return this.sum / this.count;
  },
};

// 60, 85, 95로 를 인자로 삼아 add 메서드를 호출하면 이 세 인자를 배열로 만들어 forEach 메서드가 실행된다.
// 콜백 함수 내부에서의 this는 add 메서드에서의 this가 전달된 상태이므로 add 메서드의 this(report)를 그대로 가리킨다.
report.add(60, 85, 95);
console.log(report.sum, report.count, report.average());
