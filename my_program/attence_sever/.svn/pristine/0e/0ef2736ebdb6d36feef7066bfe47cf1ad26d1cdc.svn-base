/**
 * Created by A on 2017/6/15.
 */
/**
 * Created by A on 2016/10/24.
 */
/**
 * Created by A on 2016/10/21.
 */
//var commUrl = 'http://172.16.8.70:8080/manage';
$(document).ready(function(){
    //commUrl = 'http://10.10.23.65:8080/server';//正式环境//明伟
    producer();
    selectTime();
    if($.cookie('data-id') !== ''){
        loadPage();
    }

    confirm();
    cancel();
    //selectList();

    confirmTime();
    chooseStatus();
});
function chooseStatus(){
    $('input[name="status"]').on('click',function(){
        var val = $('input[name="status"]:checked').val();
        if(val == '0'){
            $('.replay').show();
        }else {
            $('.replay').hide();
        }
    })
}
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
                //str = '<option value="">选择公司</option>';
                $.each(data.data,function(i,key){
                    str +='<option value="'+key.id+'">'+key.nick+'</option>'
                });
                //if(data.data.length == 1){
                    $('#producer').html(str);

                //}else {
                  //  $('#producer').html(str);
                    //$('.chooseCompany').show();
                //}
                //var _id = $('#producer').children('option:selected').attr('value');
                //loadAd(_id);
                //producerChange();
                //searchProducer();
                //}

            }
        },
        error: function(text){

        }
    })
}
function producerChange(){
    $('#producer').on('change',function(){
        var id = $('#producer').children('option:selected').attr('value');
        loadAd(id);
    })
    //var id = $('#producer').children('option:selected').attr('value');
}
function confirmTime(){
    $('.confirmTime').on('click',function(){
        var startHour = $('#startTime').find('.hour option:selected').val();
        var startMinute = $('#startTime').find('.minute option:selected').val();
        var endHour = $('#endTime').find('.hour option:selected').val();
        var endMinute = $('#endTime').find('.minute option:selected').val();
        startHour = parseInt(startHour);
        startMinute = parseInt(startMinute);
        endHour = parseInt(endHour);
        endMinute = parseInt(endMinute);

        $(this).parent('.setTime').hide();
        var str = $(this).parent('.setTime').find('.hour option:selected').val()+':'+ $(this).parent('.setTime').find('.minute option:selected').val();
        $(this).parent('.setTime').prev('.selectTime').val(str);
        $('.Timetips').html('').css({color:'green'})
        /*if(endHour == 0){
            if(startHour > endHour){
                $(this).parent('.setTime').hide();
                var str = $(this).parent('.setTime').find('.hour option:selected').val()+':'+ $(this).parent('.setTime').find('.minute option:selected').val();
                $(this).parent('.setTime').prev('.selectTime').val(str);
                $('.Timetips').html('').css({color:'green'})
            }
        }else{
            if(startHour < endHour){
                $(this).parent('.setTime').hide();
                var str = $(this).parent('.setTime').find('.hour option:selected').val()+':'+ $(this).parent('.setTime').find('.minute option:selected').val();
                $(this).parent('.setTime').prev('.selectTime').val(str);
                $('.Timetips').html('').css({color:'green'})
            }else if(startHour == endHour){
                if(startMinute < endMinute){
                    $(this).parent('.setTime').hide();
                    var str = $(this).parent('.setTime').find('.hour option:selected').val()+':'+ $(this).parent('.setTime').find('.minute option:selected').val();
                    $(this).parent('.setTime').prev('.selectTime').val(str);
                    $('.Timetips').html('').css({color:'green'})
                }else{
                    $('.Timetips').html('开始时间不能早于结束时间').css({color:'red'});
                }
            }else{
                $('.Timetips').html('开始时间不能早于结束时间').css({color:'red'});
            }
        }*/
    })
}

function selectTime(){
    setTimer('.hour');
    setTimer('.minute');
    $("body").on('click','.selectTime',function(){
        $(this).next('.setTime').show();
    });
    /*$('.selectTime').on('blur',function(){
     $(this).next('.setTime').hide();
     })*/

}

function setTimer(fac){
    var str = '';
    if(fac == '.hour'){

        for(var h = 0;h < 10;h++){
            str += '<option value="0' + h + '">0'+ h + '</option>';
        }
        for(var h = 10 ; h < 24 ; h++){
            str += '<option value="' + h + '">'+ h + '</option>';
        }
    }else {
        for(var h = 0;h < 10;h++){
            str += '<option value="0' + h + '">0'+ h + '</option>';
        }
        for(var h = 10 ; h < 60 ; h++){
            str += '<option value="' + h + '">'+ h + '</option>';
        }
    }
    $(fac).html(str);
}


/*function loadAd(id){
    var obj = {
        token:$.cookie("token"),
        meid: id
    }
    $.ajax({
        url:commUrl+'/employee/simpleemp',
        data:obj,
        async: false,
        cache:false,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            $(".selectOption").empty();
            var html = '<li><input type="checkbox" class="allperson">选择全部</li>';
            if(data.code == '1'){

                $.each(data.data,function(i,key){
                    html += '<li><input type="checkbox" class="person" data-id="'+key.id+'" data-name="'+key.name+'"/>'+key.name+'</li>';
                })
                $(".selectOption").html(html);
                chooseAll();

            }
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
function chooseAll(){
    $(".allperson").click(function() {
        $('.person').prop("checked",this.checked);
    });
    var $subBox = $('.person');
    $subBox.click(function(){
        $(".allperson").prop("checked",$subBox.length == $('.person:checked').length ? true : false);
    });
};
function selectList(){
    $('.optionSelected').click(function(){
        if($('.suport-icon').attr('class') == 'suport-icon icon-drop_down'){
            $(this).addClass('radius');
            $('.selectOption').slideDown();
            $('.suport-icon').removeClass('icon-drop_down').addClass('icon-drop_up');
        }else {

            $('.selectOption').slideUp();
            $(this).removeClass('radius');
            $('.suport-icon').removeClass('icon-drop_up').addClass('icon-drop_down');
        }
    })
};
 function loadPerson(id){
    $.ajax({
        url:commUrl+'/shift/group',
        data: {
            token: $.cookie('token'),
            id: id,
            page:1,
            row:'10000',
        },
        success: function(response){
            response = JSON.parse(response);
            if(response.code == 1){
                var key = response.data.datas[0]
                var lenth = key.arrangements.length;
                var arr = key.arrangements;
                var adLeth = $('.person').length;
                if(lenth > 0){
                    //var arr = response.data.adIds
                    if(lenth == adLeth){
                        $(".allperson").prop('checked',true);
                    }
                    $.each(arr,function(i,key){
                        $('.selectOption input[type="checkbox"]').each(function(){
                            if($(this).attr('data-id') == key.eid){
                                $(this).prop( "checked", true );
                            }
                        })
                    })
                }
            }
        },
        error: function(text){
            alert("出错啦~！")
        }
    });
}*/
function loadPage(){
    //console.log($.cookie('data-id'));
    $.ajax({
        url:commUrl+'/shift',
        async: false,
        data: {
            token: $.cookie('token'),
            id: $.cookie('data-id'),
        },
        success: function(response){
            response = JSON.parse(response);
            if(response.code == 1){

                if($.cookie('Status') == 1){
                    var _id = response.data.datas[0].meid;
                    var _sid = response.data.datas[0].id
                    $("#name").val(response.data.datas[0].name).attr({'data-id':_sid});
                    $("#signinStart").val(response.data.datas[0].startTime);
                    $("#signinStop").val(response.data.datas[0].endTime);
                    $("#producer").find("option[value='"+ response.data.datas[0].meid+ "']").attr({selected: "selected"});
                    $("#lateTime").find("option[value='"+ response.data.datas[0].allowLate+ "']").attr({selected: "selected"});
                    if(response.data.datas[0].type !== undefined){
                        $('input[name="status"]').each(function(){
                            if($(this).attr('value') == response.data.datas[0].type){
                                $(this).prop( "checked", true);
                                if(response.data.datas[0].type == 1){
                                    $('.replay').hide();
                                }
                            }
                        });
                    }
                    if(response.data.datas[0].patterns !== undefined){
                        $.each(response.data.datas[0].patterns,function(i,key){
                            $(".checkbox").each(function(){
                                if($(this).attr('value') == key){
                                    $(this).prop('checked',true)
                                }

                            })
                        })
                    }
                }else{

                    var _id = response.data.datas[0].meid;
                    var _sid = response.data.datas[0].id
                    $("#name").val(response.data.datas[0].name).attr({'data-id':_sid,'readonly':'readonly'});
                    $("#signinStart").val(response.data.datas[0].startTime).attr({'readonly':'readonly'});
                    $("#signinStop").val(response.data.datas[0].endTime).attr({'readonly':'readonly'});
                    $("body").on('click','.selectTime',function(){
                        $(this).next('.setTime').hide();
                    });
                    $("#producer").find("option[value='"+ response.data.datas[0].meid+ "']").attr({selected: "selected"});
                    $("#lateTime").find("option[value='"+ response.data.datas[0].allowLate+ "']").attr({selected: "selected"});
                    if(response.data.datas[0].type !== undefined){
                        $('input[name="status"]').each(function(){
                            if($(this).attr('value') == response.data.datas[0].type){
                                $(this).prop( "checked", true);
                                if(response.data.datas[0].type == 1){
                                    $('.replay').hide();
                                }
                            }
                            $(this).attr({'disabled':'disabled'})
                        });
                    }
                    if(response.data.datas[0].patterns !== undefined){
                        $.each(response.data.datas[0].patterns,function(i,key){
                            $(".checkbox").each(function(){
                                if($(this).attr('value') == key){
                                    $(this).prop('checked',true)
                                }
                                $(this).attr({'disabled':'disabled'});
                            })
                        })
                    }



                }



                //loadAd(_id);
                //loadPerson(_sid);

            }
        },
        error: function(text){
            alert("出错啦~！")
        }
    });

}

