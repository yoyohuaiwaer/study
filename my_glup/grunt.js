/**
 * Created by A on 2017/10/24.
 */
/**
 * Created by A on 2017/10/24.
 */

//�ο�����  http://www.cnblogs.com/well-nice/p/4801408.html
//http://www.cnblogs.com/xiaohuochai/p/6914830.html     �����鹤��jshint��csslint
//echo test > .csslintrc  ����һ������Ϊ�յĺ�׺��Ϊ.csslintrc���ļ�
// http://www.alloyteam.com/nav/ ǰ������ ���ܷ���

//��װ����
module.exports = function(grunt){

    //�������ã����в����������Ϣ
    grunt.initConfig({
        //��ȡ package.json����Ϣ
        pkg: grunt.file.readJSON('package.json'),
        //uglify���������Ϣ
        uglify:{
            options:{
                stripBanners:true,//�й涨�������ɵ�ѹ���ļ���banner
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
//����grunt���ǽ�ʹ�õĲ��
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //����grunt���������ն�������gruntʱ��Ҫ��ʲô��ע���Ⱥ�˳��
    grunt.registerTask('default',['uglify','jshint']);
}
//grunt������нϳ��õĲ��
//Contrib-jshint����javascript�﷨�����飻
//Contrib-watch����ʵʱ����ļ��仯��������Ӧ����������ִ�У�
//Contrib-clean��������ļ����ļ��У�
//Contrib-uglify����ѹ��javascript����
//Contrib-copy���������ļ����ļ���
//Contrib-concat�����ϲ�����ļ��Ĵ��뵽һ���ļ���
//karma����ǰ���Զ������Թ���

