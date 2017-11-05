/**
 * Created by A on 2017/4/25.
 */
$(document).ready(function(){
    //<li class="selected"><a class="" alt="multimedia-list.html" id="58a110bb30391db6e08754bb">多媒体列表</a></li>
    $(".breadcrumb").empty();
    var breadcrumb = '<li><a class="" alt="multimedia-list.html" id="58a110bb30391db6e08754bb">多媒体列表</a></li><li><a class="" alt="multimediaColumn-list.html" id="">栏目管理</a></li><li class="selected"><a class="" alt="multimediaColumn-details.html" id="">新增、修改专辑</a></li>';
    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();
    loadTags();
    loadColumn();
    selectList();
    confirm();
    if($.cookie('album-id') !== ''){
        loadDetails()
    }
    cancel();
})
function cancel(){
    $('.cancel').on('click',function(){
        newPage();
    })
}
function confirm(){
    $('.Confirm').on('click',function(){
        var adId = []
        $('.selectOption input[type="checkbox"]').each(function(){
            if($(this).is(':checked')){
                var colDetail = {};
                colDetail.labelName = $(this).attr('data-name');
                colDetail.id = $(this).attr('value');
                colDetail.createTime = $(this).attr('data-time');
                adId.push(colDetail);
            }
        });
        var _token = $.cookie('token'),_column = $('#column').children('option:selected').val(), _classify =  $('#classify').val();
        //var commUrl = 'http://10.10.23.67:8080/qh_manager';
        var _url = commUrl+'/content/updateClassify?token='+_token+'&column='+_column+'&classify='+_classify;
        if($.cookie('album-id') !== ''){
            var _id = $.cookie('album-id')
            _url = commUrl+'/content/updateClassify?token='+_token+'&column='+_column+'&classify='+_classify+'&id='+_id;
        }
        adId = JSON.stringify(adId)
        /*console.log(adId);
        debugger;*/
        $.ajax({
            url: _url,//替换接口
            type:'POST',
            data:adId,
            cache:false,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function(data){
                data = eval('('+data+')');
                if(data.code == '1'){
                    newPage();
                }
            },
            error: function(text){
                console.log(text.readyState);
                console.log(text.state);
            }
        })
    });
};
function newPage(){
    $.ajax({
        url:menuUrl+'multimediaColumn-list.html',
        success: function(data){
            $('.main').html(data);
        }
    })
}

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

function loadDetails(){
    $.ajax({
        url:commUrl+'/content/getColumnById',//替换接口
        type:'GET',
        data:{
            token: $.cookie('token'),
            id: $.cookie('album-id')
        },
        cache:false,
        success: function(data){
            data = eval('('+data+')');
            //console.log(data);
            //debugger;
            if(data.code == '1'){
                data = data.data
                $("#column").children('option[value="'+data.parent+'"]').attr({selected:"selected"});
                $('#classify').val(data.name);
                //$('#tagsType').val(data.desc);
                if(data.labels !== undefined){
                    $.each(data.labels,function(i,key){
                        $('.selectOption input[type="checkbox"]').each(function(){
                            if($(this).attr('value') == key.id){
                                $(this).prop( "checked", true );
                            }
                        })
                    })
                }

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
function loadColumn(){
    //获取分栏
    $.ajax({
        url: commUrl+'/content/getcolu',
        async: false,
        //cache: false,
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
                //choseColumn();

            }
        },
        error: function(text){
            alert('出错了~~！');
        }
    });
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