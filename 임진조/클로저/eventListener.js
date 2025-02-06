// 이벤트리스너 콜백으로 넘기는 경우
(function () {
  var count = 0;
  var button = document.createElement("button");
  button.innerText = "click";
  button.addEventListener("click", function () {
    console.log(++count, "time clicked"); // count지역 변수를 계속해서 참조하는 콜백함수기 때문에 GC에 의해 삭제되지 않으며 클로저 형성
  });
  document.body.appendChild(button);
})();
