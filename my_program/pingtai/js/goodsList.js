$(document).ready(function() {
	pagenation();
	$.ajax({
		url: commUrl + '/menu/findbyid',
		async: false,
		data: {
			token: $.cookie("token"),
			parentId: '5850be18b2a99afa74c513a7'
		},
		success: function(data) {
			data = JSON.parse(data);
			if(data.code == 1) {
				$(".breadcrumb").empty();
				var breadcrumb = '';
				$.each(data.data, function(i, key) {
					breadcrumb += '<li class="selected"><a alt="' + menuUrl + '' + key.url + '" id="' + key.id + '">' + key.name + '</a></li>'
					$(".breadcrumb").html(breadcrumb);
					//$(".breadcrumb li:nth-of-type(2)").addClass('selected');
					changeBreadcrumb();
				})
			}
		}
	})
	addTag();
})

function addTag() {
	$('.addTag').on('click', function() {
		$.ajax({
			url: menuUrl + 'tag-details.html',
			success: function(response) {
				$('.main').html(response);
			}
		})
	})
}

function pagenation(page) {
	var labelIds = [];
	var id = $.cookie("goodsId");
	var ladeblNames = [];
	//获取对应商品名称
	$.ajax({
		url: commUrl+'/entity/process/label',
		data: {
			token: $.cookie("token"),
			processId: id
		},
		cache: false,
		dataType: 'json',
		async: false,
		success: function(response) {
			response = JSON.parse(response);
			$(".grid-head-th").empty()
			if(response.code == '1') {
				if(response.data.length > 0) {
					var html = '<th class="answer"  ">序号</th>';
					$.each(response.data, function(i, key) {
						$.cookie('industry', key.industry, {
							path: '/'
						});
						labelIds.push(key.id)
						ladeblNames.push(key.name)
						html += '<th ">' + key.name + '</th>'
					})
					html += '<th ">操作</th>'
					$(".grid-head-th").html(html);
				}
			}
			$.cookie("labelIds", labelIds, {path: '/'});
			$.cookie("ladeblNames", ladeblNames, {path: '/'});
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});

	page = page ? page : 1;
	var url = commUrl + '/entity/process_' + id;
	$.ajax({
		url: url,
		data: {
			token: $.cookie("token")
		},
		dataType: 'json',
		async: false,
		cache: false,
		success: function(response) {
			response = JSON.parse(response);
			$(".table-body").empty();
			var html = '';
			if(response.code == '1') {
				var sort = 0;
				goodsArr = [];
				$.each(response.data.entitys, function(i, key) {
					goodsArr.push(key);
					sort = sort + 1;
					html += '<tr class="tr_body"> <td class="number"  >' + sort + '</td> ';
					for(var i = 0; i < labelIds.length; i++) {
						$.each(key.entityVars, function(a, info) {
							if(labelIds[i] == info.labelId) {
								html += '<td id="' + info.labelId + '" class="td_info"><span><input id="' + sort + '" type="text" class="title text" style="display: none ; width:90px;"value="' + info.value + '"/><span class="title" id="' + sort + '">' + info.value + '</span></span></td>'
							}
						});
					}
					var curLength = Object.keys(key.entityVars).length;
					var nullLength = labelIds.length - curLength
					if(nullLength > 0) {
						for(var n = 0; n < nullLength; n++) {
							html += '<td class=""><span><input type="text" class=" text" style="display: none ; width:90px;"value="' + "" + '"/><span >' + '' + '</span></span></td>'
						}
					}
					html += '<td><span> <a class="confirm"  style="display: none;color:#00a0e9; margin-right:20px; ">确定</a><a class="edit" id="' + key.id + '" style="color:#00a0e9; margin-right:20px;">修改</a><a class="cancelEdit" style="display: none;color:#00a0e9; margin-right:20px;">取消</a><a onclick="javascript:showOverall(this)" style="color:#00a0e9; margin-right:20px;" class="deleted" id="' + key.labelId + '">删除</a></span></td></tr>';
				})
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
			$(".table-body").html(html);
			//          $(".pages ul").html(page);
			edit();
			cancelEdit();
			confirm();
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});
}

function confirm() {
	$('.confirm').on('click', function() {
		var _index = $(this).parents('.tr_body').find('input.title')[0].id;
		var _processId = $.cookie("goodsId");
		var obj = goodsArr[_index - 1];
		var tdS = $(this).parents('.tr_body').find('td.td_info')
		var inputs = $(this).parents('.tr_body').find('input.title');
		var newJson = [];
		for(var j = 0; j < inputs.length; j++) {

			var labObj = new Object();
			labObj.id = tdS[j].id;
			labObj.value = inputs[j].value;
			labObj.processId = $.cookie("goodsId");
			newJson.push(labObj)
		}
		$.ajax({
			url: commUrl + '/entity/entiy/update?token=' + $.cookie("token") + '&processId=' + _processId + '&eid=' + obj.eid,
			type: 'POST',
			data: JSON.stringify(newJson),
			dataType: 'json',
			contentType: 'application/json; charset=UTF-8',
			async: false,
			cache: false,
			success: function(data) {
				data = JSON.parse(data);
				if(data.code == 1) {
					newPage();
				} else if(data.code == -1) {
					alert(data.msg);
					window.location.href = menuUrl + 'goods-list.html';
				}
			}
		})
	})
}

function edit() {
	$('.edit').on('click', function() {
		$(this).next('a').show();
		$(this).prev('a').show();
		$(this).hide();
		$('.deleted').hide()
		$(this).parents('.tr_body').addClass('red');
		$(this).parents('.tr_body').find('input.title').show();
		$(this).parents('.tr_body').find('span.title').hide();
	})
}

function cancelEdit() {
	$('.cancelEdit').on('click', function() {
		$(this).prev('a').prev('a').hide();
		$(this).prev('a').show();
		$(this).hide();
		$('.deleted').show()
		$(this).parents('.tr_body').removeClass('red');
		$(this).parents('.tr_body').find('input.title').hide();
		$(this).parents('.tr_body').find('span.title').show();
	})
}

function deleteGoods(e) {
	var needGoodsId = e.id;
	var _processId = $.cookie("goodsId");
	var obj = goodsArr[needGoodsId - 1];
	$.ajax({
		url: commUrl + '/entity/entity_' + _processId,
		type: 'POST',
		cache:false,
		data: {
			token: $.cookie("token"),
			eid: obj.eid,
			processId: _processId
		},
		success: function(data) {
			data = JSON.parse(data);
			if(data.code == 1) {
				$(".overall").hide();
				var page = $('.onpage').text();
				pagenation(page);
			} else if(data.code == -1) {
				alert(data.msg);
				window.location.href = menuUrl + 'goods-list.html';
			}
		}
	})
}

function addGoods(e) {
	$.ajax({
		url: 'goods-details.html',
		datatype: 'html',
		success: function(data) {
			$(".main").empty().html(data);
		}
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
	} else if(parseInt($(e).prev(".nowPage").val() )>= parseInt($(".pagecount").text())) {
		var page = $(".pagecount").text();
		pagenation(page)
	} else {
		var page = $(e).prev(".nowPage").val();
		pagenation(page)

	}
}

function showOverall(e) {
	var needGoodsId = $(e).parents('.tr_body').find('input.title')[0].id;
	$(".deleted").attr({
		id: needGoodsId
	});
	$(".overall").show();
}

function clearOverall(e) {
	$(".overall").hide();
}

function newPage() {
	$.get('goods-list.html', {
		token: $.cookie("token"),
		scene: $.cookie("scene")
	}, function(response) {
		$(".main").empty().html(response);
	})
}