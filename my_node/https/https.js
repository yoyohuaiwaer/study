/**
 * Created by A on 2017/7/3.
 */
var https = require('https');
var fs = require('fs');// 文件系统模块
//http（http、tcp、ip）和https(http、ssl/tls、tcp、ip)的区别在于 https多了
var options = {
    key: fs.readFileSync('ssh_key.pem'),//save
    cert: fs.readFileSync('ssh_cert.pem')//整数
}

https.createServer(options,function(req,res){
    res.writeHead(200);
    res.end('hello word');
}).listen(8090)//listen()为监听