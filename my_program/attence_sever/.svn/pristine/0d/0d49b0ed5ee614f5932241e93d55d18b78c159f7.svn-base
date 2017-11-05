/**
 * Created by A on 2017/7/21.
 */
$(document).ready(function(){
    producer();
    listPage();
    searchText();
    nameSearchbtn();
})
function nameSearchbtn(){
    $('.searchbtn').on('click',function(){
        //alert('123');
        //$.cookie('rel1','3',{path:'/'});
        listPage();
    });
};
function selected_th(){
    $('.grid-body-tr').on('click',function(){

        /*$('.grid-body-tr div').on('click',function(){
           return false;
        });*/
        $('.grid-body-tr').removeClass('selected');
        $(this).addClass('selected');
    })
}

Date.prototype.format = function() {//获取两个日期之间的所有时间
    var s = '';
    var mouth = (this.getMonth() + 1)>=10?(this.getMonth() + 1):('0'+(this.getMonth() + 1));
    var day = this.getDate()>=10?this.getDate():('0'+this.getDate());
    s += this.getFullYear() + '-'; // 获取年份。
    s += mouth + "-"; // 获取月份。
    s += day; // 获取日。
    return (s); // 返回日期。
};
function getAll(begin, end) {//获取两个日期之间的所有时间
    var ab = begin.split("-");
    var ae = end.split("-");
    var db = new Date();
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
    var de = new Date();
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
    var unixDb = db.getTime();
    var unixDe = de.getTime();
    var str = '';
    for (var k = unixDb; k <= unixDe;) {
        //console.log((new Date(parseInt(k))).format());
        var date = (new Date(parseInt(k))).format();
        var day = date.substr(8,2);
        day = parseInt(day,10);
        var month = date.substr(5,2);
        month = parseInt(month,10);
        str += '<td field="listprice" class=""> <div class="datagrid-cell datagrid-cell-c1-listprice" style="text-align: center;">' +
            ' <span>'+month+'月'+day+'号</span><span class="datagrid-sort-icon">&nbsp;</span></div> </td>'
        k = k + 24 * 60 * 60 * 1000;


      /*  var dataHead = '<td field="listprice" class=""> <div class="datagrid-cell datagrid-cell-c1-listprice" style="text-align: center;">' +
            ' <span>'+month+'月'+day+'号</span><span class="datagrid-sort-icon">&nbsp;</span></div> </td>'*/



    }
    return str
}


function searchText(){
    $('.searchText').on('focus',function(){
        if($(this).val() == '姓名查找'){
            $(this).val('');
        }
    }).on('blur',function(){
        if($(this).val() == ''){
            $(this).val('姓名查找');
        }
    })
};

function pullModel(start_Time,end_Time){
    var shopId =$("#producer").find("option:selected").attr("value");
    var Ename = $('.searchText').val();
    var obj ={
        token:$.cookie("token"),
        //page:page,
        row:'100000',
        //sortId:'createTime',
        //sortType:'ASC',
        trans:1,
        startDate:start_Time,
        endDate:end_Time
    }
    if(shopId !== undefined) {
        obj.meid = shopId;
    }
    if(Ename !== '姓名查找'){
        obj.ename = Ename;
    }
    $.ajax({
        url:commUrl+'/shift/group',
        cache:false,
        type:'GET',
        data:obj,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            $(".dataHead").empty();
            $('#nameDept').empty();
            $('#dataBody').empty();
            var html = '';
            var page = '';
            var head = '';
            var dom = '';
            if(data.code == '1'){
                //表格头部
                var str = getAll(start_Time, end_Time);



          /* var nameDept =  '<tr id="datagrid-row-r1-1-2" datagrid-row-index="2" class="datagrid-row"style="height: 25px;"> ' +
               '<td class="datagrid-td-rownumber"> <div class="datagrid-cell-rownumber">3</div> </td> ' +
               '<td field="itemid"> <div style="height:auto;" class="datagrid-cell datagrid-cell-c1-itemid">EST-11</div> </td> ' +
               '<td field="productid"> <div style="height:auto;" class="datagrid-cell datagrid-cell-c1-productid">RP-SN-01 </div> </td> </tr>';//姓名部门*/


           /* var dataHead = '<td field="listprice" class=""> <div class="datagrid-cell datagrid-cell-c1-listprice" style="text-align: center;">' +
                ' <span>List Price</span><span class="datagrid-sort-icon">&nbsp;</span></div> </td>';//头部日期*/


                /*var dataBody = '<tr id="datagrid-row-r1-2-2" datagrid-row-index="2" class="datagrid-row" style="height: 25px;"> ' +
                    '<td field="listprice"><div style="text-align:center;height:auto;"class="datagrid-cell datagrid-cell-c1-listprice">38.5 </div> </td></tr>'//日期body*/


               /* head = '<div class="grid-head-th"> <div class="answer" style="width: 49px;"><span style="width: 49px;">编号</span></div> <div class="num" style="width: 99px;"><span style="width: 99px;">姓名</span></div> <div class="percent" style="width: 99px;"><span style="width: 99px;">部门</span></div>'+str+'</div>';
                $('.order-head').html(head);*/

                //表格主体
                if(data.data.count == 0){
                    html = '<div class="grid-body-tr"><p>暂无数据</p></div>';
                }else {
                    console.log(data.data.datas.length);
                    $.each(data.data.datas,function(i,key){

                        dom += '<tr class="datagrid-row" style="height: 25px;"> '
                        $.each(key.arrangements,function(num,val){
                            if(val.eid == undefined){
                                dom += '<td field="listprice" data-id="'+key.sid+'"><div style="text-align:center;height:auto;"class="datagrid-cell datagrid-cell-c1-listprice">休</div> </td>'
                            }else{
                                dom += '<td field="listprice" data-id="'+key.sid+'"><div style="text-align:center;height:auto;"class="datagrid-cell datagrid-cell-c1-listprice" data-id="'+key.sid+'">'+key.shiftName+'</div> </td>';
                                    /*'<div style="width:80px; color: red;"  ><span style="width:80px;">'+key.shiftName+'</span></div>';*/
                            }
                        })
                        dom +='</tr>'
                        html += '<tr id="" datagrid-row-index="" class="datagrid-row"style="height: 25px;"> ' +
                            '<td class="datagrid-td-rownumber"> <div class="datagrid-cell-rownumber">'+(i + 1)+'</div> </td> ' +
                            '<td field="itemid"> <div style="height:auto;" class="datagrid-cell datagrid-cell-c1-itemid" data-id="'+key.eid+'">'+key.ename+'</div> </td> ' +
                            '<td field="productid"> <div style="height:auto;" class="datagrid-cell datagrid-cell-c1-productid" data-id="'+key.dptid+'">'+key.dptname+'</div> </td> </tr>';
                    })

                }

            }
            $("#dataHead").html(str);
            $('#nameDept').html(html);
            $('#dataBody').html(dom);
            selected_th();
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
function p(s) {
    return s < 10 ? '0' + s: s;
}
function listPage(){
    //page = page?page:1;
    var start_Time = $('#startTime')[0].value;
    var end_Time = $('#endTime')[0].value;
    var lastDay = getCurrentMonthLast()
    if(start_Time!== ''|| end_Time!== '')
    {
        if( new Date(end_Time)< new Date(start_Time))
        {
            $(".tip").empty().css({color:"red"}).html("开始时间不能小于结束时间");
            return;
        }else{
            $(".tip").empty();
        }
    }else{
        var myDate = new Date();
        start_Time = myDate.getFullYear() +'-'+p(myDate.getMonth() + 1) + "-" +'01';
        end_Time =  myDate.getFullYear() +'-'+p(myDate.getMonth() + 1) + "-" + lastDay;//end_Time

    }

    pullModel(start_Time,end_Time,lastDay);
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

function getCurrentMonthLast(){
    var date = new Date();
    var currentMonth = date.getMonth();
    var nextMonth = currentMonth + 1;
    var nextMonthFirstDay = new Date(date.getFullYear(),nextMonth,1);
    var oneDay=1000*60*60*24;
    var lastDay = new Date(nextMonthFirstDay-oneDay);
    lastDay = lastDay.getDate()
    return lastDay;
}
/*function load(){
    var oneDay,lastDay;
    oneDay = getCurrentMonthFirst();
    lastDay = getCurrentMonthLast();

    console.log(oneDay);
    console.log(lastDay);
    debugger;
    //return false;
    commUrl = 'http://10.10.23.65:8080/server';//正式环境//明伟
    $.ajax({
        url: commUrl+'/shift/group?token='+$.cookie("token")+'&trans=1',
        //type:'POST',
        //data:arr,
        //dataType: 'json',
        //contentType: 'application/json; charset=UTF-8',
        success: function(data){
            data = eval('(' + data + ')')
            if(data.code == 1){
                console.log(data);
                debugger;
                var datas = data.data.datas
                /!*if(datas.length !== 0){
                    var date = []
                    $.each(datas,function(i,key){
                        var day = key.workDate;
                        date.push(day);
                    })
                    loadDatePicker(date);
                }else {
                    $('#multiple').empty();
                    loadDatePicker();
                }*!/
            }

        },
        error: function(text){
            alert('出错啦~！');
        }
    })
}*/
function producer(){
    $.ajax({
        url: commUrl + '/user/userList',
        //type: 'POST',
        cache: false,
        async: false,
        data: {
            token: $.cookie("token")
        },
        //dataType: 'json',
        //contentType: 'application/json; charset=UTF-8',
        success: function(data) {
            data = eval('(' + data + ')');
            if(data.code == '1') {
                //if(data.data.length > 1){
                var str = ''
                str = '<option value="">选择公司</option>';
                $.each(data.data,function(i,key){
                    str +='<option value="'+key.id+'">'+key.nick+'</option>'
                });
                $('#producer').html(str);
                if(data.data.length == 1){
                $('#producer').hide();

                }else {
                $('.producer').show();
                }
                //_companyId = $('#producer').children('option:selected').attr('value');
                //classId(_companyId);//根据商家获取该商家下的部门
                changeProduct();
            }
        },
        error: function(text){

        }
    })
}
function changeProduct(){
    $('#producer').on('change',function(){
        listPage();
    })
};