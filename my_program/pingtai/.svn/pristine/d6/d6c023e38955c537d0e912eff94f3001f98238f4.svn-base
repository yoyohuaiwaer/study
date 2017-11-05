/**
 * Created by A on 2016/10/21.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li class="selected"><a class="" alt="industry-list.html" id="5850c057b2a99afa74c513af">官方行业问答库</a></li>';
    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();
    pageOrder();
    hideOverflow();
    addIndustry();
    deleted();
})
function pageOrder(page){
    //console.log($.cookie("token"));
    page = page?page:1;
    $.ajax({
        url:commUrl+'/qa/allindustry',
        //type:'',
        data:{
            token:$.cookie("token"),
            //token:'c6dff5b8f69175ab25e6026d152410bb',
            page:page,
            row: 10,
            //sortId:'',
            //sortType:''
        },
        success: function(response){
            $(".grid-body").empty();
            $(".pages ul").empty()
            var html = '';
            var page = '';
            response = JSON.parse(response);
            //console.log(response);
            if(response.code == 1){

                if(response.data.datas == ''){
                    html = '暂无数据';
                }else {
                    //数据循环
                    var sort = 0;
                    $.each(response.data, function(i,key){
                        var question = key.question;
                        var id = key.id;
                        sort = i +1
                        //console.log(key);
                        html += '<div class="grid-body-tr"> <div class=""><span>'+sort+'</span></div> ' +
                            '<div><span ><a class="searchIndustry" alt="1" id="'+key.id+'">'+key.name+'</a></span></div>' +
                           //'<div><span>'+key.defaultAnswer+'</span></div>'+
                           // '<div><span>'+key.sceneCount+'</span></div>'+
                            ' <div class="operation"> <a class="overflowShow" id="'+key.id+'">删除</a></div></div>';
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
                        showOverflow();
                        searchIndustry();
                        //searchScene();
                    });
                    //分页判断



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


    if($(e).next("li").find(".onpage").text() == 1){
        $(e).addClass("readonly");
    }
    else {
        var page = $(e).next("li").find(".onpage").text()  - 1;

        pageOrder(page);
    }
}
function nextPage(e){
    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
        $(e).addClass("readonly");
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
    if(parseInt($(e).prev(".nowPage").val()) <= 1){
        var page = 1;
        pageOrder(page);
    }else if(parseInt($(e).prev(".nowPage").val()) >=parseInt( $(".pagecount").text())){
        var page = $(".pagecount").text();
        pageOrder(page);
    }else{
        var page = $(e).prev(".nowPage").val();
        pageOrder(page);

    }
}
function searchIndustry(){
    $('.searchIndustry').on('click',function(){
        $.cookie('industryId',$(this).attr('id'),{path:'/'});
        $.cookie('industryName',$(this).text(),{path:'/'});
        $.cookie('nowpage','1',{path:'/'});
        $.ajax({
            url:menuUrl+'scene-question-list.html',
            success: function(data){
                $('.main').html(data);
            }
        })
    })
}
/*function searchScene(){
    $('.searchScene').on('click',function(){
        $.cookie('industryId',$(this).attr('alt'),{path:'/'});
        $.cookie('industryId',$(this).attr('rel'),{path:'/'});
        $.cookie('industry',$(this).attr('title'),{path:'/'});
        //industry
        $.cookie('scene',$(this).text(),{path:'/'});
        $.ajax({
            url:menuUrl+'scene-question-list.html',
            success: function(data){
                $('.main').html(data);
            }
        })
    })
}*/
function showOverflow(){

    $(".overflowShow").on('click',function(){
        $(".deleted").attr({id: $(this).attr('id')});
        $(".overall").show();
    })
};
function hideOverflow() {
    $('.hideOverflow').on('click',function(){
        $(".overall").hide();
        var page =  $('.onpage').text();
        pageOrder(page);


    })
}
function deleted(){
    $(".deleted").on('click',function(){
        //alert($(this).attr('id'));
        $.ajax({
            url: commUrl+'/qa/deleteindustry',
            //type:'POST',
            data:{
                token:$.cookie("token"),
                id: $(this).attr('id'),
                //name: $(this).attr('rel')
            },
            success: function(data){
                data = JSON.parse(data);
                console.log(data);
                if(data.code == 1) {
                    var page =  $('.onpage').text();
                    pageOrder(page);
                    $(".overall").hide();
                }
            },
            error: function(){
                alert("出错啦~！")
            }
        })
    })
}
function addIndustry(){
    $('.addIndustry').on('click',function(){
        var sort = $(".grid-body-tr").length;
        sort+=1;
        var html = '';
        html += '<div class="grid-body-tr red"> <div class=""><span>'+sort+'</span></div> ' +
        '<div><span ><input type="text" class="name text"/><a class="searchIndustry" alt="1" ></a></span></div>' +
       // '<div><span><input type="text" class="defaultAnswer text"/></span></div>'+
       // '<div><span></span></div>'+
        ' <div class="operation"> <a class="confirm">确定</a><a class="cancel">取消</a></div></div>';
        $(".grid-body").append(html);
        confirm();
        cancel();
    })
}
function confirm(){
    $('.confirm').on('click',function(){
        var name = $(this).parents('.grid-body-tr').find('.name').val();
        name = name.replace(/['\t]/g,'').replace(/\s*/g, '');
        $.ajax({
            url: commUrl+'/qa/saveindustry',
            type:'POST',
            data:{
                token:$.cookie("token"),
                defaultAnswer: $(this).parents('.grid-body-tr').find('.defaultAnswer').val(),
                name: name
            },
            success: function(data){
                data = JSON.parse(data);
                console.log(data);
                if(data.code == 1) {
                    var page =  $('.onpage').text();
                    pageOrder(page);
                    //$(".overall").hide();
                }else if(data.code == -1){
                    alert(data.msg);
                    //window.location.href = menuUrl+'index.html';
                }
            }
        })
    })
}
function cancel(){
    $('.cancel').on('click',function(){
        $(this).parents('.grid-body-tr').remove();
    })
}