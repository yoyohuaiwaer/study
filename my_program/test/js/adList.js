$(document).ready(function(){
	 $.ajax({
        url:commUrl+'/menu/findbyid',
        //type:'GET',
        //async: false,
        data:{
            token:$.cookie("token"),
            parentId:'586606df5a5a9763823e6399'
        },
        success: function(data){
            data = eval('('+data+')')
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
	deleted();
	changetype();
})
function changetype(){
	$('#type').on('change',function(){
		listPage();
	})
}
function deleted(){
$('.deleteQuestion').on('click',function(){
	var id = $(this).attr('data-id');
	$.ajax({
		url:commUrl+'/pushMaterial/d',
		type: 'POST',
		data:{token:$.cookie("token"),
			id:id
		},
		cache:false,
		success: function(data){

			data = eval('('+data+')');
			if(data.code == '1'){
				var page = parseInt($('.onpage').text(),10);
				listPage(page);
				$(".overall").hide();
			}
		},
		error: function(){
			alert('出错啦~！');
		}
	})
})
};
	function listPage(page){
		var obj={};
		var type= $('#type').children('option:selected').attr('value');
		var title = $('.searchText').val();
    	page = page?page:1;
		obj={
            token:$.cookie("token"),
            page:page,
            row:'10',
            sortId:'createTime',
            sortType:'DESC'
        }
		if(type)
		{
			obj.type = type;
		}
		if(title!==''){
			obj.title = title;
		}
    	 $.ajax({
            url:commUrl+'/pushMaterial',
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
                        html += '<div class="grid-body-tr"> <div class="number"  style="width:70px">'+sort+'</div> ' +
                        '<div class="title"  style="width:300px;max-width:300px; overflow:hidden;">'+key.title+'</div> ' ;
						if(key.type=="test"){
							key.type = '测试素材';
						}else if(key.type=="text"){
							key.type = '故事素材';
						}else if(key.type=="image"){
							key.type = '图片素材';
						}
						html +='<div class="title"  style="width:100px;max-width:100px; overflow:hidden;">'+key.type+'</div> ' +
                        '<div class="startTime"  style="width:300px;max-width:300px">'+ key.createTime+'</div> ' +
                        '<div class="operation"  style="width:190px">' +
                        '<a class="editGoods" data-id="'+key.id+'" title="'+key.title+'"  name="'+key.content+'">编辑</a>' +
                        '<a class="deleteGoods" data-id="'+key.id+'">删除</a></div> </div>'
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
				editGoods();
				deleteGoods();
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
	function editGoods() {
		$('.editGoods').on('click',function(){
			var id = $(this).attr('data-id');
			$.cookie('adId',id,{path:'/'});

			$.ajax({
				url:'add-ad.html',
				datatype:'html',
				success:function(data){
					$(".main").empty().html(data);
				}
			})
		})

	}
	function deleteGoods(){
		$('.deleteGoods').on('click',function(){
			var id = $(this).attr('data-id');
			$('.overall').show();
			$('.deleteQuestion').attr('data-id',id);

		})
	}
	/*function newPage(){
	    $.get('adList.html',{token:$.cookie("token")},function(response){
	        $(".main").empty().html(response);
	    })
	}*/
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
	    	
	    }else if(parseInt($(e).prev(".nowPage").val() )>= parseInt($(".pagecount").text())){
	        page = $(".pagecount").text();
	    }else{
	        page = $(e).prev(".nowPage").val();
	    }
	    listPage(page);
	}
	
function searchbtn(){
    $('.searchbtn').on('click',function(){
        listPage();


    })
};