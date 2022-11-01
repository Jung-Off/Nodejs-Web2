var fs = require('fs');

/* sync 동기 return 있어
//readFileSync

console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

// A B C

// 비동기 (를 선호 nodejs) >> return x 함수를 3번째 인자로
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
});

console.log('C');

// A C B
// readFile의 결과를 가져오기도 전에 C가 실행이 되고
// readFile대로 동작하다가 작업이 끝나면 함수가 호출되면서 함수안 의 코드가 나중에 실행

// 성능을 올리기 위해선 비동기 적으로