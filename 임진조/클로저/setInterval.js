// setInterval 콜백으로 inner를 넘기는 경우
(function () {
  var a = 0;
  var intervalId = null;
  var inner = function () {
    if (++a > 10) {
      // 지역변수 참조조
      clearInterval(intervalId);
    }
    debugger;
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
})();
