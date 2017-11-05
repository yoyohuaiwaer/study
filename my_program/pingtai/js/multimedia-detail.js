/**
 * Created by A on 2017/2/13.
 */

/**
 * Created by A on 2017/2/13.
 */
//var commUrl = 'http://172.16.8.70:8080/manage';
//页面加载
$(document).ready(function() {
    //拉取分栏
    loadTags();
    //面包屑加载
    $(".breadcrumb").empty();
    $.ajax({
        url:commUrl+'/menu/findbyid',
        data: {
            token:$.cookie("token"),
            async: false,
            parentId:'58a1109330391db6e08754ba'
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1) {
                var breadcrumb = '';
                breadcrumb += '<li><a class="" alt="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].id+'">'+data.data[0].name+'</a></li>';
                $(".breadcrumb").html(breadcrumb);
                changeBreadcrumb();
                var parentId = data.data[0].id ;
                findMenus(parentId)
            }
        }
    });

    //获取分栏
    loadColumn();
    loadSports();
    if($.cookie('dataId') !== ''){
        //详情内容获取
        pagenation();
    }

    //选择分栏
    //choseColumn;
    //保存
    confirm();
    //改变封面图片
    changeImg();
    //取消
    cancel();
    selectList();
})
function loadSports(){
    $.ajax({
        url: commUrl+'/moves',
        async: false,
        cache: false,
        data:{
            token:$.cookie("token")
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1){
                var html = '';
                $.each(data.data.datas, function(i,key){
                    html += '<option value="'+key.name+'" data-id="'+key.id+'">'+key.name+'</option>';
                })
                $('#moveId').html(html);
                //choseColumn();

            }
        },
        error: function(text){
            alert('出错了~~！');
        }
    });
};
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
                        //debugger;
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
function loadColumn(){
    //获取分栏
    $.ajax({
        url: commUrl+'/content/getcolu',
        async: false,
        cache: false,
        data:{
            token:$.cookie("token")
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1){
                var html = '';
                $.each(data.data, function(i,key){
                    html += '<option value="'+key.name+'" data-id="'+key.id+'">'+key.name+'</option>';
                })
                $('#column').html(html);
                choseColumn();

            }
        },
        error: function(text){
            alert('出错了~~！');
        }
    });

}
function choseColumn(){
    $('#column').on('change',function(){
        var _value = $(this).children('option:selected').attr('value');
        classify(_value);
    })
}

function classify(id){
    //获取分类
    $.ajax({
        url: commUrl+'/content/getclassify',
        async: false,
        data:{
            token:$.cookie("token"),
            column:id
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1){
                var html = '';
                $.each(data.data, function(i,key){
                    html += '<option value="'+key.name+'" data-id="'+key.id+'">'+key.name+'</option>';
                })

                $('#classify').empty().html(html);
                changeColumn();

            }
        },
        error: function(text){
            alert('出错了~~！');
        }
    });
}
function changeColumn(){
    $('#classify').on('change',function(){
        var _columnId = $(this).children('option:selected').attr('data-id');
        loadColumnTags(_columnId);
    })
};
function loadColumnTags(columnId){
    $.ajax({
        url:commUrl+'/content/getColumnById',//替换接口
        type:'GET',
        data:{
            token: $.cookie('token'),
            id: columnId
        },
        cache:false,
        success: function(data){
            data = eval('('+data+')');
            console.log(data);
            debugger;
            if(data.code == '1'){
                data = data.data
                //$("#column").children('option[value="'+data.parent+'"]').attr({selected:"selected"});
                //$('#classify').val(data.name);
                //$('#tagsType').val(data.desc);
                $.each(data.labels,function(i,key){
                    $('.selectOption input[type="checkbox"]').each(function(){
                        if($(this).attr('value') == key.id){
                            $(this).prop( "checked", true );
                        }
                    })
                })
            }else{
                alert(data.msg);
            }


        },
        error: function(text){
            console.log(text.readyState);
            console.log(text.state);
        }
    })
};
function findMenus(parentId){
    $.ajax({
        url:commUrl+'/menu/findbyid',
        async: false,
        data: {
            token:$.cookie("token"),
            parentId:parentId
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1) {
                var breadcrumb1 = '';
                breadcrumb1 = '<li class="selected"><a alt="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].id+'">编辑多媒体</a></li>';
                $(".breadcrumb").append(breadcrumb1);
                changeBreadcrumb();
            }
        }
    })
}

