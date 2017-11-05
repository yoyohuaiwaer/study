/**
 * Created by A on 2016/10/14.
 */
//commUrl = 'http://172.16.8.230:8082/server/'  //测试服务器
$(document).ready(function() {
	//http://172.16.8.230:8082/server/startlogo/find/?token=a8f76c30ca1bb915a5185d4425110a76&&cate=2
	/*$.ajax({
		url: commUrl + '/menu/findbyid',
		//type:'GET',
		//async: false,
		data: {
			token: $.cookie("token"),
			parentId: $(".main-title").attr("title")
		},
		success: function(data) {
			data = eval('(' + data + ')')
				//console.log(data);
			$(".breadcrumb").empty();
			$(".breadcrumb").html('<li class="selected"><span href="javascript:void(0);" title="' + menuUrl + 'logo-upload.html" id="">基础信息设置</span></li>');
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});*/
	loadImg();
	confirm();
	imgChange();
	//confirmTime();
	//cancel();
	//cancel();
});


function imgChange() {
	$(".change input").change(function() {
		var file = this.files[0];
		//console.log(file.size/1024);
		if(file.name = /[^\s]+\.(jpg|jpeg|png|bmp)/i) {
			if(file.size / 1024 < 300) {
				var formData = new FormData();
				formData.append('file1', file);
				showOverall();
				$.ajax({
					type: "POST", //必须用post
					url: imgUrl,
					crossDomain: true,
					jsonp: "jsoncallback",
					data: formData,
					contentType: false, //必须
					processData: false,
					//不能用success，否则不执行
					complete: function(data) {
						var json = eval('(' + data.responseText + ')');
						$('#imageId').attr('src', json.imgurl);
						var img = $("#imageId"); //获取img元素
						var picRealWidth, picRealHeight;
						$("<img>")// 在内存中创建一个img标记0.
							.attr("src", $(img).attr("src"))
							.load(function() {
								picRealWidth = this.width;
								picRealHeight = this.height;
								$('.preview').show().attr('src', json.imgurl);
								clearOverall();
								/*if(picRealHeight <= 168 && picRealWidth <= 59) {

									/!*$(".imgTips").empty().css({
										color: "green"
									}).html("正确");*!/
								} else {
									$(".imgTips").empty().css({
										color: "red"
									}).html("图片宽高分别为：1900px*1200px");
								}*/
							});
						//console.log(json);
						//$('#imageId').show().attr('src', json.imgurl);
					}
				});
			} else {
				$(".imgTips").empty().css({
					color: "red"
				}).html("图片大小不能大于300k");
			}
			//if(file.name )

		} else {
			$(".imgTips").empty().css({
				color: "red"
			}).html("图片格式不正确，格式应为：jpg,jpeg,png,bmp");
		}

	});
	$(".change1 input").change(function() {
		var file = this.files[0];
		//console.log(file.size/1024);
		if(file.name = /[^\s]+\.(jpg|jpeg|png|bmp)/i) {
			if(file.size / 1024 < 1000) {
				var formData = new FormData();
				formData.append('file1', file);
				showOverall();
				$.ajax({
					type: "POST", //必须用post
					url: imgUrl,
					crossDomain: true,
					jsonp: "jsoncallback",
					data: formData,
					contentType: false, //必须
					processData: false,
					//不能用success，否则不执行
					complete: function(data) {
						var json = eval('(' + data.responseText + ')');
						$('#imageId1').attr('src', json.imgurl);
						var img = $("#imageId1"); //获取img元素
						var picRealWidth, picRealHeight;
						$("<img>")// 在内存中创建一个img标记0.
							.attr("src", $(img).attr("src"))
							.load(function() {
								picRealWidth = this.width;
								picRealHeight = this.height;
								$('.preview1').show().attr('src', json.imgurl);
								clearOverall();
								/*if(picRealHeight <= 168 && picRealWidth <= 59) {

								 /!*$(".imgTips").empty().css({
								 color: "green"
								 }).html("正确");*!/
								 } else {
								 $(".imgTips").empty().css({
								 color: "red"
								 }).html("图片宽高分别为：1900px*1200px");
								 }*/
							});
						//console.log(json);
						//$('#imageId').show().attr('src', json.imgurl);
					}
				});
			} else {
				$(".imgTips1").empty().css({
					color: "red"
				}).html("图片大小不能大于1M");
			}
			//if(file.name )

		} else {
			$(".imgTips1").empty().css({
				color: "red"
			}).html("图片格式不正确，格式应为：jpg,jpeg,png,bmp");

		}

	});
}

