/**
 * Created by A on 2016/10/8.
 */
$(document).ready(function() {
    $.ajax({
        url:commUrl+'/menu/findbyid',
        data:{
            token:$.cookie("token"),
            parentId:$(".main-title").attr("title")
        },
        success: function(data){
            data = eval('('+data+')')
            $(".breadcrumb").html('<li class="selected"><span href="javascript:void(0);" title="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].parentId+'">'+data.data[0].name+'</span></li>');
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    });
    //设备列表加载
    orderListPage();

});
function orderListPage(page){
    page = page?page:1;
    $.ajax(
        {
            url: commUrl+'/mac/find',//'http://112.74.14.173:8083/SAnbot/machine/find',//正式服务器
            data: {
                token:$.cookie("token"),
                page:page,
                row:10,
                sortId:'startTime',
                sortType:'DESC'
            },
            dataType: 'json',
            async: false,
            success: function (response) {
                response = JSON.parse(response);
                //console.log(response);
                $(".grid-body").empty();
                var html = '';
                //console.log(response);
                if(response.code == '1'){
                    $.each(response.data.datas,function(i,key){
                        var sort = i + 1;
                        html +='<div class="grid-body-tr">';
                        html += '<div><span>'+ sort + '</span></div><div><span>'+key.id+'</span></div><div><span>无</span></div><div><span>无</span></div>' ;
                        if(key.useWay == 1){
                           html +='<div><span>租用</span></div>';
                        }else if (key.useWay == 2){
                            html +='<div><span>出售</span></div>';
                        }
                        if(key.status == 1){
                            html += '<div><span>启用</span></div>';
                        }else if (key.status == 0){
                            html += '<div><span>停用</span></div>';
                        }
                        html +='<div><span>无</span></div><div><span>无</span></div><div><span>无</span></div><div><span><a class="edit" id="'+key.id+'">修改</a></span></div></div>';

                    })
                    if(response.data.page == '1') {
                        page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li>' +
                            ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'

                    }
                    else if(response.data.page == response.data.pageCount){
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                    }
                    else {
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
                    }
                }
                $(".grid-body").html(html);
                $(".pages ul").html(page);
                //确认事件绑定
                edit();
                //cancel();
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
}
function edit(){
    $(".edit").on('click',function(){
        $.cookie("deviceId",this.id,{ path: '/' });
        $.ajax({
            url:menuUrl+'device-detail.html',
            success: function(data){
                $('.main').empty().html(data);
            }

        })
    })
}
function prevPage(e) {
    $(e).next("li").find(".onpage").text();

    if($(e).next("li").find(".onpage").text() == '1'){
        //$(e).addClass("readonly");
    }
    else {
        var page = $(e).next("li").find(".onpage").text() - 1;
        orderListPage(page);
    }
}

function nextPage(e){
    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
       // $(e).addClass("readonly");
    }
    else {
        var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
        orderListPage(page);

    }
}