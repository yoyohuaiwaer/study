/**
 * Created by A on 2017/6/29.
 */
/**
 * Created by A on 2017/6/29.
 */


//小爬虫


var http = require('http');
var cheerio = require('cheerio');//filter模块
var url = 'http://www.imooc.com/learn/348';
function filterChapters(html){
    var $ = cheerio.load(html);
    var chapters = $('.chapter');
    var courseData = [];
    chapters.each(function(item){
        var chapter = $(this);
        var chapterTitle = chapter.find('strong').text().replace(/[\r\n]/g,"");
        var videos = chapter.find('.video').children('li');

        var chapterDate = {
            chapterTitle: chapterTitle,
            videos:[]
        };
        videos.each(function(item){
            var video = $(this);
            var obj = {};
            obj.videoTitle = video.text().replace(/[\r\n]/g,"");
            obj.videoId = video.attr('data-media-id');
            chapterDate.videos.push(obj);
        })
        courseData.push(chapterDate);
    })
    return courseData;
}
function printCourseInfo(course){
    course.forEach(function(item){
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle+'\n');
        item.videos.forEach(function(video){
            console.log('    ['+video.videoId+']'+ video.videoTitle+'\n')
        })
    })
    course.chapterTitle
}
http.get(url,function(res){
    var html = '';
    res.on('data',function(data){
        html += data;
    });
    res.on('end',function(){

        var courseData = filterChapters(html);
        printCourseInfo(courseData)

        //var main = document.getElementById('main');
        //main.innerHTML(html);
    });
    res.on('error',function(){
        console.log('获取课程数据出错！');
    });
})