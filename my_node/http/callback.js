/**
 * Created by A on 2017/6/27.
 */
function learn(sth){
    console.log(sth);
}
function we(callback,name){
    name += ' is very well';
    callback(name);
}
we(learn,'nodejs');

