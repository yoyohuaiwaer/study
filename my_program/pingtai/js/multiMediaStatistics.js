/**
 * Created by A on 2017/2/19.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li class="selected"><a class="" alt="multiMediaStatistics.html" id="58a912403c9e9c3c425683ac">多媒体统计</a></li>';
    $(".breadcrumb").html(breadcrumb);
    /*commUrl = 'http://10.10.23.241:8080/qh_manager/'*/
    changeBreadcrumb();
    //findMenus();
    findAllStore();
    isSeven=true;
    isThere =false;
    initModel(7,1);
})
function GetDateStr(AddDayCount) {

    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    return dd;
}
function p(s) {
    return s < 10 ? '0' + s: s;
}
function initModel(value, page) {
    page = page ? page : 1;
    var myDate = GetDateStr(-(value - 1))
    var dateArray = [];
    var dateTemp;
    var flag = 1;
    var start_Time;
    for(var i = 0; i < value; i++) {
        dateTemp = p(myDate.getMonth() + 1) + "-" + p(myDate.getDate());
        start_Time = myDate.getFullYear() + "-" + dateTemp;
        dateArray.push(start_Time);
        myDate.setDate(myDate.getDate() + flag);
    }

    start_Time = dateArray[0];
    var end_Time = dateArray[dateArray.length - 1];
    pullModel(start_Time, end_Time, page);
}

function pullModel(start_Time,end_Time,page){
    var shopId =$("#shop").find("option:selected").attr("id");
    var obj ={}
    if(shopId== undefined)
    {
        obj ={
            token:$.cookie("token"),
            page:page,
            row:'10',
            sortId:'createTime',
            sortType:'ASC',
            startTime:start_Time+' 00:00:00',
            endTime:end_Time+' 23:59:59'
        }
    }else
    {
        obj ={
            token:$.cookie("token"),
            page:page,
            row:'10',
            sortId:'createTime',
            sortType:'ASC',
            meid:shopId,
            startTime:start_Time+' 00:00:00',
            endTime:end_Time+' 23:59:59'
        }
    }
    $.ajax({
        url:commUrl+'/content/broadcastRecord',
        cache:false,
        type:'GET',
        data:obj,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            $(".grid-body").empty();
            var html = '';
            var page = '';
            if(data.code == '1'){
                if(data.data.count == 0){
                    html = '<div class="grid-body-tr"><p>暂无数据</p></div>';
                }else {
                    $.each(data.data.datas,function(i,key){
                        var perc = (parseFloat(key.proportion.toFixed(3))*100).toFixed(1);
                        html += '<div class="grid-body-tr"> <div class="answer"  style="width:500px; max-width:600px">'+key.name+'</div> ' +
                            '<div class="num"  style="width:210px;">'+key.count+'</div> ' +
                            '<div class="percent"  style="width:250px;">'+perc+'%</div> </div>'
                    })
                }

            }
            $(".grid-body").html(html);
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
function findAllStore(){
    $.ajax({
        url:commUrl+'/user/findall',
        cache:false,
        data: {
            token:$.cookie("token")
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1) {
                var html = '<option >'+'全部商家'+'</option>';
                $.each(data.data, function(i,key) {
                    html += '<option id='+key.id+'  title='+key.nick+' >'+key.nick+'</option>'
                })
                $("#shop").html(html);
            }
        }
    })
}
function findMenus(){
    $.ajax({
        url:commUrl+'/menu/findbyid',
        cache:false,
        data: {
            token:$.cookie("token"),
            parentId:$('.main-title').attr('title')
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1) {
                $(".breadcrumb").empty();
                var breadcrumb = '';
                $.each(data.data, function(i,key) {
                    breadcrumb += '<li><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">'+key.name+'</a></li>'
                    $(".breadcrumb").html(breadcrumb);
                    $(".breadcrumb li:last-child").addClass('selected');
                    changeBreadcrumb();
                })
            }
        }
    })
}
function listPage(page){
    page = page?page:1;
    var start_Time = $('#startTime')[0].value;
    var end_Time = $('#endTime')[0].value;
    if(start_Time!=''|| end_Time!='')
    {
        if( new Date(end_Time)< new Date(start_Time))
        {
            $(".tip").empty().css({color:"red"}).html("开始时间不能小于结束时间");
            return;
        }else{
            $(".tip").empty();
        }
    }
    if(isSeven==true)
    {
        initModel(7,page);
        return;
    }
    if(isThere==true)
    {
        initModel(30,page);
        return;
    }
    if(start_Time==''&& end_Time==''){
        var myDate = new Date(); //获取今天日期
        myDate.setDate(myDate.getDate() - 7);
        var dateArray = [];
        var dateTemp;
        var flag = 1;
        for (var i = 0; i < 7; i++) {
            dateTemp = (myDate.getMonth()+1)+"-"+myDate.getDate();
            dateArray.push(dateTemp);
            myDate.setDate(myDate.getDate() + flag);
        }
        start_Time = myDate.getFullYear()+"-"+ dateArray[0];
        end_Time = myDate.getFullYear()+"-"+ dateArray[dateArray.length-1];
    }
    pullModel(start_Time,end_Time,page);
}
function showOverall(e){
    $(".deleteQuestion").attr({id: e.id});
    $(".overall").show();
}
function newPage(){
    $.get('adList.html',{token:$.cookie("token")},function(response){
        $(".main").empty().html(response);
    })
}
function addQuestion(e){
    $.cookie("read", e.title,{path:'/'})
    $.ajax({
        url:'add-ad.html',
        cache:false,
        datatype:'html',
        success:function(data){
            $(".main").empty().html(data);
        }
    })
}
function setStartList(e){
    var start_Time = $('#startTime')[0].value;
    var end_Time = $('#endTime')[0].value;
    if(start_Time=='' || end_Time=='')
    {
        $(".tip").empty().css({color:"red"}).html("请选择开始时间和结束时间");
        return;
    }
    if(new Date(end_Time)<new Date(start_Time))
    {
        $(".tip").empty().css({color:"red"}).html("开始时间不能小于结束时间");
        return;
    }else{
        $(".tip").empty();
        isSeven=false;
        isThere =false;
        listPage();
    }
}
function setTypeSelect(e)
{
    listPage();
}
function setList(e){
    var value = e.title;
    if(value ==7)
    {
        isSeven=true;
        isThere =false;
    }else{
        isSeven=false;
        isThere =true;
    }
    initModel(value,1);
}
