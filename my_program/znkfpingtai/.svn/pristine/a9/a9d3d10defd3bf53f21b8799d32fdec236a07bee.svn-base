/**
 * Created by A on 2017/2/16.
 */
$(document).ready(function() {
    //面包屑加载
    $(".breadcrumb").empty();
    $.ajax({
        url:commUrl+'/menu/findbyid',
        data: {
            token:$.cookie("token"),
            parentId:'58a50a8130391db6e08754bd'
        },
        success: function(data){
            data = JSON.parse(data);

            if(data.code == 1) {
                var breadcrumb = '';
                breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].id+'">'+data.data[0].name+'</a></li>';
                //var parentId = data.data[0].id;
                //findMenus(parentId);
                $(".breadcrumb").html(breadcrumb);
                changeBreadcrumb();
            }
        }
    });

    loadPage();
    choseScene();
    confirm();
})

function loadPage(){
    $.ajax({
        url:commUrl+'/command',
        data: {
            token:$.cookie("token"),
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == '1'){
                var basicHtml = '',softwareHtml = '',actsHtml = '',addVoiceHtml ="", reduceVoiceHtml="";
                $.each(data.data.datas,function(i,key){
                    var _keywords = '';
                    $.each(key.keywords[0].commands, function(num,val){
                        _keywords += val[0]+',';
                    });
                    var _move = '', _part = '', _number = '',_time = '';
                    //features拼接为字符串
                    $.each(key.features,function(num,val){
                        _move += val.move +',';
                        _part += val.part +',';
                        if(val.number == undefined){
                            _number = '';
                        }else{
                            _number += val.number +',';
                            if(val.time == undefined){
                                _time = ''
                            }else{
                                _time += val.time +',';
                            }
                        }
                    })
                    _keywords = _keywords.substring(0,_keywords.length-1);
                    _move = _move.substring(0,_move.length-1);
                    _part = _part.substring(0,_part.length-1);
                    _time = _time.substring(0,_time.length-1);
                    _number = _number.substring(0,_number.length-1);
                    var html = '<div><label>'+key.name+'</label><input type="text" class="text details" data-operation="'+key.operation+'" data-id="'+key.id+'" data-move="'+_move+'" data-part="'+_part+'" data-number="'+_number+'" data-time="'+_time+'" id="'+key.operation+'_'+key.service+'"  value="'+_keywords+'"/><span></span></div>';
                  
                   switch (key.operation){
                        case 'projector':
                            basicHtml += html;
                            break;
                        case 'acts':
                            actsHtml += html;
                            break;
                        case 'music':
                            softwareHtml += html;
                            break;
                        case 'movie':
                            softwareHtml += html;
                            break;
                        case 'audio':
                            addVoiceHtml += html;
                            break;
                    }
                });
                $('#basic').html(basicHtml);
                $('#software').html(softwareHtml);
                $('#acts').html(actsHtml);
                $('#addVoiceHtml').html(addVoiceHtml);
            }
        },
        error: function (text) {
            alert(text.readyState);
            alert(text.status);
        }
    });
}
function strToAry(ary,str){
      ary = str.split(',');
}

function detialss(AryBox){
    $('input[type="text"]').each(function(){
        var objBox = {};
        var _move = $(this).attr('data-move');
        var _part = $(this).attr('data-part');
        var _number = $(this).attr('data-number');
        var _time = $(this).attr('data-time');
        var _id = $(this).attr('data-id');
        var _keyword = $(this).val();
        var new_move, new_part, new_number,new_time,Ary = [] ;
        _number == ''? new_number = []: new_number = _number.split(",");
        _time == ''? new_time = []: new_time = _time.split(",");
        new_part = _part.split(",");
        new_move = _move.split(",");
        for(var i = 0; i < new_move.length; i++){
            var obj = {};
            obj.part = new_part[i];
            obj.move = new_move[i];
            (new_time.length !== 0) ? obj.time = new_time[i] : obj.time == undefined ;
            (new_number.length !== 0) ? obj.number = new_number[i] : obj.number == undefined ;
            Ary.push(obj);
        }
        objBox.id = _id;
        objBox.keyword = _keyword;
        objBox.features = Ary;
        AryBox.push(objBox);
    })
}
function confirm(){
    $('.confirm').on('click',function(){
        var arryBox = [];
        detialss(arryBox);

       // arryBox = JSON.stringify(arryBox);
       // alert(arryBox);
       //alert(typeof(arryBox));
       // debugger;
        var _token = $.cookie("token")
       // commUrl = 'http://10.10.23.230:8080/manage'
        $.ajax({
            url:commUrl+'/command?token='+_token,
            data: JSON.stringify(arryBox),
            type:'POST',
            dataType:"json",
            contentType:'application/json; charset=UTF-8',
            success: function(data){
                data = JSON.parse(data);
                if(data.code == '1'){
                    alert("提交成功");
                    loadPage();
                }
            },
            error: function (text) {
                alert("出错啦~~!")
                /*alert(text.readyState);
                alert(text.status);*/
            }
         });
    });
}

function choseScene(){
    $('#operation').on('change',function(){
        var _value = '#'+$(this).children('option:selected').attr('value');
        $('.module').hide();
        $(_value).show();
    })
}
