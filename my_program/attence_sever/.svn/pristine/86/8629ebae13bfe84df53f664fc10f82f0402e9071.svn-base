$(document).ready(function(){
	//commUrl = 'http://10.10.23.67:8080/qh_server';
	 /*$.ajax({
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
    });*/
	producer();
	classId();
    //searchbtn();
	/*$.cookie('rel1','0',{path:'/'});*/
    listPage();
	addClass();
	hideOverflow1();
	addClassConfirm();
	searchProducer();
	searchClass();
	searchType();
	detailSearchbtn();
	addmembers();
	searchText();
	deleted();
})
function producer(){
	$.ajax({
		url: commUrl + '/user/userList',
		//type: 'POST',
		cache: false,
		async: false,
		data: {
			token: $.cookie("token")
		},
		//dataType: 'json',
		//contentType: 'application/json; charset=UTF-8',
		success: function(data) {
			data = eval('(' + data + ')');
			if(data.code == '1') {
				if(data.data.length > 1){
					var str = ''
					str = '<option value="">选择公司</option>';
					$.each(data.data,function(i,key){
						str +='<option value="'+key.id+'">'+key.nick+'</option>'
					});
					$('#producer').html(str).show();
				}

			}
		},
		error: function(text){

		}
	})
}
function searchText(){
	$('.searchText').on('focus',function(){
		if($(this).val() == '姓名查找'){
			$(this).val('');
		}
	}).on('blur',function(){
		if($(this).val() == ''){
			$(this).val('姓名查找');
		}
	})
};
function addmembers(){
	$('.addmembers').on('click',function(){


		/*if (history.pushState) {
			//$(".neck").removeClass('node-selected');
			//partentsEvel.addClass('node-selected');
			//var breadcrumb = '<li class="selected"><a alt="'+query+'"  id="'+_id+'">'+$(this).text()+'</a></li>';
			//$(".breadcrumb").empty().html(breadcrumb);
			$.ajax({
				url: 'membersLoad.html',//this.title,
				type:'GET',
				async: false,
				success: function(data){
					$(".main").empty().html(data);
				},
				error: function(text){
					alert(text.readyState);
					alert(text.status);
				}
			})
			// history处理
			var title = "旗瀚商家平台-批量导入员工" ;
			document.title = '批量导入员工';

			if (event && /\d/.test(event.button)) {
				//alert(location.href);
				//debugger;
				var  _url = location.href.split("?")[0] + "?" + 'membersLoad';
				var _otherkey = 'membersLoad.html';
				var state = {
					title: title,
					url: _url,
					otherkey: _otherkey
				}
				history.pushState(state, title, _url);
			}
		}
*/



		$.ajax({
			url:'membersLoad.html',
			cache:false,
			datatype:'html',
			success:function(data){
				$(".main").empty().html(data);
			}
		})
	});
}

function searchProducer(){
	$('#producer').on('change',function(){
		$.cookie('rel1','4',{path:'/'});
		var _id = $('#producer').children('option:selected').attr('value');
		classId(_id);
		listPage();
	})
};


function searchClass(){
	$('#classId').on('change',function(){
		$.cookie('rel1','1',{path:'/'});
		listPage();
	})
}
function searchType(){
	$('#type').on('change',function(){
		$.cookie('rel1','2',{path:'/'});
		listPage();
	})
}
function detailSearchbtn(){
	$('.searchbtn').on('click',function(){
		$.cookie('rel1','3',{path:'/'});
		listPage();
	});
};
function classId(id){
	var _data = {
		token: $.cookie("token")
	}
	if(id !== undefined){
		_data.meid = id;
	}


	$.ajax({
		url: commUrl + '/employee/findDept',
		type: 'POST',
		cache: false,
		data: _data,
		//dataType: 'json',
		//contentType: 'application/json; charset=UTF-8',
		success: function(data) {
			data = eval('(' + data + ')');
			if(data.code == '1') {
				var str = ''
				str = '<option value="">选择部门</option>';
				$.each(data.data,function(i,key){
					str +='<option value="'+key.id+'">'+key.deptName+'</option>'
				});
				$('#classId').empty().html(str);
			}
		},
		error: function(text){
		}
	})
}
function addClassConfirm() {
	//var commUrl = 'http://10.10.23.67:8080/qh_server'
	$('.addClassConfirm').on('click',function(){
		var name = $('#newScene').val();
		//name = name.replace(/['\t]/g,'').replace(/\s*/g, '');
		$.ajax({
			url: commUrl+'/employee/updateDept',
			type:'POST',
			data:{
				token:$.cookie("token"),
				deptName:name
			},
			success: function(data){
				data = JSON.parse(data);
				if(data.code == 1) {
					$(".overall1").hide();
					$('#newScene').val('');
					classId();
				}else if(data.code == -1){
					alert(data.msg);
					//$(".overall1").hide();
					//window.location.href = menuUrl+'index.html';
				}
			}
		})
	});
};

