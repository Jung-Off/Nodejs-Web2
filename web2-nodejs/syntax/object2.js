
// var i = if (true) {console.log(1)};

// var w = while (true){console.log(1)};

var f = function() {
    console.log(1+2);
    console.log(2);
}

// console.log(f);
// f();

var a = [f];
a[0]();

var o = {
    func:f
}

o.func();