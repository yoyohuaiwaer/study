/**
 * Created by A on 2017/6/28.
 */
var http = require('http');//搭建web服务器
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.write('Hello Nodejs');
    res.end();
}).listen(2015)