$(document).ready(function(){
   /* $(".breadcrumb").empty();
    var breadcrumb = '<li class="selected"><a class="" alt="generalStatistics.html" id="5850c4e0b2a99afa74c513ba">问答概况</a></li>';
    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();*/
    //findMenus();
    getYears();
    findAllStore();
    var _meid = $('#monthShop').children('option:selected').attr('value');
    monthStatus(_meid);
    listPageYear();//年份数据
    returnYear();//返回年数据
    returnMonth();//返回月数据
    filterDetails();
})
function filterDetails(){
    $('#filterS').on('change',function(){
        listPageDay();
    })
}
function returnMonth(){
    $('.returnMonth').on('click',function(){
        $('.filterStatus').hide();
        $('.monthFilter').show();
        listPageMonth();
    })
}
function returnYear(){
    $('.returnYear').on('click',function(){
        $('.monthFilter').hide();
        $('.yearsFilter').show();
        var Id = $('#monthShop').children('option:selected').attr('value');
        $('#monthShop').children('option').prop('selected',false);
        $('#monthShop').children('option[value="'+Id+'"]').prop('selected',true);
        monthStatus(Id);
        listPageYear();
    })
}
function monthStatus(id){//班次加载
    var obj = {
        token: $.cookie('token'),
        meid: id
    }
    $.ajax({
        url:commUrl+'/shift/findShiftList',
        //type:'POST',
        cache:false,
        data:obj,
        //dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            /*console.log(data);
            debugger;*/
            if(data.code == 1) {
                var html = '<option >'+'班次选择'+'</option>';//
                $.each(data.data, function(i,key) {
                    html +='<option value="'+key.shiftId+'">'+key.shiftName+'</option>'
                })

            }
            //console.log(html);
            //}

            $("#monthStatus").html(html);
            changeStatus();//筛选班次
            //$(".pages ul").html(page);
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
function changeStatus(){//改变班次
    $('#monthStatus').on('change',function(){
        listPageMonth();
    })
}
function listPageYear(page){//加载年份数据
    page = page? page : 1;
    var shopId =$("#shop").find("option:selected").attr("value");
    var year =$("#years").find("option:selected").attr("value");
    var obj = {
        token: $.cookie('token'),
        year: year,
        meid: shopId
    }
    $.ajax({
        url:commUrl+'/employee/employeeAttendanceSurvey',
        type:'POST',
        cache:false,
        data:obj,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            //$("#grid").empty();
            console.log(data);
            var html =  '<tr class="grid-head-th"> <th class="start_Time" style="width: 200px;">时间</th> ' +
                //'<th class="totalNum" style="width: 160px;">班次</th> ' +
                '<th class="successNum" style="width: 150px; ">未打卡次数</th> ' +
                '<th class="perc" style="width: 150px; ">早退次数</th>' +
                ' <th class="errorNum" style="width: 150px; ">迟到次数</th>'+
                ' <th class="errorNum" style="width: 150px; ">请假次数</th></tr>';
            //var page = '';
            if(data.code == '1'){
                $.each(data.data,function(i,key){
                    //var accuracy =(key.value.successCount/key.value.total)
                    //var perc = (parseFloat(accuracy.toFixed(3))*100).toFixed(1);
                    html += '<tr class="grid-body-tr" > <td class="start_Time"  style="width:200px"><a class="info" data-date="'+key.month+'">'+key.month+'</a></td> ' +
                       // '<td class="totalNum"  style="width:160px;">'+key.shiftName+'</td> ' +
                        '<td class="successNum"  style="width:150px;">'+key.abnormalNumber+'</td> ' +
                        '<td class="perc" style="width:150px;">'+key.earlyNumber+'</td> ' +
                        '<td class="errorNum"  style="width:150px;">'+ key.lateNumber+'</td>'+
                        '<td class="errorNum"  style="width:150px;">'+ key.leaveNumber+'</td> </tr>'
                })
            }
            //console.log(html);
            //}

            $("#grid").html(html);
            checkMonthInfo();
            //$(".pages ul").html(page);
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
function listPageMonth(page){//加载月份数据
    page = page ? page:1;
    var shopId =$("#monthShop").find("option:selected").attr("value");
    var _month = $.cookie('month');
    var shiftId = $("#monthStatus").find("option:selected").attr("value")
    var obj =  {
        token: $.cookie('token'),
        month: _month,
        meid: shopId
    }
    if(shiftId !== undefined){
        obj.shiftId = shiftId;
    }
    $.ajax({
        url:commUrl+'/employee/attendanceBriefingByMonth',
        type:'POST',
        cache:false,
        data:obj,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');

            var html =  '<tr class="grid-head-th"> <th class="start_Time" style="width: 200px;">时间</th> ' +
                '<th class="totalNum" style="width: 160px;">班次</th> ' +
                '<th class="successNum" style="width: 150px; ">应出勤人数</th> ' +
                '<th class="perc" style="width: 150px; ">实际出勤人数</th>' +
                ' <th class="errorNum" style="width: 150px; ">迟到人数</th>'+
                ' <th class="errorNum" style="width: 150px; ">早退人数</th></tr>';
            var page = '';
            if(data.code == '1'){
                $.each(data.data,function(i,key){
                    //var accuracy =(key.value.successCount/key.value.total)
                    //var perc = (parseFloat(accuracy.toFixed(3))*100).toFixed(1);
                    html += '<tr class="grid-body-tr" > <td class="start_Time"  style="width:200px"><a class="detailsCounts" data-date="'+key.date+'">'+key.date+'</a></td> ' +
                        '<td class="totalNum"  style="width:160px;" data="'+key.shiftId+'">'+key.shiftName+'</td> ' +
                        '<td class="successNum"  style="width:150px;">'+key.toBeNumber+'</td> ' +
                        '<td class="perc" style="width:150px;">'+key.toNumber+'</td> ' +
                        '<td class="errorNum"  style="width:150px;">'+ key.lateNumber+'</td>'+
                        '<td class="errorNum"  style="width:150px;">'+ key.earlyNumber+'</td> </tr>'
                })
            }




            //console.log(html);
            //}

            $("#grid1").html(html);
            detailsCounts();
            //$(".pages ul").html(page);
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
function listPageDay(page){
    page = page ? page:1;
    var state =$("#filterS").find("option:selected").attr("value");
    var _Day = $.cookie('day');
    var shiftId = $.cookie('shiftId')
    var obj =  {
        token: $.cookie('token'),
        shiftId: shiftId,
        date: _Day
    }
    if(state !== undefined){
        obj.state = state;
    }
    $.ajax({
        url:commUrl+'/employee/attendanceDetail',
        //type:'POST',
        cache:false,
        data:obj,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            //console.log(data);
            var html =  '<tr class="grid-head-th"> <th class="start_Time" style="width: 200px;">姓名</th> ' +
                '<th class="totalNum" style="width: 160px;">考勤</th> ' +
                '<th class="successNum" style="width: 150px; ">结果</th> ' +
                    /*'<th class="perc" style="width: 150px; ">操作</th>' +
                     ' <th class="errorNum" style="width: 150px; ">迟到人数</th>'+*/
                ' <th class="errorNum" style="width: 150px; ">操作</th></tr>';
            var page = '';
            if(data.code == '1'){
                $.each(data.data,function(i,key){
                    html += '<tr class="grid-body-tr" > <td class="start_Time"  style="width:200px">'+key.name+'</td> ' +
                        '<td class="totalNum"  style="width:160px;" data-id="'+key.shiftId+'">'+key.option+'</td> ' ;
                    switch (key.state){
                        case 'late':
                            html += '<td class="successNum"  style="width:150px;">迟到</td> ' +
                                '<td class="operation"  style="width:150px;">无</td> </tr>'
                            break;
                        case 'leave':
                            html += '<td class="successNum"  style="width:150px;">请假</td> '+
                                '<td class="operation"  style="width:150px;">无</td> </tr>'
                            break;
                        case 'abnormal':
                            html += '<td class="successNum"  style="width:150px;">未到</td> '+
                                '<td class="operation"  style="width:150px;">' +
                                '<a class="leave" data-id="'+key.employeeId+'" data-work="'+key.option+'" data-option="leave">请假</a>' +
                                '<a class="Retroactive" data-id="'+key.employeeId+'" data-work="'+key.option+'" data-option="retroactive">补签</a></td> </tr>'
                            break;
                        case 'normal':
                            html += '<td class="successNum"  style="width:150px;">正常</td> ' +
                                '<td class="operation"  style="width:150px;">无</td> </tr>'
                            break;
                        case 'early':
                            html += '<td class="successNum"  style="width:150px;">早退</td> ' +
                                '<td class="operation"  style="width:150px;">无</td> </tr>'
                            break;
                    }
                })
            }
            //console.log(html);
            //}

            $("#grid2").html(html);
            operation();
            //$(".pages ul").html(page);
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
function operation(){
    $('.operation a').on('click',function(){
        var _employeeId = $(this).attr('data-id');
        var _option = $(this).attr('data-option');
        var _work = $(this).attr('data-work');
        var _date = $.cookie('day');
        var _shiftId = $.cookie('shiftId')
        var obj = {
            token: $.cookie('token'),
            employeeId: _employeeId,
            option: _option,
            work: _work,
            date: _date,
            shiftId: _shiftId
        }
        console.log(obj);
        $.ajax({
            url:commUrl+'/employee/attendanceModify',
            type:'POST',
            cache:false,
            data:obj,
            dataType:'json',
            success:function(data){
                data = eval('('+data+')');
                //$("#grid").empty();
                if(data.code == '1'){
                    listPageDay();
                }

            },
            error: function(text){
                alert(text.readyState);
                alert(text.status);
            }
        })
    })
}
function detailsCounts(){
    $('.detailsCounts').on('click',function(){
        var day = $(this).attr('data-date');
        var shiftId = $(this).attr('data-id');
        $.cookie('day',day,{path:'/'});
        $.cookie('shiftId',shiftId,{path:'/'});
        $('.monthFilter').hide();
        $('.filterStatus').show();
        listPageDay();
    })
}
function getYears(){//获取年份
    var _date = new Date();
    var _year = _date.getFullYear();
    //console.log(_year);
    var html = '<option value="'+_year+'">'+_year+'</option>';
    for(var i = 0; i < 2; i++){
        _year --;
        html += '<option value="'+_year+'">'+_year+'</option>'
    }
    $('#years').empty().html(html);
}


function checkMonthInfo(){//点击月份 获取月份数据
    $('.info').on('click',function(){
        var shopId = $("#shop").find("option:selected").attr("value");
        var chooseMonth = $(this).text();
        $.cookie('month',chooseMonth,{path:'/'});
        $('.yearsFilter').hide();
        $('.monthFilter').show();
        //debugger;
        listPageMonth();
    })
}



function findAllStore(){//加载商家
    $.ajax({
        url:commUrl+'/user/userList',
        cache:false,
        async: false,
        data: {
            token:$.cookie("token")
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1) {
                var html = '';//<option >'+'全部店铺'+'</option>
                $.each(data.data, function(i,key) {
                    html +='<option value="'+key.id+'">'+key.nick+'</option>'
                })

                if(data.data.length == 1){
                    $('#shop').html(html);
                    $('#monthShop').html(html);
                }else {
                    $('#shop').html(html).show();
                    $('#monthShop').html(html).show();
                    changeShop('#shop');
                    changeShop('#monthShop');
                   //$('.chooseCompany').show();
                }
                //$.cookie('meid',)
                //$("#shop").html(html);
            }
        }
    })
}
function changeShop(Ele){//根据商家赛选（年份和月份的商家公用此方法）
    $(Ele).on('change',function(){
        var type = $(this).attr('data-type');
        var Id = $(this).children('option:selected').attr('value');
        if(type == 'year'){
            $('#monthShop').children('option').prop('selected',false);
            $('#monthShop').children('option[value="'+Id+'"]').prop('selected',true);
            monthStatus(Id);
            listPageYear();
        }else if(type == 'month'){
            monthStatus(Id);
            //debugger;
            listPageMonth();
        }
    })
}
function findMenus(){//面包屑
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
/*function showOverall(e){
    $(".deleteQuestion").attr({id: e.id});
    $(".overall").show();
}*/


/*function prevPage(e) {
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
}*/
//导出Excel
function forExcel() {//excel
    outExcel('grid');
}