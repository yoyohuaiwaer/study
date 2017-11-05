$(document).ready(function() {
	if(parseInt($.cookie("read")) > 0) {
		$.ajax({
			url: commUrl + '/menu/findbyid',
			data: {
				token: $.cookie("token"),
				parentId: '58462023b2a99afa74c51396'
			},
			success: function(data) {
				data = eval('(' + data + ')');
				$(".breadcrumb").empty();
				var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[0].url + '" id="' + data.data[0].id + '">' + data.data[0].name + '</a>' +
					'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl + '' + 'addMembers.html' + '" id="' + data.data[0].parentId + '">编辑会员详情</a></li>';
				$(".breadcrumb").html(html);
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		});
		$.ajax({
			url: commUrl + '/member/memberList',
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
					$.each(data.data.datas, function(i, key) {

						if(key.id == $.cookie('read')) {
							createTime = key.createTime
							$('#memId').html(key.memberNo);
							$('#tel').val(key.phone);
							$('#name').val(key.name);
							$('#category').val(key.category);
							$('#identity').val(key.identity);
							$("#testSelect").find("option[value='" + key.memberType + "']").attr({
								selected: "selected"
							});
							$("#sex").find("input[value='" + key.sex + "']").attr({
								checked: "checked"
							});
							if(key.faceUrls)
							{
								for(var i = 0; i < key.faceUrls.length; i++) {
									var curID = "imageStr" + (i);
									var layerId = "layer"+ i;
									document.getElementById(curID).src = key.faceUrls[i];
									document.getElementById(curID).style.display = 'inline-block';
									document.getElementById(layerId).style.display = 'inline-block';
								}
							}
							
							if(key.vprUrls)
							{
								for(var i = 0; i < key.vprUrls.length; i++) {
									document.getElementById("audioId").src = key.vprUrls[i];
									document.getElementById("audioId").style.display = 'inline-block';
								}
							}
							
						}

					});
				}
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		})
	} else {
		getMemId();
		initAd();
	}

	function getMemId() {
		$.ajax({
			url: commUrl + '/member/getMemberNo',
			data: {
				token: $.cookie("token")
			},
			cache: false,
			type: 'GET',
			success: function(data) {
				$("#memId").html(data);
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		})
	}

	function initAd() {
		$.ajax({
			url: commUrl + '/menu/findbyid',
			cache: false,
			data: {
				token: $.cookie("token"),
				parentId: '58462023b2a99afa74c51396'
			},
			success: function(data) {
				data = eval('(' + data + ')');
				$(".breadcrumb").empty();
				var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[0].url + '" id="' + data.data[0].id + '">' + data.data[0].name + '</a>' +
					'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl + '' + 'addMembers.html' + '" id="' + data.data[0].parentId + '">编辑会员详情</a></li>';
				$(".breadcrumb").html(html);
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		});
	}
	//音频
	$(".changeAudio input").change(function() {
		var file = this.files[0];
		if(file == undefined) {
			return;
		}
		var formData = new FormData();
		formData.append('file', file);
		var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
		if(fileName == "wav") {
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
						$('#audioId').css('display', 'inline-block');
						clearOverall();
						var json = eval('(' + data.responseText + ')');
						$('#audioId').attr('src', json.videourl);
					},
					error: function(data) {
						clearOverall();
						$('#audioId').attr('src', '');
						$('#audioId').css('display', 'none');
						console.log(data);
					}
				});
			} else {
				$('#audioId').attr('src', '');
				$('#audioId').css('display', 'none');
				$(".audioTips").empty().css({
					color: "red"
				}).html("音频大小不能大于3m");
			}
		} else {
			$(".audioTips").empty().css({
				color: "red"
			}).html("音频格式不正确，格式应为：wav");
		}

	});

	//图片
	$(".changeImg input").change(function() {
		var imgList = checkImgLength();
		
		var filesList = this.files;
		if(filesList.length > 5) {
			$(".tip").empty().css({
				color: "red"
			}).html("最多可以上传5张图片");
			return false;
		}
		var curIndex = 0;
		var isHasDel =false;
		var realList = [];
		for(var imgI = 0;imgI<imgList.length;imgI++)
		{
			if(imgList[imgI]==" ")
			{
				isHasDel = true;
				curIndex = imgI;
			}else{
				realList.push(imgList[imgI])
			}
		}
		if(realList.length >= 5) {
			$(".tip").empty().css({
				color: "red"
			}).html("最多可以上传5张图片");
			return false;
		}
		if (curIndex==0 && !isHasDel) {
			curIndex = imgList.length;
		} 
		for(var i = 0; i < filesList.length; i++) {
			loadImg(filesList[i])
		}
		function loadImg(file) {
			var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
			if(fileName == "jpg" || fileName == "jpeg" || fileName == "png" || fileName == "bmp") {
				if(file.size / 1024 < 2000) {
					showOverall();
					var formData = new FormData();
					formData.append('file1', file);
					var curID = "imageStr" + curIndex;
					var layerId = "layer"+ curIndex;
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
							document.getElementById(curID).src = json.imgurl;
							document.getElementById(layerId).src = "images/delected.png";
							//$('imageStr'+curID).attr('src', json.imgurl);
							var img = document.getElementById(curID); //获取img元素
							var picRealWidth, picRealHeight;
							$("<img>") // 在内存中创建一个img标记
								.attr("src", $(img).attr("src"))
								.load(function() {
									picRealWidth = this.width;
									picRealHeight = this.height;
									$(".imgTips").empty().css({
										color: "green"
									}).html("");
									document.getElementById(curID).src = json.imgurl;
									document.getElementById(curID).style.display = 'inline-block';
									document.getElementById(layerId).style.display = 'inline-block';
									clearOverall();
								});
							
						}
					});
				} else {
					clearOverall();
					if(document.getElementById(curID))
					{
						document.getElementById(curID).src = "";
						document.getElementById(curID).style.display = 'none';
						document.getElementById(layerId).style.display = 'none';
					}
					$(".imgTips").empty().css({
						color: "red"
					}).html("图片大小不能大于2M");
				}
			} else {
				if(document.getElementById(curID)) {
					document.getElementById(curID).src = "";
					document.getElementById(curID).style.display = 'none';
					document.getElementById(layerId).style.display = 'none';
				}
				$(".imgTips").empty().css({
					color: "red"
				}).html("图片格式不正确，格式应为：jpg,jpeg,png,bmp");
			}
		}

	});

})

