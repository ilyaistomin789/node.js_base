var http = require('http');
var server = http.createServer();
server.on('request',function (request, response) {
    console.log("Connection open successfully");
   //response.end("<h1>Hello World</h1>", 'utf-8', () => {console.log("finish")});
    response.setHeader("Content-Type", "text/html");
    response.write("url: " + request.url + "<br/>");
    response.write("Request method: " + request.method + "<br/>");
    response.write("Headers: ");
    let s = '';
    for (const head in request.headers){
        s += head + ':' + request.headers[head] + '<br/>';
    }
    response.write(s);
    response.end(); // must have
})
server.listen(8080);
server.on('listening',function (){
    console.log("port 8080");
})