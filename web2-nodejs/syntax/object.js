var members = ['egoing', 'k8805', 'hoya'];

console.log(members[1]);

var i = 0;
while(i < members.length) {
    console.log('array loop', members[i]);
    i = i + 1;
}

var roles = {
    'programer':'egoing',
    'designer' : 'k8805',
    'manager' : 'hoya'
}

console.log(roles.designer);
console.log(roles['designer']);

// 객체의 식별자 key가 들어오도록
for(var name in roles) {
    console.log('object => ', name, 'value => ', roles[name]);
}
