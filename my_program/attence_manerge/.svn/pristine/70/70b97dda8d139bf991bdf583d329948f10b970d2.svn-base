/**
 * Created by A on 2017/5/26.
 */
/**
 * Created by A on 2017/5/25.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li><a class="" alt="faceStatistics.html" id="5928f634d4e0c3a0a7c4659e">人脸识别使用详情</a></li><li class="selected"><a class="" alt="faceAbnormalStatistics.html" id="">人脸识别异常详情</a></li>';
    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();
    //findMenus();
    findAllStore();

    isSeven=true;
    isThere =false;
    initModel(7,1);
    closeImg();

    //line();
})
function toInfo(){
    $('.totalNum span').off('click').on('click',function(){
        var _value = $(this).attr('data-id');
        $('#shop').children('option').prop('selected',false);
        $('#shop').children('option[data-id="'+_value+'"]').prop('selected',true);
        findRobot(_value)
        listPage();
    })
};

function showImg(){
    $('.successNum img').on('click',function(){
        var _url = $(this).attr('src');
        $('.showImg img').attr({'src':_url});
        $('.overall').show();
    })
}
function closeImg(){
    $('.close').on('click',function(){
        $('.overall').hide();
    })
}
function changetabs() {
    $('.tabs li').on('click', function () {
        var url = $(this).find('a').attr('alt');
        //alert(url);
        $.ajax({
            url: menuUrl + url,
            type: 'GET',
            //async: false,
            success: function (data) {

                $(".main").empty().html(data);
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
    });
}


function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
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
    var shopId =$("#shop").find("option:selected").attr("data-id");
    var robotId =$("#robot").find("option:selected").attr("id");
    var obj ={};

    if(shopId == undefined)
    {
        obj ={
            token:$.cookie("token"),
            startDate:start_Time,
            endDate:end_Time
        }
        $.ajax({
            url:commUrl+'/member/attendanceAbnormalSurvey',
            //type:'POST',
            cache:false,
            data:obj,
            dataType:'json',
            success:function(data){
                data = eval('('+data+')');
                //console.log(data);
                //debugger;
                $(".grid-body").empty();
                var html =  '<tr class="grid-head-th">'+
                        // '<th class="start_Time" style="width: 200px;">时间</th>'+
                    '<th class="totalNum" style="width: 152px;">商家名称</th>'+
                    '<th class="perc" style="width: 152px; ">所属总商家</th>'+
                    '<th class="successNum" style="width: 152px; ">总耗时</th>'+
                    '<th class="delateNum" style="width: 152px; ">异常次数</th>'+
                    '<th class="outNum" style="width: 152px; ">异常率</th>'+
                    '</tr>';
                var page = '';
                if(data.code == '1'){
                    if(data.data == ''){
                        html += '<tr class="grid-body-tr" ><td colspan="6"><p>次商家暂无数据可统计</p></tr></td>';
                    }else {
                        $.each(data.data,function(i,key){

                            html += '<tr class="grid-body-tr" > ' +//<td class="start_Time"  style="width:200px">'+key.date+'</td>
                                '<td class="totalNum"  style="width:152px;"><span data-id="'+key.meid+'">'+key.business+'</span></td> ';
                                    if(key.parendBusiness == ''){
                                        html += '<td class="totalNum"  style="width:152px;">无</td> '
                                    }else{
                                        html += '<td class="totalNum"  style="width:152px;">'+key.parendBusiness+'</td> '
                                    }

                               html += '<td class="successNum"  style="width:152px;">'+(key.consumingTime / 1000)+'秒</td> ' +
                                '<td class="delateNum"  style="width:152px;">'+key.count+'</td> ' +
                                '<td class="outNum"  style="width:152px;">'+(key.rate * 100)+'</td> </tr>'
                        })
                    }
                }
                $(".grid").html(html);
                $(".pages ul").empty();
                toInfo();
            },
            error: function(text){
                alert(text.readyState);
                alert(text.status);
            }
        })

    }else{
        if(robotId == undefined){
            obj={
                token:$.cookie("token"),
                 page:page,
                row: '10',
                sortId:'time',
                sortType:'DESC',
                meid:shopId,
                startDate:start_Time,
                endDate:end_Time
            }
        }else {
            obj={
                token:$.cookie("token"),
                page:page,
                row: '10',
                sortId:'time',
                sortType:'DESC',
                meid:shopId,
                maid: robotId,
                startDate:start_Time,
                endDate:end_Time
            }
        }
        //跑起来
        $.ajax({
            url:commUrl+'/member/attendanceAbnormalDetail',
            //type:'POST',
            cache:false,
            data:obj,
            dataType:'json',
            success:function(data){
                data = eval('('+data+')');
                $(".grid-body").empty();
                var html =  '<tr class="grid-head-th">'+
                    '<th class="start_Time" style="width: 110px;">请求时间时间</th>'+
                    '<th class="totalNum" style="width: 132px;">请求照片</th>'+
                    '<th class="outNum" style="width: 152px; ">机器人</th>'+
                    '<th class="successNum" style="width: 152px; ">总耗时</th>'+
                    '<th class="perc" style="width: 152px; ">异常原因</th>'+
                    '<th class="delateNum" style="width: 252px; ">异常次数</th>'+
                    '</tr>';
                var page = '';
                if(data.code == '1'){
                    if(data.data.datas == ''){
                        html += '<tr class="grid-body-tr" ><td colspan="6"><p>次商家暂无数据可统计</p></tr></td>';
                    }else {
                        $.each(data.data.datas,function(i,key){

                            html += '<tr class="grid-body-tr" ><td class="start_Time"  style="width:110px">'+key.requestTime+'</td>' +//
                                '<td class="successNum"  style="width:132px;"><img src="'+key.photoUrl+'" style="width:100px; height:70px" alt=""/></td> ' +
                                '<td class="outNum"  style="width:152px;">'+key.maid+'</td>'+
                                '<td class="totalNum"  style="width:152px;">'+(key.consumingTime / 1000)+'秒</td> ' +
                                '<td class="delateNum"  style="width:152px;">'+key.errorMsg+'</td> ' +
                                '<td class="outNum"  style="width:252px;">前端耗时'+(key.appTime / 1000)+'秒,后台耗时'+(key.serverTime / 1000)+'秒,百度耗时'+(key.aipTime / 1000)+'秒</td> </tr>';
                        })
                    }
                    if(data.data.page == '1') {
                     page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> ' +
                     '<li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li>' +
                     ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li>' +
                     '<li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'
                     }
                     else if(data.data.page == data.data.pageCount){
                     page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> ' +
                     '<li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                     '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li>' +
                     '<li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                     }
                     else {
                     page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li>' +
                     ' <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                     '<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li>' +
                     '<li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
                     }
                }
                $(".grid").html(html);
                $(".pages ul").html(page);
                showImg();

            },
            error: function(text){
                alert(text.readyState);
                alert(text.status);
            }
        })
    }

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
                    html += '<option data-id="'+key.id+'"  title="'+key.nick+'" >'+key.nick+'</option>'
                })
                $("#shop").html(html);
                shop();
            }
        }
    })
}

function findRobot(meid){
    //debugger;
    $.ajax({
        url:commUrl+'/member/machineList',
        cache:false,
        data: {
            token:$.cookie("token"),
            meid: meid
        },
        success: function(data){
            data = JSON.parse(data);
            console.log(data);
            if(data.code == 1) {
                var html = '<option >'+'选择机器人'+'</option>';
                $.each(data.data, function(i,key) {
                    console.log(key);
                    html += '<option id="'+key+'">机器人'+(i-0+1)+'</option>'
                })
                $("#robot").html(html);
                robotChange();
            }
        }
    })
}

function listPage(page){
    //alert('456');
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

function prevPage(e) {
 $(e).next("li").find(".onpage").text();

 if($(e).next("li").find(".onpage").text() == '1'){
 }
 else {
 var page = $(e).next("li").find(".onpage").text() - 1;
 listPage(page);
 }
 }

 function nextPage(e){
 if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
 }
 else {
 var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
 listPage(page);

 }
 }
 function turnPage(e){
 var page = 1;
 if(parseInt($(e).prev(".nowPage").val() )<= 1){

 }else if(parseInt($(e).prev(".nowPage").val() )>= parseInt($(".pagecount").text())){
 page = $(".pagecount").text();
 }else{
 page = $(e).prev(".nowPage").val();
 }
 listPage(page);
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
function shop(){
    $('#shop').on('change',function(){
        var _value = $(this).children('option:selected').attr('data-id');
        //console.log(e.id);
        findRobot(_value)
        listPage();
    })
};
function robotChange()
{
    $('#robot').on('change',function(){
        listPage();
    })

}
//导出Excel
function forExcel() {
    outExcel('grid');
}