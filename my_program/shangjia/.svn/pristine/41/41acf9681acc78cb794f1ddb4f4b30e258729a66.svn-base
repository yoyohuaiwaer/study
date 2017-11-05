$(document).ready(function(){
	 $.ajax({
        url:commUrl+'/menu/findbyid',
        data:{
            token:$.cookie("token"),
            parentId:'586606df5a5a9763823e6399'
        },
        success: function(data){
            data = eval('('+data+')');
            if(data.code == '1'){
            	$(".breadcrumb").empty();
                var breadcrumb = '<li class = "selected" ><a href="javascript:void(0);" onclick="javascript:changePage(this);"  title="'+menuUrl+''+data.data[2].url+'" id="'+data.data[2].id+'">'+data.data[2].name+'</a>';
 				$(".breadcrumb").html(breadcrumb);
            }
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    });
    searchbtn();
    listPage();
})
	function listPage(page,isSearch){
		var obj={};
    	page = page?page:1;
		obj={
            token:$.cookie("token"),
            page:page,
            row:'10',
            sortId:'createTime',
            sortType:'DESC'
        }
		if(isSearch)
		{
			var searchValue = $("#selectSearch").children("option:selected").attr("value");
			var _title='';
			var _type='';
			switch (searchValue){
				case "title":
					_title = $('.searchText').val();
					break;
				case "memberType":
					_type = $('.searchText').val();
					break;
			}
			obj={
	            token:$.cookie("token"),
	            page:page,
	            row:'10',
	            sortId:'createTime',
	            sortType:'DESC',
	            title:_title,
	            memberType:_type
	        }
		}
    	 $.ajax({
            url:commUrl+'/member/memberRecommendList',
            data:obj,
            cache:false,
            type:'get',
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
                        '<div class="title"  style="width:250px;max-width:250px; overflow:hidden;">'+key.title+'</div> ' +
                        '<div class="content"  style="width:150px;max-width:150px; overflow:hidden;">'+key.memberType+'</div> ' +
                        '<div class="startTime"  style="width:300px;max-width:250px">'+ key.startTime+'</div> ' +
                        '<div class="operation"  style="width:190px">' +
                        '<a href="javascript:void(0);" onclick="javascript:editGoods(this)" class="editGoods" id="'+key.id+'" title="'+key.title+'"  name="'+key.content+'">编辑</a>' +
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
	function clearOverall(e){
	    $(".overall").hide();
	}
	function showOverall(e){
	    $(".deleteQuestion").attr({id: e.id});
	    $(".overall").show();
	}
	function editGoods(e) {
	    $.cookie("read", e.id,{path:'/'});
	    $.cookie("title", e.title,{path:'/'});
	    $.cookie("content", e.name,{path:'/'});
	    $.ajax({
	        url:'addMembersRec.html',
	        datatype:'html',
	        success:function(data){
	            $(".main").empty().html(data);
	        }
	    })
	}
	function deleteGoods(e){
	    $.ajax({
	        url:commUrl+'/member/delMemberRecommend',
	        data:{token:$.cookie("token"),
	        	id:e.id
	        },
	        cache:false,
	        type:'post',
	        success: function(data){
	            data = eval('('+data+')');
	            if(data.code == '1'){
	                newPage();
	            }
	        }
	    })
	}
	function newPage(){
	    $.get('memberRecom.html',{token:$.cookie("token")},function(response){
	        $(".main").empty().html(response);
	    })
	}
	function addQuestion(e){
		$.cookie("read", e.title,{path:'/'})
	    $.ajax({
	        url:'addMembersRec.html',
	        cache:false,
	        datatype:'html',
	        success:function(data){
	            $(".main").empty().html(data);
	        }
	    })
	}
	
	function prevPage(e) {
	    $(e).next("li").find(".onpage").text();
	
	    if($(e).next("li").find(".onpage").text() == '1'){
	    }
	    else {
	        var page = $(e).next("li").find(".onpage").text() - 1;
	        listPage(page);
	    }
	}
	
	function nextPage(e){
	    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
	    }
	    else {
	        var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
	        listPage(page);
	
	    }
	}
	function turnPage(e){
		var page = 1;
	    if(parseInt($(e).prev(".nowPage").val() )<= 1){
	    	
	    }else if(parseInt($(e).prev(".nowPage").val() )>= parseInt($(".pagecount").text())){
	        page = $(".pagecount").text();
	    }else{
	        page = $(e).prev(".nowPage").val();
	    }
	    listPage(page);
	}
	
function searchbtn(){
    $('.searchbtn').on('click',function(){
        listPage(1,true);
    })
};