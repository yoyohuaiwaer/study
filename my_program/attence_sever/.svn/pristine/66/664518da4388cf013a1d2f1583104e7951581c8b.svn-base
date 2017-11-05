/**
 * Created by A on 2017/6/22.
 */
/**
 * Created by A on 2017/3/27.
 */
$(document).ready(function() {
    //面包屑加载
   /* $(".breadcrumb").empty();
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
    loadApp();
    var href = excelUrl+"/excel/members.xlsx";
    $(".downLoad").attr("href",href); //下载模板    //loadSecene()
    onFile();

});

function loadApp(){
    $.ajax({
        url: commUrl + '/user/userList',
        //type: 'POST',
        cache: false,
        async: false,
        data: {
            token: $.cookie("token")
        },
        //dataType: 'json',
        //contentType: 'application/json; charset=UTF-8',
        success: function(data) {
            data = eval('(' + data + ')');
            if(data.code == '1') {
                /*if(data.data.length > 1){
                    var str = ''
                    //str = '<option value="">选择公司</option>';
                    $.each(data.data,function(i,key){
                        str +='<option value="'+key.id+'">'+key.nick+'</option>'
                    });
                    $('#producer').html(str).show();
                }*/
                var str = '';
                $.each(data.data,function(i,key){
                    str +='<option value="'+key.id+'">'+key.nick+'</option>'
                });
                if(data.data.length == 1){
                    $('#producer').html(str);
                }else {
                    $('#producer').html(str).show();
                }




            }
        },
        error: function(text){

        }
    })
}


/*function loadSecene() {
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
 }*/

//上传
function onFile() {
    /*$(".onfile").click(function() {
     var scen = $("#scene").children("option:selected").attr("value");
     if(scen == undefined) {
     $('.errorTips').css('display', 'inline-block');
     $(".showTips").empty().html("请选择场景");
     return false;
     }
     })*/
    $(".onfile").change(function() {
        var _meid = $('#producer').children('option:selected').attr('value');;
        var file = this.files[0];
        if(file == undefined) {
            return;
        }
        var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
        if(fileName == "xlsx" || fileName == "xlsm" || fileName == "xltx" || fileName == "xltm" || fileName == "xls") {
            if(file.size / 1024 < 1000) {
                $(".urlTxt").val(file.name)
                var formData = new FormData();
                formData.append('import_file', file);
                formData.append("meid", _meid);
                //formData.append("industry", $.cookie("industry"));
                //var Mcommurl = 'http://119.23.130.250:8066/qh_attendance_server';
                $.ajax({
                    type: "POST",
                    url: commUrl + "/employee/importEmployee?token=" + $.cookie("token"),//+'&meid='+_meid,
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: formData,
                    complete: function(data) {
                        var obj = eval('(' + data.responseText + ')');
                        var msg = obj.msg;
                        console.log(obj);
                        debugger;
                        if(obj.code == -1006){
                            $(".showTips").empty().html(msg);
                            $.ajax({
                                url:'memebersList.html',
                                cache:false,
                                datatype:'html',
                                success:function(data){
                                    $(".main").empty().html(data);
                                }
                            })
                        }else {
                            if(obj.successNumber > 0) {
                                $('.successTips').css('display', 'inline-block');
                                $('.errorTips').css('display', 'none');
                                if(obj.errorNumber > 0) {
                                    msg += ',成功通过验证' + obj.successNumber + '条,失败' + obj.errorNumber + '条,详情请下载并查看' + '<a download href='+obj.errorExcelUrl+'>上传结果</a>'
                                }
                            } else{
                                $('.errorTips').css('display', 'inline-block');
                                $('.successTips').css('display', 'none');
                                msg += '<a download href='+obj.errorExcelUrl+'>上传结果</a>';
                            }
                            //console.log(obj)
                            $(".showTips").empty().html(msg);
                        }

                    },
                    error: function(text) {
                        alert('出错啦~~！');
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