function clearOverall() {
	$(".overall").hide();
}
function showOverall() {
	$(".overall").show();
}
function loadImg() {
	//alert("123");
	$.ajax({
		url: commUrl + '/user/getInfo',
		type:'POST',
		cache: false,
		data: {
			token: $.cookie('token'),
			//token:'e34bba5afd3ab4db657c0881340c2561'
		},
		success: function(data) {
			data = JSON.parse(data);
			if(data.code == 1) {
				//绑定传图片事件
				if(data.data == '') {
					$('.preview').attr('src', 'http://172.16.8.230:8082/server_cs/images/none.jpg');
					$('.preview1').attr('src', 'http://172.16.8.230:8082/server_cs/images/bootLogo.jpg');
					$('.confirm').attr('id', '');
				} else {
					$('#corporationName').val(data.data.corporationName);
					$('#leadingWords').val(data.data.leadingWords);
					$('.confirm').attr('id', data.data.id);
					$('#successPrompt').val(data.data.successPrompt);
					$('#failPrompt').val(data.data.failPrompt);
					//successPrompt
					if(data.data.bootLogo == undefined){
						$('.preview1').attr('src', 'http://172.16.8.230:8082/server_cs/images/bootLogo.jpg');
					}else {
						$('.preview1').attr('src', data.data.bootLogo).show();
					}
					if(data.data.logoUrl == undefined){
						$('.preview').attr('src', 'http://172.16.8.230:8082/server_cs/images/none.jpg');
					}else {
						$('.preview').attr('src', data.data.logoUrl).show();
					}

					//$('.preview1').attr('src', data.data.bootLogo);
				}
				imgChange();
			}

		}
	})
}

function confirm() {
	$('.confirm').on('click', function() {
		var obj = {
			token: $.cookie('token'),
			corporationName: $('#corporationName').val(),
			leadingWords: $('#leadingWords').val(),
			logoUrl: $('.preview').attr('src'),
			successPrompt: $('#successPrompt').val(),
			failPrompt: $('#failPrompt').val(),
			bootLogo: $('.preview1').attr('src')
		}
		if($(this).attr('id') == '') {
			obj.id = $('.confirm').attr('id');
		}
		$.ajax({
			url: commUrl + '/user/editInfo',
			type: 'POST',
			data: obj,
			success: function(data) {
				data = JSON.parse(data);
				if(data.code == 1) {
					loadImg();
					$('#imageId').hide().attr({
						src: ''
					});
					$('#imageId1').hide().attr({
						src: ''
					});
					$(".imgTips").empty().css({
						color: "#333"
					}).html("图片格式为jpg|jpeg|png|bmp 小于100k且宽高为1920px*1200px");
					$(".imgTips1").empty().css({
						color: "#333"
					}).html("图片格式为jpg|jpeg|png|bmp 小于100k且宽高为80px*80px");
					alert("保存成功");
				}
			}
		})
	})
}

function cancel() {
	//alert("取消事件")
	/*$('.cancel').on('click', function() {
		//alert("确定事件");
		$('#imageId').hide().attr({
			src: ''
		});
		$('#imageId1').hide().attr({
			src: ''
		});
		//imgChange();
	})*/

}