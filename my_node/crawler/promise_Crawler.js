/**
 * Created by A on 2017/7/3.
 */
/**
 * Created by A on 2017/6/29.
 */
/**
 * Created by A on 2017/6/29.
 */


//小爬虫


var http = require('http');
var promise = require('bluebird');//引入Promise模块
var cheerio = require('cheerio');//filter模块
//var url = 'http://www.imooc.com/learn/348';
var baseUrl = 'http://www.imooc.com/learn/';
var videoIds = [637,348,156,453];
function filterChapters(html){
    //console.log(html);
    var $ = cheerio.load(html);
    var chapters = $('.chapter');
    var title = $('.course-infos').find('h2').text().trim();
    //var number = parseInt($($('.static-item .js-learn-num ')[0]).text().trim(),10);
    //console.log(number);
    var courseData = {
        title:title,
        //number: number,
        videosTittle:[]
    };
    chapters.each(function(item){
        var chapter = $(this);
        var chapterTitle = chapter.find('strong').text().trim();
        var videos = chapter.find('.video').children('li');

        var chapterDate = {
            chapterTitle: chapterTitle,
            videos:[]
        };
        videos.each(function(item){
            var video = $(this);
            var obj = {};
            obj.videoTitle = video.find('a').text().trim();
            obj.videoId = video.attr('data-media-id');
            chapterDate.videos.push(obj);
            console.log(chapterDate.videos);

        })
        courseData.videosTittle.push(chapterDate);
    })
    //console.log(courseData);
    JSON.stringify(courseData);
    return courseData;
}
function printCourseInfo(course){
    console.log(course.title+'/n');
    //console.log(course.number+'\n'),
    course.videosTittle.forEach(function(item){
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle+'/n');
        item.videos.forEach(function(video){
            console.log('    ['+video.videoId+']'+ video.videoTitle+'/n')
        })
    })
    //course.chapterTitle
}
function getPageAsync(url){
    return new Promise(function(resolve,reject){
        console.log('crawler:'+ url)
        http.get(url,function(res){
            var html = '';
            res.on('data',function(data){
                html += data;
            });
            res.on('end',function(){
                resolve(html);//通过resolve传递拿到的html
                /*var courseData = filterChapters(html);
                 printCourseInfo(courseData)*/

                //var main = document.getElementById('main');
                //main.innerHTML(html);
            });
            res.on('error',function(e){
                reject(e)
                console.log('获取课程数据出错！');

            });
        })
    })
}
var fetchCourseArray = []
videoIds.forEach(function(id){
    fetchCourseArray.push(getPageAsync(baseUrl+id))
})
//并发的控制
Promise
    .all(fetchCourseArray)
    .then(function(pages){
        var coursesData = [];
        pages.forEach(function(html){
            var course = filterChapters(html);
            coursesData.push(course);
        })
        /*coursesData.sort(function(a,b){//sort()数组排序的方法【默认：字符编码的顺序进行排序】，如果要按照指定的排序，就需要增加一个比较函数  如下就是
            return a.number < b.number;
        })*/

        coursesData.forEach(function(courseDate){
            //console.log(courseDate);
            printCourseInfo(courseDate);
        })
    })

//videoIds.forEach()
