/**
 * Created by A on 2017/6/29.
 */
var http = require('http');
var url = 'http://www.imooc.com/learn/348';
http.get(url,function(res){
    var html = '';
    res.on('data',function(data){
        html += data;
    });
    res.on('end',function(){
        //console.log(html);
        var main = document.getElementById('main');
        main.innerHTML(html);
    });
    res.on('error',function(){
        console.log('获取课程数据出错！');
    });
})