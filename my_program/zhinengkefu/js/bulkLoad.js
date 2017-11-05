$(document).ready(function() {
	//面包屑加载
	/*$(".breadcrumb").empty();
	$.ajax({
		url: commUrl + '/menu/findbyid',
		data: {
			token: $.cookie("token"),
			parentId: "57d21aaf240a7a19c23ccc9f"
		},
		cache: false,
		success: function(data) {
			data = eval('(' + data + ')')
			$(".breadcrumb").html('<li class="selected"><span href="javascript:void(0);" title="' + menuUrl + '' + data.data[2].url + '" id="' + data.data[2].parentId + '">' + data.data[2].name + '</span></li>');
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});*/
	var html = '<li><a class="" alt="scene-question-list.html" id="57d21d52240a7a19c23ccca8">问答管理</a></li><li class="selected"><span href="javascript:changePage(this);" title="bulkLoad.html" id="">批量上传</span></li>'
	$(".breadcrumb").empty().html(html);
	changeBreadcrumb()
	var href = excelUrl+"/excel/template.xlsx";
	$(".downLoad").attr("href",href); //下载模板
	loadSecene()
	onFile();
});

function loadSecene() {
	$.ajax({
		url: commUrl + '/scene',
		data: {
			token: $.cookie("token")
		},
		dataType: 'json',
		async: false,
		success: function(response) {
			response = eval('(' + response + ')')
			var html = '<option class="answerList">' + '请选择场景' + '</option>';
			if(response.code == '1') {
				$.each(response.data, function(i, key) {
					html += '<option value=' + key.name + '  title=' + key.industry + ' >' + key.name + '</option>'
				})
			}
			$("#scene").html(html);
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	})
}

//上传
function onFile() {
	$(".onfile").click(function() {
		var scen = $("#scene").children("option:selected").attr("value");
		if(scen == undefined) {
			$('.errorTips').css('display', 'inline-block');
			$(".showTips").empty().html("请选择场景");
			return false;
		}
	})
	$(".onfile").change(function() {
		var scen = $("#scene").children("option:selected").attr("value");
		if(scen != undefined) {
			$('.errorTips').css('display', 'none');
		}
		var file = this.files[0];
		if(file == undefined) {
			return;
		}
		var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
		if(fileName == "xlsx" || fileName == "xlsm" || fileName == "xltx" || fileName == "xltm" || fileName == "xls") {
			if(file.size / 1024 < 1000) {
				$('.overall').show();
				$(".urlTxt").val(file.name)
				var formData = new FormData();
				formData.append('qa_file', file);
				formData.append("scene", scen);
				formData.append("industry", $.cookie("industry"));
				$.ajax({
					type: "POST",
					url: commUrl + "/qa_import?token=" + $.cookie("token"),
					cache: false,
					contentType: false,
					processData: false,
					data: formData,
					complete: function(data) {
						var obj = eval('(' + data.responseText + ')');
						var msg = obj.msg;
						if(obj.successNumber > 0) {
							if(obj.errorNumber > 0) {
								msg += ',成功通过验证' + obj.successNumber + '条,失败' + obj.errorNumber + '条,详情请下载并查看' + '<a download href=' + obj.errorExcelUrl + '>上传结果</a>'
							}
							$('.successTips').show();
							$('.errorTips').hide();
							//debugger;
						} else {
							$('.errorTips').show();
							$('.successTips').hide();
							//debugger
						}
						console.log(obj)
						$(".showTips").empty().html(msg);
						$('.overall').hide();
					},
					error: function(text) {
						alert(text.readyState);
						alert(text.status);
					}
				});
			} else {
				$('.errorTips').css('display', 'inline-block');
				$('.successTips').css('display', 'none');
				$(".showTips").empty().html("文件过大？");
			}
		} else {
			$('.errorTips').css('display', 'inline-block');
			$('.successTips').css('display', 'none');
			$(".showTips").empty().html("请上传EXCEL表格类型的文件");
		}
	})
}
