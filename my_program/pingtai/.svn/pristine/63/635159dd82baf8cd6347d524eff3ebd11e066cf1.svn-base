/**
 * Created by A on 2017/5/24.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li class="selected"><a class="" alt="sports-list.html" id="592537bc1da52d71d9836baa">动作管理</a></li>';
    $(".breadcrumb").html(breadcrumb);
     pagenation();
    edit();
    deleted();
    hideOverflow();
})
function hideOverflow(){
    $(".hideOverflow").on('click',function(){
        //$(".deleted").attr({id: $(this).attr('rel')});
        $(".overall").hide();
    })
}

function edit(){
    $('.edit').on('click',function(){
        var id = $(this).attr('data-id');
        $.cookie('sports-id',id,{path:'/'});
        newPage()
    })
}
function newPage(){
    $.ajax({
        url:menuUrl+'sports-details.html',
        success: function(data){
            $('.main').html(data);
        }
    })
};
function pagenation(page){
    //console.log($.cookie("token"))
    page = page?page:1;
    var data = {};
   data = {token:$.cookie("token"), page:page, row: '10', sortId:'updateTime', sortType:'DESC'};
    $.ajax(
        {
            url: commUrl+'/moves',
            data: data,
            dataType: 'json',
            async: false,
            success: function (response) {
                response = JSON.parse(response);
               /* console.log(response);
                debugger;*/
                //$(".grid-body").empty();
                //$(".pages ul").empty();
                var html = '';
                var page = '';
                if(response.code == '1'){
                    objMap = response.data.datas;
                    $.each(response.data.datas, function(i,key){
                        //sort = sort+1;
                        html += '<div class="grid-body-tr"> <div class=""><span>'+(i+1)+'</span></div> ' +
                            '<div class=""><span>'+key.name+'</span></div>';
                        var background = key.background.split(',');
                        if(background == undefined){
                            html += '<div><span>暂无图片</span></div>' ;
                        }else{
                         html += '<div><span><img src="'+background[0]+'" alt=""/></span></div>' ;
                        }

                            html+= ' <div class="operation"><span><a class="edit" data-id="'+key.id+'">编辑</a><a class="overflowShow" data-id="'+key.id+'" data-index="'+i+'">删除</a></span></div></div>';

                    })
                    if(response.data.page == response.data.pageCount){
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                    }
                    else if(response.data.page == '1') {
                        page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li>' +
                            ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'
                    }
                    else {
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
                    }
                    $(".grid-body").empty().html(html);
                    $(".pages ul").empty().html(page);
                    //edit();
                    showOverflow();

                }else{
                    alert(data.msg);
                }

            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        });
}


function showOverflow(){
    $(".overflowShow").on('click',function(){
        $(".deleted").attr({id: $(this).attr('data-id')});
        $(".overall").show();
    })
};


function deleted(){
    $('.deleted').on('click',function(){
        var id = $(this).attr('id');
        $.ajax({
            url: commUrl+'/moves/d',
            type:'POST',
            data:{
                token:$.cookie("token"),
                id:id
            },
            success: function(data){
                data = JSON.parse(data);
                console.log(data);
                if(data.code == 1) {
                    $(".overall").hide();
                    var page =  $('.onpage').text();
                    pagenation(page);
                }else{
                    $(".overall").hide();
                    alert(data.msg);
                }
            }
        })
    })
}

function prevPage(e) {
    $(e).next("li").find(".onpage").text();

    if($(e).next("li").find(".onpage").text() == '1'){
        $(e).addClass("readonly");
    }
    else {
        var page = $(e).next("li").find(".onpage").text() - 1;
        pagenation(page)
    }
}

function nextPage(e){
    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
        $(e).addClass("readonly");
    }
    else {
        //alert($(e).prev("li").find(".onpage").text());
        var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
        pagenation(page)

    }
}
//输入框跳转页面
function turnPage(e){
    //alert($(e).prev(".nowPage").val());
    if(parseInt($(e).prev(".nowPage").val()) <= 1){
        var page = 1;
        pagenation(page);
    }else if(parseInt($(e).prev(".nowPage").val() )>= parseInt($(".pagecount").text())){
        var page = $(".pagecount").text();
        pagenation(page)
    }else{
        var page = $(e).prev(".nowPage").val();
        pagenation(page)

    }
}