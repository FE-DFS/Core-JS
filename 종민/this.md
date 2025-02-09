addEventListener 메서드는 콜백 함수를 호출할 때 자신의 this를 상속하도록 정의돼 있다. 그러니까 메서드명의 점(.) 앞부분이 곧 this가 되는 것.

그러므로 콜백 함수에서의 this는 '무조건 이거다!'라고 정의할 수 없다.

콜백 함수의 제어권을 가지는 함수(메서드)가 롤백 함수에서의 this를 무엇으로 할지를 결정하며，특별히 정의하지 않은 경우에는 기본적으로 함수와 마찬가지로 전역객체를 바라본다.

ES6에서는 유사배열객체 또는 순회 가능한 모든 종류의 데이터 타입을 배열로 전환하는 Array.from 메서드를 새로 도입했습니다.

```js
function Person(name, gender) {
    this.name = name；
    this.gender = gender；
}
function Student(name, gender, school) {
    Person.call(this, name, gender)；
    this.school = school；
}
function Employee(name, gender, company) {
Person.apply(this, [name, gender])；
this.company = company；
}
var by = new Student (’보영', 'female’,  단국대’);
var jn = new Employee('재난', 'male', '구골')
```

bind로 반환된 함수는 콘솔에 찍으면 bound가 앞에 붙어 나온다.


콜백 함수를 인자로 받는 메서드 중 일부는 추가로 this로 지정할 객체 (thisArg)를 인자로 지정할 수 있는 경우가 있다. 이러한 메서드의 thisArg 값을 지정하면 콜백 함수 내부에서 this 값을 원하는 대로 변경할 수 있다. 이런 형태는 여러 내부 요소에 대해 같은 동작을 반복 수행해야 하는 배열 메서드에 많이 포진돼 있다.