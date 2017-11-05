/**
 * Created by A on 2017/7/6.
 */
var fs = require('fs');
var source = fs.readFileSync('../buffer/logo4.gif');//被拷贝文件
fs.writeFileSync('stream_copy.gif',source);//在当前文件加下写入buffer文件夹下的那张图片
//实际就是copy一张图片到当前文件夹下，并赋予它新的名字