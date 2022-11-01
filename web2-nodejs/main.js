
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
//refactoring
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    //pathname 으로는 home과 각각의 page 구분 x
    
    if (pathname === '/') {
      if (queryData.id === undefined) {

        fs.readdir('./data', function(error, filelist){    
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = template.list(filelist);
            var html = template.html(title, list, `<h2>${title}</h2>${description}`,
            ` <a href="/create">create</a>`);
            response.writeHead(200);
            response.end(html);
        })
//  update click update page
//  delete 여기서 삭제하고 싶은데 >> 링크로 만들면 대단히 잘못됨
// 링크를 클릭하면 이동해 주소를 카피해서 > 누군가에게 보냄 > 해킹의 가능성
// query string 이 있다면 GET방식!
// form으로 할거임
      } else {
        fs.readdir('./data', function(error, filelist){
          var filteredId = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
            // var description = 'Hello, Node.js';
            var title = queryData.id;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
              allowedTags:['h2']
            });
            var list = template.list(filelist);
            //delete click 했을 때 delete_process로 data보내고 싶다 action
          var html = template.html(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
          ` <a href="/create">create</a>
            <a href="/update?id=${sanitizedTitle}">update</a>
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete"> 
            </form>
          `);
          //submit 버튼의 lable이 delete
          // 디자인은 css
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if(pathname === '/create') {
    fs.readdir('./data', function(error, filelist){    
      var title = 'Web - create';
      var list = template.list(filelist);
      var html = template.html(title, list, 
        `
        <form action="/create_process" method="post">
    <p><input type="text" name="title" placeholder="title"></p>
    <p>
        <textarea name="description" placeholder="description"></textarea>
    </p>
    <p>
        <input type="submit">
    </p>
    </form>

        `, '');
      response.writeHead(200);
      response.end(html);
  });
  } else if(pathname === '/create_process') { // create 의 redir
    var body = '';

    //  data, end 라는 event 를 이용해서 web 브라우저
    //  전송된 데이터 가져올 수
    //  parse이용해서 정보를 전환/ 객체화
        request.on('data', function (data) {
        body += data;
        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        // if (body.length > 1e6)
        //     request.connection.destroy();
    });

        request.on('end', function () {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8',
            function(err){
              // response.writeHead(200);
              response.writeHead(302, { Location: `/?id=${title}`});
              response.end();
            });
            // console.log(post.title);
            // use post['blah'], etc.
        });

  } else if (pathname === '/update') {
    fs.readdir('./data', function(error, filelist){
      var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        var list = template.list(filelist);
        var title = filteredId;
      var html = template.html(title, list, 
        `
        <form action="/update_process" method="post">
        <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
            <textarea name="description" placeholder="description">${description}</textarea>
        </p>
        <p>
            <input type="submit">
        </p>
        </form>

        `,
      `<a href="/create">create</a> <a href= "/update?id=${title}">update </a>`);
      response.writeHead(200);
      response.end(html);
    });
  });
  } else if(pathname === '/update_process') {
    var body = '';
        request.on('data', function (data) {
        body += data;
    });
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function(error) {
              fs.writeFile(`data/${title}`, description, 'utf8',
              function(err){
                response.writeHead(302, { Location: `/?id=${title}`});
                response.end();
              });

            })
            console.log(post);
        });
  } else if(pathname === '/delete_process') {
    var body = '';
        request.on('data', function (data) {
        body += data;
    });
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(id).base;
            fs.unlink(`data/${filteredId}`,function(error){
              response.writeHead(302, { Location: `/`});
                response.end();
            })
        }); 
  } else {
      response.writeHead(404);
      response.end('Not found');
  }
});
app.listen(3000);

// 함수의 이름과 파라미터 리턴값  함수를 만든 노드js 개발자, 노드js이용하는 개발자사이의 약속
// interface
// interface통해 application을 만들 수 있어
// application을 프로그래밍하기 위한 interface를 
// api 란 application programming interface
// 
