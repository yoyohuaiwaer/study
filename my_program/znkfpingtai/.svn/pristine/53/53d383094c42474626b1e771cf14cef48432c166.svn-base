/**
 * Created by A on 2016/10/21.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
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
                //$(".breadcrumb li").removeClass('selected');
                $(".breadcrumb li:first-child").addClass('selected');


            }
        }
    })
    if($.cookie('nowpage')==''){
        pageOrder();
    }else{
        var page = $.cookie('nowpage')
        pageOrder(page);
    }
    add();
    hideOverflow();
    deleted();

})
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
function pageOrder(page){
    //console.log($.cookie("token"));
    page = page?page:1;
    $.ajax({
        url:commUrl+'/qa/industry',
        //type:'',
        data:{
            token:$.cookie("token"),
            //token:'c6dff5b8f69175ab25e6026d152410bb',
            industryId: $.cookie('industryId'),
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
                    $.each(response.data.datas, function(i,key){
                        var question = key.question;
                        var id = key.id;
                        sort = i +1
                        //console.log(key);
                        html += '<div class="grid-body-tr"> <div class=""><span>'+sort+'</span></div> ' +
                            '<div><span class="newindustry" id="'+key.industryId+'">'+key.industry+'</span></div>' +
                            '<div><span><a class="searchScene" data-rel="1" alt="0" rel="'+key.industryId+'" title="'+key.industry+'">'+key.name+'</a><input type="text" class="editScene text" style="display:none" value="'+key.name+'" ></span></div>'+
                            '<div><span class="count">'+key.count+'</span></div>'+
                            ' <div class="operation"> <span> <a class="confirm" rel="0" data-content-id="'+key.id+'" style="display: none">确定</a><a class="edit" rel="'+key.industryId+'" alt="'+key.id+'">修改</a><a class="cancelEdit" style="display: none">取消</a><a class="overflowShow" id="'+key.id+'">删除</a></div></div>';
                    });
                    //分页判断
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
                    //searchIndustry();
                    confirm();
                    searchScene();
                    edit();
                    cancelEdit();

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
function edit(){
    $('.edit').on('click',function(){
        $(this).next('a').show();
        $(this).prev('a').show();
        $(this).hide();
        $(this).parents('.grid-body-tr').addClass('red');
        $(this).parents('.grid-body-tr').find('.searchScene').hide();
        $(this).parents('.grid-body-tr').find('.editScene').show();
    })
}
function cancelEdit(){
    $('.cancelEdit').on('click',function(){
        $(this).prev('a').prev('a').hide();
        $(this).prev('a').show();
        $(this).hide();
        $(this).parents('.grid-body-tr').removeClass('red');
        //synonym
        $(this).parents('.grid-body-tr').find('.searchScene').show();
        $(this).parents('.grid-body-tr').find('.editScene').hide();
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
function add(){
    $('.add').on('click',function(){
        //$.cookie('rel',$(this).attr('rel'),{path:'/'})
        var sort = $(".grid-body-tr").length;
        sort+=1;
        var html = '';
        html = '<div class="grid-body-tr red"> ' +
            '<div class="order-number">'+sort+'</div> ' +
            '<div class="industrybox" onclick=""><input type="text" name="industry" class="newindustry" id="'+ $.cookie("industryId")+'" value="'+ $.cookie("industryName")+'" readonly/><span class="tipIndustry"></span></div> ' +
            '<div class="scene"><input type="text" name="name" class="newname"/><span class="tipName"></span></div> ' +
            '<div class="answer-number"></div>' +
            '<div class="operation"><a class="cancel">取消</a><a class="confirm" rel="1">确认</a> </div>' +
            ' </div>'
        $(".grid-body").append(html);
        confirm();
        cancel();
    });

}
//输入框跳转页面
function confirm(){
    $('.confirm').on('click',function(){

        if($(this).attr('rel') == 1){
            var name = $(this).parents('.grid-body-tr').find('.newname').val();
            name = name.replace(/['\t]/g,'').replace(/\s*/g, '');
            $.ajax({
                url: commUrl+'/qa/savescene',
                type:'POST',
                data:{
                    token:$.cookie("token"),
                    industry: $(this).parents('.grid-body-tr').find('.newindustry').val(),
                    industryId: $(this).parents('.grid-body-tr').find('.newindustry').attr('id'),
                    name:name
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
        }else if($(this).attr('rel')== 0) {
            var name = $(this).parents('.grid-body-tr').find('.editScene').val();
            name = name.replace(/['\t]/g,'').replace(/\s*/g, '');
            $.ajax({
                url: commUrl+'/qa/savescene',
                type:'POST',
                data:{
                    token:$.cookie("token"),
                    industry: $(this).parents('.grid-body-tr').find('.newindustry').text(),
                    industryId: $(this).parents('.grid-body-tr').find('.newindustry').attr('id'),
                    name:name,
                    id:$(this).attr('data-content-id'),
                    count:$(this).parents('.grid-body-tr').find('.count').text()
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
        }

    })
}
function cancel(){
    $('.cancel').on('click',function(){
        $(this).parents('.grid-body-tr').remove();
    })
}

function edtiScene(){
    $('.edtiScene').on('click',function(){

        $.ajax({
            url: commUrl+'/qa/savescene',
            //type:'POST',
            data:{
                token: $.cookie("token"),
                id: $(this).attr('id'),
                //name: $(this).attr('rel')
            },
            success: function(data){
                data = JSON.parse(data);
                console.log(data)
                if(data.code == 1) {
                    var page =  $('.onpage').text();
                    pageOrder(page);
                    $(".overall").hide();
                }
            }
        })
    })
};
function searchScene(){
    $('.searchScene').on('click',function(){
        //$.cookie('industryId',$(this).attr('alt'),{path:'/'});
        $.cookie('industryId',$(this).attr('rel'),{path:'/'});
        $.cookie('scene',$(this).text(),{path:'/'});
        $.cookie('industry',$(this).attr('title'),{path:'/'});
        $.cookie('nowpage',$('.onpage').text(),{path:'/'});
        $.cookie('nowpage1','1',{path:'/'});
        $.cookie('rel1','1',{path:'/'});
        $.ajax({
            url:menuUrl+'scene-question-list.html',
            success: function(data){
                $('.main').html(data);
            }
        })
    })
}
function showOverflow(){

    $(".overflowShow").on('click',function(){
        $(".deleted").attr({id: $(this).attr('id')});
        $(".overall").show();
    })
};
function hideOverflow() {
    $('.hideOverflow').on('click',function(){
        $(".overall").hide();

    })
}
function deleted(){
    $(".deleted").on('click',function(){
        //alert($(this).attr('id'));
        $.ajax({
            url: commUrl+'/qa/deletescene',
            //type:'POST',
            data:{
                token: $.cookie("token"),
                id: $(this).attr('id'),
                //name: $(this).attr('rel')
            },
            success: function(data){
                data = JSON.parse(data);
                console.log(data)
                if(data.code == 1) {
                    var page =  $('.onpage').text();
                    pageOrder(page);
                    $(".overall").hide();
                }
            }
        })
    })
}