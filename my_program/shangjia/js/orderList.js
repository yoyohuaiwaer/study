/**
 * Created by shinneyou on 2016/9/21.
 */
//页面加载
$(document).ready(function() {
    $.ajax({
        url:commUrl+'/menu/findbyid',
        //async: false,
        data:{
            token:$.cookie("token"),
            parentId:$(".main-title").attr("title")
        },
        success: function(data){
            data = eval('('+data+')')
            //console.log(data);
            $(".breadcrumb").html('<li class="selected"><span href="javascript:void(0);" title="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].parentId+'">'+data.data[0].name+'</span></li>');
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    });
    orderListPage();

});

function orderListPage(page){
    page = page?page:1;

    $.ajax(
        {
            url: commUrl+'/order',//
            data: {token:$.cookie("token"),page:page, row:10},
            dataType: 'json',
            async: false,
            success: function (response) {
                response = JSON.parse(response);
                $(".grid-body").empty();
                var html = '';
                //console.log(response);
                if(response.code == '1'){
                    if(response.data.datas.length <= 0){
                        html = '暂无订单'
                    }
                    else{
                        var content = response.data.datas;
                        $.each(response.data.datas, function(i,key){
                             sort = i+1;
                            //alert(sort);
                             html +='<div class="grid-body-tr">';
                             html += '<div class="index">'+ sort + '</div>' +
                                     '<div class="order-num"><span>'+key.id+'</span></div>' +
                                     '<div class="desk-num"><span>' + '无' + '</span></div>' +
                                     '<div class="order-person"><span>' + '无' + '</span></div>' +
                                     '<div class="tel"><span>' + '手机无' + '</span></div>' +
                                     '<div class="order-time"><span>' + key.createTime + '</span></div>';
                            if(key.state == 0){
                                html += '<div class="order-status">' + '待确认' + '</div><div class="order-money">' + key.money + '</div>' +
                                '<div class="order-detail"><a class="aa" rel="1" onclick="viewDetails(\''+ key.id + '\',\''+key.state+'\')" >查看</a></div>';
                            }
                            else if(key.state == 1){
                                html += '<div class="order-status">' + '已确认' + '</div><div class="order-money">' + key.money + '</div>' +
                                    '<div class="order-detail"><a class="aa" rel="0" onclick="viewDetails(\''+ key.id + '\',\''+key.state+'\')" >查看</a></div>';
                            }
                            else if(key.state == 2){
                                html += '<div class="order-status">' + '已完成' + '</div><div class="order-money">' + key.money + '</div>' +
                                    '<div class="order-detail"><a class="aa" rel="0" onclick="viewDetails(\''+ key.id + '\',\''+key.state+'\')" >查看</a></div>';
                            }
                            else if(key.state == -1){
                                html += '<div class="order-status">' + '取消' + '</div><div class="order-money">' + key.money + '</div>' +
                                    '<div class="order-detail"><a class="aa" rel="0" onclick="viewDetails(\''+ key.id + '\',\''+key.state+'\')" >查看</a></div>';
                            }
                            if(key.state == 0){
                                html += '<div class="order-operation"><input type="button" class="button confirm" value="确认" src-id="'+ key.id+ '" state="' + key.state + '" maid="' + key.maid +'">';
                            }
                            else {
                                html += '<div class="order-operation"><input type="button"  disabled="disabled" class="button confirm  invalid"  value="确认">';
                            }
                            if(key.state == -1){
                                html += '<input type="button" class="button cancel invalid" value="取消" disabled="disabled" src-id="'+ key.id+ '" state="-1" maid="' + key.maid +'"></div></div>';
                            }else {
                                html += '<input type="button" class="button cancel"  value="取消" src-id="'+ key.id+ '" maid="' + key.maid +'"></div></div>';
                            }

                        });
                        //分页
                        pagination(response.data.page,response.data.pageCount);
                    }
                    var sort = 1;
                }
                $(".grid-body").html(html);
                //确认事件绑定
                confirm();
                cancel();
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
}

function confirm(){
    $(".order-operation .confirm").on("click",function(){
        var id = $(this).attr("src-id");
        var state = $(this).attr("state") - 0 + 1;
        var maid = $(this).attr("maid");
        var url = commUrl+'/order_' + id + "_" + state;//
        $.ajax({
            url:url,
            data: {token:$.cookie("token"),maid:maid},
            dataType:"json",
            type:'POST',
            success:function (data){
                data = JSON.parse(data);
                if(data.code == 1){
                    //alert(data.msg);
                    var page = parseInt($(".onpage").text());
                    orderListPage(page);
                }
            },
            error:function () {
                alert("出错了");
            }

        });
    })
}
function cancel(){
    $(".order-operation .cancel").on("click",function(){
        var id = $(this).attr("src-id");
        var state = 99;
        //alert(state);
        var maid = $(this).attr("maid");
        var url = commUrl+'/order_' + id + "_" + state;//
        $.ajax({
            url:url,
            data: {token:$.cookie("token"),maid:maid},
            dataType:"json",
            type:'POST',
            success:function (data){
                data = JSON.parse(data);
                if(data.code == 1){

                    var page = parseInt($(".onpage").text());
                    orderListPage(page);
                }
            },
            error:function (text) {
                alert("出错了");

            }

        });
    })
}

function viewDetails(id,rel){
    $.cookie("id",id,{ path: '/' });
    $.cookie("orderState",rel,{ path: '/' });
    //alert($.cookie("orderState"));
    //设置checkbox只读模式
    $.cookie("disable",true,{ path: '/' });
    $.ajax({
        url:"order-details.html",
        dataType:"html",
        success:function (data) {
            $(".main").empty().html(data);
        },
        error:function () {
            alert("出错啦");
        }
    });
}
function pagination(page,pageCount){
    var pageHtml = '';
    if(page==1){
        pageHtml += '<li class="prevPage readonly" onclick="javascript:prevPage(this)" ><span class="prev">&lsaquo;</span></li>';
    }
    else{
        pageHtml += '<li class="prevPage" onclick="javascript:prevPage(this)" ><span class="prev">&lsaquo;</span></li>';
    }
    pageHtml += '<li class="page"> <span class="onpage">'+ page +'</span>/<span class="pagecount">'+ pageCount + '</span></li>'
    if(page == pageCount){
        pageHtml += '<li class="nextPage readonly" onclick="javascript:nextPage(this)"><span class="next">&rsaquo;</span></li>';
    }
    else{
        pageHtml += '<li class="nextPage" onclick="javascript:nextPage(this)"><span class="next">&rsaquo;</span></li>';
    }
    pageHtml += '<li><input type="text" class="num-box"></li><li><span class="jump">跳转</span></li>';
    $(".pages ul").html(pageHtml);
    //input框跳转
    $(".num-box").on("keyup",limitNum);
    $(".num-box").on("afterpaste",limitNum);
    $(".jump").on("click",function(){
        var page = $(".num-box").val();
        if(page){
            if(page < 1){
                orderListPage(1);
            }
            else if(page > pageCount){
                orderListPage(pageCount);
            }
            else{
                orderListPage(page);
            }
        }
    });
    function limitNum(){
        var value = $(this).val();
        value = value.replace(/\D/g,'')
        $(this).val(value);
    }

}
//下一页
function nextPage(e){
    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
        return false;
    }
    else {
        var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
        orderListPage(page);
    }
}

//上一页
function prevPage(e) {
    if($(e).next("li").find(".onpage").text() == '1'){
        return false;
    }
    else {
        var page = $(e).next("li").find(".onpage").text() - 1;
        orderListPage(page);
    }
}
