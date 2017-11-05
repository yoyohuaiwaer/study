﻿/**
 * Created by Administrator on 2016/9/17.
 */
/**
 * Created by A on 2016/9/7.
 */
$(document).ready(function() {
	flag = 'false';
	oncaller = '';
	connect = '';
	getIM();
	//左侧树导入
	logout();
	$(".user-name a").empty().html($.cookie("username"));
	$(".user-indrustry a").empty().html($.cookie("industry"));
	$.ajax({
		url: commUrl + '/menu/find',
		type: 'GET',
		data: {
			token: $.cookie("token")
		},
		dataType: 'json',
		async: false,
		success: function(data) {
			//alert(data);
			data = eval('(' + data + ')');
			//console.log(data);
			if(data.code == '1') {
				$('#tree-menus').empty();
				var html = '';

				$.each(data.data, function(i, key) {
					//console.log( this.menu1.name);
					var dom = '';

					if(this.menu1.id == "57d21a5a240a7a19c23ccc9e") {

						$.each(key.menu2, function(l, val) {
							if(this.view == 1) {
								dom += '<li class="node" id="' + this.id + '"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" ><a href="javascript:void(0);" title="' + menuUrl + '' + this.url + '">' + this.name + '</a></div> </div> </li>';
							}
						})
						dom += '<li class="node" id="add"> <div class="node-font"> <span class="node-icon icon-file">+</span> <div class="node-name" ><a href="javascript:void(0);" title=" ' + menuUrl + 'addfunction.html" >添加功能</a></div> </div> </li>';
					} else {
						//                  	$.each(key.menu2,function(l,val){
						//                          dom +='<li class="node" id="'+this.id+'"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" ><a href="javascript:void(0);" title="'+menuUrl+''+this.url+'">'+this.name+'</a></div> </div> </li>';
						//                      });
						$.each(key.menu2, function(l, val) {
							if(val.id == '57d21d52240a7a19c23ccca8') { //问答库关键词
								dom += '<li class="node" id="' + this.id + '"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" ><a href="javascript:void(0);" title="' + menuUrl + '' + "scene-question-list.html" + '">' + this.name + '</a></div> </div> </li>';
							} else {
								dom += '<li class="node" id="' + this.id + '"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" ><a href="javascript:void(0);" title="' + menuUrl + '' + this.url + '">' + this.name + '</a></div> </div> </li>';
							}
						});
					}
					if(dom == '') {
						html += '<li class="node" id="' + this.menu1.id + '"> <div class="node-font"> <span class="node-icon icon-file"><img src="' + this.menu1.icon + '"/></span> <div class="node-name" >' + this.menu1.name + '</div> </div></li>';
					} else {
						html += '<li class="node" id="' + this.menu1.id + '"> <div class="node-font"> <span class="node-icon icon-file"><img src="' + this.menu1.icon + '"/></span> <div class="node-name" >' + this.menu1.name + '</div> </div><ul class="tree-menus tree-meni2">' + dom + '</ul></li>';
					}

				})

				$('#tree-menu1').html(html);

			}
		},
		error: function(data, text, status) {
			alert(' 登录失败~请重新登录');
			window.location.href = menuUrl + 'index.html';
		}
	})
	//默认菜单加载
	$("#5982c7fca790de8893de73cc").addClass('node-selected');

	$(".main-title").text($(".node-selected").text()).attr({
		title: $(".node-selected").attr("id")
	});
	var nodeurl = ($(".node-selected a").attr('title')); //
	//alert(nodeurl);
	$.ajax({
		url: '' + nodeurl + '',
		type: 'GET',
		//async: false,
		success: function(data) {
			$(".main").html(data);
		},
		error: function(text) {
			alert('请重新登录');
			window.location.href = menuUrl + 'index.html';
			//          alert(text.readyState);
			//          alert(text.status+"===1");
		}
	});
	//点击菜单加载右侧内容

	$(".tree-meni2 .node").click(function() {
		if(oncaller != '') {
			alert("视频中暂时不能离开")
			return;
		}
		$(".node").removeClass("node-selected")
		$(this).addClass("node-selected");
		var selectedurl = $(this).find("a").attr("title");
		$("h2.main-title").text($(this).text()).attr({
			title: $(this).attr("id")
		});
		$.ajax({
			url: selectedurl,
			type: 'GET',
			//async: false,
			success: function(data) {
				$(".main").empty().html(data);
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		});
	});
	endcallbutn();
})
//面包屑点击
function endcallbutn() {
	$('.endcallbutn').on('click', function() {
		$('.endcall').hide();
	})
}

function changePage(e) {
	$(e).parents("ul").find("li").removeClass("selected");
	$(e).parent("li").addClass("selected");
	$.cookie("read", e.name, {
		path: '/'
	})
	$.ajax({
		url: '' + e.title + '',
		type: 'GET',
		//async: false,
		success: function(data) {

			$(".main").empty().html(data);
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	})
}

//面包屑点击
function changeBreadcrumb() {
	$('.breadcrumb li').on('click', function() {
		$('.breadcrumb li').removeClass("selected");
		$(this).addClass('selected');
		var url = $(this).find('a').attr('alt');
		//alert(url);
		$.ajax({
			url: url,
			type: 'GET',
			//async: false,
			success: function(data) {

				$(".main").empty().html(data);
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		})
	});
}

//退出登录
function logout() {
	$('.logout').on('click', function() {
		if(oncaller !== '') {
			alert('当前正在视屏通话中，请关闭通话后退出！')
			return;
		}
		$.ajax({
			url: commUrl + '/login/loginout',
			data: {
				token: $.cookie("token")
			},
			success: function(data) {
				//alert(data);
				data = JSON.parse(data);
				if(data.code == 1) {
					window.location.href = menuUrl + 'index.html'; //
					$.cookie('state', "free", {path: '/'});
					reportIMState("off", "");

				}
			}

		})
	})

}
//   创建环信连接
var conn = {};
var rtcCall = null;
var stopTimer = -1;
var windowStream;
var failedTimer = -1;
var failedNum = 10;

function rtc() {
	oncaller = '';
	if(WebIM.WebRTC) {
		rtcCall = new WebIM.WebRTC.Call({
			connection: conn,

			mediaStreamConstaints: {
				audio: true,
				video: true
			},

			listener: {
				onAcceptCall: function(from, options) {
					console.log('onAcceptCall::', 'from: ', from, 'options: ', options);
				},
				onGotRemoteStream: function(stream, streamType) {
					showIndexOverflow();
					$.ajax({
						url: 'workbench.html',
						async: false,
						datatype: 'html',
						success: function(data) {
							$(".main").empty().html(data);
							//rtcCall.acceptCall();
						}
					});
					console.log('onGotRemoteStream::', 'stream: ', stream, 'streamType: ', streamType);
					var video = document.getElementById('video');
					video.srcObject = stream;
					windowStream = stream;
				},
				onGotLocalStream: function(stream, streamType) {

					console.log('onGotLocalStream::', 'stream:', stream, 'streamType: ', streamType);
					var video = document.getElementById('localVideo');
					video.srcObject = stream;
					console.log($.cookie('iceState'));
					if($.cookie('iceState') == 'connected'){
						success();
						connect = '';
						//console.log('local OK')
					}


				},
				onRinging: function(caller) {
					console.log('onRinging::', 'caller:', caller);
					oncaller = caller.split('_')[1];
					oncaller = oncaller.split('@')[0];
				},
				onTermCall: function(reason) {
					console.log('onTermCall::');
					console.log('reason:', reason);
				},
				onIceConnectionStateChange: function(iceState) {
					console.log('onIceConnectionStateChange::', 'iceState:', iceState);
					$.cookie('iceState',iceState,{path:'/'})
					if(iceState == 'closed') {
						//alert('连接中断！');
						closeVideoPhone();
						$('.endcall').find('p').empty().text('通话结束');
						$('.endcall').show();
					}
					if(iceState == "failed") {
						if(flag == 'true'){
							$('.endcall').find('.popap p').empty().text('网络异常，连接已中断');
							$('.endcall').show();
							/*alert('网络异常，连接已中断')*/
							console.log('true')
						}else if(flag == 'false'){
							$('.endcall').find('.popap p').empty().text('网络异常，连接超时');
							$('.endcall').show();
							//alert('网络异常，连接超时');
							console.log('false');
						}
						failedNum = 10;
						if(failedTimer) {
							failedTimer = window.setInterval(failedFunc, 1000);
						}
					}

					if(iceState == "connected") {
						failedNum = 0;
						if(failedTimer) {
							clearInterval(failedTimer);
						}
						console.log(connect);
						if(connect == 'true'){
							success();
							connect='';
							console.log('ok');
						}
					}
				},
				onError: function(e) {
					if(e.name == 'NotFoundError') {
						closeVideoPhone();
						rtcCall.endCall();
						alert('检测到本地没有摄像头，无法接通视频');
					}
				}
			}
		});
	} else {
		console.warn('不能进行视频通话！您的浏览器不支持webrtc或者协议不是https。')
	}
}

function failedFunc() {
	if(failedNum > 0) {
		failedNum--;
	}
	if(failedNum <= 0) {
		clearInterval(failedTimer);
		rtcCall.endCall();
		closeVideoPhone();
		//$('.endcall').show();
	}
}

function addHX(data) {
	conn = new WebIM.connection({
		isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
		https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
		url: WebIM.config.xmppURL,
		heartBeatWait: WebIM.config.heartBeatWait,
		autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
		autoReconnectInterval: WebIM.config.autoReconnectInterval,
		apiUrl: WebIM.config.apiURL,
		isHttpDNS: WebIM.config.isHttpDNS,
		isWindowSDK: WebIM.config.isWindowSDK,
		isAutoLogin: true,
		encrypt: WebIM.config.encrypt,
		delivery: WebIM.config.delivery
	});
	//使用用户名/密码登录环信 Web IM:
	var options_dl = {
		apiUrl: WebIM.config.apiURL,
		user: data.data.username,
		pwd: data.data.password,
		appKey: WebIM.config.appkey
	};
	conn.open(options_dl);

}

function getIM() {
	$.ajax({
		url: commUrl + '/user/getIMUser',
		data: {
			token: $.cookie("token")
		},
		success: function(data) {
			console.log(data);
			data = JSON.parse(data);
			if(data.code == 1) {
				$.cookie('IMusername', data.data.username, {
					path: '/'
				});
				$.cookie('IMpassword', data.data.password, {
					path: '/'
				});
				addHX(data);
				$.cookie('line', "on", {
					path: '/'
				});
				$.cookie('state', "free", {
					path: '/'
				});
				reportIMState("on", "free");
				onConfirmIndex();
				onCancelIndex();
				rtc();
			}
			if(data.code == '-1') {
				alert(data.msg + " 请重新登录")
			}
		},
		error: function(text) {
			alert('IM账号登录失败');
		}

	})
}

function reportIMState(oline, ostate) {
	$.ajax({
		url: commUrl + '/user/reportIMState',
		data: {
			token: $.cookie("token"),
			line: oline,
			state: ostate
		},
		type: 'POST',
		success: function(data) {
			console.log(data);
			data = eval('(' + data + ')');
			if(data.code == "1") {
				$.cookie('line', oline, {
					path: '/'
				});
				$.cookie('state', ostate, {
					path: '/'
				});
				console.log($.cookie('state')+"==========$.cookie('state')")
			}
			if(data.code == '-1') {
				alert(data.msg + " 请重新登录")
			}
		},
		error: function(text) {
			console.log(text);
		}

	})
}
//客服收到来电播放铃声
function showIndexOverflow() {
	$(".overallIndex").show();
	if($('.phoneAudio')[0].paused) {
		$('.phoneAudio')[0].play();
	}
};
function success(){
	flag = 'true'
	$('#video').show();
	$(".overallIndex").hide();
	Timer();
	$('.unicom').show();
	var mesage = oncaller + '已接通'
	$('.ulink').html(mesage);
	$('#sendMessage').removeAttr('readonly');
	$('.phoneAudio')[0].pause();
	reportIMState("on", "busyness");
	$('#onlineStstus').attr('disabled', true);
	$("#workStatus").attr('disabled', true);
	$("#workStatus").children('option[value="busyness"]').attr("selected", true);
	$.cookie('state', "busyness", {
		path: '/'
	});
	$.ajax({
		url: commUrl + '/qaRecord/byim',
		data: {
			token: $.cookie('token'),
			imuser: oncaller
		},
		success: function(data) {
			data = JSON.parse(data);
			var html = ''
			if(data.code == 1) {
				html = '<div class="talkingLeft"> <div class="tallimg"> <img src="images/sanbot.png" alt=""> </div> <div class="tallkingText"> </div> </div>';
				$('.talkingBox').empty().html(html);
			}
			if(data.code == '-1') {
				alert(data.msg)
			}
		},
		error: function() {
			alert('出错啦~~')
		}

	});
}
function onConfirmIndex() {
	$(".onConfirm").on('click', function() {
		rtcCall.acceptCall();
		$(".overallIndex").hide();
		connect = 'true';
	})
}

function onCancelIndex() {
	$(".onCancel").on('click', function() {
		rtcCall.endCall();
		$(".overallIndex").hide();
		//closeVideoPhone();
	})
}

function closeVideoPhone() {
	console.log(flag);
	failedNum = 0;
	if(failedTimer) {
		clearInterval(failedTimer);
	}
	if(flag == 'true') {
		$('#video').hide();
		$('.unicom').hide();
		if(stopTimer) {
			clearInterval(stopTimer);
		}
		//$('.movement').hide();
		flag = 'false';
		$('#onlineStstus').attr('disabled', false);
		$("#workStatus").attr('disabled', false);
	} else {
		if($('.phoneAudio') && $('.phoneAudio')[0]) {
			$('.phoneAudio')[0].pause();
		}
		$(".overallIndex").hide();

	}
	reportIMState("on", "free")
	$.cookie('state', "free", {
		path: '/'
	});
	$("#workStatus").children('option').attr("selected", false)
	$("#workStatus").children('option[value="free"]').attr("selected", true);
	oncaller = '';

}