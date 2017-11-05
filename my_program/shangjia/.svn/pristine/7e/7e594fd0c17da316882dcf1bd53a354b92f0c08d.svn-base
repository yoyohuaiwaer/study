$(document).ready(function() {
	$.ajax({
		url: commUrl + '/menu/findbyid',
		data: {
			token: $.cookie("token"),
			parentId: '57d21aaf240a7a19c23ccc9f'
		},
		success: function(data) {
			data = eval('(' + data + ')')
			if(data.code == '1') {
				$(".breadcrumb").empty();
				var breadcrumb = '<li class = "selected" ><a href="javascript:void(0);" onclick="javascript:changePage(this);"  title="' + menuUrl + '' + data.data[1].url + '" id="' + data.data[1].id + '">' + data.data[1].name + '</a>';
				$(".breadcrumb").html(breadcrumb);
			}
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});

	initModel();
})

function initModel() {
	wordsId = "";
	$.ajax({
		url: commUrl + '/sensitiveword/find',
		data: {
			token: $.cookie("token")
		},
		type: 'post',
		cache: false,
		dataType: 'json',
		success: function(data) {
			data = eval('(' + data + ')');
			$(".wordsContent").empty();
			var html = '';
			if(data.code == '1') {
				if(data.data.id) {
					wordsId = data.data.id;
				}
				html = data.data.words;
			}
			$(".wordsContent").html(html);
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	})
}

function onSure(e) {
	var obj = {}
	if(wordsId=="")
	{
		obj={
			token: $.cookie("token"),
			words: $(".wordsContent").val()
		}
	}else
	{
		obj={
			token: $.cookie("token"),
			id: wordsId,
			words: $(".wordsContent").val()
		}
	}
	$.ajax({
		url: commUrl + '/sensitiveword/save',
		data: obj,
		type: 'POST',
		cache: false,
		success: function(data) {
			data = eval('(' + data + ')');
			if(data.code == '1') {
				alert("保存成功")
			}
		}
	})
}

function onCancel(e) {
	$.ajax({
		url: 'sensitiveWords.html',
		datatype: 'html',
		cache: false,
		success: function(data) {
			$(".main").empty().html(data);
		}
	})
}