function newPage(){
    $.ajax({
        url:menuUrl+'order-list.html',
        success: function(data){
            $('.main').html(data);
        }
    })
}
function addPerson(meid,sid,sname){
    var arr = [];
    var mydate = new Date();
    var years = "" + mydate.getFullYear() + "-";
    var months =mydate.getMonth()+1;
    //console.log(months)
    if(months < 10){
        months =''+'0'+months;
    }
    var str = years+months;
    $('.person').each(function(){
        if($(this).is(':checked')){
            var obj = {
                meid: meid,
                sid: sid,
                sname: sname
            }
            obj.eid = $(this).attr('data-id');
            obj.ename = $(this).attr('data-name');
            arr.push(obj);
        }
    })
   // console.log(str);
    arr = JSON.stringify(arr);
    //console.log(arr);
    //debugger;
    $.ajax({
        url:commUrl+'/shift/group?token='+$.cookie("token")+'&date='+str,
        type:'POST',
        data:arr,
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function(data){
            data = eval('(' + data + ')')
            if(data.code == '1'){
             newPage();
             }else {
                alert(data.msg);
            }
        },
        error: function(text){
            alert('出错啦~！');
        }
    })


}
function confirm(){
    $(".confirm").click(function(){
       var arr = [];
        /* $('.person').each(function(){
            if($(this).is(':checked')){
                adId += $(this).attr('value')+',';
            }
        })*/

/*        $('.person').each(function(){
            if($(this).is(':checked')){
                var obj = {
                    //meid: meid,
                    //sid: sid,
                    //sname: sname
                }
                obj.eid = $(this).attr('data-id');
                obj.ename = $(this).attr('data-name');
                arr.push(obj);
            }
        })*/
        var arr = [];
        $(".checkbox").each(function (index) {
            if($(this).is(":checked")){
                var details = $(this).attr('value');
                arr.push(details);
                //alert(details);
            }
        });
        var _startTime = $('#signinStart').val();
        var _endTime = $('#signinStop').val();
        var _allowLate = $('#lateTime').children('option:selected').attr('value');
        var _meid = $('#producer').children('option:selected').attr('value');
        var _mename = $('#producer').children('option:selected').text();
        var _name = $('#name').val();
        var _id = $('#name').attr('data-id');
        var status = $('input[name="status"]:checked').val()
        var obj = {
            //token:$.cookie("token"),
            startTime: _startTime,
            endTime: _endTime,
            allowLate: _allowLate,
            meid: _meid,
            mename: _mename,
            name: _name,
            type:status
            //industry:$.cookie('industryName')
        };
        if(status == '0'){
            if(arr.length == 0){
                alert('请选择重复时间');
                return false;
            }else{
                obj.patterns = arr;
            }
        }

        if($.cookie('data-id') !== ''){
            obj.id = _id;
        }
        /*if(arr.length == 0){
            alert('请选择人员~！');
            return false;
        }*/
        obj = JSON.stringify(obj);
        $.ajax({
            url:commUrl+'/shift?token='+$.cookie("token"),
            type:'POST',
            data:obj,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function(data){
                data = eval('(' + data + ')')
                if(data.code == '1'){
                    newPage();
                    //var _meid = data.data.meid;
                    //var _name = data.data.name;
                    //var _id = data.data.id;
                    //addPerson(_meid,_id,_name);
                }else {
                    alert(data.msg);
                }
            },
            error: function(text){
                alert('出错啦~！');
            }
        })



    })
}
function cancel(){
    $(".cancel").on('click',function(){
        newPage();
    })
}