function cancelAdFun(e) {
	$.ajax({
		url: 'membersList.html',
		datatype: 'html',
		cache: false,
		success: function(data) {
			$(".main").empty().html(data);
		}
	})
}

function addAdFun(e) {
	var memNo = $('#memId').html();
	var mphone = $('#tel').val();
	var mname = $('#name').val();
	var msex = $("input[name='sex']:checked").val();
	var mmemberType = $('#testSelect option:selected').val()
	var id = $.cookie('read');
	var maudio = [];
	var  bbb  = $('#identity').val();
	if($('#audioId').attr('src') != undefined) {
		maudio.push($('#audioId').attr('src'))
	}
	var imgArr = [];
	$('.imageBox .photo').each(function() {
		var src = $(this).attr('src');
		if(src != ""&& src!=" ") {
			imgArr.push(src)
		}
	})
	if(mname == '') {
		$(".tip").empty().css({
			color: "red"
		}).html("请添加姓名");
		return false;
	}
	if(imgArr.length <= 0) {
		$(".tip").empty().css({
			color: "red"
		}).html("请添加会员相片");
		return false;
	}

	$(".tip").empty();
	var obj = {}
	if(id == 0) {
		obj = {
			memberNo: memNo,
			phone: mphone,
			name: mname,
			sex: msex,
			memberType: mmemberType,
			vprUrls: maudio,
			category:$('#category').val(),
			identity:$('#identity').val(),
			faceUrls: imgArr
		}
	} else {
		obj = {
			memberNo: memNo,
			phone: mphone,
			name: mname,
			sex: msex,
			memberType: mmemberType,
			vprUrls: maudio,
			faceUrls: imgArr,
			id: id,
			category:$('#category').val(),
			identity: $('#identity').val(),
			createTime:createTime
		}
	}
	$.ajax({
		url: commUrl + '/member/updateMember?token=' + $.cookie("token"),
		type: 'POST',
		cache: false,
		data: JSON.stringify(obj),
		dataType: 'json',
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
	$.get('membersList.html', {
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

function checkImgLength() {
	var imgList = [];
	$('.imageBox .photo').each(function() {
		var src = $(this).attr('src');
		if(src != "") {
			imgList.push(src)
		}
	})
	return imgList;
}
function delcfm(e){
	var list = checkImgLength();
	var curImg = $(e).parent().find("img")
	curImg.css("display","none")
	$('.imageBox .photo').each(function(i,key) {
		if(i ==$(e).attr('title') )
		{
			var src = $(this).attr('src');
		}
	})
	
	curImg.attr('src', " ");
	list = checkImgLength();
}
