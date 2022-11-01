
// function a() {
//     console.log('A');
// }

// >> 이름이 없어 : 익명함수 >> 호출을 할 수가 없다 
// function() {
//     console.log('A');
// }

// >> 이름을 지어준다, 함수가 앖이다
var a = function() {
    console.log('A');
}

function slowfunc(callback) {
    callback();
}

slowfunc(a);

// callback함수 = parameter가 반드시 함수인 함수
// 왜 이런 형태인가? > 어플리케이션의 비동기 처리를 위해 필요하다
// 비동기 처리는 왜 필요한가? > 주어진 요청을 동기적으로 처리하면 들어가는 리소스가 많아지기 때문이다.