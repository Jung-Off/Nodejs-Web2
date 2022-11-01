
// nodejs readdirjs 실행 파일의 위치가 아니라 실행위치 기준으로 data 경로 적기
var testFolder = './data';
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist) {
    console.log(filelist);
})