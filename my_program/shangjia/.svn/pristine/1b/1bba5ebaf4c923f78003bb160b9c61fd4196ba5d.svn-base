/**
 * Created by Administrator on 2016/9/17.
 */
//页面加载
$(document).ready(function() {
    //面包屑加载
    searchbtn();
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
                    '<li class="selected"><a href="javascript:void(0);"  onclick="javascript:changePage(this);" title="'+menuUrl+''+data.data[1].url+'" id="'+data.data[1].parentId+'">'+data.data[1].name+'</a></li>'
                $(".breadcrumb").html(breadcrumb);
                //alert(breadcrumb);
            }
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    });
    //列表加载
    pagenation();
})
//新增问答按钮
function addQuestion(e){
    $.ajax(
        {
            url: 'question-record.html',
            data: {token:$.cookie("token")},
            dataType: 'html',
            success: function (response) {
                //response = eval('(' + response + ')')
                //console.log(response);
                $(".main").empty().html(response);
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
}
//修改按钮
function editQuestion(e){
    //alert(e.title);
    $.cookie("text",e.title,{ path: '/' });
    $.cookie("id",e.id,{ path: '/' });
	$.cookie('adId',e.adId,{ path: '/' })
    $.ajax(
        {
            url: 'read-question.html',
            data: {token:$.cookie("token")},
            dataType: 'html',
            success: function (response) {
                //response = eval('(' + response + ')')
                //console.log(response);
                $(".main").empty().html(response);
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
}
function newPage(){
    $.get('question-list.html',{token:$.cookie("token"),scene:$.cookie("scene")},function(response){
        $(".main").empty().html(response);
    })
}
//删除按钮
function deleteQuestion(e){
    //console.log(e.id);
    $.ajax(
        {
            url: commUrl+'/qa/delete_'+e.id+'',
            data: {
                token:$.cookie("token"),
                scene: $.cookie("scene"),
                text: e.name
            },
            type:'POST',
            dataType: 'json',
            //async: false,
            success: function (response) {
                response = eval('(' + response + ')')
                console.log(response);
                if(response.code == '1'){

                   newPage();

                }
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        });
}
function showOverall(e){
    //alert("123");
    $(".deleteQuestion").attr({id: e.id,name: e.title});
    $(".overall").show();
}
function clearOverall(e){
    $(".overall").hide();
}
function pagenation(page){
    page = page?page:1;
    if($.cookie('rel') == 0){
        var condition = $('#search').children('option:selected').val();
        var text = $('.searchText').val();
        $.ajax(
            {
                url: commUrl+'/qa_list',
                data: {
                    token:$.cookie("token"),
                    scene: $.cookie("scene"),
                    condition: condition,
                    text:text,
                    page:page,
                    row: '10',
                    sortId:'createTime',
                    sortType:'DESC'
                },
                dataType: 'json',
                async: false,
                success: function (response) {
                    response = eval('(' + response + ')')
                    console.log(response)
                    $(".grid-body").empty();
                    $(".pages ul").empty()
                    var html = '';
                    var page = '';
                    if(response.code == '1'){

                        if(response.data.datas == '') {
                            html='<p>查询无结果</p>'
                        } else {
                            var sort = 0;
                            $.each(response.data.datas, function(i,key){
                                var question = key.question;
                                var id = key.id;
                                $.each(key.answers,function(num,value){
                                    question = question;
                                    sort = sort+1;
                                    var adTitle='';
                                    if(value.ads && value.ads.length>0)
                                    {
                                        adTitle = value.ads[0].title;
                                    }
//                          if(value.ad)
//                          {
//                          	adTitle =value.ad.title
//                          }
                                    html+=' <div class="grid-body-tr"> <div class="order-number">'+sort+'</div> <div class="industrybox"><span title="'+id+'">'+question+'</span></span></div> <div class="scene"><span href="javascrip:void(0);"  alt="'+value.text+'">'+value.text+'</span></div> <div class="adContent"><span  alt="'+adTitle+'" >'+adTitle+'</span></div> <div class="operation"> <a href="javascript:void(0);" onclick="javascript:editQuestion(this)" class="editQuestion" title="'+value.text+'" id="'+id+'">修改</a><a href="javascript:void(0);" onclick="javascript:showOverall(this)" id="'+id+'" title="'+value.text+'">删除</a></div> </div>'
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

                    }
                    //确定绑定跳转
                    //turnPage()
                    $(".grid-body").html(html);
                    $(".pages ul").html(page);
                },
                error: function (text) {
                    alert(text.readyState);
                    alert(text.status);
                }
            });

    }else if($.cookie('rel') == 1) {
        $.ajax(
            {
                url: commUrl+'/qa_list',
                data: {
                    token:$.cookie("token"),
                    scene: $.cookie("scene"),
                    page:page,
                    row: '10',
                    sortId:'createTime',
                    sortType:'DESC'
                },
                dataType: 'json',
                async: false,
                success: function (response) {
                    response = eval('(' + response + ')')
                    console.log(response)
                    $(".grid-body").empty();
                    $(".pages ul").empty()
                    var html = '';
                    var page = '';
                    if(response.code == '1'){

                        if(response.data.datas == '') {
                            html='<p>暂无数据，请添加问答</p>'
                        } else {
                            var sort = 0;
                            $.each(response.data.datas, function(i,key){
                                var question = key.question;
                                var id = key.id;
                                $.each(key.answers,function(num,value){
                                    question = question;
                                    sort = sort+1;
                                    var adTitle='';
                                    if(value.ads && value.ads.length>0)
                                    {
                                        adTitle = value.ads[0].title;
                                    }
//                          if(value.ad)
//                          {
//                          	adTitle =value.ad.title
//                          }
                                    html+=' <div class="grid-body-tr"> <div class="order-number">'+sort+'</div> <div class="industrybox"><span title="'+id+'">'+question+'</span></span></div> <div class="scene"><span href="javascrip:void(0);"  alt="'+value.text+'">'+value.text+'</span></div> <div class="adContent"><span  alt="'+adTitle+'" >'+adTitle+'</span></div> <div class="operation"> <a href="javascript:void(0);" onclick="javascript:editQuestion(this)" class="editQuestion" title="'+value.text+'" id="'+id+'">修改</a><a href="javascript:void(0);" onclick="javascript:showOverall(this)" id="'+id+'" title="'+value.text+'">删除</a></div> </div>'
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

                    }
                    //确定绑定跳转
                    //turnPage()
                    $(".grid-body").html(html);
                    $(".pages ul").html(page);
                },
                error: function (text) {
                    alert(text.readyState);
                    alert(text.status);
                }
            });
    }

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
     if(parseInt($(e).prev(".nowPage").val() )<= 1){
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


function searchbtn(){
    $('.searchbtn').on('click',function(){
        $.cookie('rel', $(this).attr('rel'),{path:'/'});
        pagenation();

    })
};

