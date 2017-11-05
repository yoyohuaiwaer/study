/**
 * Created by A on 2016/11/17.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li class="selected"><a class="" alt="tree-list.html" id="5850c20bb2a99afa74c513b4">多层语义列表</a></li>';
    $(".breadcrumb").html(breadcrumb);
    $.cookie('sences','1',{path:'/'});
    loadSecene();
    sceneChange();
    changeBreadcrumb();
    pageOrder();
    addTree();
    overflowHide()
    deleted();
    /*$(".breadcrumb").empty();
    //alert();
    $.ajax({
        url:commUrl+'/menu/findbyid',
        async:false,
        data: {
            token:$.cookie("token"),
            parentId:'57ff306b0a263655e986ccf4'
        },
        success: function(data){
            data = JSON.parse(data);
            //console.log(data);
            if(data.code == 1) {
                //$(".breadcrumb").empty();
                var breadcrumb = '';
                //breadcrumb = '<li><a class="" alt="'+menuUrl+''+data.data[2].url+'" id="'+data.data[2].id+'">'+data.data[2].name+'</a></li>';
                var parentId = data.data[2].id;
                $(".breadcrumb").html(breadcrumb);
                findMenus(parentId);
                changeBreadcrumb();
               // $(".breadcrumb li").removeClass('selected');
                $(".breadcrumb li:nth-child(2)").addClass('selected');


            }
        }
    })*/
})
function sceneChange(){
    $('#scene').change(function(){
        $.cookie('sences','2',{path:'/'});
        pageOrder();
    })
}
function loadSecene(){
    $.ajax({
        url:commUrl+'/qa/allindustry',
        async: false,
        data:{
            token:$.cookie("token")
        },
        success: function(response){
            response = JSON.parse(response);
            if(response.code == 1){
                var html = '';
                $('#scene').empty();
                html += '<option value="" >选择行业</option>';
                $.each(response.data,function(i,key){
                    html += '<option value="'+key.name+'" id="'+key.id+'">'+key.name+'</option>'
                });
                $('#scene').html(html);
            }

        },
        error: function( text){
            alert(text.readyState);
            alert(text.status);
            alert("出错啦");
        }
    })
}
function findMenus(parentId){
    $.ajax({
        url:commUrl+'/menu/findbyid',
        async:false,
        data: {
            token:$.cookie("token"),
            parentId:parentId
        },
        success: function(data){
            data = JSON.parse(data);
            //console.log(data);

            if(data.code == 1) {
                var breadcrumb = ''
                $.each(data.data,function(i,key){
                    breadcrumb += '<li class=""><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">'+key.name+'</a></li>';
                })

                $(".breadcrumb").append(breadcrumb);
                //changeBreadcrumb();
            }
        }
    })
}
function deleted(){
    $('.deleted').on('click',function(){
        $.ajax({
            url:commUrl+'/qa/multilayer_qa_del',
            type:'POST',
            data:{
                token: $.cookie('token'),
                qaId: $(this).attr('id')
            },
            success: function(response){
                response = JSON.parse(response);
                if(response.code == 1){
                    $('.overall').hide();
                    var page = $('.onpage').text();
                    pageOrder(page);
                }
            }
        })
    })
}
function pageOrder(page){
    //console.log($.cookie("token"));
    //var commUrl = 'http://172.16.8.40:8080/qh_manager';
    page = page?page:1;
    var data = {};
    ($.cookie('sences') == 1) ? data = {token:$.cookie("token"), page:page, row: '10', sortId:'createTime', sortType:'DESC'}: data = {token:$.cookie("token"), page:page, row: '10', sortId:'createTime', sortType:'DESC', industry:  $('#scene').children('option:selected').val()};
    $.ajax({
        url:commUrl+'/qa/multilayer_qa_list',
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
                        var arr = key.questions;
                        var newArr = arr.join('，');
                        html += '<div class="grid-body-tr"> <div class=""><span>'+sort+'</span></div> ' +
                            '<div class=""><span>'+key.industry+'</span></div> ' +
                            '<div><span >'+key.question+'</span></div>' +
                            '<div><span>'+newArr+'</span></div>'+
                            ' <div class="operation"> <span><a class="editTree" data-id="'+key.id+'" rel="0">修改</a><a class="overflowShow" data-id="'+key.id+'">删除</a></span></div></div>';

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
                    overflowShow();

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

function editTree(){
    $('.editTree').on('click',function(){
        $.cookie('treeId',$(this).attr('data-id'),{path:'/'});
        $.cookie('rel',$(this).attr('rel'),{path:'/'});
        $.cookie('ansType','1',{path:'/'});
        trunPage();
    })
}
function overflowShow(){
    $('.overflowShow').on('click',function(){
        $('.deleted').attr({id:$(this).attr('data-id')});
        $('.overall').show();
    })
}
function overflowHide(){
    $('.hideOverflow').on('click',function(){
        $('.overall').hide();
    })
}
function addTree() {
    $('.addTree').on('click',function(){
        $.cookie('rel',$(this).attr('rel'),{path:'/'});
        trunPage();

    })
}
function trunPage(){
    $.ajax({
        url: menuUrl+'tree.html',
        success: function(response){
            $('.main').empty().html(response);
        }
    })
}