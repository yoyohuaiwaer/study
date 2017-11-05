var http = require('http');
var hostname = '10.10.23.69';
var port = 49502;
var server = http.createServer(function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello\n')
    res.end();
});
server.listen(port,hostname);
console.log(("Server running at http://" + hostname + ":" + port + "/"));
