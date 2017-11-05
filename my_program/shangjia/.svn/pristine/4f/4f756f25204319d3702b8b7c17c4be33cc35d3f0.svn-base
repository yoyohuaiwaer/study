$(document).ready(function() {
	$.ajax({
		url: commUrl + '/menu/findbyid',
		data: {
			token: $.cookie("token"),
			parentId: $(".main-title").attr("title")
		},
		success: function(data) {
			data = eval('(' + data + ')')
				//console.log(data);
			$(".breadcrumb").empty();
			$(".breadcrumb").html('<li class="selected"><span href="javascript:void(0);" title="' + menuUrl + 'wakeUpWord.html" >唤醒词设置</span></li>');
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});
	initModel();
	confirm();
	cancel();
});
function initModel(){
	$.ajax({
					url: commUrl + '/wake/find',
					type: 'get',
					data: {
						token: $.cookie("token")
					},
					success: function(data) {
						data = JSON.parse(data);
						$("#face").val(data.data.face)
						$("#lbs").val(data.data.lbs)
						ID = data.data.id;
					}
				})
}
function confirm() {
	$('.confirm').on('click', function() {
		
		$.ajax({
			url: commUrl + '/wake/save?timestamp=' + new Date().getTime(),
			data: {
				token: $.cookie("token"),
				face:$("#face").val(),
				lbs:$("#lbs").val(),
				id:ID
			},
			cache: false,
			type: 'post',
			dataType: 'json',
			success: function(data) {
				data = eval('(' + data + ')');
				alert('保存成功')
			},
			error: function(text) {
				alert(text.readyState);
				alert(text.status);
			}
		})
	})
}

function cancel() {
	$('.cancel').on('click', function() {
	})

}