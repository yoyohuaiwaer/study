$(document).ready(function() {
	$.ajax({
		url: commUrl + '/menu/findbyid',
		//type:'GET',
		//async: false,
		data: {
			token: $.cookie("token"),
			parentId: '598173badac5751672de1384'
		},
		success: function(data) {
			console.log(data)
			data = eval('(' + data + ')');
			if(data.code == '1') {
				$(".breadcrumb").empty();
				var breadcrumb = '<li class = "selected" ><a href="javascript:void(0);" onclick="javascript:changePage(this);"  title="' + menuUrl + '' + data.data[0].url + '" id="' + data.data[0].id + '">' + data.data[0].name + '</a>';
				$(".breadcrumb").html(breadcrumb);
			}
			if(data.code=='-1')
			{
				alert(data.msg+" 请重新登录")
			}
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});
	if($.cookie('line')=='on')
	{
		$('#kfIsOn').html("客服在线中...")
        $('.search-box').show();
	}else{
		$('#kfIsOn').html("客服已离线");
		$('.search-box').hide();
	}
	listPage();
	kfstate();
})

function listPage(page, isSearch) {
	var obj = {};
	page = page ? page : 1;
	obj = {
		token: $.cookie("token"),
		page: page,
		row: '10',
		sortId: 'createTime',
		sortType: 'DESC'
	}
	$.ajax({
		url: commUrl + '/videoREC/getMachineList' ,
		data: obj,
		cache: false,
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			data = eval('(' + data + ')');
			console.log(data)
			$(".grid-body").empty();
			var html = '<tr class="grid-head-th">' +
				'<th class="start_Time">序号</th>' +
				'<th class="totalNum">机器人</th>' +
				'<th class="noLoginNum" >操作</th>' +
				'</tr>';
			var sort = 0;
			var page = '';
			if(data.code == '1' && data.data.datas.length>0) {
				$.each(data.data.datas, function(i, key) {
					sort = i + 1;
					html += '<tr> <td>' + sort + '</td> ' +
						'<td>' + key.maName + '</td> ' +
//						'<td style="width:300px; "><a href="javascript:void(0);"  onclick="javascript:checkInfo(this)" class="gridBtn" id="' + key.maid + '" >查看详情</a><a href="javascript:void(0);"  onclick="javascript:checkVideo(this)" class="gridBtn" id="' + key.maid + '">查看录像</a></td>' +
						'<td style="width:300px; "><a href="javascript:void(0);"  onclick="javascript:checkInfo(this)" class="gridBtn" id="' + key.maid + '" >查看详情</a></td>' +
						'</tr>'
				})
				if(data.data.page == '1') {
					page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">' + data.data.page + '</span>/<span class="pagecount">' + data.data.pageCount + '</span> </li>' +
						' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'

				} else if(data.data.page == data.data.pageCount) {
					page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">' + data.data.page + '</span>/<span class="pagecount">' + data.data.pageCount + '</span> </li> ' +
						'<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
				} else {
					page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">' + data.data.page + '</span>/<span class="pagecount">' + data.data.pageCount + '</span> </li> ' +
						'<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
				}
			}
			if(data.code=='-1')
			{
				alert(data.msg+" 请重新登录")
			}
			$(".pages ul").html(page);
			$(".grid").html(html);

		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	})
}
function kfstate() {
	if($.cookie("state") =='free')
	{
		$("#kfstate option").eq(0).attr("selected",true);
	}else{
		$("#kfstate option").eq(1).attr("selected",true);
	}
	
	$('#kfstate').change(function() {
		$(this).children('option:selected').attr('value');
		var ostate = $(this).children('option:selected').attr('value');
		reportIMState("on",ostate);
	})
}
function checkVideo(e) {
	$.cookie("maid", e.id, {
		path: '/'
	});
	$.ajax({
		url: 'videoList.html',
		datatype: 'html',
		success: function(data) {
			$(".main").empty().html(data);
		}
	})
}

function checkInfo(e) {
	$.cookie("maid", e.id, {
		path: '/'
	});
	$.ajax({
		url: 'customerServiceMsg.html',
		datatype: 'html',
		success: function(data) {
			$(".main").empty().html(data);
		}
	})
}

function prevPage(e) {
	$(e).next("li").find(".onpage").text();
	if($(e).next("li").find(".onpage").text() == '1') {} else {
		var page = $(e).next("li").find(".onpage").text() - 1;
		listPage(page);
	}
}

function nextPage(e) {
	if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()) {} else {
		var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
		listPage(page);

	}
}

function turnPage(e) {
	var page = 1;
	if(parseInt($(e).prev(".nowPage").val()) <= 1) {

	} else if(parseInt($(e).prev(".nowPage").val()) >= parseInt($(".pagecount").text())) {
		page = $(".pagecount").text();
	} else {
		page = $(e).prev(".nowPage").val();
	}
	listPage(page);
}