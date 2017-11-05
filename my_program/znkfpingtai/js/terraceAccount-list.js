/**
 * Created by A on 2016/11/28.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li class="selected"><a class="" alt="terraceAccount-list.html" id="583ce135b2a99afa74c51394">官方账号管理</a></li>';
    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();
    pageOrder();
    hideOverflow();
    deleted();
    add();
})
function pageOrder(page){
    //console.log($.cookie("token"));
    page = page?page:1;
    $.ajax({
        url:commUrl+'/admin/find',
        type:'GET',
        data:{
            token:$.cookie("token"),
            page:page,
            row: 10,
            sortId:'createTime',
            sortType:'DESC'
        },
        success: function(response){
            $(".grid-body").empty();
            $(".pages ul").empty()
            var html = '';
            var page = '';
            response = JSON.parse(response);
            if(response.code == 1){
                //console.log(response.data);
                if(response.data.datas == ''){
                    html = '暂无数据';
                }else {
                    //数据循环
                    $.each(response.data.datas,function(i,key){
                        //console.log(key);
                        var sort = i+1;
                        html += '<div class="grid-body-tr"> ' +
                            '<div class=""><span>'+key.username+'</span></div> ' +
                            '<div class=""><span title="">'+key.owner+'</span></div>' ;
                           // '<div class=""><span title="">'+key.nick+'</span></div>'
                        if(key.state == 1){
                            html += '<div class=""><span title="">启用</span></div>' ;
                        }else {
                            html += '<div class=""><span title="">停用</span></div>' ;
                        }
                        html += '<div class="operation"> <span> <a class="edit" rel="0" data-id="'+key.id+'">修改</a> <a class="showOverflow" data-id="'+key.id+'">删除</a> </span> </div> </div>';
                    })
                    ;
                    //分页判断
                    if(response.data.page == '1') {
                        page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li>' +
                            ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage" min="1"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'

                    }
                    else if(response.data.page == response.data.pageCount){
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage ">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage" min="1"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                    }
                    else {
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage" min="1"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
                    }

                    $(".grid-body").html(html);
                    $(".pages ul").html(page);
                }
                //确认绑定事件
                showOverflow();
                //deleted();
                edit();

            }

        },
        error: function( text){
            alert(text.readyState);
            alert(text.status);
            alert("出错啦");
        }
    })
}
function viewDetails(){
    $.ajax({
        url:'terraceAccount-details.html',
        success: function(data){
            $('.main').empty().html(data);
        }
    });
}
function add(){
    $('.confirm').on('click',function(){
        $.cookie('accountCode',$(this).attr('rel'),{ path: '/' });
        viewDetails()
    })
}
function showOverflow(){
    $(".showOverflow").on('click',function(){
        $(".deleted").attr({id: $(this).attr('data-id')});
        $(".overall").show();
    })
};
//deleted();
function edit(){
    $('.edit').on('click',function(){

        $.cookie('accountCode',$(this).attr('rel'),{ path: '/' })
        $.cookie('accountId',$(this).attr('data-id'),{ path: '/' });
        //alert($.cookie('accountId'));
        $(this).attr('id')
        viewDetails();
    })
};
function deleted(){
    $(".deleted").on('click',function(){
        //alert($(this).attr('id'));
        $.ajax({
            url: commUrl+'/admin/delete',
            //type:'POST',
            data:{
                token:$.cookie("token"),
                id:$(this).attr('id')
            },
            success: function(data){
                data = JSON.parse(data);
                console.log(data);
                if(data.code == 1) {
                    var page =  $('.onpage').text();
                    pageOrder(page);
                    $(".overall").hide();
                }else if(data.code == -2){
                    alert(data.msg)
                }
            },
            error: function(text){
                text.readyState;
                text.status;
            }
        })
    })
}
function hideOverflow(){
    $(".hideOverflow").on('click',function(){
        //$(".deleted").attr({id: $(this).attr('rel')});
        $(".overall").hide();
    })
}
function prevPage(e) {
    $(e).next("li").find(".onpage").text();

    if($(e).next("li").find(".onpage").text() == '1'){
        //$(e).addClass("readonly");
    }
    else {
        var page = $(e).next("li").find(".onpage").text() - 1;
        pageOrder(page);
    }
}
function nextPage(e){
    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
        //$(e).addClass("readonly");
    }
    else {
        //alert($(e).prev("li").find(".onpage").text());
        var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
        pageOrder(page);

    }
}
//输入框跳转页面
function turnPage(e){
    //alert($(e).prev(".nowPage").val());
    if(parseInt($(e).prev(".nowPage").val() )<= 1){
        var page = 1;
        pageOrder(page);
    }else if(parseInt($(e).prev(".nowPage").val() )>= parseInt($(".pagecount").text())){
        var page = $(".pagecount").text();
        pageOrder(page);
    }else{
        var page = $(e).prev(".nowPage").val();
        pageOrder(page);

    }
}
