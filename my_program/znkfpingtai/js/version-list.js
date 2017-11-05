/**
 * Created by A on 2017/1/12.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li class="selected"><a class="" alt="version-list.html" id="587743929dc1b9775255889e">版本管理</a></li>';
    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();
    addVersion();
    pageOrder();
})
function addVersion(){
    $('.addVersion').on('click',function(){
        $.cookie('judgement','1',{path:'/'})
        foundDetails();
    })
}
function foundDetails(){
    $.ajax({
        url: menuUrl+'version-detials.html',
        success: function(response){
            $('.main').empty().html(response);
        }
    })
}
function pageOrder(page){
    //console.log($.cookie("token"));
    //var commUrl = 'http://172.16.8.40:8080/qh_manager';
    page = page?page:1;
    var data = {};
    //($.cookie('sences') == 1) ? data = {token:$.cookie("token"), page:page, row: '10', sortId:'createTime', sortType:'DESC'}: data = {token:$.cookie("token"), page:page, row: '10', sortId:'createTime', sortType:'DESC', industry:  $('#scene').children('option:selected').val()};
    data = {token:$.cookie("token"), page:page, row: '10', sortId:'createTime', sortType:'DESC'};
    $.ajax({
        url:commUrl+'/version/findall',
        //type:'',
        data:data,
        success: function(response){
            $(".grid-body").empty();
            $(".pages ul").empty()
            var html = '';
            var page = '';
            response = JSON.parse(response);
            //console.log(response.data);

            if(response.code == 1){
                if(response.data.count == '0'){
                    html = '暂无数据';
                }else {
                    //数据循环
                    var sort = 0;

                    $.each(response.data.datas, function(i,key){
                        var question = key.question;
                        sort = i +1;
                        /*var arr = key.questions;
                        var newArr = arr.join('，');*/
                        html += '<div class="grid-body-tr"> <div class=""><span>'+sort+'</span></div> ' ;
                        key.cate == '1' ?html +='<div class=""><span>海关助手</span></div> ':html +='<div class=""><span>行业助手</span></div> ';
                        key.type == '1' ?html +='<div class=""><span>机器人端</span></div> ':html +='<div class=""><span>移动端</span></div> ';
                           // '<div class=""><span>'+key.cate+'</span></div> ' +
                           //    '<div><span >'+key.type+'</span></div>' +
                           html += '<div><span>'+key.number+'</span></div>'+
                            '<div><span>'+key.createTime+'</span></div>'+
                            ' <div class="operation"> <span><a class="editTree" data-id="'+key.id+'" rel="0">更新版本</a></span></div></div>';//  <a class="overflowShow" data-id="'+key.id+'">删除</a>

                        //searchScene();
                    });
                    if(response.data.page == '1') {
                        page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li>' +
                            ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'

                    }
                    else if(response.data.page == response.data.pageCount){
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage ">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                    }
                    else {
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
                    }

                    $(".grid-body").html(html);
                    $(".pages ul").html(page);
                    //确认绑定事件
                    editTree();
                    //overflowShow();

                }

            }

        },
        error: function( text){
            alert(text.readyState);
            alert(text.status);
            alert("出错啦");
        }
    })
}
function editTree(){
    $('.editTree').on('click',function(){
        $.cookie('versionId',$(this).attr('data-id'),{path:'/'});
        $.cookie('judgement','0',{path:'/'});
        //$.cookie('versionId','1',{path:'/'});
        foundDetails();
    })
}
function prevPage(e) {
    $(e).next("li").find(".onpage").text();

    if($(e).next("li").find(".onpage").text() == '1'){
        $(e).addClass("readonly");
    }
    else {
        var page = $(e).next("li").find(".onpage").text() - 1;
        pageOrder(page)
    }
}

function nextPage(e){
    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
        $(e).addClass("readonly");
    }
    else {
        //alert($(e).prev("li").find(".onpage").text());
        var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
        pageOrder(page)

    }
}
//输入框跳转页面
function turnPage(e){
    //alert($(e).prev(".nowPage").val());
    if($(e).prev(".nowPage").val() <= 1){
        var page = 1;
        pageOrder(page);
    }else if($(e).prev(".nowPage").val() >= $(".pagecount").text()){
        var page = $(".pagecount").text();
        pageOrder(page)
    }else{
        var page = $(e).prev(".nowPage").val();
        pageOrder(page)

    }
}