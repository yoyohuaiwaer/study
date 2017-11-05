$(document).ready(function() {
	$(".breadcrumb").empty();
	var breadcrumb = '<li class="selected"><a class="" alt="sensitiveWords.html" id="5850c3cab2a99afa74c513b6">敏感词管理</a></li>';
	$(".breadcrumb").html(breadcrumb);
	changeBreadcrumb();

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
				//console.log(data);
				//debugger;
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