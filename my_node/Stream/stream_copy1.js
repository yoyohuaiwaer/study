/**
 * Created by A on 2017/7/7.
 */
//copy文件采用流式，一遍读取一遍写入
var fs =  require('fs');
var readStream = fs.createReadStream('me before u.mp4');//创建可读流
var writeStream = fs.createWriteStream('copy_stream.mp4');//创建可写流
/*readStream.on('data',function(chunk){//读取到data
    writeStream.write(chunk);//读取到readStream的内容，writeStream就开始写入
})
readStream.on('end',function(){
    writeStream.end();
})*/
//以上就是很纯粹的拷贝文件代码
//但是会出现问题，就是读得快，写得慢
//因此我们就要看看读取到缓存区域的文件是否已经写入目标文件，如果未写入，那么先暂停下读取文件
//代码修改如下

readStream.on('data',function(chunk){//读取到data
    if(writeStream.write(chunk)===false){//读取的内容还在缓存区
        console.log('still cached');
        readStream.pause();//暂停读取
    }
})
readStream.on('end',function(){
    writeStream.end();
})
//同样writeStream有个Drain（耗尽的意思）方法，说明data已经写入到目标文件了，那么久可以告诉readStream可以继续读取了
writeStream.on('drain',function(){
    console.log('data drain');
    readStream.resume();//继续读取
})


