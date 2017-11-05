/**
 * Created by A on 2017/6/30.
 */
//==========================分割线==========================

//url.parse（_url）是对一个地址的解析
url.parse( 'http://imooc.com/course/list')//先打node按回车  再打如下代码 按回车  ：
//====================如下为node里运行返回的键值对
Url = {//本来应该是‘url{’ 为了使在js文件里显示不报错   所以加了等号
    protocol: 'http:',//底层使用协议
        slashes: true,//是否有协议的双斜线
        auth: null,
        host: 'imooc.com',//服务器的ip地址或者域名
        port: null,//端口  默认是80端口  如果使用别的端口  就必须指明
        hostname: 'imooc.com',//主机名
        hash: null,//就是hash值   通常对应的是页面上某个锚的内容
        search: null,//查询字符串参数
        query: null,//发送给服务器的数据   通常是键值对或者参数串
        pathname: '/course/list',//访问资源路径名
        path: '/course/list',//访问资源路径
        href: 'http://imooc.com/course/list'//未被解析的url
}



//==========================分割线==========================
url.parse('http://imooc.com:8080/course/list?from=scott&course=node#floor1');//返回数据如下
Url={
    protocol: 'http:',
        slashes: true,
        auth: null,
        host: 'imooc.com:8080',
        port: '8080',
        hostname: 'imooc.com',
        hash: '#floor1',
        search: '?from=scott&course=node',
        query: 'from=scott&course=node',
        pathname: '/course/list',
        path: '/course/list?from=scott&course=node',
        href: 'http://imooc.com:8080/course/list?from=scott&course=node#floor1' }



//==========================分割线==========================
url.parse('http://imooc.com:8080/course/list?from=scott&course=node#floor1',true);//解析出的query使用字符串 还是用键值对格式显示   默认不加此参数 就为false【字符串】
//解析结果如下：
Url= {
    protocol: 'http:',
        slashes: true,
        auth: null,
        host: 'imooc.com:8080',
        port: '8080',
        hostname: 'imooc.com',
        hash: '#floor1',
        search: '?from=scott&course=node',
        query: { from: 'scott', course: 'node' },//和上面一段比   差异再次
    pathname: '/course/list',
        path: '/course/list?from=scott&course=node',
        href: 'http://imooc.com:8080/course/list?from=scott&course=node#floor1' }



//==========================分割线==========================
url.parse('//imooc.com:8080/course/list?from=scott&course=node#floor1',true,true);//第三个参数  如果不知道协议是http还是https的时候  就需要加  来得到正确的解析
//不加的情况解析为
Url={
    protocol: null,
        slashes: null,
        auth: null,
        host: null,//这
        port: null,
        hostname: null,//这 解析出来都为空
        hash: '#floor1',
        search: '?from=scott&course=node',
        query: { from: 'scott', course: 'node' },
    pathname: '//imooc.com:8080/course/list',
        path: '//imooc.com:8080/course/list?from=scott&course=node',//上面把整个当成一个路径
        href: '//imooc.com:8080/course/list?from=scott&course=node#floor1'
}
//加的情况下  解析为
Url={
    protocol: null,
        slashes: true,
        auth: null,
        host: 'imooc.com:8080',//this
        port: '8080',//this
        hostname: 'imooc.com',//还有这  都能解析出结果
        hash: '#floor1',
        search: '?from=scott&course=node',
        query: { from: 'scott', course: 'node' },
    pathname: '/course/list',//正确解析
        path: '/course/list?from=scott&course=node',//正确解析
        href: '//imooc.com:8080/course/list?from=scott&course=node#floor1' }



//==========================分割线==========================

//url.format  使用一些键值对 解析出唯一识别的http的地址
url.format({
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: 'imooc.com:8080',
    port: '8080',
    hostname: 'imooc.com',
    hash: '#floor1',
    search: '?from=scott&course=node',
    query: 'from=scott&course=node',
    pathname: '/course/list',
    path: '/course/list?from=scott&course=node',
    href: 'http://imooc.com:8080/course/list?from=scott&course=node#floor1' })
//解析结果如下：
'http://imooc.com:8080/course/list?from=scott&course=node#floor1'



//==========================分割线==========================
url.resolve()//地址加路劲  生成合法的http地址
url.resolve( 'http://imooc.com/','/course/list')
//node解析出来如下
'http://imooc.com/course/list'
