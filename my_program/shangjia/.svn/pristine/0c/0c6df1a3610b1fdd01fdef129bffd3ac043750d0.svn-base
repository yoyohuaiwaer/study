/**
 * Created by A on 2016/10/9.
 */
$(document).ready(function(){
    $.ajax({
        url:commUrl+'/menu/findbyid',
        data:{
            token:$.cookie("token"),
            parentId:$(".main-title").attr("title")
        },
        success: function(data){
            data = eval('('+data+')')
            if(data.code == '1'){
                $(".breadcrumb").empty();
                //console.log(data);
                var breadcrumb = '<li><a href="javascript:void(0);"onclick="javascript:changePage(this);" title="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].parentId+'">'+data.data[0].name+'</a></li>' +
                    '<li class="selected"><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="'+menuUrl+''+data.data[1].url+'" id="'+data.data[1].parentId+'">'+data.data[1].name+'</a></li>'
                $(".breadcrumb").html(breadcrumb);
                //alert(breadcrumb);
            }
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    });
    //设备列表加载
    orderListPage();
})
function orderListPage() {
    $.ajax({
            url: commUrl+'/mac/find',//'http://112.74.14.173:8083/SAnbot/machine/find',//正式服务器
            data: {
                token:$.cookie("token"),
                id: $.cookie("deviceId")
            },
            success: function(data){
                data  = JSON.parse(data);
                if(data.code == 1){
                    $('.device-nume span').html(data.data.datas[0].maid);
                    $('.device-startTime span').html('无');//(data.data.datas[0].startTime);
                    $('.device-endTime span').html('无');//(data.data.datas[0].endTime);
                    if(data.data.datas[0].useWay == 1) {
                        $('.device-useWay span').html('租用');
                    }else {
                        $('.device-useWay span').html('出售');
                    }
                    $('.device-useStatus input[type="text"]').attr({value:data.data.datas[0].useAdr});
                    //绑定时间
                    confirm();
                    cancel();

                }
            },
        error: function(){
            alert("出错啦");
        }
    })
}
function newPage(){
    $.ajax({
        url: menuUrl+'device-list.html',
        success: function(data){
            $('.main').empty().html(data);
        }

    })
}
function confirm(){
    $(".confirm").on('click',function(){
        //alert($('.device-useStatus input[type="text"]').val());
        $.ajax({
            url:commUrl+'/server/mac/update',
            type:'POST',
            data: {
                token:$.cookie("token"),
                id: $.cookie("deviceId"),
                useAdr:$('.device-useStatus input[type="text"]').val()
            },
            success: function(date){
                date = JSON.parse(date);
                if(date.code == 1) {
                    newPage();
                }

            },
            error: function() {
                alert("出错啦");
            }

        })
    })
}
function cancel(){
    $(".cancel").on('click',function(){
        newPage();
    })
}