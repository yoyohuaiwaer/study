$(document).ready(function() {
	getTodayModel();
	storeState();
	initModel(1, 1);
})
function storeState() {
$.ajax({
        url:commUrl+'/user/findall',
        cache:false,
        data: {
            token:$.cookie("token")
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1) {
            	var html = '<option >'+'全部商家'+'</option>';
            	$.each(data.data, function(i,key) {
                    html += '<option id='+key.id+'  title='+key.nick+' >'+key.nick+'</option>'
                })
            	$("#storeState").html(html);
            }
        }
    })
}
function GetDateStr() {
	var dd = new Date();
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1; //获取当前月份的日期
	var d = dd.getDate();
	return dd;
}

function p(s) {
	return s < 10 ? '0' + s : s;
}
//今日数据概况接口
function getTodayModel() {
	$.ajax({
		url: commUrl + '/stat/dataToDay',
		data: {
			token: $.cookie("token")
		},
		cache: false,
		type: 'get',
		success: function(data) {
			data = eval('(' + data + ')');
			console.log(data)
			if(data.code == '1') {
				$('.duration').html(data.duration);
				$('.callRate').html(((data.data.callRate.toFixed(2))*100)+"%");
				$('.connectRate').html(((data.data.connectRate.toFixed(2))*100)+"%");
				$('.problemNumber').html(data.data.problemNumber);
				$('.accuracy').html(((data.data.accuracy.toFixed(2))*100)+"%");
			}
		}
	})
}
function setTypeSelect(e)
{
	initModel(1, 1);
}
function initModel(value, page) {
	page = page ? page : 1;
	var myDate = GetDateStr();
	var dateArray = [];
	var dateTemp;
	var start_Time;
	for(var i = 0; i < value; i++) {
		dateTemp = p(myDate.getMonth() + 1) + "-" + p(myDate.getDate());
		start_Time = myDate.getFullYear() + "-" + dateTemp;
		dateArray.push(start_Time);
		myDate.setDate(myDate.getDate() + 1);
	}
	start_Time = dateArray[0];
	var end_Time = dateArray[dateArray.length - 1];
	pullModel(start_Time, end_Time, page);
}

function pullModel(start_Time, end_Time, page) {
	var shopId =$("#storeState").find("option:selected").attr("id");
	var obj = {
		token: $.cookie("token"),
		page: page,
		row: '10',
		sortId: 'date',
		sortType: 'DESC',
		meid:shopId,
		startDate: start_Time,
		endDate: end_Time
	}
	
	$.ajax({
		url: commUrl + '/stat/survey',
		cache: false,
		type: 'get',
		data: obj,
		success: function(data) {
			data = eval('(' + data + ')');
			console.log(data)
			$(".grid-body").empty();
			var html = '<tr class="grid-head-th">' +
				'<th class="start_Time">时间</th>' +
				'<th class="totalNum">在线会话时长</th>' +
				'<th class="noLoginNum" >转人工率</th>' +
				'<th class="noLoginNum" >人工接听率</th>' +
				'<th class="noLoginNum" >提问量</th>' +
				'<th class="noLoginNum" >回答正确率</th>' +
				'</tr>';
			var page = '';
			if(data.code == '1') {
				var sort = 0;
				$.each(data.data.datas, function(i, key) {
					sort = i + 1;
					html += '<tr class="grid-body-tr" > <td class="start_Time">' + key.date + '</td> ' +
						'<td class="totalNum">' + key.duration + '</td> ' +
						'<td class="totalNum">' + (key.callRate.toFixed(2))*100 + '%</td> ' +
						'<td class="totalNum">' + (key.connectRate.toFixed(2))*100 + '%</td> ' +
						'<td class="totalNum">' + key.problemNumber + '</td> ' +
						'<td class="noLoginNum">' + (key.accuracy.toFixed(2))*100 + '%</td> </tr>'
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

function listPage(page) {
	page = page ? page : 1;
	var start_Time = $('#startTime')[0].value;
	var end_Time = $('#endTime')[0].value;
	if(start_Time != '' || end_Time != '') {
		if(new Date(end_Time) < new Date(start_Time)) {
			$(".tip").empty().css({
				color: "red"
			}).html("开始时间不能小于结束时间");
			return;
		} else {
			$(".tip").empty();
		}
	}
	if(start_Time == '' && end_Time == '') {
		var myDate = GetDateStr();
		var dateArray = [];
		var dateTemp;
		var start_Time;
		for(var i = 0; i < 1; i++) {
			dateTemp = p(myDate.getMonth() + 1) + "-" + p(myDate.getDate());
			start_Time = myDate.getFullYear() + "-" + dateTemp;
			dateArray.push(start_Time);
			myDate.setDate(myDate.getDate() + 1);
		}
		start_Time = dateArray[0];
		var end_Time = dateArray[dateArray.length - 1];
	}
	pullModel(start_Time, end_Time, page);
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

function setStartList() {
	var start_Time = $('#startTime')[0].value;
	var end_Time = $('#endTime')[0].value;
	if(start_Time == '' || end_Time == '') {
		$(".tip").empty().css({
			color: "red"
		}).html("请选择开始时间和结束时间");
		return;
	}
	if(new Date(end_Time) < new Date(start_Time)) {
		$(".tip").empty().css({
			color: "red"
		}).html("开始时间不能小于结束时间");
		return;
	} else {
		$(".tip").empty();
		listPage(1);
	}
}
//导出Excel
function forExcel() {
	outExcel('grid');
}