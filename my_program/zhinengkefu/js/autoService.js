$(document).ready(function(){
	 $.ajax({
        url:commUrl+'/menu/findbyid',
        //type:'GET',
        //async: false,
        data:{
            token:$.cookie("token"),
            parentId:$(".main-title").attr("title")
        },
        success: function(data){
            data = eval('('+data+')')
            if(data.code == '1'){
           		$(".breadcrumb").html('<li class="selected"><span href="javascript:void(0);" title="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].parentId+'">'+data.data[0].name+'</span></li>');
            }
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    });
    listPage();
})
	function listPage(page){
    	page = page?page:1;
    	 $.ajax({
            url:commUrl+'/customercare/find',
            data:{
                token:$.cookie("token"),
                page:page,
                row:'10',
                sortId:'createTime',
                sortType:'DESC'
            },
            dataType:'json',
            success:function(data){
                data = eval('('+data+')');
                $(".grid-body").empty();
                var html = '';
                var sort = 0;
                var page = '';
                if(data.code == '1'){
                    $.each(data.data.datas,function(i,key){
                        sort = i + 1;
                        html += '<div class="grid-body-tr"> <div class="number"  style="width:70px">'+sort+'</div> ' +
                        '<div class="question"  style="width:300px;max-width:300px; overflow:hidden;">'+key.question+'</div> ' +
                        '<div class="answer"  style="width:400px;max-width:400px">'+ key.answer+'</div> ' +
                        '<div class="operation"  style="width:190px">' +
                        '<a href="javascript:void(0);" onclick="javascript:editGoods(this)" class="editGoods"  id="'+key.id+'" title="'+key.question+'"  name="'+key.answer+'">编辑</a>' +
                        '<a href="javascript:void(0);"  onclick="javascript:showOverall(this)" class="deleteGoods" id="'+key.id+'">删除</a></div> </div>'
                    })
                    
                    if(data.data.page == '1') {
                        page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li>' +
                            ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'

                    }
                    else if(data.data.page == data.data.pageCount){
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                    }
                    else {
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
                    }
                    
                }
            	$(".pages ul").html(page);
            	$(".grid-body").html(html);
            },
            error: function(text){
                alert(text.readyState);
                alert(text.status);
            }
        })
    }
	
function showOverall(e){
    $(".deleteQuestion").attr({id: e.id});
    $(".overall").show();
}
function editGoods(e) {
    $.cookie("read", e.id,{path:'/'});
    $.cookie("id", e.id,{path:'/'});
    $.cookie("question", e.title,{path:'/'});
    $.cookie("answer", e.name,{path:'/'});
    $.ajax({
        url:'addQuesAnswer.html',
        datatype:'html',
        success:function(data){
            $(".main").empty().html(data);
        }
    })
}
function deleteGoods(e){
    $.ajax({
        url:commUrl+'/customercare/delete',
        data:{token:$.cookie("token"),
        	id:e.id
        },
        type:'get',
        success: function(data){
              
            data = eval('('+data+')');
            if(data.code == '1'){
                newPage();
            }
        }
    })
}
function newPage(){
    $.get('auto_service.html',{token:$.cookie("token")},function(response){
        $(".main").empty().html(response);
    })
}
function addQuestion(e){
	$.cookie("read", e.title,{path:'/'})
    $.ajax({
        url:'addQuesAnswer.html',
        datatype:'html',
        success:function(data){
            $(".main").empty().html(data);
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
        listPage(page);
    }
}

function nextPage(e){
    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
       // $(e).addClass("readonly");
    }
    else {
        var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
        listPage(page);

    }
}
function turnPage(e){
	var page = 1;
    if(parseInt($(e).prev(".nowPage").val()) <= 1){
    	
    }else if(parseInt($(e).prev(".nowPage").val() )>= parseInt($(".pagecount").text())){
        page = $(".pagecount").text();
    }else{
        page = $(e).prev(".nowPage").val();
    }
    listPage(page);
}