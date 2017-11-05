$(document).ready(function() {
	//	getFullTime('#timeWrap')
	$(".breadcrumb").empty();
	$.ajax({
		url:commUrl+'/menu/findbyid',
		async: false,
		data: {
			token:$.cookie("token"),
			parentId:'5850c426b2a99afa74c513b8'
		},
		success: function(data){
			data = JSON.parse(data);
			//console.log(data);
			if(data.code == 1) {
				//$(".breadcrumb").empty();
				var breadcrumb = '';
				breadcrumb = '<li class="selected"><a alt="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].id+'">新增/修改素材</a></li>';
				$(".breadcrumb").html(breadcrumb);
				changeBreadcrumb();
			}
		}
	})
	if(parseInt($.cookie("read")) > 0) {
		/*$.ajax({
			url: commUrl + '/menu/findbyid',
			data: {
				token: $.cookie("token"),
				parentId: '57d21aaf240a7a19c23ccc9f'
			},
			success: function(data) {
				data = eval('(' + data + ')');
				$(".breadcrumb").empty();
				var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[2].url + '" id="' + data.data[2].id + '">' + data.data[2].name + '</a>' +
					'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl + '+' + 'add-ad.html' + '" id="' + data.data[2].parentId + '">编辑素材详情</a></li>';
				$(".breadcrumb").html(html);
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		});*/
		$.ajax({
			url: commUrl + '/ad/find',
			data: {
				token: $.cookie("token"),
				id: $.cookie('read')
			},
			cache: false,
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				data = eval('(' + data + ')');
				console.log(data)
				if(data.code == '1') {
					//              	var startTime = data.data.datas[0].startTime;
					//              	var endTime = data.data.datas[0].endTime;
					$("#title").val(data.data.datas[0].title);
					$("#content").val(data.data.datas[0].content);
					$("#url").val(data.data.datas[0].url);
					$('#imageId').attr('src', data.data.datas[0].img);
					$('#imageId').css('width', '120').css('height', '120').css('display', 'inline-block');
					if(data.data.datas[0].video)
					{
						$('#videoId').attr('src', data.data.datas[0].video);
						$('#videoId').css('width', '220').css('height', '120').css('display', 'inline-block');
					}
					
					//                  initTime(startTime,endTime);
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
	//  function initTime(startTime,endTime){
	//  	var startChild = $('#startTime').children();
	//		var endChild = $('#endTime').children();
	//		var sData= new Date(startTime)
	//		var eData= new Date(endTime)
	//		startChild[0].value=sData.getFullYear();
	//		startChild[1].value=sData.getMonth()+1;
	//		startChild[2].value=sData.getDate();
	//		startChild[3].value=sData.getHours();
	//		startChild[4].value=sData.getMinutes();
	//		endChild[0].value=eData.getFullYear();
	//		endChild[1].value=eData.getMonth()+1;
	//		endChild[2].value=eData.getDate();
	//		endChild[3].value=eData.getHours();
	//		endChild[4].value=eData.getMinutes();
	//  }
	function initAd() {
		/*$.ajax({
			url: commUrl + '/menu/findbyid',
			//type:'GET',
			//async: false,
			cache: false,
			data: {
				token: $.cookie("token"),
				parentId: '57d21aaf240a7a19c23ccc9f'
			},
			success: function(data) {
				data = eval('(' + data + ')');
				$(".breadcrumb").empty();
				var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[2].url + '" id="' + data.data[2].id + '">' + data.data[2].name + '</a>' +
					'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl + '+' + 'add-ad.html' + '" id="' + data.data[2].parentId + '">编辑素材详情</a></li>';
				$(".breadcrumb").html(html);
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		});*/
		//         var today = new Date();   
		//		   var day = today.getDate();   
		//		   var month = today.getMonth() + 1;   
		//		   var year =  today.getFullYear();
		//		   var hours=today.getHours(); 
		//		   var min = today.getMinutes()+1;
		//		   if(min>60)
		//		   {
		//		   		min=60;
		//		   }
		// 		   var date = year + "/" + month + "/" + day + " " + hours+":"+min;
		// 		   $("#startTime").val(date);
	}

	$(".file_upload").change(function() {
		var file = this.files[0];
		var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
		if(fileName == "jpg" || fileName == "jpeg" || fileName == "png" || fileName == "bmp") {
			if(file.size / 1024 < 200) {
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
								//                              if( picRealHeight == 199 && picRealWidth == 334){
								//                                  $('#imageId').show().attr('src', json.imgurl);
								//                                  $('#imageId').css('display','inline-block'); 
								//                                  $(".imgTips").empty().css({color:"green"}).html("正确");
								//                              }
								//                              else {
								//                              	$('#imageId').attr('src','');
								//	       							$('#imageId').css('display','none'); 
								//                                  $(".imgTips").empty().css({color:"red"}).html("图片宽高应为：334px*199px");
								//                              }
							});
						//$('#imageId').show().attr('src', json.imgurl);
					}
				});
			} else {
				$('#imageId').attr('src', '');
				$('#imageId').css('display', 'none');
				$(".imgTips").empty().css({
					color: "red"
				}).html("图片大小不能大于200k");
			}
		} else {
			$('#imageId').attr('src', '');
			$('#imageId').css('display', 'none');
			$(".imgTips").empty().css({
				color: "red"
			}).html("图片格式不正确，格式应为：jpg,jpeg,png,bmp");
		}
	})

	$(".choseimg input.video").change(function() {
		var file = this.files[0];
		var formData = new FormData();
		formData.append('file', file);
		var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
		if(fileName == "rmvb" || fileName == "avi" || fileName == "wmv" || fileName == "mpg" || fileName == "mp4") {
			if(file.size / 1024 < 3000) {
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
						$(".imgTips").empty().css({color: "green"}).html("");
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
				}).html("视频大小不能大于3m");
			}
		}else
		{
			$(".videoTips").empty().css({
				color: "red"
			}).html("视频格式不正确，格式应为：rmvb|avi|wmv|mpeg|mp4");
		}

	});

})
function addAPK() {
	$(".choseimg input.video").change(function() {
		var file = this.files[0];
		var formData = new FormData();
		formData.append('file', file);
		var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
		if(fileName == "rmvb" || fileName == "avi" || fileName == "wmv" || fileName == "mpg" || fileName == "mp4") {
			if(file.size / 1024 < 3000) {
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
						$(".imgTips").empty().css({color: "green"}).html("");
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
				}).html("视频大小不能大于3m");
			}
		}else
		{
			$(".videoTips").empty().css({
				color: "red"
			}).html("视频格式不正确，格式应为：rmvb|avi|wmv|mpeg|mp4");
		}

	});
}
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
		//		var startInput = $('#startTime').find('input');
		//		var endInput = $('#endTime').find('input');
		//		var endTime ='';
		//		var start=[];
		//		var end=[];
		//		
		//		startTime = startInput[0].value+"-"+startInput[1].value+"-"+startInput[2].value+" "+startInput[3].value+":"+startInput[4].value;
		//		endTime = endInput[0].value+"-"+endInput[1].value+"-"+endInput[2].value+" "+endInput[3].value+":"+endInput[4].value;
		//		for (var i =0;i<startInput.length;i++) {
		//			if(startInput[i].value=='' || parseInt(startInput[i].value)>=parseInt(startInput[i].max) || parseInt(startInput[i].value) < parseInt(startInput[i].min))
		//			{
		//				 $(".tip").empty().css({color:"red"}).html("对不起，请您输入正确的开始时间");
		//		     	 return false;
		//			}
		//		}
		//		for (var j =0;j<endInput.length;j++) {
		//			if(endInput[j].value=='' || parseInt(endInput[j].value)>=parseInt(endInput[j].max) || parseInt(endInput[j].value) < parseInt(endInput[j].min))
		//			{
		//				 $(".tip").empty().css({color:"red"}).html("对不起，请您输入正确的结束时间");
		//		     	 return false;
		//			}
		//			end.push(endInput[j].value);
		//		}
		//		var endDate = new Date(end[0], end[1]-1, end[2], end[3], end[4]);
		//		var now = new Date();
		//		if(now>endDate)
		//		{
		//			$(".tip").empty().css({color:"red"}).html("对不起，您的输入有误，结束日期不能小于当前时间");
		//	     	return false;
		//		}
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
	//		else if(startTime=='')
	//		{
	//			$(".tip").empty().css({color:"red"}).html("开始时间不能为空");
	//			return false;
	//		}else if(endTime=='')
	//		{
	//			$(".tip").empty().css({color:"red"}).html("结束时间不能为空");
	//			return false;
	//		}
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
			//          	startTime:startTime,
			//          	endTime:endTime,
			img: imgView,
			url: imgUrl,
			video:video
		}
	} else {
		obj = {
			token: $.cookie("token"),
			title: title,
			content: content,
			//          	startTime:startTime,
			//          	endTime:endTime,
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
			console.log(data);
			if(data.code == '1') {
				newPage();
			}else if(data.code == -1){
				alert(data.msg);
			}
		},
		error: function(text){
			alert('出错啦~~！');
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