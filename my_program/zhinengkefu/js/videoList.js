$(document).ready(function() {
	$.ajax({
		url: commUrl + '/menu/findbyid',
		data: {
			token: $.cookie("token"),
			parentId: '598173badac5751672de1384'
		},
		success: function(data) {
			data = eval('(' + data + ')');
			console.log(data)
			$(".breadcrumb").empty();
			var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[0].url + '" id="' + data.data[0].id + '">' + data.data[0].name + '</a>' +
				'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl + '' + 'add-ad.html' + '" id="' + data.data[0].parentId + '">录像文件夹</a></li>';
			$(".breadcrumb").html(html);
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
	kfstate();
	listPage();

})
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
		reportIMState("on", ostate);
	})
}
function listPage(page) {
	var obj = {};
	page = page ? page : 1;
	obj = {
		token: $.cookie("token"),
		page: page,
		row: '5',
		sortId: 'createTime',
		sortType: 'DESC',
		maid:$.cookie("maid")
	}
	$.ajax({
		url: commUrl + '/videoREC/find' ,
		data: obj,
		cache: false,
		dataType: 'json',
		success: function(data) {
			data = eval('(' + data + ')');
			$(".grid-body").empty();
			var html = '<tr class="grid-head-th">' +
				'<th class="start_Time">序号</th>' +
				'<th class="totalNum">时间</th>' +
				'<th class="noLoginNum" >视频内容</th>' +
				'</tr>';
			var sort = 0;
			var page = '';
			if(data.code == '1') {
				$.each(data.data.datas, function(i, key) {
					sort = i + 1;
					html += '<tr> <td>' + sort + '</td> ' +
						'<td>' + key.createTime+ '</td> ' +
						'<td style="width:300px; "> <video id="videoId" controls="" src="' + key.videoUrl + '" style="width: 240px; height: 105px; margin-top:10px; margin-bottom:0px; display: inline-block;"></video></td> ' +
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
			$(".pages ul").html(page);
			$(".grid").html(html);

		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	})
}