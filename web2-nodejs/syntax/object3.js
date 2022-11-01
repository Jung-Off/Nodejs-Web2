 
//연관된 값들을 하나의 객체안에 정리 정돈
var q = {
    v1:'v1',
    v2:'v2',
    f1:function() {
        console.log(this.v1);
    }, 
    f2:function() {
        console.log(this.v2);
    }
}

q.f1();
q.f2();