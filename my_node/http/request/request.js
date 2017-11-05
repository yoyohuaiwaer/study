/**
 * Created by A on 2017/6/29.
 */
//Accept:application/json, text/javascript, */*; q=0.01
// Accept-Encoding:gzip, deflate
// Accept-Language:zh-CN,zh;q=0.8
// Cache-Control:no-cache
// Connection:keep-alive
// Content-Length:95
// Content-Type:application/x-www-form-urlencoded; charset=UTF-8
// Cookie:imooc_uuid=a54e9699-98e8-4ad1-b550-9ee9efae0b3f; imooc_isnew_ct=1483590248; PHPSESSID=o8p6oi49h2rlht5r1qbad7jao0; loginstate=1; apsid=M1NGQxODdmM2JhZGQ2NzEzMzI2ZDczZGQ1YzdkZmUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTg4MzI5MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMDc3MDc2MDdAcXEuY29tAAAAAAAAAAAAAAAAAAAAADFmYzZmOTE4MGMxZjk2ZmU5OWQ3YmRmOGU4NTZlZGFisfZRWbH2UVk%3DMD; last_login_username=107707607%40qq.com; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1498543777; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1498723375; imooc_isnew=2; cvde=5951f6a6351bd-118
// Host:www.imooc.com
// Origin:http://www.imooc.com
// Pragma:no-cache
// Referer:http://www.imooc.com/comment/348
// User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36
// X-Requested-With:XMLHttpRequest
var http = require('http');
var querystring = require('querystring');//序列化
 var postDate = querystring.stringify({
  /*'ck':'SFo1',
  'rv_comment':'我帮你灌个烫吧',
  'start':'0',
  'submit_btn':'加上去'*/
  'ck':'SFo1',
  'rv_comment':'勿怪勿怪    ！！ 随便找了篇文章测试而已   打扰到见谅哈！',
  'start':'0',
  'submit_btn':'加上去'

 });
var options = {
  hostname:'www.douban.com',
  port: 80,
  path:'group/topic/104274429/add_comment',
  method:'POST',
  headers:{
   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
 'Accept-Encoding':'gzip, deflate, br',
 'Accept-Language':'zh-CN,zh;q=0.8',
 'Cache-Control':'no-cache',
 'Connection': 'keep-alive',
 'Content-Length': postDate.length,
 'Content-Type':'application/x-www-form-urlencoded',
 'Cookie':'ll="118282"; bid=CJ9p6KaOutc; _vwo_uuid_v2=7A1480074C1F4CD8378130E8D6239316|9d8e6bd6fcab79f7339eae184d0e0239; __yadk_uid=VoiBO9ow01UFxd6x74ZZtv7WDYqqNYzB; dbcl2="58427849:UBbK2E/+zN0"; _ga=GA1.2.1757389429.1494575124; _gid=GA1.2.1106894828.1498728217; ck=SFo1; __utmt=1; ap=1; _pk_id.100001.8cb4=0c76d933df5af33d.1498728215.1.1498728347.1498728215.; _pk_ses.100001.8cb4=*; push_noty_num=0; push_doumail_num=0; __utma=30149280.1757389429.1494575124.1498728221.1498728221.1; __utmb=30149280.24.6.1498728347794; __utmc=30149280; __utmz=30149280.1498728221.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=30149280.5842',
 'Host':'www.douban.com',
 'Origin':'https://www.douban.com',
 'Pragma':'no-cache',
 'Referer':'https://www.douban.com/group/topic/104274429/',
 'Upgrade-Insecure-Requests':'1',
 'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
  }
}
var req = http.request(options,function(res){
 console.log('status:' + res.statusCode);
 console.log('headers: '+ JSON.stringify(res.headers))
 res.on('data',function(chunk){

 });
 res.on('end',function(){
  console.log('评论完毕');
 })
})
req.on('error',function(e){
 console.log('error: '+ e.message);
})
req.write(postDate);
req.end();