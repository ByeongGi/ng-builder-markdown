---
title: 111BDD 기본 개념 및 기타 개념11
date: 2018-06-30 19:24:00
catagory: "BDD"
tags: ['BDD','TEST 코드','Jasmine','TDD']
---
1212122121
# 1dss
ddd
dsdasdsaddsd
ㄴㄴ
sdasdsadsadsadsad

dsdasd
dddsd

## 1-1. BDD 기본 개념d
- Given : 초기 상황, "어떤 버튼은"
- When : 어떤 이벤트가 발생, "클릭하면"
- Then : 후속결과를 기대, "결고창을 띄운다"

```js
describe('어떤버튼은', function() {        // Given
    describe('클릭했을떄', function() {     // When
        it('경고창을 띄운다', function() {  // Then
        });
    });
});
```

# 2-1. 테스트 더블이란 

>  테스트하기 곤란한 컴포넌트를 대체하여 테스트하는것 

특정한 동작을 흉내내어 테스트할때 사용한다.

> 아래 5가지를 통칭하여 테스트 더블이라 한다.

- 더미(dummy): 인자를 채우기 위해 사용
- 스텁(stub) : 더미를 개선하여 실제 동작하게 만든것. 리턴값을 하드 코딩한다. 
- 스파이(spy) : 스텁과 유사학, 내부적으로 기록을 남기는 추가 기능
- 페이크(fake) : 스텝에서 발전한 실제 코드
- 목(mock): 더미, 스텁, 스파이를 혼합한 형태

> 자스민에서는 테스트 더블을 스파이스(spies) 라고 한다.

# 2. Jasmine 기본 사용법

## 2-1.Basic

### 기본적인 테스트

```js
// describe은 스펙 그룹을 생성한다. 
// describe은 중첩하여 사용 트리 형태로 사용가능가능하다.
describe("A test", function() { 
  it("should pass", function() { // it은 하나의 스펙을 정의한다.
    var passing = true;
    expect(passing).toBe(true);
  });
);
```

### An expectation
```js
expect(greatness).toBe(true);
```

### Before and After
```js
describe("before & after", function() {
  beforeEach(function() {
    // describe 안에 정의된 각각의 스펙을 호출하기 전에 공유되는 세팅들을 준비한다.
    // 여기서 미리 mocks, spies의 등을 세팅한다.
  });
  afterEach(function() {
    // clean up
    // 세팅한 것을 모두 해체 또는 제거한다
  });
});
```

## 2-1. Matchers

```js
expect(obj).toBe(null);	// Objects must be the same object
expect(obj).toEqual({id: 7});	
expect(msg).toMatch(/abc/);	// Tests a regular expression.
expect(obj).toBeDefined();	
expect(obj).toBeUndefined();	
expect('a').toBeTruthy();	
expect(obj).toBeFalsy();	// Falsy values: false, 0, "", null, undefined, NaN
expect(arr).toContain();	// Find an item in an array.
expect(7).toBeLessThan(42);	
expect(42).toBeGreaterThan(7);	
expect(1.2).toBeCloseTo(1.23, 1); // 	2nd arg is decimal precision. 0 rounds.
expect(fn).toThrow();	// Passes if fn throws an exception.
expect(obj).toThrowError(err);	// Expect a specific error.
expect(obj).toBeNull();
```


## 3-1. Spy

### spy 생성하기
```js
spyOn(obj, 'method');
jasmine.createSpy('optional name');
jasmine.createSpyObj('name',
    ['fn1', 'fn2', ...]);
```

### spy 동작 수정하기
```js
obj.method.and.callThrough(); // spy 가 실행시에, 실제 구현된 부분을 호출되도록 한다.
obj.method.and.returnValue(val); // spy 가 실행시에, 값을 반환되도록하낟.
obj.method.and.callFake(fn); // spy 가 실행시에 가짜로 구현된 부분이 실행되도록한다.
obj.method.and.throwError(err); // spy 가 실행시에 에러를 던지도록 한다. 
obj.method.and.stub(); // spy 가 어떤것도 하지 않도록 한다.
```
### Count/verify calls
```js
obj.method.calls.any(); // spy가 실행되었는지 확인한다.
obj.method.calls.count(); // spy가 실행 횟수를 가져온다.
obj.method.calls.reset(); // spy 가 호출 되지 않은 것처럼 리셋한다.
```
### Inspect calls
```js
obj.method.calls.first(); // 이 spy의 첫번째 실행에 대한 것을 가져온다.
obj.method.calls.mostRecent(); // 이 spy의 최근 실행에 대한 것을 가져온다.
obj.method.calls.all(); // 이 spy의 모든 실행에 대한 것을 가져온다.
```
### Call description object( spy 실행에 대한 결과로 리턴되는 형태)
```js
// 하나일 경우
{
 object: {...}, // 'this' object
 args: []      // the arguments passed
}
// 여러개일 경우
[
  {
    object: {...},  // 'this' object
    args: [...]     // array of arguments
  },  
  ...               // one object for each call
]
```
