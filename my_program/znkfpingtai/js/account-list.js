/**
 * Created by A on 2016/10/12.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li class="selected"><a class="" alt="account-list.html" id="57ff30880a263655e986ccf5">商家账号管理</a></li>';
    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();
    //findMenus();
    add();
    pageOrder();
    hideOverflow();
    deleted();


})
function pageOrder(page){
    page = page?page:1;
    $.ajax({
        url:commUrl+'/user/find',
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
                  console.log(response.data);
                if(response.data.datas == ''){
                    html = '暂无数据';
                }else {
                    //数据循环
                    $.each(response.data.datas,function(i,key){
                        var sort = i+1;
                        html += '<div class="grid-body-tr"> ' +
                            '<div><span>'+key.username+'</span></div> ' +
                            '<div ><span >'+key.email+'</span></div>' +
                            '<div ><span >'+key.nick+'</span></div>'
                                if(key.industry == undefined){
                                    html += '<div ><span title="">无</span></div>' ;
                                }else {
                                    html += '<div ><span title="">'+key.industry+'</span></div>' ;
                                }
//                          	if(key.appType == "service"){
//                                  html += '<div ><span>智能客服</span></div>' ;
//                              }else if(key.appType == "doctor"){
//                                  html += '<div ><span >心理医生</span></div>' ;
//                              }
                            html += '<div class="operation"> <span> <a class="edit" rel="0" id="'+key.id+'">修改</a>  </span> </div> </div>';
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
    }else if(parseInt($(e).prev(".nowPage").val()) >= parseInt($(".pagecount").text())){
        var page = $(".pagecount").text();
        pageOrder(page);
    }else{
        var page = $(e).prev(".nowPage").val();
        pageOrder(page);

    }
}
 function viewDetails(){
     $.ajax({
         url:'account-detail.html',
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
        $(".deleted").attr({id: $(this).attr('rel')});
        $(".overall").show();
    })
};
function edit(){
    $('.edit').on('click',function(){

        $.cookie('accountCode',$(this).attr('rel'),{ path: '/' })
        $.cookie('accountId',$(this).attr('id'),{ path: '/' });
        //alert($.cookie('accountId'));
        $(this).attr('id')
        viewDetails();
    })
};
function deleted(){
    $(".deleted").on('click',function(){
        //alert($(this).attr('id'));
        $.ajax({
            url: commUrl+'/user/delete',
            type:'POST',
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
