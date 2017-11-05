/**
 * Created by A on 2016/9/23.
 */
function newPage(){
    $.get('commodityList.html',{token:$.cookie("token")},function(response){
        $(".main").empty().html(response);
    })
}
function showOverall(e){
    $(".deleteQuestion").attr({id: e.id});
    $(".overall").show();
}
function pagenation(page) {
    $.ajax(
        {
            url: commUrl+'/item',
            data: {
                token:$.cookie("token"),
                page:page,
                row: '10',
                sortId:'createTime',
                sortType:'DESC'
            },
            dataType: 'json',
            //async: false,
            success: function (response) {
                response = eval('(' + response + ')')
               // console.log(response);
                $(".grid-body").empty();
                $(".pages ul").empty()
                var html = '';
                var page = '';
                if(response.code == '1'){
                    $.each(response.data.datas,function(i,key){
                        sort = i + 1;
                        if(key.state == '1'){
                            html += '<div class="grid-body-tr"> <div class="number">'+sort+'</div> <div class="name">'+key.name+'</div> <div class="unit">'+key.unit+'</div> <div class="price">'+key.price+'</div> <div class="pic"><img src="'+key.icon+'" alt=""/></div> <div class="info"><span>'+key.desc+'</span></div> <div class="operation"><a href="javascript:void(0);" onclick="javascript:goodsState(this)" class="goodsState" title="'+key.meid+'" id="'+key.id+'" name ="'+key.state+'">上架</a><a href="javascript:void(0);" onclick="javascript:editGoods(this)" class="editGoods" title="1" id="'+key.id+'" name="'+key.meid+'">编辑</a><a href="javascript:void(0);"  onclick="javascript:showOverall(this)" class="deleteGoods" id="'+key.id+'">删除</a></div> </div>'
                        }else {
                            html += '<div class="grid-body-tr"> <div class="number">'+sort+'</div> <div class="name">'+key.name+'</div> <div class="unit">'+key.unit+'</div> <div class="price">'+key.price+'</div> <div class="pic"><img src="'+key.icon+'" alt=""/></div> <div class="info"><span>'+key.desc+'</span></div> <div class="operation"><a href="javascript:void(0);" onclick="javascript:goodsState(this)" class="goodsState" title="'+key.meid+'" id="'+key.id+'" name ="'+key.state+'">下架</a><a href="javascript:void(0);" onclick="javascript:editGoods(this)" class="editGoods" title="1" id="'+key.id+'" name="'+key.meid+'">编辑</a><a href="javascript:void(0);"  onclick="javascript:showOverall(this)" class="deleteGoods" id="'+key.id+'">删除</a></div> </div>'
                        }
                    })
                    if(response.data.page == '1'){
                        page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                    }
                    else if(response.data.page == response.data.pageCount){
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                    }
                    else {
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li>' +
                            ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
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
        pagenation(page);
    }
}
function nextPage(e){
    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
        $(e).addClass("readonly");
    }
    else {
        var page = $(e).prev("li").find(".onpage").text() - 0 + 1;

        pagenation(page)
    }
}
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
function editGoods(e) {
    $.cookie("read", e.title,{path:'/'});
    $.cookie("itemId", e.id,{path:'/'});
    $.cookie("meid", e.name,{path:'/'})
    $.cookie("read", e.title,{path:'/'})
    $.ajax({
        url:'addCommodity.html',
        datatype:'html',
        success:function(data){
            $(".main").empty().html(data);
        }
    })
}
function goodsState(e){
    if(e.name == '1'){
        // e.name == '0';
        var state = e.name -1;
        var name = $(e).parents(".grid-body-tr").find(".name").text();
        var unit = $(e).parents(".grid-body-tr").find(".unit").text();
        var price = $(e).parents(".grid-body-tr").find(".price").text();
        var icon = $(e).parents(".grid-body-tr").find(".pic img").attr("src");
        var desc = $(e).parents(".grid-body-tr").find(".info span").text();
        $.ajax({
            url:commUrl+'/item_'+ e.id,
            data:{token:$.cookie("token"),
                meid: e.title,
                name:name,
                unit:unit,
                price:price,
                icon:icon,
                desc:desc,
                state: state},
            type:'POST',
            success: function(data){
                //console.log(data);
                data = eval('('+data+')');
                //alert(data.msg);
                if(data.code == '1'){
                    newPage();
                }
            }
        })
    }
    else
    {
        e.name == '1';
        var state = e.name - 0 + 1;
        var name = $(e).parents(".grid-body-tr").find(".name").text();
        var unit = $(e).parents(".grid-body-tr").find(".unit").text();
        var price = $(e).parents(".grid-body-tr").find(".price").text();
        var icon = $(e).parents(".grid-body-tr").find(".pic img").attr("src");
        var desc = $(e).parents(".grid-body-tr").find(".info span").text();
        $.ajax({
            url:commUrl+'/item_'+ e.id,
            data:{token:$.cookie("token"),
                meid: e.title,
                name:name,
                unit:unit,
                price:price,
                icon:icon,
                desc:desc,
                state: state},
            type:'POST',
            success: function(data){
                //console.log(data);
                data = eval('('+data+')');
                //alert(data.msg);
                if(data.code == '1'){
                    newPage();
                }
            }
        })
    }
}
function deleteGoods(e){
    $.ajax({
        url:commUrl+'/item/delete_'+ e.id,
        data:{token:$.cookie("token")},
        type:'POST',
        success: function(data){
            //console.log(data);
            data = eval('('+data+')');
            //alert(data.msg);
            if(data.code == '1'){
                newPage();
            }
        }
    })
}
function addQuestion(e){
    $.cookie("read", e.title,{path:'/'})
    $.ajax({
        url:'addCommodity.html',
        datatype:'html',
        success:function(data){
            $(".main").empty().html(data);
        }
    })
}