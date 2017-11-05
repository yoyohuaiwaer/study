/**
 * Created by A on 2017/7/4.
 */
//buffer是底层数据的存储
/*var buf = new Buffer();
buf.write('imooc change to string',0,16,'utf-8');*/
//在buffer中写入内容 第一个为字符串 第二个参数为开始写入的索引值，第三个参数为写入的长度，第四个为编码格式
//node 返回结果 13


/*buf.toString()*/
//node 返回结果为 'imooc change to'
/*var buf2 = new Buffer(5);
buf.copy('string',0,6,11)*/
//第一个参数复制的目标buffer，第二个参数目标buffer中从第几个开始写（默认0），第三个参数原buffer获取数据的开始位置
//第四个元数据获取的结束位置(默认原buffer的长度)



var fs = require('fs');
fs.readFile('logo4.gif',function(err,origin_buffer){
    console.log(Buffer.isBuffer(origin_buffer));
    fs.writeFile('logo_buffer.gif',origin_buffer,function(err){
        if(err) console.log(err);
    })
    var base64Image = origin_buffer.toString('base64');
    console.log(base64Image);
    var codeImage = new Buffer(base64Image,'base64');
    console.log(Buffer.compare(origin_buffer, codeImage));
    fs.writeFile('logo_code.gif',function(err){
        if(err) console.log(err)
    })
})