/**
 * Created by A on 2016/12/19.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li class="selected"><a class="" alt="conflict.html" id="585a2c3ab2a99afa74c513c0">关键词冲突</a></li>';
    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();
    pagenation();
    deleted();
    overflowHide();
});
function overflowHide(){
    $('.hideOverflow').on('click',function(){
        $('.overall').hide();
    })
}
function deleted(){
    $('.deleted').on('click',function(){
        var type = $(this).attr('data-type');
        var url = '';
        var data = {};
        var id = $(this).attr('data-id');
        switch (type){
            case '多关键字':
                debugger;
                //type == '多关键字';
                url = commUrl+'/qacategory/del';
                data = {
                    token:$.cookie("token"),
                    id:id,
                    industry:$(this).attr('data-industry')
                }
                break;
            case '多层问答':
                //type == '多层问答';
                url = commUrl+'/qa/multilayer_qa_del';
                data = {
                    token: $.cookie('token'),
                    qaId: id
                }
                break;
            case '实体问答':
                //type == '实体问答';
                url = commUrl + '/entity/process_' + id;
                data = {token: $.cookie('token')};
                break;
        }
        $.ajax({
            url:url,
            type:'POST',
            data:data,
            success: function(response){
               response = JSON.parse(response);
                if(response.code == 1){
                    pagenation();
                    $('.overall').hide()
                }else {
                    alert(response.msg);
                }
            },
            error: function(text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
    })
};
function pagenation(page) {
    $.ajax({
        url: commUrl+'/conflict/scan',
        type:'POST',
        data: {
            token: $.cookie('token')
        },
        cache:false,
        async: false,
        success: function(response){
            response = JSON.parse(response);

        },
        error: function(text){
            text.readyState;
            text.status;
        }

    })
    //获取对应商品名称


    page = page ? page : 1;
    var url = commUrl + '/conflict';
    $.ajax({
        url: url,
        //type:'POST',
        data: {
            token: $.cookie("token"),
            page:page,
            row: '10'
        },
        //dataType: 'json',
        async: false,
        cache: false,
        success: function(response) {
            response = eval('('+response+')');
            $(".table-body").empty();
            var html = '';
            if(response.code == '1') {
                $.each(response.data.datas,function(num,key){
                    var count = 0;
                    for( i in key){
                        if(i.indexOf("cid")>-1)count++;
                    };
                    for(var i = 1 ; i <= count; i++){
                        num++;
                        html+= '<tr class="tr_body">';
                        (i == 1) ? html+= '<td class="number" rowspan="'+count+'">'+num+'</td>' : html+='';
                        var type= 'type'+i , questions = 'questions'+i , cid = 'cid'+i ;
                        html+=' <td><span>'+eval('key.'+questions)+'</span></td><td><span>'+eval('key.'+type)+'</span></td><td><span>'+key.industry+'</span></td>' ;
                        (eval('key.'+type) == '多关键字') ? html+='<td><span>'+key.scene+'</span></td>' : html+='<td><span>无场景</span></td>'
                        html+='<td><span><a class="edit" id="edit" data-id="'+eval('key.'+cid)+'" data-type="'+eval('key.'+type)+'" data-industry="'+key.industry+'" rel="0">修改</a><a class="overflowShow" data-id="'+eval('key.'+cid)+'" data-type="'+eval('key.'+type)+'" data-industry="'+key.industry+'">删除</a></span></td></tr>';
                    }
                });
                if(response.data.page == response.data.pageCount) {
                    page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">' + response.data.page + '</span>/<span class="pagecount">' + response.data.pageCount + '</span> </li> ' +
                        '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                } else if(response.data.page == '1') {
                    page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">' + response.data.page + '</span>/<span class="pagecount">' + response.data.pageCount + '</span> </li>' +
                        ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'
                } else {
                    page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">' + response.data.page + '</span>/<span class="pagecount">' + response.data.pageCount + '</span> </li> ' +
                        '<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
                }
            }
            //console.log(html);
            $(".table-body").html(html);
            $(".pages ul").html(page);
            edit();
            overflowShow();
            //confirm();
        },
        error: function(text) {
            alert(text.readyState);
            alert(text.status);
        }
    });
}
function edit(){
    $('.edit').on('click',function(){
        var type = $(this).attr('data-type');
        var url = '';
        var data = {};
        switch (type){
            case '多关键字':
                url = menuUrl+'question-record.html';
                $.cookie('qusID',$(this).attr('data-id'),{path:'/'});
                $.cookie('rel',$(this).attr('rel'),{path:'/'});
                $.cookie('ansType','2',{path:'/'});
                break;
            case '多层问答':
                url = menuUrl+'tree.html';
                $.cookie('treeId',$(this).attr('data-id'),{path:'/'});
                $.cookie('rel',$(this).attr('rel'),{path:'/'});
                $.cookie('ansType','2',{path:'/'});
                break;
            case '实体问答':
                url = menuUrl + 'entities-list.html';
                data = {token: $.cookie('token')};
                break;
        }
        $.ajax({
            url:url,
            success: function(response){
                $('.main').empty().html(response);
            }
        })
    });
}
function overflowShow(){
    $('.overflowShow').on('click',function(){
        $('.deleted').attr({'data-id':$(this).attr('data-id')});
        $('.deleted').attr({'data-type':$(this).attr('data-type')});
        $('.deleted').attr({'data-industry':$(this).attr('data-industry')});
        $('.overall').show();
    })
}
function prevPage(e) {
    $(e).next("li").find(".onpage").text();

    if($(e).next("li").find(".onpage").text() == '1') {
        $(e).addClass("readonly");
    } else {
        var page = $(e).next("li").find(".onpage").text() - 1;
        pagenation(page)
    }
}

function nextPage(e) {
    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()) {
        $(e).addClass("readonly");
    } else {
        var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
        pagenation(page)

    }
}
//输入框跳转页面
function turnPage(e) {
    if(parseInt($(e).prev(".nowPage").val()) <= 1) {
        var page = 1;
        pagenation(page);
    } else if(parseInt($(e).prev(".nowPage").val()) >= parseInt($(".pagecount").text())) {
        var page = $(".pagecount").text();
        pagenation(page)
    } else {
        var page = $(e).prev(".nowPage").val();
        pagenation(page)

    }
}