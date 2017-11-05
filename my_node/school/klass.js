/**
 * Created by A on 2017/6/26.
 */
var student = require('./student');
var teacher = require('./teacher');

function add(teacherName,students){
    teacher.add(teacherName);
    students.forEach(function(item,index){
        student.add(item)
    })
}
exports.add = add;