function pagenation(){
    var obg = {};
    var _id = $.cookie('dataId');
    obg = {
        token: $.cookie("token"),
        id:_id,
    }
    $.ajax(
        {
            url: commUrl+ '/content/findall',
            type:'GET',
            data: obg,
            //dataType: 'jsonp',
            //async: false,
            success: function (response) {
                response = eval('(' + response + ')');

                if(response.code == '1'){
                    var key = response.data.datas[0];
                    //console.log(key);
                    var _category,_author,_desc;
                    $('#ID').val(key.id).attr({'data-time':key.createTime});
                    $('#name').val(key.name);
                    $('#from').val(key.from).attr({'data-id':key.fromId});
                    (key.author == '')? _author = '暂无作者': _author = key.author;
                    $('#author').val(_author);
                    (key.category == '1')? _category = '音频': _category = '视频';//判断音频或者视频
                    (key.desc == '')? _desc = '暂无简介': _desc = key.desc;
                    $('#category').val(_category).readOnly;
                    if(key.category == '1'){
                        $('#audio').attr({'src':key.file,'data-time':key.duration});
                        $('#videoId').hide();
                    }else{
                        $('#videoId').attr({'src':key.file,'data-time':key.duration});
                        $('#audio').hide();
                    }
                    $('#audio').attr({src:key.file});
                    $('#desc').text(_desc);
                    $('#imageId').attr({src:key.img});
                    //获取栏目
                    $('input[name="status"]').each(function(){
                        if($(this).attr('value') == key.state){
                            $(this).prop( "checked", true);
                        }
                    })
                    $('input[name="defaultUseMove"]').each(function(){
                        if($(this).attr('value') == key.defaultUseMove){
                            $(this).prop( "checked", true);
                        }
                    })
                    $('#column').children('option[value="'+key.column+'"]').attr({'selected':'true'});
                    $('#moveId').children('option[data-id="'+key.moveId+'"]').attr({'selected':'true'});
                    var _classify = key.column;
                    classify(_classify);
                    $('#classify').children('option[value="'+key.classify+'"]').attr({selected:true});
                    //var _classifyId = $('#classify').children('option:selected').attr('data-id');
                    //console.log(_classifyId);
                    //debugger;

                    if(key.labels !== undefined){
                        var arr = key.labels;
                        $.each(arr,function(i,val){
                            $('.selectOption input[type="checkbox"]').each(function(){
                                if($(this).attr('value') == val.id){
                                    $(this).prop( "checked", true );
                                }
                            })
                        })
                    }
                    //loadColumnTags(_classifyId);
                    //单选框
                    //choseColumn();
                }
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        }
    );
}
function cancel(){
    $('.cancel').on('click',function(){
        var _nowPage = parseInt($.cookie('currPage'));
        $.cookie('nowPage',_nowPage,{path:'/'});
        newPage();
    })
}
function confirm(){
    $(".confirm").on('click',function(){

        var _category , _img , _status,_desc,_author,_src,_duration,_column,_classify,_moveId,_defaultUseMove;
        _column = $("#column").find("option:selected").attr('value');
        _classify = $("#classify").find("option:selected").attr('value');
        _moveId = $("#moveId").find("option:selected").attr('data-id');
        var details = '';
        ($('#category').val() == '音频')? _category = '1':_category = '2';//判断音频或者视频
        _img = $('#imageId').attr('src');//获取图片地址
        _status =$( 'input[name = "status"]:checked').val();//获取状态码
        _defaultUseMove =$( 'input[name = "defaultUseMove"]:checked').val();//默认开启动作
        $('#desc').val() == '暂无简介' ? _desc = '': _desc = $('#desc').val();
        $("#author").val() == '暂无作者' ? _author = '': _author = $("#author").val();
        if($('#category').val() == '音频'){
            _src = $('#audio').attr('src');
            _duration = $('#audio').attr('data-time')
        }else {
            _src = $('#videoId').attr('src');
            _duration = $('#videoId').attr('data-time')
        }
        $('#videoId').hide();
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
        //obj.labels = adId;
        var obj = {};
        obj = {
            //token:$.cookie("token"),
            createTime: $('#ID').attr('data-time'),
            id: $('#ID').val(),
            name: $('#name').val(),
            from: $('#from').val(),
            author: _author,
            category: _category,
            duration: _duration,
            classify: _classify,
            column: _column,
            img: _img,
            desc:_desc,
            file: _src,
            state: _status,
            fromId: $('#from').attr('data-id'),
            labels: adId,
            moveId: _moveId,
            defaultUseMove: _defaultUseMove
        };
        obj = JSON.stringify(obj);
        console.log(obj);
        debugger;
        //var commUrl = 'http://10.10.23.67:8080/qh_manager';//田璞本地地址
        $.ajax({
            url:commUrl+'/content/edit?token='+ $.cookie("token"),
            type:'POST',
            data: obj,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            cache:false,
            success: function(data){
                data = eval('(' + data + ')')
                if(data.code == '1'){
                    newPage();
                }
            },
            error: function(text){
                alert('出错啦~！');
            }
        })
    })
}
function newPage(){
    $.ajax({
        url:menuUrl+'multimedia-list.html',
        success: function(response){
            $('.main').html(response);
        }
    })
}

function changeImg(){
    $(".file_upload").on('change',function(){
        var file = this.files[0];
        var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
        if(fileName == "jpg" || fileName == "jpeg" || fileName == "png" || fileName == "bmp") {
            if(file.size / 1024 < 300) {
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
                        clearOverall();
                        var json = eval('(' + data.responseText + ')');

                        $('#imageId').attr('src', json.imgurl);
                        var img = $("#imageId"); //获取img元素
                        var picRealWidth, picRealHeight;
                        $("<img>") // 在内存中创建一个img标记
                            .attr("src", $(img).attr("src"))
                            .load(function() {
                                picRealWidth = this.width;
                                picRealHeight = this.height;
                                $(".imgTips").empty().css({color: "green"}).html("");
                                $('#imageId').show().attr('src', json.imgurl);
                                $('#imageId').css('display', 'inline-block');
                            });
                    }
                });
            } else {
                //$('#imageId').attr('src', '').css('display', 'none');
                $(".imgTips").empty().css({color: "red"}).html("图片大小不能大于200k");
            }
        } else {
            $('#imageId').attr('src', '');
            $('#imageId').css('display', 'none');
            $(".imgTips").empty().css({
                color: "red"
            }).html("图片格式不正确，格式应为：jpg,jpeg,png,bmp");
        }
    })
}

function clearOverall() {
    $(".overall").hide();
}
