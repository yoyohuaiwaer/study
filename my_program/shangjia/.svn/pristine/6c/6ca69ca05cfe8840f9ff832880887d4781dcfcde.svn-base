$(document).ready(function() {
	//面包屑加载
	$(".breadcrumb").empty();
	$.ajax({
		url: commUrl + '/menu/findbyid',
		data: {
			token: $.cookie("token"),
			parentId: $(".main-title").attr("title")
		},
		cache:false,
		success: function(data) {
			data = eval('(' + data + ')')
//			$(".breadcrumb").html('<li class="selected"><span href="javascript:void(0);" title="' + menuUrl + '' + "scene-question-list.html" + '" id="' + data.data[0].parentId + '">' + '问答列表' + '</span></li>');
			$(".breadcrumb").empty();
			var html = '<li class="selected"><a href="javascript:void(0);"  title="' + menuUrl + '' + "scene-question-list.html" + '" id="' + data.data[0].parentId + '">' + '问答列表' + '</a>' +
					'<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);"  title="' + menuUrl + '' + data.data[0].url + '" id="' + data.data[0].parentId + '">一问一答列表</a></li>';
			$(".breadcrumb").html(html);
			
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});
	loadSecene();
	if($.cookie('nowpage1') == 1) {
		pagenation();
	} else {
		var page = $.cookie('nowpage1');
		pagenation(page);

	}
	//	getIndustyId();
	//列表加载
	searchbtn();
	addQuestion();
	deleted();
	hideOverflow();
	hideOverflow1();
	addScene();
	addSceneConfirm();

});
function loadSecene(){
	 $.ajax(
        {
            url: commUrl+'/scene',
            data: {token:$.cookie("token")},
            dataType: 'json',
            async: false,
            success: function (response) {
                response = eval('(' + response + ')')
                needScene = response.name
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
}
//function getIndustyId(){
//	 $.ajax(
//      {
//          url: commUrl+'/scene',
//          data: {token:$.cookie("token")},
//          dataType: 'json',
//          async: false,
//          success: function (response) {
//              response = eval('(' + response + ')')
//              var html = '';
//              if(response.code == '1'){
////              	$.cookie("industry", key.industry,{path:'/'})
//              }
//          },
//          error: function (text) {
//              alert(text.readyState);
//              alert(text.status);
//          }
//      })
//}
function addSceneConfirm() {
	$('.addScene').on('click', function() {
		var name = $('#newScene').val();
		name = name.replace(/['\t]/g, '').replace(/\s*/g, '');
		$.ajax({
			url: commUrl + '/qa/savescene',
			type: 'POST',
			cache:false,
			ifModified :true ,
			data: {
				token: $.cookie("token"),
				industry: $.cookie('industry'),
				industryId: $.cookie('industryId'),
				name: name
			},
			success: function(data) {
				data = JSON.parse(data);
				if(data.code == 1) {
					$(".overall1").hide();
				} else if(data.code == -1) {
					alert(data.msg);
				}
			}
		})
	});
};

function addScene() {
	$('.showOverflow1').on('click', function() {
		$(".overall1").show();
	});
}

function findMenus(parentId) {
	$.ajax({
		url: commUrl + '/menu/findbyid',
		async: false,
		cache:false,
		ifModified:true,
		data: {
			token: $.cookie("token"),
			parentId: parentId
		},
		success: function(data) {
			data = JSON.parse(data);
			if(data.code == 1) {
				var breadcrumb1 = '';
				breadcrumb1 = '<li class=""><a alt="' + menuUrl + '' + data.data[0].url + '" id="' + data.data[0].id + '">' + data.data[0].name + '</a></li>';
				$(".breadcrumb").append(breadcrumb1);
				changeBreadcrumb();
			}
		}
	})
}

function searchbtn() {
	$('.searchbtn').on('click', function() {
		$.cookie('rel1', $(this).attr('rel'), {
			path: '/'
		});
		pagenation();

	})
};

function pagenation(page) {
	page = page ? page : 1;
	var obg = {}
	obg = {
		token: $.cookie("token"),
		industry: $.cookie('industry'),
		page: page,
		row: '10',
		sortId: 'createTime',
		sortType: 'DESC'
	};
	
	if($.cookie('rel1') == 0) {
		var condition = $('#search').children('option:selected').val();
		var text = $('.searchText').val();
		obg = {
			token: $.cookie("token"),
			condition: condition,
			text: text,
			scene: needScene,
			industryId: $.cookie("industryId"),
			page: page,
			row: '10',
			sortId: 'createTime',
			sortType: 'DESC'
		}
	} else if($.cookie('rel1') == 1) {
		obg = {
			token: $.cookie("token"),
			industry: $.cookie('industry'),
			page: page,
			row: '10',
			sortId: 'createTime',
			sortType: 'DESC'
		}
	}
	$.ajax({
		url: commUrl + '/qacategory/list?timestamp=+'+ new Date().getTime(),
		data: obg,
		dataType: 'json',
		async: false,
		success: function(response) {
			response = eval('(' + response + ')')
			$(".grid-body").empty();
			$(".pages ul").empty()
			var html = '';
			var page = '';
			if(response.code == '1') {
				if(response.data.datas == '') {
					html = '<p>暂无数据，请添加问答</p>'
				} else {
					var sort = 0;
					$.each(response.data.datas, function(i, key) {
						var question = key.question;
						var id = key.id;
						$.each(key.answers, function(num, value) {
							$.cookie("scene", key.scene, {
								path: '/'
							})
							sort = sort + 1;
							html += ' <div class="grid-body-tr"> <div class="order-number"><span>' + sort + '</span></div><div class="order-number"><span style="width:200px; max-width:200px">' + key.scene + '</span></div><div class="order-number"><span>' + key.question + '</span></div><div class="industrybox"><span title="' + id + '">' + key.mainKey + '</span></div>' +
								' <div class="scene"><span >' + value.text + '</span></div>';
							if(value.action == 'none') {
								html += '<div class="order-number"><span>无动作</span></div>';
							} else if(value.action == 'happy') {
								html += '<div class="order-number"><span>开心</span></div>';
							} else if(value.action == 'sad') {
								html += '<div class="order-number"><span>悲伤</span></div>';
							} else if(value.action == 'thinking') {
								html += '<div class="order-number"><span>思考</span></div>';
							} else if(value.action == 'angry') {
								html += '<div class="order-number"><span>愤怒</span></div>';
							} else if(value.action == 'goodBye') {
								html += '<div class="order-number"><span>再见</span></div>';
							}else
							{
								html += '<div class="order-number"><span>无动作</span></div>';
							}

							html += '<div><span><a class="checkquestion" rel="0" data-id="' + id + '">查看</a><a class="overflowShow" rel="' + id + '" alt="' + value.text + '">删除</a></span></div></div>';
						})
					})
					if(response.data.page == response.data.pageCount) {
						page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">' + response.data.page + '</span>/<span class="pagecount">' + response.data.pageCount + '</span> </li> ' +
							'<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" min="1" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
					} else if(response.data.page == '1') {
						page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">' + response.data.page + '</span>/<span class="pagecount">' + response.data.pageCount + '</span> </li>' +
							' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" min="1" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'

					} else {
						page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">' + response.data.page + '</span>/<span class="pagecount">' + response.data.pageCount + '</span> </li> ' +
							'<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" min="1" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
					}
				}

			}
			$(".grid-body").html(html);
			$(".pages ul").html(page);
			checkquestion();
			showOverflow();
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});

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
	if(parseInt($(e).prev(".nowPage").val() )<= 1) {
		var page = 1;
		pagenation(page);
	} else if(parseInt($(e).prev(".nowPage").val() )>= parseInt($(".pagecount").text())) {
		var page = $(".pagecount").text();
		pagenation(page)
	} else {
		var page = $(e).prev(".nowPage").val();
		pagenation(page)

	}
}

function checkquestion() {
	$('.checkquestion').on('click', function() {
		$.cookie('qusID', $(this).attr('data-id'), {
			path: '/'
		});
		$.cookie('rel', $(this).attr('rel'), {
			path: '/'
		});
		$.cookie('nowpage1', $('.onpage').text(), {
			path: '/'
		});
		$.ajax({
			url: menuUrl + 'question-record.html',
			success: function(data) {
				$('.main').html(data);
			}
		})
	})
}

function addQuestion() {
	$('.addQuestion').on('click', function() {
		$.cookie('rel', $(this).attr('rel'), {
			path: '/'
		});
		$.ajax({
			url: menuUrl + 'question-record.html',
			success: function(data) {
				$('.main').html(data);
			}
		})
	});

}

function showOverflow() {

	$(".overflowShow").on('click', function() {
		$(".deleted").attr({
			id: $(this).attr('rel'),
			rel: $(this).attr('alt')
		});
		$(".overall").show();
	})
};

function deleted() {
	$(".deleted").on('click', function() {
		$.ajax({
			url: commUrl + '/qacategory/del',
			type: 'POST',
			data: {
				token: $.cookie("token"),
				id: $(this).attr('id'),
				industry: $.cookie("industry"),
			},
			success: function(data) {
				data = JSON.parse(data);
				if(data.code == 1) {
					var page = $('.onpage').text();
					pagenation(page);
					$(".overall").hide();
				}
			}
		})
	})
}

function hideOverflow() {
	$(".hideOverflow").on('click', function() {
		$(".overall").hide();
	})
}

function hideOverflow1() {
	$(".hideOverflow1").on('click', function() {
		$(".overall1").hide();
	})
}