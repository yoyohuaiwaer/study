/**
 * Created by A on 2017/10/24.
 */
/**
 * Created by A on 2017/10/24.
 */

//参考资料  http://www.cnblogs.com/well-nice/p/4801408.html
//http://www.cnblogs.com/xiaohuochai/p/6914830.html     代码检查工具jshint和csslint
//echo test > .csslintrc  创建一个名字为空的后缀名为.csslintrc的文件
// http://www.alloyteam.com/nav/ 前端资料 柯总发的

//包装函数
module.exports = function(grunt){

    //任务配置，所有插件的配置信息
    grunt.initConfig({
        //获取 package.json的信息
        pkg: grunt.file.readJSON('package.json'),
        //uglify插件配置信息
        uglify:{
            options:{
                stripBanners:true,//中规定允许生成的压缩文件带banner
                banner:'/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            build:{
                src:'src/test.js',
                dest:'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
            }
        },
        jshint:{
            build:['Gruntfile.js','src/*.js'],
            options:{
                jshintrc:'.jshintrc'
            }
        }
    });
//告诉grunt我们将使用的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //告诉grunt当我们在终端中输入grunt时需要做什么（注意先后顺序）
    grunt.registerTask('default',['uglify','jshint']);
}
//grunt插件库中较常用的插件
//Contrib-jshint——javascript语法错误检查；
//Contrib-watch——实时监控文件变化、调用相应的任务重新执行；
//Contrib-clean——清空文件、文件夹；
//Contrib-uglify——压缩javascript代码
//Contrib-copy——复制文件、文件夹
//Contrib-concat——合并多个文件的代码到一个文件中
//karma——前端自动化测试工具

