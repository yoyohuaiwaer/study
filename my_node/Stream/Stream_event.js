/**
 * Created by A on 2017/7/6.
 */
var fs = require('fs');
var readStream = fs.createReadStream('me before u.mp4');
var n = 0;
readStream.on('data',function(chunk){//流数据传输的时候的data事件
    n++;
    console.log('data emits');
    console.log(Buffer.isBuffer(chunk));
    console.log(chunk.toString('utf-8'));
   /* readStream.pause();//暂停流
    console.log('data pause');
    setTimeout(function(){
        console.log('data pause end');
        readStream.resume();//重启流
    },10)*/

})
.on('readable',function(){//readable事件
        console.log('data readable');
    })
.on('end',function(){
        console.log('data end');
        console.log(n);
    })
.on('close',function(){
        console.log('data close');
    })
.on('error',function(e){
        console.log('data error' + e);
    })