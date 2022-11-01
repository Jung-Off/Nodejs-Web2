var M = {
    v:'v',
    f:function(){
        console.log(this.v);
    }
}

//모듈이 담긴 mpart.js에 여러기능 중에서 M이 가리키는 객체를 모듈밖에서 사용할 수 있도록 export
module.exports = M;