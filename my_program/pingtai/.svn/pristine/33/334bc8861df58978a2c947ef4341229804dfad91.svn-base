/**
 * Created by A on 2017/4/13.
 */
$(document).ready(function(){
    loadTags();
    $.ajax({
        url:commUrl+'/menu/findbyid',
        data:{
            token:$.cookie("token"),
            parentId:'58f461f03c9e9c3c425683cb'
        },
        success: function(data){
            data = eval('('+data+')');
            if(data.code == '1'){
                $(".breadcrumb").empty();
                var breadcrumb = '<li><a alt="courseware-list.html" id="58f461763c9e9c3c425683c8">课件管理</a></li><li><a  alt="column-list.html" id="58f461f03c9e9c3c425683cb">栏目管理</a></li><li class = "selected" ><a alt="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].id+'">'+data.data[0].name+'</a></li>';
                $(".breadcrumb").html(breadcrumb);
                changeBreadcrumb();
            }
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    });
    if($.cookie('column-id') !==''){
        $('.Confirm').attr({'data-id': $.cookie('column-id')});
        loadDetails();
    }
    selectList();
    columnConfirm();
    cancel();
})
function loadDetails(){
    $.ajax({
        url:commUrl+'/coursewareLabel',//替换接口
        type:'GET',
        data:{
            token: $.cookie('token'),
            columnId: $.cookie('column-id')
        },
        cache:false,
        success: function(data){
            data = eval('('+data+')');
            if(data.code == '1'){
                data = data.data
                $('#tagsType').val(data.columnName).attr({'data-time':data.createTime});
                $('#columnDesc').val(data.desc);
                $.each(data.labels,function(i,key){
                    $('.selectOption input[type="checkbox"]').each(function(){
                        if($(this).attr('value') == key.id){
                            $(this).prop( "checked", true );
                        }
                    })
                })
            }


        },
        error: function(text){
            console.log(text.readyState);
            console.log(text.state);
        }
    })
};
function cancel(){
    $('.cancel').on('click',function(){
        newPage();
    })
}
function selectList(){
    $('.optionSelected').click(function(){
        if($('.suport-icon').attr('class') == 'suport-icon icon-drop_down'){
            $(this).addClass('radius');
            $('.selectOption').slideDown();
            $('.suport-icon').removeClass('icon-drop_down').addClass('icon-drop_up');
        }else {

            $('.selectOption').slideUp();
            $(this).removeClass('radius');
            $('.suport-icon').removeClass('icon-drop_up').addClass('icon-drop_down');
        }
    })
};
/*function choseTags(){
    //加载已选择标签
    $.each(arr,function(i,key){
        $('.selectOption input[type="checkbox"]').each(function(){
            if($(this).attr('value') == key){
                $(this).prop( "checked", true );
            }
        })
    })
};*/
function loadTags(){
    var _data={token: $.cookie('token')};
    $.ajax({
        url: commUrl+'/coursewareLabel',
        data: _data,
        asyn:false,
        success: function(data){
            data = JSON.parse(data);
            //console.log(data);
            //debugger;
            if(data.code == '1'){
                $(".selectOption").empty();
                var html = '';
                if(data.code == '1'){
                    $.each(data.data,function(i,key){
                        html += '<li><input type="checkbox" value="'+key.id+'" data-name="'+key.labelName+'" data-time="'+key.createTime+'"/>'+key.labelName+'</li>';
                    })
                    $(".selectOption").html(html);

                }
            }
        },
        error: function(text){
            alert('出错啦~！');
        }

    })
}
function newPage(){
    $.ajax({
        url:menuUrl+'column-list.html',
        success: function(data){
            $('.main').html(data);
        }
    })
}
function columnConfirm(){
    $('.Confirm').on('click',function(){

        if($('#tagsType').val() !== ''){//栏目名不能为空判断
            var adId = [];
            $('.selectOption input[type="checkbox"]').each(function(){
                if($(this).is(':checked')){
                    var colDetail = {};
                    colDetail.labelName = $(this).attr('data-name');
                    colDetail.id = $(this).attr('value');
                    colDetail.createTime = $(this).attr('data-time');
                    adId.push(colDetail);
                }
            });
            //console.log(adId);
            //debugger;
            adId = JSON.stringify(adId);
            var dataId = $(this).attr('data-id');
            var _columnName = $('#tagsType').val();
            var _desc = $('#columnDesc').val();
            //var commUrl ='http://10.10.23.65:8080/manage/'
            if(dataId == ''){
                var _url = commUrl+'/coursewareColumn?token=' + $.cookie("token")+'&columnName='+_columnName+'&desc='+ _desc;
            }else{
                var _createTime = $('#tagsType').attr('data-time')
                var _url = commUrl+'/coursewareColumn?token=' + $.cookie("token")+'&columnName='+_columnName+'&desc='+ _desc +'&id='+dataId +'&createTime='+ _createTime;
            }
            //console.log(_url);
            $.ajax({
                url: _url,//替换接口
                //data:_data,
                cache:false,
                type:'POST',
                data: adId,
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success: function(data){
                    data = eval('('+data+')');
                    if(data.code == '1'){
                      newPage();
                    }
                },
                error: function(status){
                    console.log(status.readyState);
                    console.log(status.state);
                    alert('出错啦~！！')
                }
            })
        }else{
            $('.column-tips').show().css({color:'red'}).text('栏目名不能为空');
        }

    })
}