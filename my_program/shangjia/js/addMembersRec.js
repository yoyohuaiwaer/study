$(document).ready(function() {
	getFullTime('#timeWrap')
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
				var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[2].url + '" id="' + data.data[2].id + '">' + data.data[2].name + '</a>' +
					'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl + '' + 'addMembersRec.html' + '" id="' + data.data[2].parentId + '">编辑会员广告</a></li>';
				$(".breadcrumb").html(html);
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		});
		$.ajax({
			url: commUrl + '/member/memberRecommendDetails',
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
					$("#title").val(data.data.title);
					$("#content").val(data.data.voiceText);
					var startTime = data.data.startTime;
					var endTime = data.data.endTime;
					initTime(startTime, endTime);
					$("#member_Type").find("option[value='" + data.data.memberType + "']").attr({
						selected: "selected"
					});
					var adIds= data.data.adIds;
					var adInputs = $(".selectOption").find('input');
					for(var a = 0; a < adInputs.length; a++) {
						var curId = adInputs[a].id;
						for (var i=0;i<adIds.length;i++) {
							if(curId == adIds[i])
							{
								$(".selectOption").find("input[id='" + curId + "']").attr({
									checked: "checked"
								});
							}
						}
					}
				}
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		})
	} else {
		initAd();
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
				var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[2].url + '" id="' + data.data[2].id + '">' + data.data[2].name + '</a>' +
					'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl + '' + 'addMembersRec.html' + '" id="' + data.data[2].parentId + '">编辑会员广告</a></li>';
				$(".breadcrumb").html(html);
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		});
	}
	loadAd();
	selectList();
})

function loadAd() {
	var obj = {
		token: $.cookie("token"),
		sortId: 'createTime',
		sortType: 'DESC'
	}
	$.ajax({
		url: commUrl + '/ad/findAll',
		data: obj,
		async: false,
		cache: false,
		dataType: 'json',
		success: function(data) {
			data = eval('(' + data + ')');
			$(".selectOption").empty();
			var html = '';
			if(data.code == '1') {
				$.each(data.data, function(i, key) {
//					html += '<input type="checkbox" name="likes" value="' + key.title + '" id="' + key.id + '" onclick="oncheck()">' + key.title + '<br>';
					html += '<li><input type="checkbox" name="likes" value="' + key.title + '" id="' + key.id + '" onclick="oncheck()">' + key.title + '</li>';
				})
				$(".selectOption").html(html);

			}
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	})
}

function cancelAdFun(e) {
	$.ajax({
		url: 'memberRecom.html',
		datatype: 'html',
		cache: false,
		success: function(data) {
			$(".main").empty().html(data);
		}
	})
}

function addAdFun(e) {
	//	console.log($("input[name='likes']:checked").attr('id'));
	var adInputs = $(".selectOption").find('input');
	var adIds = [];
	for(var a = 0; a < adInputs.length; a++) {
		if(adInputs[a].checked) {
			adIds.push(adInputs[a].id)
		}
	}
	if(adIds.length <= 0) {
		$(".tip").empty().css({
			color: "red"
		}).html("对不起，请您选择关联素材");
		return false;
	}
	var title = $('#title').val();
	var content = $('#content').val()
	var startInput = $('#startTime').find('input');
	var endInput = $('#endTime').find('input');
	var endTime = '';
	var start = [];
	var end = [];

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
	//	else if(startTime == '') {
	//		$(".tip").empty().css({
	//			color: "red"
	//		}).html("开始时间不能为空");
	//		return false;
	//	} 
	else if(endTime == '') {
		$(".tip").empty().css({
			color: "red"
		}).html("结束时间不能为空");
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
	}
	$(".tip").empty();
	var obj = {}
	if(id == 0) {
		obj = {
			title: title,
			voiceText: content,
			adIds: adIds,
			memberType: $('#member_Type option:selected').val(),
			startTime: startTime + ":00",
			endTime: endTime + ":00"
		}
	} else {
		obj = {
			title: title,
			voiceText: content,
			adIds: adIds,
			memberType: $('#member_Type option:selected').val(),
			startTime: startTime + ":00",
			endTime: endTime + ":00",
			id: id
		}
	}
	$.ajax({
		url: commUrl + '/member/updateMemberRecommend?token=' + $.cookie("token"),
		data: obj,
		type: 'POST',
		cache: false,
		dataType: 'json',
		data: JSON.stringify(obj),
		contentType: 'application/json; charset=UTF-8',
		success: function(data) {
			data = eval('(' + data + ')');
			if(data.code == '1') {
				newPage();
			}
		}
	})
}

function newPage() {
	$.get('memberRecom.html', {
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
//多选框
function oncheck() {
	var strList = "";
	$('input[type="checkbox"][name="likes"]:checked').each(function() {
		if(strList == "") {
			strList = strList + $(this).val();
		} else {
			strList = strList + "," + $(this).val();
		}
	});
	$('#input1').val(strList);
}

function selectList(){
    $('.optionSelected').click(function(){
        if($('.suport-icon').attr('class') == 'suport-icon icon-drop_down'){
            $(this).addClass('radius');
            $('.selectOption').slideDown();
            $('.suport-icon').removeClass('icon-drop_down').addClass('icon-drop_up');
        }else {

            $('.selectOption').slideUp();
            $(this).removeClass('radius');
            $('.suport-icon').removeClass('icon-drop_up').addClass('icon-drop_down');
        }
    })
};