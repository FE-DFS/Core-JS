// 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때
function 바인드콜백() {
  var fruits = ["apple", "banana", "peach"];
  var $ul = document.createElement("ul");
  var alertFruit = function (fruit) {
    alert("your choice is " + fruit);
  };

  fruits.forEach(function (fruit) {
    var $li = document.createElement("li");
    $li.innerText = fruit;
    $li.addEventListener("click", alertFruit.bind(null, fruit)); // 새로운 함수를 반환하기 위해 bind 사용
    $ul.appendChild($li);
  });

  document.body.append($ul);
}

function 클로저콜백() {
  var fruits = ["apple", "banana", "peach"];
  var $ul = document.createElement("ul");
  var alertFruit = function (fruit) {
    // 여기서 arg로 받은 fruit는 클로저로 갇힌다.
    return function () {
      alert("your choice is " + fruit); // 외부 변수 fruit 사용 -> 클로저 생성
    };
  };

  fruits.forEach(function (fruit) {
    var $li = document.createElement("li");
    $li.innerText = fruit;
    $li.addEventListener("click", alertFruit(fruit));
    $ul.appendChild($li);
  });

  document.body.append($ul);
}

function 부분적용함수() {
  var add = function () {
    debugger;
    var result = 0;
    for (var i = 0; i < arguments.length; i++) {
      result += arguments[i];
    }
    return result;
  };
  var addPartial = add.bind(null, 1, 2, 3, 4, 5); // bind로 새로운 함수 생성
  console.log(addPartial(6, 7, 8, 9, 10));
}

// 전역 상수 정의
Object.defineProperty(window, "_", {
  value: "EMPTY_SPACE",
  writable: false,
  configurable: false,
  enumerable: false,
});

var 부분적용함수2 = function () {
  var originalPartialArgs = Array.prototype.slice.call(arguments); // 원본 인수 배열화
  var func = originalPartialArgs.shift(); // 첫 번째 인자를 함수로 추출

  if (typeof func !== "function") {
    throw new Error("첫 번째 인자가 함수가 아닙니다.");
  }

  return function () {
    var restArgs = Array.prototype.slice.call(arguments); // 추가로 전달된 인수들 복사
    var finalArgs = originalPartialArgs.slice(); // 원본 부분 적용된 인수 복사

    // 빈 자리(EMPTY_SPACE) 채우기
    for (var i = 0; i < finalArgs.length; i++) {
      if (finalArgs[i] === _) {
        finalArgs[i] = restArgs.shift(); // restArgs에서 남은 인수를 채운다
      }
    }

    // 원래 함수 실행
    return func.apply(this, finalArgs.concat(restArgs));
  };
};

function 부분적용함수2_Test() {
  var add = function (a, b, c) {
    return a + b + c;
  };

  var addPartial = 부분적용함수2(add, 1, _, 3);
  console.log(addPartial(2)); // 1 + 2 + 3 = 6

  var greet = function (prefix, name, suffix) {
    return prefix + name + suffix;
  };

  var greetPartial = 부분적용함수2(greet, "Hello, ", _, "!");
  console.log(greetPartial("Alice")); // "Hello, Alice!"
}
function 커링함수() {
  const curry = (func) => (baseUrl) => (path) => (id) =>
    func(baseUrl, path, id);

  const createUrl = (baseUrl, path, id) => `${baseUrl}/${path}/${id}`;

  const curriedCreateUrl = curry(createUrl);

  const url = curriedCreateUrl("https://api.example.com")("users")("123");
  console.log(url); // "https://api.example.com/users/123"
}
