/**
 * Created by A on 2017/6/26.
 */
var klass = require('./klass');

function add(klass){
    klass.forEach(function(item,index){
        var Name = item.name;
        var teacher = item.teacher;
        var students = item.students;
        console.log('class:'+Name);
        klass.add(teacher,students);
    })
}
exports.add = add ;
klass.add('scott',['张三','李四']);