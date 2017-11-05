$(document).ready(function(){
	 $.ajax({
        url:commUrl+'/menu/findbyid',
        data:{
            token:$.cookie("token"),
            parentId:'58462023b2a99afa74c51396'
        },
        success: function(data){
            data = eval('('+data+')');
            if(data.code == '1'){
            	$(".breadcrumb").empty();
                var breadcrumb = '<li class = "selected" ><a href="javascript:void(0);" onclick="javascript:changePage(this);"  title="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].id+'">'+data.data[0].name+'</a>';
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
			var _name='';
			var _phone='';
			var _no='';
			var _type='';
			var _sex='';
			switch (searchValue){
				case "phone":
					_phone = $('.searchText').val();
					break;
				case "memberName":
					_name = $('.searchText').val();
					break;
				case "memberNo":
					_no = $('.searchText').val();
					break;
				case "memberType":
					_type = $('.searchText').val();
					break;
				default:
					_sex = $('.searchText').val();
					break;
			}
			obj={
	            token:$.cookie("token"),
	            page:page,
	            row:'10',
	            sortId:'createTime',
	            sortType:'DESC',
	            memberName:_name,
	            phone:_phone,
	            memberNo:_no,
	            memberType:_type,
	            sex:_sex
	        }
		}
    	 $.ajax({
            url:commUrl+'/member/memberList',
            data:obj,
            cache:false,
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
                        html += '<div class="grid-body-tr" > <div class="number"  style="width:70px">'+sort+'</div> ' +
                        '<div class="title"  style="width:150px;max-width:150px; ">'+key.memberNo+'</div> ' +
                        '<div class="content"  style="width:100px;max-width:100px; ">'+key.memberType+'</div> ' +
                        '<div class="startTime"  style="width:150px;max-width:150px">'+ key.name+'</div> ' +
                        '<div style="width:100px;max-width:100px">'+ key.sex+'</div> ' +
                        '<div style="width:100px;max-width:100px">'+ key.phone+'</div> ' +
                        '<div class="pic" style="width:150px;max-width:150px; "> <img src="'+key.faceUrls[0]+'" alt=""/> </div> ' +
                        '<div class="operation"  style="width:140px">' +
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
	        url:'addMembers.html',
	        datatype:'html',
	        success:function(data){
	            $(".main").empty().html(data);
	        }
	    })
	}
	function deleteGoods(e){
	    $.ajax({
	        url:commUrl+'/member/delMember',
	        data:{
	        	token:$.cookie("token"),
	        	id:e.id
	        },
	        cache:false,
	        type:'POST',
	        success: function(data){
	              console.log(data)
	            data = eval('('+data+')');
	            if(data.code == '1'){
	                newPage();
	            }
	        }
	    })
	}
	function newPage(){
	    $.get('membersList.html',{token:$.cookie("token")},function(response){
	        $(".main").empty().html(response);
	    })
	}
	function addQuestion(e){
		$.cookie("read", e.title,{path:'/'})
	    $.ajax({
	        url:'addMembers.html',
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
	    if(parseInt($(e).prev(".nowPage").val()) <= 1){
	    	
	    }else if(parseInt($(e).prev(".nowPage").val()) >= parseInt($(".pagecount").text())){
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