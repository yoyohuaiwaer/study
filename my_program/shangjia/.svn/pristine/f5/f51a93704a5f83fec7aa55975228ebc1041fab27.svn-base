$(document).ready(function() {
	getFullTime('#timeWrap');
	if(parseInt($.cookie("read")) > 0) {
		$.ajax({
			url: commUrl + '/menu/findbyid',
			data: {
				token: $.cookie("token"),
				parentId: '586606df5a5a9763823e6399'
			},
			success: function(data) {
				data = eval('(' + data + ')');
				$(".breadcrumb").empty();
				var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[1].url + '" id="' + data.data[1].id + '">' + data.data[1].name + '</a>' +
					'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl + 'add-ad.html' + '" id="' + data.data[1].parentId + '">编辑广告详情</a></li>';
				$(".breadcrumb").html(html);
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		});
		$.ajax({
			url: commUrl + '/hardad/find',
			data: {
				token: $.cookie("token"),
				id: $.cookie('read')
			},
			cache: false,
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				data = eval('(' + data + ')');
				if(data.code == '1') {
					setAd(data.data.datas[0].sucaiId)
					var startTime = data.data.datas[0].startTime;
					var endTime = data.data.datas[0].endTime;
					$("#title").val(data.data.datas[0].title);
					$("#content").val(data.data.datas[0].content);
					$("#frequency").val(data.data.datas[0].frequency);
					var stateIndex = (data.data.datas[0].state==1)?0:1;
					$('.radioBox input').eq(stateIndex).attr("checked",'checked')
					initTime(startTime, endTime);
				}
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		})
	} else {
		setAd(0)
		initAd();
	}
	function setAd(adId){
		
		$.ajax({
			url: commUrl + '/ad/findAll',
			data: {
				token: $.cookie("token")
			},
			dataType: 'json',
			success: function(data) {
				data = eval('(' + data + ')');
				var html = '<option class="answerList">' + '请选择广告' + '</option>';
				if(data.code == '1') {
					$.each(data.data, function(i, key) {
						if(key.id ==adId )
						{
							html += '<option selected = "selected"  id=' + key.id + '  title=' + key.title + ' class="answerList">' + key.title + '</option>'
						}else
						{
							html += '<option id=' + key.id + '  title=' + key.title + ' class="answerList">' + key.title + '</option>'
						}
					})
				}
				$(".adListSelect").html(html);
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		})
	}

	function initTime(startTime, endTime) {
		var startChild = $('#startTime').children();
		var endChild = $('#endTime').children();
		var sData = new Date(startTime)
		var eData = new Date(endTime)
		startChild[0].value = sData.getFullYear();
		startChild[1].value = sData.getMonth() + 1;
		startChild[2].value = sData.getDate();
		startChild[3].value = sData.getHours();
		startChild[4].value = sData.getMinutes();
		endChild[0].value = eData.getFullYear();
		endChild[1].value = eData.getMonth() + 1;
		endChild[2].value = eData.getDate();
		endChild[3].value = eData.getHours();
		endChild[4].value = eData.getMinutes();
	}

	function initAd() {
		$.ajax({
			url: commUrl + '/menu/findbyid',
			cache: false,
			data: {
				token: $.cookie("token"),
				parentId: '586606df5a5a9763823e6399'
			},
			success: function(data) {
				data = eval('(' + data + ')');
				$(".breadcrumb").empty();
				var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[1].url + '" id="' + data.data[1].id + '">' + data.data[1].name + '</a>' +
					'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl +  'addHardAd.html' + '" id="' + data.data[1].parentId + '">编辑广告详情</a></li>';
				$(".breadcrumb").html(html);
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		});
		var today = new Date();
		var day = today.getDate();
		var month = today.getMonth() + 1;
		var year = today.getFullYear();
		var hours = today.getHours();
		var min = today.getMinutes() + 1;
		if(min > 60) {
			min = 60;
		}
		var date = year + "/" + month + "/" + day + " " + hours + ":" + min;
		$("#startTime").val(date);
	}

})

function cancelAdFun(e) {
	$.ajax({
		url: 'hardAd.html',
		datatype: 'html',
		cache: false,
		success: function(data) {
			$(".main").empty().html(data);
		}
	})
}

function addAdFun(e) {
	var title = $('#title').val();
	var content = $('#content').val()
	var startInput = $('#startTime').find('input');
	var endInput = $('#endTime').find('input');
	var endTime = '';
	var start = [];
	var end = [];
	var state = $("input[name='state']:checked").val();
	state = (state == '上线') ? 1 : 0;
	var adId = $(".adListSelect").find("option:selected").attr("id")
	var frequency = $('#frequency').val();
	startTime = startInput[0].value + "-" + startInput[1].value + "-" + startInput[2].value + " " + startInput[3].value + ":" + startInput[4].value;
	endTime = endInput[0].value + "-" + endInput[1].value + "-" + endInput[2].value + " " + endInput[3].value + ":" + endInput[4].value;
	for(var i = 0; i < startInput.length; i++) {
		if(startInput[i].value == '' || parseInt(startInput[i].value) >= parseInt(startInput[i].max) || parseInt(startInput[i].value) < parseInt(startInput[i].min)) {
			$(".tip").empty().css({
				color: "red"
			}).html("对不起，请您输入正确的开始时间");
			return false;
		}
	}
	for(var j = 0; j < endInput.length; j++) {
		if(endInput[j].value == '' || parseInt(endInput[j].value) >= parseInt(endInput[j].max) || parseInt(endInput[j].value) < parseInt(endInput[j].min)) {
			$(".tip").empty().css({
				color: "red"
			}).html("对不起，请您输入正确的结束时间");
			return false;
		}
		end.push(endInput[j].value);
	}
	var endDate = new Date(end[0], end[1] - 1, end[2], end[3], end[4]);
	var now = new Date();
	if(now > endDate) {
		$(".tip").empty().css({
			color: "red"
		}).html("对不起，您的输入有误，结束日期不能小于当前时间");
		return false;
	}
	var id = $.cookie('read');
	if(title == '') {
		$(".tip").empty().css({
			color: "red"
		}).html("标题不能为空");
		return false;
	} else if(content == '') {
		$(".tip").empty().css({
			color: "red"
		}).html("内容不能为空");
		return false;
	} else if(startTime == '') {
		$(".tip").empty().css({
			color: "red"
		}).html("开始时间不能为空");
		return false;
	} else if(endTime == '') {
		$(".tip").empty().css({
			color: "red"
		}).html("结束时间不能为空");
		return false;
	} else if(frequency == '') {
		$(".tip").empty().css({
			color: "red"
		}).html("请设置广告频次");
		return false;
	} else if(adId == undefined) {
		$(".tip").empty().css({
			color: "red"
		}).html("请选择关联素材");
		return false;
	}
	$(".tip").empty();
	var obj = {}
	if(id == 0) {
		obj = {
			token: $.cookie("token"),
			title: title,
			content: content,
			startTime: startTime,
			endTime: endTime,
			sucaiId: adId,
			state: state,
			frequency: frequency
		}
	} else {
		obj = {
			token: $.cookie("token"),
			title: title,
			content: content,
			startTime: startTime,
			endTime: endTime,
			id: id,
			sucaiId: adId,
			state: state,
			frequency: frequency
		}
	}
	$.ajax({
		url: commUrl + '/hardad/save',
		data: obj,
		type: 'POST',
		cache: false,
		success: function(data) {
			data = eval('(' + data + ')');
			if(data.code == '1') {
				newPage();
			}else if(data.code=="-1")
			{
				$(".tip").empty().css({
					color: "red"
				}).html(data.msg);
			}
		},
		error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
	})
}

function newPage() {
	$.get('hardAd.html', {
		token: $.cookie("token"),
		scene: $.cookie("scene")
	}, function(response) {
		$(".main").empty().html(response);
	})
}

function clearOverall() {
	$(".overall").hide();
}

function showOverall() {
	$(".overall").show();
}