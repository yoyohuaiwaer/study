/**
 * Created by Administrator on 2016/9/17.
 */
//var commUrl = 'http://172.16.8.70:8080/manage';
//页面加载
$(document).ready(function() {
    //面包屑加载
    $(".breadcrumb").empty();
    $.ajax({
        url:commUrl+'/menu/findbyid',
        data: {
            token:$.cookie("token"),
            parentId:'5850bf1bb2a99afa74c513ab'
        },
        success: function(data){
            data = JSON.parse(data);

            if(data.code == 1) {
                var breadcrumb = '';
                breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].id+'">'+data.data[0].name+'</a></li>';
                var parentId = data.data[0].id;
                findMenus(parentId);
                $(".breadcrumb").html(breadcrumb);
                changeBreadcrumb();
            }
        }
    })
    //列表加载
    pagenation();

})
function pagenation(page){
    page = page?page:1;
    var obg = {};
        obg = {
            token:$.cookie("token"),
            industry: $.cookie('industry'),
            meid:$.cookie('userID'),
            page:page,
            row: '10',
            sortId:'createTime',
            sortType:'DESC'
        }
    //console.log(obg);
    //debugger;
    $.ajax(
        {
            url: commUrl+'/qacategory/list',
            data: obg,
            dataType: 'json',
            async: false,
            success: function (response) {
                response = eval('(' + response + ')')
                //debugger;
                $(".grid-body").empty();
                $(".pages ul").empty()
                var html = '';
                var page = '';
                if(response.code == '1'){
                    if(response.data.datas == ''){
                        html='<p>暂无数据</p>'
                    }else {
                        var sort = 0;
                        $.each(response.data.datas, function(i,key){
                            var question = key.question;
                            var id = key.id;
                            console.log(key);
                            $.each(key.answers,function(num,value){
                                sort = sort+1;
                                html+=' <div class="grid-body-tr"> <div class=""><span>'+sort+'</span></div><div><span>'+key.scene+'</span></div>' +
                                    '<div><span>'+key.question+'</span></div>' +
                                    '<div><span title="'+id+'">'+key.mainKey+'</span></div>' +
                                    ' <div><span >'+value.text+'</span></div>' ;
                                if(value.action == 'none'||value.action == ''){
                                    html+= '<div><span>无动作</span></div></div>' ;
                                }else if(value.action == 'happy'){
                                    html+= '<div><span>开心</span></div></div>';
                                }else if(value.action == 'sad'){
                                    html+= '<div><span>悲伤</span></div></div>';
                                }else if(value.action == 'thinking'){
                                    html+= '<div><span>思考</span></div></div>';
                                }else if(value.action == 'angry'){
                                    html+= '<div><span>愤怒</span></div></div>';
                                }else if(value.action == 'goodBye'){
                                    html+= '<div><span>再见</span></div></div>';
                                }
                            })
                        })
                        if(response.data.page == response.data.pageCount){
                            page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                                '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" min="1" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                        }
                        else if(response.data.page == '1') {
                            page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li>' +
                                ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" min="1" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'

                        }
                        else {
                            page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                                '<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" min="1" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
                        }
                    }

                }
                $(".grid-body").html(html);
                $(".pages ul").html(page);
                //checkquestion();
                showOverflow();
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        });

}
function findMenus(parentId){
    //alert($('.main-title').attr('title'));
    $.ajax({
        url:commUrl+'/menu/findbyid',
        data: {
            token:$.cookie("token"),
            parentId:parentId
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1) {
                //$(".breadcrumb").empty();
                var breadcrumb = '';
                $.each(data.data, function(i,key) {
                    breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">'+key.name+'</a></li>';

                })
                $(".breadcrumb").append(breadcrumb);
                //$(".breadcrumb li:first-child").addClass('selected');
                changeBreadcrumb();
            }
        }
    })
}
/*function pagenation(page){
    page = page?page:1;
    $.ajax(
        {
            url: commUrl+'/qa_mechant',
            data: {
                token:$.cookie("token"),
                //token:'40706311e667db7ca076c92c8856ca85',
                scene: $.cookie("scene"),
                meid: $.cookie("userID"),
                page:page,
                row: '10',
                sortId:'createTime',
                sortType:'DESC'
            },
            dataType: 'json',
            async: false,
            success: function (response) {
                response = eval('(' + response + ')')
                $(".grid-body").empty();
                $(".pages ul").empty()
                var html = '';
                var page = '';
                if(response.code == '1'){
                    var sort = 0;
                    //console.log(response)
                    $.each(response.data.datas, function(i,key){
                        var question = key.question;
                        var id = key.id;
                        $.each(key.answers,function(num,value){
                            question = question;
                            sort = sort+1;
                            html+=' <div class="grid-body-tr"> <div class="order-number"><span>'+sort+'</span></div> <div class="industrybox"><span title="'+id+'">'+question+'</span></div> <div class="scene"><span href="javascrip:void(0);" onclick="javascript:readQuestion(this)" alt="'+value.text+'">'+value.text+'</span></div></div>'
                        })
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
                //确定绑定跳转
                $(".grid-body").html(html);
                $(".pages ul").html(page);
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        });
}*/
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
     }else if(parseInt($(e).prev(".nowPage").val()) >=parseInt( $(".pagecount").text())){
     var page = $(".pagecount").text();
     pagenation(page)
     }else{
     var page = $(e).prev(".nowPage").val();
     pagenation(page)

     }
}




