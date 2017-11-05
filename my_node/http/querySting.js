/**
 * Created by A on 2017/6/30.
 */
//querystring
//把参数的对象如何快速的序列化为参数字符串
querystring.stringify({name:'yoyo',course:['jade','node'],from:''},',',':')//第一个为参数对象，第二个为各对象键值对之间的链接（默认为‘&’），第三个为每个键值的链接符（默认为‘=’）
//第二个和三个参数为非必传，不传为默认的
//此为二、三个参数都传的结果
'name:yoyo,course:jade,course:node,from:'
//此为传第二个参数的结果
'name=yoyo,course=jade,course=node,from='
//此为默认，不传第二和第三个参数的结果
'name=yoyo&course=jade&course=node&from='


//把字符串反序列化为对象
//相反于querystring.stringify()后两个参数同理
querystring.parse('name=yoyo&course=jade&course=node&from=')

//转译和反转译
querystring.escape('哈哈')//转移
//结果
'%E5%93%88%E5%93%88'
querystring.unescape('%E5%93%88%E5%93%88')//反转译
//结果
'哈哈'