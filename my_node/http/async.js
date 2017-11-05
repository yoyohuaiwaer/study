/**
 * Created by A on 2017/6/27.
 */
var c = 0;
function printIt(){
    console.log('print'+c);
}
function plus(callback){
    setTimeout(function(){
        c += 1;
        callback();
    },1000)

}
plus(printIt);

