// 아무것도 출력이 되지 않음
// Node nodejs/fileread.js
// fileread는 sample과 같은 dir
// node 는 상위에서 web2에서 찾아
// cd nodejs 해서 실행

var fs = require('fs');
fs.readFile('sample.txt', 'utf8', function(err, data){
console.log(data);
});