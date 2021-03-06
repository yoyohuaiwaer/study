$(document).ready(function(){
    /* $(".breadcrumb").empty();
     var breadcrumb = '<li class="selected"><a class="" alt="generalStatistics.html" id="5850c4e0b2a99afa74c513ba">问答概况</a></li>';
     $(".breadcrumb").html(breadcrumb);
     changeBreadcrumb();*/
    //findMenus();
    findAllStore();
    isSeven=true;
    isThere =false;
    initModel(7,1);
    returnShop();
})
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

function DetailsInitModel(value, page,id) {
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
    infoPullModel(start_Time, end_Time, page,id);
}

function infoPullModel(start_Time, end_Time, page,id){
    var obj ={
        token:$.cookie("token"),
        //page:page,
        //row:'10',
        //sortId:'createTime',
        //sortType:'ASC',
        startDate:start_Time,//+' 00:00:00',
        endDate:end_Time,//+' 23:59:59'};
        employeeId: id
    }
    $.ajax({
        url:commUrl+'/employee/employeeAttendanceDetails',
        type:'POST',
        cache:false,
        data:obj,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            /*console.log(data);
             debugger;*/
            $("#grid").empty();
            var html =  '<li> <span class="infoData">日期</span> <span class="infoCloumn">上班类型</span><span class="infoCloumn">打卡时间</span><span class="infoCloumn">下班类型</span><span class="infoCloumn">打卡时间</span></li>';
            var page = '';
            if(data.code == '1'){

                // if(data.data.length <= 0){
                //  html +="<p>暂无数据</p>"
                //}else {
                $.each(data.data,function(i,key){
                    //console.log(key);
                    //var accuracy =(key.value.successCount/key.value.total)
                    //var perc = (parseFloat(accuracy.toFixed(3))*100).toFixed(1);
                    html += '<li> <span class="infoData">'+key.date+'</span>';

                    var toworkState = key.toWorkState
                    var offworkState = key.offWorkState
                    html += status(toworkState,html);
                    //console.log(html);
                    html+='<span>'+key.toWorkTime+'</span>';
                    html += status(offworkState,html);
                    html +='<span>'+key.offWorkTime+'</span></li>'
                    //console.log(html);
                })
            }
            //console.log(html);
            //}

            $(".details ul").empty().html(html);
            $(".details").show();
            //$(".pages ul").html(page);
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
function status(key,html){
    switch(key){
        case 'late':
             html ='<span class="infoCloumn">迟到</span>';
            break;
        case 'leave':
            return html ='<span class="infoCloumn">请假</span>';
            //debugger;
            break;
        case 'abnormal':
            html ='<span class="infoCloumn">未到</span>';
            //debugger;
            break;
        case 'normal':
            html ='<span class="infoCloumn">正常</span>';
            //debugger;
            break;
        case 'early':
            html ='<span class="infoCloumn">早退</span>';
            //debugger;
            break;
    }
    //console.log(html);
    return html;
}
function pullModel(start_Time,end_Time,page){
    var shopId =$("#shop").find("option:selected").attr("value");
    var obj ={
        token:$.cookie("token"),
        startDate:start_Time,//+' 00:00:00',
        endDate:end_Time//+' 23:59:59'};
    }
    console.log(shopId);
    if(shopId !== undefined)
    {
        obj.meid = shopId
    }
    //console.log(obj);
    //debugger;
    //commUrl = '119.23.130.250:8085/qh_attendance_server';
    $.ajax({
        url:commUrl+'/employee/attendanceRank',
        type:'POST',
        cache:false,
        data:obj,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            /*console.log(data);
            debugger;*/
            $(".details ul").empty();
            $(".details").hide();
            var html =  '<tr class="grid-head-th"> <th class="start_Time" style="width: 200px;">姓名</th> ' +
                '<th class="totalNum" style="width: 200px;">出勤次数</th> ' +
                '<th class="successNum" style="width: 200px; ">缺勤次数</th> ' +
                '<th class="perc" style="width: 200px; ">迟到次数</th>' +
                '<th class="perc" style="width: 200px; ">早退次数</th>' +
                ' <th class="errorNum" style="width: 200px; ">请假天数</th> </tr>';
            var page = '';
            if(data.code == '1'){

                // if(data.data.length <= 0){
                //  html +="<p>暂无数据</p>"
                //}else {
                $.each(data.data,function(i,key){
                    //console.log(key);
                    //var accuracy =(key.value.successCount/key.value.total)
                    //var perc = (parseFloat(accuracy.toFixed(3))*100).toFixed(1);
                    html += '<tr class="grid-body-tr" > <td class="start_Time"  style="width:200px"><span data-id="'+key.employeeId+'">'+key.name+'</span></td> ' +
                        '<td class="totalNum"  style="width:200px;">'+key.attendanceCount+'</td> ' +
                        '<td class="successNum"  style="width:200px;">'+key.vacancyCount+'</td> ' +
                        '<td class="perc" style="width:200px;">'+key.lateCount+'</td> ' +
                        '<td class="perc" style="width:200px;">'+key.earlyCount+'</td> ' +
                        '<td class="errorNum"  style="width:200px;">'+ key.leaveDay+'</td> </tr>'
                })
            }
            //console.log(html);
            //}

            $(".grid").html(html);
            checkInfo();
            //$(".pages ul").html(page);
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
function returnShop(){
    $('.returnShop').on('click',function(){
        $('.chooseTerm').show();
        $('.returnShop').hide();
        $('.excelOut').show();
        listPage();
    })
}
function checkInfo(){
    $('.start_Time span').on('click',function(){
        var _id = $(this).attr('data-id');
        var _name = $(this).text();
        $('.chooseTerm').hide();
        $('.returnShop').show();
        $('.excelOut').hide();
        $('.details h4').empty().html(_name);
        listInfo('',_id);
    })
}
function findAllStore(){
    $.ajax({
        url:commUrl+'/user/userList',
        cache:false,
        async: false,
        data: {
            token:$.cookie("token")
        },
        success: function(data){
            data = JSON.parse(data);
            $(".grid").empty();
            if(data.code == 1) {
                var html = '';//<option >'+'全部店铺'+'</option>
                $.each(data.data, function(i,key) {
                    html +='<option value="'+key.id+'">'+key.nick+'</option>'
                })

                if(data.data.length == 1){
                    $('#shop').html(html);

                }else {
                    $('#shop').html(html).show();
                    //$('.chooseCompany').show();
                }

                //$("#shop").html(html);
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
                    $(".breadcrumb li:first-child").addClass('selected');
                    changeBreadcrumb();
                })
            }
        }
    })
}
function listInfo(page,id){
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
        DetailsInitModel(7,page,id);
        return;
    }
    if(isThere==true)
    {
        DetailsInitModel(30,page,id);
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
    infoPullModel(start_Time,end_Time,page,id);
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
function setStartList(){
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
function setList(e){//7日或者30日
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
function setTypeSelect(e)
{
    listPage();
}
//导出Excel
function forExcel() {
    outExcel('grid');
}