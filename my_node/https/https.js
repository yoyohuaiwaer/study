/**
 * Created by A on 2017/7/3.
 */
var https = require('https');
var fs = require('fs');// �ļ�ϵͳģ��
//http��http��tcp��ip����https(http��ssl/tls��tcp��ip)���������� https����
var options = {
    key: fs.readFileSync('ssh_key.pem'),//save
    cert: fs.readFileSync('ssh_cert.pem')//����
}

https.createServer(options,function(req,res){
    res.writeHead(200);
    res.end('hello word');
}).listen(8090)//listen()Ϊ����