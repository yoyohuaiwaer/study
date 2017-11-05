/**
 * Created by A on 2017/7/3.
 */
/**
 * Created by A on 2017/6/29.
 */
/**
 * Created by A on 2017/6/29.
 */


//С����


var http = require('http');
var promise = require('bluebird');//����Promiseģ��
var cheerio = require('cheerio');//filterģ��
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
                resolve(html);//ͨ��resolve�����õ���html
                /*var courseData = filterChapters(html);
                 printCourseInfo(courseData)*/

                //var main = document.getElementById('main');
                //main.innerHTML(html);
            });
            res.on('error',function(e){
                reject(e)
                console.log('��ȡ�γ����ݳ���');

            });
        })
    })
}
var fetchCourseArray = []
videoIds.forEach(function(id){
    fetchCourseArray.push(getPageAsync(baseUrl+id))
})
//�����Ŀ���
Promise
    .all(fetchCourseArray)
    .then(function(pages){
        var coursesData = [];
        pages.forEach(function(html){
            var course = filterChapters(html);
            coursesData.push(course);
        })
        /*coursesData.sort(function(a,b){//sort()��������ķ�����Ĭ�ϣ��ַ������˳��������򡿣����Ҫ����ָ�������򣬾���Ҫ����һ���ȽϺ���  ���¾���
            return a.number < b.number;
        })*/

        coursesData.forEach(function(courseDate){
            //console.log(courseDate);
            printCourseInfo(courseDate);
        })
    })

//videoIds.forEach()
