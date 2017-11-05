var http = require('http');//引入http模块
var hostname = '10.10.23.69';//ip
var port = 49502;//端口号
var server = http.createServer(function(req, res) {//创建一个web服务器    req请求体   res响应体   req是发送的数据如提交的数据  res为收到提交数据后  返回的数据
    //console.log(req);
    //res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200,{'Content-Type': 'text/plain'})//6 7行可以综合为如下，在响应头里的状态为200
    res.end('Hello node.js\n');
});
server.listen(port,hostname);//监听服务器
console.log(("Server running at http://" + hostname + ":" + port + "/"));
//停掉当前服务 ctrl+c  然后在node 启动服务
