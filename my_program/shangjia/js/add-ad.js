$(document).ready(function() {
	//	getFullTime('#timeWrap')
	if(parseInt($.cookie("read")) > 0) {
		$.ajax({
			url: commUrl + '/menu/findbyid',
			data: {
				token: $.cookie("token"),
				parentId: '586606df5a5a9763823e6399'
			},
			success: function(data) {
				data = eval('(' + data + ')');
				console.log(data)
				$(".breadcrumb").empty();
				var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[0].url + '" id="' + data.data[0].id + '">' + data.data[0].name + '</a>' +
					'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl + '' + 'add-ad.html' + '" id="' + data.data[0].parentId + '">编辑素材详情</a></li>';
				$(".breadcrumb").html(html);
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		});
		$.ajax({
			url: commUrl + '/ad/find?timestamp='+ new Date().getTime(),
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
					$("#title").val(data.data.datas[0].title);
					$("#content").val(data.data.datas[0].content);
					$("#url").val(data.data.datas[0].url);
					if(data.data.datas[0].img !="")
					{
						$('#imageId').attr('src', data.data.datas[0].img);
						$('#imageId').css('width', '120').css('height', '120').css('display', 'inline-block');
					}
					if(data.data.datas[0].video)
					{
						$('#videoId').attr('src', data.data.datas[0].video);
						$('#videoId').css('width', '220').css('height', '120').css('display', 'inline-block');
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
				var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[0].url + '" id="' + data.data[0].id + '">' + data.data[0].name + '</a>' +
					'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl + '' + 'add-ad.html' + '" id="' + data.data[0].parentId + '">编辑素材详情</a></li>';
				$(".breadcrumb").html(html);
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		});
	}

	$(".file_upload").change(function() {
		var file = this.files[0];
		if(file ==undefined)
		{
			return;
		}
		var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
		if(fileName == "jpg" || fileName == "jpeg" || fileName == "png" || fileName == "bmp") {
			if(file.size / 1024 < 1000) {
					showOverall();
				var formData = new FormData();
				formData.append('file1', file);
				$.ajax({
					type: "POST", //必须用post
					url: imgUrl,
					crossDomain: true,
					cache: false,
					jsonp: "jsoncallback",
					data: formData,
					contentType: false, //必须
					processData: false,
					complete: function(data) {
							clearOverall();
						var json = eval('(' + data.responseText + ')');
						$('#imageId').attr('src', json.imgurl);
						var img = $("#imageId"); //获取img元素
						var picRealWidth, picRealHeight;
						$("<img>") // 在内存中创建一个img标记
							.attr("src", $(img).attr("src"))
							.load(function() {
								picRealWidth = this.width;
								picRealHeight = this.height;
								$(".imgTips").empty().css({
									color: "green"
								}).html("");
								$('#imageId').show().attr('src', json.imgurl);
								$('#imageId').css('display', 'inline-block');
							});
					}
				});
			} else {
					clearOverall();
				$('#imageId').attr('src', '');
				$('#imageId').css('display', 'none');
				$(".imgTips").empty().css({
					color: "red"
				}).html("图片大小不能大于1M");
			}
		} else {
			$('#imageId').attr('src', '');
			$('#imageId').css('display', 'none');
			$(".imgTips").empty().css({
				color: "red"
			}).html("图片格式不正确，格式应为：jpg,jpeg,png,bmp");
		}
	})

	$(".changeVedio input").change(function() {
		var file = this.files[0];
		var formData = new FormData();
		formData.append('file', file);
		var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
		if(fileName == "rmvb" || fileName == "avi" || fileName == "wmv" || fileName == "mpg" || fileName == "mp4") {
			if(file.size / 1024 < 10000) {
				showOverall();
				$.ajax({
					type: "POST", //必须用post  
					url: videoUrl,
					crossDomain: true,
					jsonp: "jsoncallback",
					data: formData,
					contentType: false, //必须  
					processData: false,
					//不能用success，否则不执行  
					complete: function(data) {
						clearOverall();
						$(".videoTips").empty().css({color: "green"}).html("");
						$('#videoId').css('display', 'inline-block');
						var json = eval('(' + data.responseText + ')');
						$('#videoId').attr('src', json.videourl);
					},
					error: function(data) {
						clearOverall();
						$('#videoId').attr('src', '');
						$('#videoId').css('display', 'none');
						console.log(data);
					}
				});
			}else {
				$('#videoId').attr('src', '');
				$('#videoId').css('display', 'none');
				$(".videoTips").empty().css({
					color: "red"
				}).html("视频大小不能大于10m");
			}
		}else
		{
			$(".videoTips").empty().css({
				color: "red"
			}).html("视频格式不正确，格式应为：rmvb|avi|wmv|mpg|mp4");
		}

	});

})

function cancelAdFun(e) {
	$.ajax({
		url: 'adList.html',
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
	var imgView = $('#imageId').attr('src');
	var imgUrl = $('#url').val();
	var video=  $('#videoId').attr('src');
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
	if(imgUrl != "") {
		if(imgUrl.substr(0, 4) != "http") {
			$(".tip").empty().css({
				color: "red"
			}).html("输入地址有误，地址必须是以http开头的url");
			return false;
		}
	} else if(imgView == '') {
		$(".tip").empty().css({
			color: "red"
		}).html("请添加素材图");
		return false;
	}
	$(".tip").empty();
	var obj = {}
	if(id == 0) {
		obj = {
			token: $.cookie("token"),
			title: title,
			content: content,
			img: imgView,
			url: imgUrl,
			video:video
		}
	} else {
		obj = {
			token: $.cookie("token"),
			title: title,
			content: content,
			img: imgView,
			url: imgUrl,
			video:video,
			id: id
		}
	}
	$.ajax({
		url: commUrl + '/ad/save',
		data: obj,
		type: 'POST',
		cache: false,
		success: function(data) {
			data = eval('(' + data + ')');
			if(data.code == '1') {
				newPage();
			}else if(data.code=='-1')
			{
				$(".tip").empty().css({
					color: "red"
				}).html(data.msg);
			}
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	})
}

function newPage() {
	$.get('adList.html', {
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