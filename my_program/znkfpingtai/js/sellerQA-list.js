/**
 * Created by A on 2016/10/18.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li class="selected"><a class="" alt="sellerQA-list.html" id="5850bf1bb2a99afa74c513ab">商家场景库</a></li>';
    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();
    //findMenus();
    pagenation();
});

function pagenation(page){
    page = page?page:1;
    $.ajax(
        {
            url: commUrl+'/scene',
            data: {
                token:$.cookie("token"),
                //token:'40706311e667db7ca076c92c8856ca85',
                //scene: $.cookie("scene"),
                page:page,
                row: '10',
                sortId:'createTime',
                sortType:'DESC'
            },
            dataType: 'json',
            async: false,
            success: function (response) {
                response = JSON.parse(response);

                $(".grid-body").empty();
                $(".pages ul").empty()
                var html = '';
                var page = '';
                if(response.code == '1'){
                    var sort = 0;
                    $.each(response.data.datas, function(i,key){
                        //console.log(key);
                        if(key.scenes !== undefined){
                            //sort = sort+1;
                            $.each(key.scenes,function(num,value){
                                sort = sort+1;
                                html+=' <div class="grid-body-tr"> <div><span>'+sort+'</span></div>'
                                if(value.industry == ''){
                                    html += ' <div><span>无</span></div>';
                                }else {
                                    html += ' <div><span>'+value.industry+'</span></div>';
                                }
                                html +=   ' <div><span><a class="scene" alt="'+key.id+'" data-industry="'+key.industry+'">'+key.nick+'</a></span></div><div><span>'+value.count+'</span></div></div> ' ;
                            })
                        }

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
                }

                $(".grid-body").html(html);
                $(".pages ul").html(page);
                //确定绑定跳转
                sceneClick();
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        });
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
    }else if(parseInt($(e).prev(".nowPage").val() )>=parseInt( $(".pagecount").text())){
        var page = $(".pagecount").text();
        pagenation(page)
    }else{
        var page = $(e).prev(".nowPage").val();
        pagenation(page)

    }
}
function sceneClick() {
    $('.scene').on('click',function(){
        //alert("123");
        $.cookie('userID',$(this).attr('alt'),{path:'/'});
        $.cookie('industry',$(this).attr('data-industry'),{path:'/'});
        $.ajax({
            url:menuUrl+'question-list.html',
            success: function(data){
                $('.main').html(data);
            }
        })
    })
}