function listPage(page){
	var obj={};
	page = page?page:1;
	var _classId = $('#classId').children('option:selected').attr('value');
	var _type = $('#type').children('option:selected').attr('value');
	var _name = $('.searchText').val();
	var _producer = $('#producer').children('option:selected').attr('value');
	//console.log($.cookie('rel1'));
	obj = {
		token:$.cookie("token"),
		page:page,
		row:'10',
		sortId:'updateTime',
		sortType:'DESC'
	}
	switch ($.cookie('rel1')){
		case '0':
			obj= obj
			break;
		case '4':
			if(_classId !== '' ){
				obj.detpId = _classId;
			};
			if(_producer !== ''){
				obj.meid = _producer;
			}
			if( _type !== ''){
				obj.type = _type;
			};
		case '1':
			if(_classId !== '' ){
				obj.detpId = _classId;
			};
			if(_producer !== ''){
				obj.meid = _producer;
			}
			if( _type !== ''){
				obj.type = _type;
			};
			break;
		case '2':
			if(_classId !== '' ){
				obj.detpId = _classId;
			};
			if( _type !== ''){
				obj.type = _type;
			};
			if(_classId !== '' ){
				obj.detpId = _classId;
			};
			break;
		case '3':
			if( _name !== '姓名查找'){
				obj.name = _name;
			}else{
				if(_classId !== '' ){
					obj.detpId = _classId;
				};
				if( _type !== ''){
					obj.type = _type;
				};
				if(_classId !== '' ){
					obj.detpId = _classId;
				};
			}

			break;

	}

	 $.ajax({
		url:commUrl+'/employee/employeeList',
		type:'POST',
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
					html += '<div class="grid-body-tr" > <div class="number"  style="width:70px">'+sort+'</div> ' ;
							if(key.name == undefined){
								html += '<div class="title"  style="width:100px;max-width:100px; ">资料不全</div> '
							}else{
								html += '<div class="title"  style="width:100px;max-width:100px; ">'+key.name+'</div> '
							}
					html += '<div class="pic" style="width:100px;max-width:100px; ">'+key.number+'</div>'
					if(key.type == 0){
						html += '<div style="width:100px;max-width:100px">员工</div> ' ;
					}else {
						html += '<div style="width:100px;max-width:100px">管理</div> ' ;
					}
					/*if(key.faceUrls == ''|| key.faceUrls == undefined){
						html += '<div class="pic" style="width:150px;max-width:150px; ">暂无图片</div> ';
					}else {
						html += '<div class="pic" style="width:150px;max-width:150px; "> <img src="'+key.faceUrls[0]+'" alt=""/></div> ';
					}*/
					if(key.state == 'job'){
						html +='<div class="startTime"  style="width:100px;max-width:100px">在职</div>'
					}else{
						html +='<div class="startTime"  style="width:100px;max-width:100px">离职</div>'
					}
					html += '<div class="startTime"  style="width:100px;max-width:100px" data-id="'+key.deptId+'">'+ key.deptName+'</div> ' ;
					if(key.sex == undefined){
						html += '<div style="width:100px;max-width:100px">资料不全</div> ' ;
					}else {
						html += '<div style="width:100px;max-width:100px">'+ key.sex+'</div> ' ;
					}
					html += '<div style="width:150px;max-width:150px">'+ key.phone+'</div> ' ;

					html += '<div class="operation"  style="width:140px">' +
					'<a href="javascript:void(0);" onclick="javascript:editGoods(this)" class="editGoods" id="'+key.id+'" title="'+key.title+'"  name="'+key.content+'">编辑</a>' +
					'<a href="javascript:void(0);"  onclick="javascript:showOverall(this)" class="deleteGoods" id="'+key.id+'">删除</a></div> </div>'
				})

				if(data.data.page == '1') {
					page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> ' +
						'<span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li>' +
						' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage">' +
						'<input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'

				}
				else if(data.data.page == data.data.pageCount){
					page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page">' +
						' <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
						'<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage">' +
						'<input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
				}
				else {
					page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page">' +
						' <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
						'<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage">' +
						'<input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
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
function deleted(){
	$('.deleteQuestion').on('click',function(){
		var _id = $(this).attr('id');
		$.ajax({
			url:commUrl+'/employee/del',
			data:{
				token:$.cookie("token"),
				id:_id
			},
			cache:false,
			type:'POST',
			success: function(data){
				console.log(data)

				data = eval('('+data+')');
				if(data.code == '1'){
					var page =  $('.onpage').text()
					listPage(page);
					$(".overall").hide();
				}else {
					alert(data.msg);
				}

			}
		})
	})
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
	function newPage(){
	    $.get('membersList.html',{token:$.cookie("token")},function(response){
	        $(".main").empty().html(response);
	    })
	}
	function addQuestion(e){
		$.cookie("read", '0',{path:'/'})
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
//关闭班级遮罩
function hideOverflow1(){
	$(".hideOverflow1").on('click',function(){
		//$(".deleted").attr({id: $(this).attr('rel')});
		$(".overall1").hide();
	})
}
//新增班级
function addClass(){
	$('.addClass').on('click',function(){
		$.ajax({
			url:'deId-list.html',
			datatype:'html',
			success:function(data){
				$(".main").empty().html(data);
			}
		})
	});
}