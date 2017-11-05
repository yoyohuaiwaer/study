/**
 * Created by A on 2016/9/25.
 */
function pagenation(page){
    $.ajax(
        {
            url: commUrl+'/call',
            data: {
                token:$.cookie("token"),
                page: page,
                row: '10'
            },
            success: function (data) {
                console.log(data);
                data  = eval('('+data+')');
                if(data.code == '1'){
                    $(".grid-body").empty();
                    $(".pages ul").empty();
                    var html = '';
                    var page = '';

                    $.each(data.data.datas, function(i,key){
                        //console.log(key)
                        var sort = i+1;
                        if(key.state == '1'){
                            html += '<div class="grid-body-tr"> ' +
                                '<div class="order-number" style="width: 100px;"><span>'+sort+'</span></div>' +
                                '<div class="datatime" style="width: 250px;"><span>'+key.createTime+'</span></div>' +
                                '<div class="table-number" style="width: 100px;"><span>'+key.maid+'号</span></div>' +
                                ' <div class="call-state" style="width:230px;"><span>'+key.text+'</span></div> ' +
                                '<div class="operation-state" style="width: 100px;"><span>已处理</span></div>' +
                                ' </div>'
                        }
                        else {
                            html += '<div class="grid-body-tr"> ' +
                                '<div class="order-number" style="width: 100px;"><span>'+sort+'</span></div>' +
                                '<div class="datatime" style="width: 250px;"><span>'+key.createTime+'</span></div>' +
                                '<div class="table-number" style="width: 100px;"><span>'+key.maid+'号</span></div>' +
                                ' <div class="call-state" style="width: 230px;"><span>'+key.text+'</span></div> ' +
                                '<div class="operation-state" style="width: 100px;"><span class="colorBlue">待处理</span></div>' +
                                ' </div>'
                        }

                    });
                    if(data.data.page == data.data.pageCount){
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                    }
                    else if(data.data.page == '1') {
                        page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li>' +
                            ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'

                    }
                    else {
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class=""><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
                    }
                }
                $(".grid-body").html(html);
                $(".pages ul").html(page);

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
    }else if(parseInt($(e).prev(".nowPage").val()) >= parseInt($(".pagecount").text())){
        var page = $(".pagecount").text();
        pagenation(page)
    }else{
        var page = $(e).prev(".nowPage").val();
        pagenation(page)

    }
}
