$.ajax({
    url:commUrl+'/menu/findbyid',
    data:{
        token:$.cookie("token"),
        parentId:$(".main-title").attr("title")
    },
    success: function(data){
        data = eval('('+data+')');
        if(data.code == '1'){
            $(".breadcrumb").empty();
            //console.log(data);
            var breadcrumb = '<li><a href="javascript:void(0);"  onclick="javascript:changePage(this);" title="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].parentId+'">'+data.data[0].name+'</a></li>' +
                '<li class="selected"><span href="javascript:void(0);" title="'+menuUrl+''+data.data[1].url+'" id="'+data.data[1].parentId+'">'+data.data[1].name+'</span></li>'
            $(".breadcrumb").html(breadcrumb);
            //alert(breadcrumb);
        }
    },
    error: function(text){
        alert(text.readyState);
        alert(text.status);
    }
});
$(document).ready(function() {
    var id = $.cookie("id");
    var disable = $.cookie("disable");
    var url = commUrl+'/order_' + id;
    var confirmData = {};
    $.ajax({
        url: url,
        data: {token:$.cookie("token")},
        dataType: 'json',
        success:function (data) {
            data = JSON.parse(data);
            confirmData = data.data;
            var html = '';
            details = data.data.details;
            //console.log(data);
            if(data.code ==1){
                data = data.data;
                html += '<div class="grid-body-tr"><div class="column-one">订单号:</div><div class="column-two" style="border: none">' +
                    data.id + '</div> <div class="column-three"></div><div class="column-four"></div></div>';
                html += '<div class="grid-body-tr"><div class="column-one">桌号:</div><div class="column-two">' +
                    '桌号无' + '</div><div class="column-three">订单金额:</div><div class="column-four">'+
                    data.money + '</div></div>';
                html += '<div class="grid-body-tr"><div class="column-one">下单时间:</div><div class="column-two">' + data.createTime + '</div><div class="column-three"></div><div class="column-four"></div></div>';
               $("#orderInfo").empty().html(html);

                //菜单
                var html = '';
                //查看还是编辑状态

                $.each(details, function(i,key){
                    html += '<div class="grid-body-tr"> <div class="column-one">' ;
                    if($.cookie("orderState") == 0){
                        html += '<input type="checkbox" class="checkbox" checked=true>&nbsp;&nbsp;';
                    }else{
                        html += '<input type="checkbox" class="checkbox" disabled="disabled" checked=true>&nbsp;&nbsp;';
                    }
                    html +=' '+key.name+ '&nbsp;&nbsp;' + key.price + '元</div></div>';
                });

                if($.cookie("orderState") == 0){
                    $(".cancel").hide();
                }else{
                    $(".details-confirm").hide();
                    $(".checkbox-all").prop("disabled","disabled");
                    $("#tips").prop("disabled","disabled");
                }
                $("#tips").text(data.remark);
                $(html).insertBefore("#select");
                $("#money").html("总计：" + data.money + "元");
                $("#tips").html(data.remark);
                check(data.money);
                $(".details-confirm").attr({id:data.state});
                //alert(data.state);
                $(".details-confirm").on("click",confirm);
                $(".cancel").on("click",dispatchList);
            }
        }

    });
    function check(totalMoney){
        //checkbox监听事件
        var money = 0;
        $(".checkbox").on("change",function(){
            var money = 0;
            $(".checkbox").each(function () {
                if($(this).is(":checked")){
                    money += parseInt($(this).parent().text().replace(/\D/g,''));
                }
            });
            $("#money").html("总计：" + money + "元");
            return true;
        });

        //全选监听事件
        $("#selectAll").on("change",function () {
            var checked = $(this).is(":checked");
            $(".checkbox").prop("checked",checked);
            if(checked){
                $("#money").html("总计：" + totalMoney + "元");
            }
            else{
                $("#money").html("总计：0元");
            }
        });
    }

    function confirm(){
            var url = commUrl+'/order_' + confirmData.id;//田圃的本地
            //var url = 'http://172.16.8.70:8080/server/order_' + confirmData.id;//明伟本地的本地
            var details = [];
            $(".checkbox").each(function (index) {
                if($(this).is(":checked")){
                    details.push(confirmData.details[index]);

                }
            });
            confirmData.money = $("#money").html().replace(/\D/g,"");
            confirmData.state = $(this).attr("id") - 0 + 1;
            confirmData.details = details;
            confirmData.remark = $("#tips").val();

            var token = $.cookie("token");
            $.ajax({
                url:url+"?token="+token,
                data: JSON.stringify(confirmData),
                type:'POST',
                dataType:"json",
                contentType:'application/json; charset=UTF-8',
                success:function (data){
                    data = JSON.parse(data);
                    if(data.code == 1){
                        //alert(data.msg);
                        dispatchList();
                    }
                },
                error:function (text) {
                    alert("出错了");


                }
            });
    }

    //跳转到列表页
    function dispatchList(){
        $.ajax({
            url:"order-list.html",
            dataType:"html",
            success:function (data) {
                $(".main").empty().html(data);
            },
            error:function (text) {
                alert("出错啦");
            }
        });
    }
});