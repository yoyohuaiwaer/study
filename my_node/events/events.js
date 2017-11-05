/**
 * Created by A on 2017/6/29.
 */
var EvemtEmitter = require('events').EventEmitter;
var life = new EvemtEmitter;
life.setMaxListeners(11);//监听事件的最大值
function milk(who){
    console.log('give '+who+' milk');
}
life.on('hahaha',function(who){//事件发射   第一个参数为事件名称  第二个为回调函数
    console.log('give '+who+' water');
})
life.on('hahaha',milk)
life.on('hahaha',function(who){
    console.log('give '+who+' orange');
});
life.on('eeeeee',function(who){
    console.log('give '+who+' coffee');
})
//life.emit('hahaha','scotte');//事件监听
life.emit('eeeeee','yoyo');
life.removeListener('hahaha',milk);
life.removeAllListeners('hahaha')//批量移除某个事件名的监听事件   不传就会移除所有监听事件
life.listeners('hahaha').length;//查看有多少个监听事件  如果不传具体事件名  就会没有
EvemtEmitter.listenerCount(life,'hahaha')//第一个为实例名字 第二个为具体某个事件

//life.removeListener('hahaha',milk);
//life.removeListener('hahaha',milk);
//var hasConfortListener =  life.emit('hahaha','scotte');//事件是否被监听  会返回booleans值
//console.log(hasConfortListener);
