/**
 * Created by A on 2016/9/23.
 */

function newPage(){
    $.get('commodityList.html','',function(response){
        $(".main").empty().html(response);
    })
};


function submitGoods(e){
    var flag=true;
    var name=$("#name").val().length;
    var unit=$("#unit").val().length;
    var price=$("#price").val().length;
    var desc=$("#desc").val().length;
    if(name>0 && name <=6 && unit <=2 && price > 0 && desc> 0 && desc <= 26){
        $.ajax({
            url:commUrl+'/item',
            data:{token:$.cookie("token"),
                name:$("#name").val(),
                unit:$("#unit").val(),
                price:$("#price").val(),
                icon:$("#imageId").attr("src"),
                desc:$("#desc").val(),
                state:$('input[name="state"]:checked').val()},
            type:'POST',
            success: function(data){
                //console.log(data);
                data = eval('('+data+')');
                if(data.code == '1'){
                    newPage();
                }
            }
        })
    }else {
        $(".tips5").empty().css({color:"red"}).html("请参考错误提示");
    }

}
//校验
function blur(id,html,unit,tips) {
    $(id).blur(function(){
        if($(this).val() == ''){
            $(this).next("span").empty().css({color:"red"}).html(html);
        }else{
           // alert(unit);
           // alert($(this).val().length);
            if($(this).val().length >0 && $(this).val().length <= unit ){
                $(this).next("span").empty().html("正确");
            }else{
                $(this).next("span").empty().css({color:"red"}).html(tips);
            }
        }

    })
}
blur("#name","商品名称不能为空",6,"商品名称最多为6个字");
blur("#unit","单位不能为空",2,"单位为：份,斤");
blur("#price","单位不能为空",'','');
blur("#desc","菜品介绍不能为空",26,"菜品介绍最多26个字");

function editSubmit(e) {
    $.ajax({
        url:commUrl+'/item_'+$.cookie("itemId"),
        data:{token:$.cookie("token"),
            meid: $.cookie("meid"),
            name:$("#name").val(),
            unit:$("#unit").val(),
            price:$("#price").val(),
            icon:$("#imageId").attr("src"),
            desc:$("#desc").val(),
            state:$('input[name="state"]:checked').val()
        },
        type:'POST',
        success: function(data){
           // console.log(data);
            data = eval('('+data+')');
            //alert(data.msg);
            if(data.code == '1'){
                newPage();
            }
        }
    })
}
$(".choseimg input").change(function () {
    var file = this.files[0];
    //console.log(file);
    console.log(file.size/1024);
    if(file.name = /[^\s]+\.(jpg|jpeg|png|bmp)/i){
        if(file.size/1024  < 300){
            var formData = new FormData();
            formData.append('file1', file);
            $.ajax({
                type: "POST", //必须用post
                url: imgUrl,
                crossDomain: true,
                jsonp: "jsoncallback",
                data: formData,
                contentType: false, //必须
                processData: false,
                //不能用success，否则不执行
                complete: function (data) {
                    var json = eval('(' + data.responseText + ')');

                    $('#imageId').attr('src', json.imgurl);
                    //alert(json.result);
                    var img = $("#imageId"); //获取img元素
                    var picRealWidth , picRealHeight;
                    $("<img>") // 在内存中创建一个img标记
                        .attr("src", $(img).attr("src"))
                        .load(function() {
                            picRealWidth = this.width;
                            picRealHeight = this.height;
                            if( picRealHeight < 214 && picRealWidth < 307){
                                $('#imageId').show().attr('src', json.imgurl);
                                $(".imgTips").empty();
                            }
                            else {
                                $(".imgTips").empty().css({color:"red"}).html("图片或者高度不符合");
                            }
                        });
                    /*alert(picRealHeight);
                    alert(picRealWidth);*/

                }
            });
        }else {
            $(".imgTips").empty().css({color:"red"}).html("图片大于300k");

        }
    }else{
        $(".imgTips").empty().css({color:"red"}).html("图片格式不正确，格式应为：jpg,jpeg,png,bmp");
    }

});
function resetGoods(e){
    $.ajax({
        url:'commodityList.html',
        datatype:'html',
        success:function(data){
            $(".main").empty().html(data);
        }
    })
}
