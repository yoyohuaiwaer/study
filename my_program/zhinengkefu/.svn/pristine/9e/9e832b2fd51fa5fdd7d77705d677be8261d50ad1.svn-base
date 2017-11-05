/**
 * Created by A on 2016/10/17.
 */
/**
 * Created by A on 2016/10/14.
 */
//commUrl = 'http://172.16.8.230:8082/server'  //测试服务器
$(document).ready(function(){
    //http://172.16.8.230:8082/server/startlogo/find/?token=a8f76c30ca1bb915a5185d4425110a76&&cate=2
    console.log($.cookie("token"));
    console.log($(".main-title").attr("title"));
    console.log(commUrl+'/menu/findbyid');
    $.ajax({
        url:commUrl+'/menu/findbyid',
        //type:'GET',
        //async: false,
        data:{
            token:$.cookie("token"),
            parentId:$(".main-title").attr("title")
        },
        success: function(data){
            data = eval('('+data+')')
            console.log(data);
            $(".breadcrumb").empty();
            $(".breadcrumb").html('<li class="selected"><span href="javascript:void(0);" title="'+menuUrl+'loading-img.html" id="">开机画面</span></li>');
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    });
    loadImg();
    confirm();
    cancel();
});
function imgChange(){
    $(".choseimg input").change(function () {
        var file = this.files[0];
        console.log(file.size/1024);
        if(file.name = /[^\s]+\.(jpg|jpeg|png|bmp)/i){
            var formData = new FormData();
            formData.append('file1', file);
            $.ajax({
                type: "POST", //必须用post
                url: "http://112.74.14.173:8080/server/upload",
                crossDomain: true,
                jsonp: "jsoncallback",
                data: formData,
                contentType: false, //必须
                processData: false,
                //不能用success，否则不执行
                complete: function (data) {
                    var json = eval('(' + data.responseText + ')');
                    //console.log(json);
                    $('#imageId').show().attr('src', json.imgurl);
                }
            });

        }else{
            $(".imgTips").empty().css({color:"red"}).html("图片格式不正确，格式应为：jpg,jpeg,png,bmp");
        }

    });
}

function loadImg(){
    //alert("123");
    $.ajax({
        url:commUrl+'/startlogo/find/',
        data: {
            //token:'a8f76c30ca1bb915a5185d4425110a76',
            token:$.cookie('token'),
            cate:'1'
        },
        success:function(data) {
            data = JSON.parse(data);
            console.log(data);

            if(data.code == 1){
                //绑定传图片事件
                if(data.data == ''){
                    $('.preview').attr('src','http://112.74.14.173/images/1476439223226.jpg')
                    $('.confirm').attr('id','');
                }else {
                    $('.preview').attr('src',data.data.img);
                    $('.confirm').attr('id',data.data.id)
                }
                imgChange();
            }


        }
    })
}
function confirm() {
    $('.confirm').on('click',function(){
        if($('.preview').attr('src') == 'http://112.74.14.173/images/1476439223226.jpg') {
            $.ajax({
                url: commUrl+'/startlogo/save',
                type: 'POST',
                data: {
                    //token: 'a8f76c30ca1bb915a5185d4425110a76',
                    token:$.cookie('token'),
                    cate: '1',
                    img: $('#imageId').attr('src'),
                    id:$('.confirm').attr('id')
                },
                success: function (data) {
                    data = JSON.parse(data);
                    console.log(data);
                    if (data.code == 1) {
                        loadImg();
                        $('#imageId').hide();
                    }
                }
            })
        }else {
            $.ajax({
                url: commUrl+'/startlogo/save',
                type: 'POST',
                data: {
                    //token: 'a8f76c30ca1bb915a5185d4425110a76',
                    token:$.cookie('token'),
                    cate: '1',
                    img: $('#imageId').attr('src'),
                    id:$('.confirm').attr('id')
                },
                success: function (data) {
                    data = JSON.parse(data);
                    console.log(data);
                    if (data.code == 1) {
                        loadImg();
                        $('#imageId').hide();
                    }
                }
            })
        }
    })
}
function cancel(){
    //alert("取消事件")
    $('.cancel').on('click',function(){
        //alert("确定事件");
        $('#imageId').hide();
        //imgChange();
    })

}



