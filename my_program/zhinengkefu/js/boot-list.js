/**
 * Created by A on 2017/9/5.
 */
$(document).ready(function(){
  $.ajax({
        url: commUrl + '/menu/findbyid',
        //type:'GET',
        //async: false,
        data: {
            token: $.cookie("token"),
            parentId: '57d21c76240a7a19c23ccca7'
        },
        success: function(data) {
            data = eval('(' + data + ')');
            if(data.code == '1') {
                $(".breadcrumb").empty();
                var breadcrumb = '<li class = "selected" ><a href="javascript:void(0);" onclick="javascript:changePage(this);"  title="' + menuUrl + '' + data.data[1].url + '" id="' + data.data[1].id + '">' + data.data[1].name + '</a>';
                $(".breadcrumb").html(breadcrumb);
            }
            if(data.code=='-1')
            {
                alert(data.msg)
            }
        },
        error: function(text) {
            alert(text.readyState);
            alert(text.status);
        }
    });
    loadGridList('',1);
    addPanel();
    addClass();
})
function checkPanel(){
    $('.u-panel-itm-tlt').unbind('click').click(function(){
        var boxEle = $(this).parents('.u-panel');
        var afloor = boxEle.attr('data-floor') ;
        //console.log(afloor);
        $(this).parents('.u-panel-cnt').find('li').removeClass('z-sel');
        $(this).parents('.u-panel-itm').addClass('z-sel');
        if(afloor !== '5'){
            afloor = afloor - 0 + 1;
            var aid = $(this).parents('.u-panel-itm').attr('data-id');
            boxEle.nextAll().remove();
            $('.u-panel-add').show();
            //console.log(id+'；'+floor);
            //debugger;
            loadGridList(aid,afloor);
            console.log('++++++++++++++++++++++++++come in')
        }
        return;
    })
}
function addPanel(){
  $('.u-panel-add').on('click',function(){
      var floor = $('.u-panels .u-panel:last-child').attr('data-floor');
      var parId = $('.u-panels .u-panel:last-child').find('li.z-sel').attr('data-id');
      var lenth = $('.u-panels .u-panel').length;
      if(parId){
          floor++;
          var H4Title = '';
          switch(floor){
              case 1:
                  H4Title = '一级分类';
                  break;
              case 2:
                  H4Title = '二级分类';
                  break;
              case 3:
                  H4Title = '三级分类';
                  break;
              case 4:
                  H4Title = '四级分类';
                  break;
              case 5:
                  H4Title = '五级分类';
                  break;
          };
          html='<div class="u-panel" id="Ele'+floor+'" data-id="'+parId+'" data-floor="'+floor+'"><h5 class="u-panel-tlt">'+H4Title+'</h5><ul class="u-panel-cnt"><a class="u-add">添加分类项</a></ul></div>';
          $('.u-panels').append(html);
          editTitle();
          addClass();
          if(lenth >=4){
              $(this).hide();
          }
      }else{
          alert('请选择为具体分类添加下一级分类')
      }

  })
};
function loadGridList(id,floor){
    var obj = {
        token: $.cookie('token')
    }
    if(id!==''){
        obj.parentId = id;
    }
    //console.log(obj+'============='+floor);
    //debugger;
    $.ajax({
        url: commUrl+'/guide/guideList',
        type:'POST',
        data:obj,
        async:true,
        success:function(data){
            data = JSON.parse(data);
            console.log(data);
            console.log(floor);
            //debugger;
            var html = '';
            var H4Title = '';
            if(data.code ==1){
                if(data.data.length !== 0){
                    if(floor == 5){
                        $('.u-panel-add').hide();
                    }
                    switch(floor){
                        case 1:
                            H4Title = '一级分类';
                            break;
                        case 2:
                            H4Title = '二级分类';
                            break;
                        case 3:
                            H4Title = '三级分类';
                            break;
                        case 4:
                            H4Title = '四级分类';
                            break;
                        case 5:
                            H4Title = '五级分类';
                            break;
                    };
                    html='<div class="u-panel" id="Ele'+floor+'" data-id="'+id+'" data-floor="'+floor+'"><h5 class="u-panel-tlt">'+H4Title+'</h5><ul class="u-panel-cnt" >'
                    $.each(data.data,function(i,key){
                        html +='<li class="u-panel-itm" data-id="'+key.id+'">' +
                            '<div class="z-normal">' +
                            '<span title="'+key.content+'" class="u-panel-itm-tlt">'+key.content+'</span>' +
                            '<span class="icon-pencil"></span>' +
                            '<span class="icon-recycling11" data-id="'+key.id+'"></span> </div>' +
                            '<div class="z-edit">' +
                            '<input type="text" class="u-ipt" value="'+key.content+'">' +
                            '<span class="icon-Checkmark" data-id="'+key.id+'"></span>' +
                            '<span class="icon-Cancel" data-content="'+key.content+'" data-id="'+key.id+'"></span> </div> ' +
                            '</li>'
                    })
                    html +='<a class="u-add">添加分类项</a></ul></div>';
                    if(floor==1){
                        $('.u-panels').empty().append(html);
                    }else{
                        $('.u-panels').append(html);
                        if(floor == 5){
                            $('.u-panel-add').hide();
                        }
                    }
                    var EleId = '#Ele'+floor;
                    var newFloor = floor - 0 +1;
                    $(EleId).find('li:first-child').addClass('z-sel');
                    var newId =$(EleId).find('li.z-sel').attr('data-id');
                    editTitle();//编辑按钮
                    addClass();//新增栏目
                    confirmTitle();//提交栏目标题
                    cancelTitle();//取消栏目标题
                    cancelPanel();//删除
                    checkPanel();//点击栏目
                    //console.log(newId+'||||||'+newFloor);
                    loadGridList(newId,newFloor);
                    //debugger;
                }


            }else{
                console.log('++++++++++++++++++++++++++++++++++ok')
                alert(data.msg);
            }

        },
        error: function(text){
            alert('出错了~！')
        }
    })
}
function cancelPanel(){
    $('.icon-recycling11').unbind('click').click(function(){
        $('.overall').show();
        var id = $(this).attr('data-id')
        var newLi = $(this).parents('.u-panel-itm');//当前点击节点的li
        var newPanel = $(this).parents('.u-panel');//当前节点的panel
        var floor = newPanel.attr('data-floor');//当前的层级
        var obj = {
            token: $.cookie('token'),
            id: id
        }
        $('.deletePanel').unbind('click').click(function(){
            $.ajax({
                url: commUrl+'/guide/del',
                type:'POST',
                data:obj,
                success:function(data){
                    data = JSON.parse(data);
                    /*console.log(data);
                    debugger;*/
                    if(data.code ==1){
                        newLi.remove();
                        var liLength = newPanel.find('li').length;
                        var lent = newPanel.find('li.z-sel').length;
                        /*console.log(liLength);
                        console.log(lent);*/
                        //debugger;
                        if(liLength == 0){//判断删除的是不是最后一个li
                            var id = '#Ele'+floor;
                            console.log($(id).nextAll().length);
                            $(id).nextAll().remove();
                            if(floor!=='1'){
                                //var id = '#Ele'+floor;
                                $(id).remove();
                                //debugger;
                            }
                            $('.u-panel-add').show();
                            //debugger;
                        }else{
                            if(lent == 0){//如果被删除节点是被点击的节点
                                newPanel.find('li:first-child').addClass('z-sel');
                                var newId = newPanel.find('li:first-child').addClass('z-sel').attr('data-id');
                                var newFloor = floor - 0 + 1
                                if(floor !== '5'){
                                    newPanel.nextAll().remove();
                                    loadGridList(newId,newFloor);
                                    //debugger;
                                }
                                //debugger;
                            }
                        }

                        $('.overall').hide();
                        //}
                    }else{
                        alert(data.msg);
                    }

                },
                error: function(text){
                    alert('出错了~！')
                }
            })

        })
        $('.cancelDelete').on('click',function(){
            $('.overall').hide();
        })

       /* var a = confirm('确定要删除');//您确认要删除该类别及以下的所有内容么，一旦删除无法恢复
        if(a == true){

        }*/

    })
}
function confirmTitle(){
    $('.icon-Checkmark').unbind('click').click(function(){
        var id = $(this).attr('data-id');
        var value = $(this).prev('.u-ipt').val();
        var parid = $(this).parents('.u-panel').attr('data-id');
        var newThis = $(this)
        var obj = {
            token: $.cookie('token'),
            content: value
        }
        if(value==''){
            alert('内容不能为空');
            return;
        }
        if(id!==''){
            obj.id=id
        }
        if(parid!==''){
            obj.parentId=parid
        }
        console.log(obj);
        //debugger;
        $.ajax({
            url: commUrl+'/guide/update',
            type:'POST',
            data:obj,
            success:function(data){
                data = JSON.parse(data);
                console.log(data);
                if(data.code ==1){
                    console.log(newThis);
                    var newid=data.data.id

                    newThis.parent('.z-edit').prev('.z-normal').find('.u-panel-itm-tlt').html(value).attr('title',value);
                    if(id==''){
                        newThis.attr('data-id',newid);
                        newThis.parents('.u-panel-itm').attr('data-id',newid);
                        newThis.next('.icon-Cancel').attr({'data-id':newid,'data-content':value});
                        newThis.parent('.z-edit').removeClass('normal');
                        newThis.parent('.z-edit').prev('.z-normal').removeClass('hidden');
                        newThis.parent('.z-edit').prev('.z-normal').find('.icon-recycling11').attr('data-id',newid);
                    }else{
                        newThis.parent('.z-edit').hide();
                        newThis.next('.icon-Cancel').attr({'data-content':value});
                        newThis.parent('.z-edit').prev('.z-normal').show();
                    }
                    editTitle();//编辑按钮
                    cancelPanel();//删除
                    checkPanel();//点击栏目
                }else{
                    alert(data.msg);
                }

            },
            error: function(text){
                alert('出错了~！')
            }
        })
    })
}
function addClass(){
    $('.u-add').unbind('click').click(function(){
        var  floor = $(this).parents('.u-panel').attr('data-floor');
        var html = '';
        if(floor == '1'){
            html = '<li class="u-panel-itm"><div class="z-normal hidden">' +
                '<span title="" class="u-panel-itm-tlt"></span><span class="icon-pencil"></span><span class="icon-recycling11"></span></div>' +
                '<div class="z-edit normal"><input type="text" placeholder="最多6个字" maxlength="6" class="u-ipt"><span class="icon-Checkmark" data-id=""></span><span class="icon-Cancel" data-id=""></span></div></li>'
        }else{
            html = '<li class="u-panel-itm"><div class="z-normal hidden">' +
                '<span title="" class="u-panel-itm-tlt"></span><span class="icon-pencil"></span><span class="icon-recycling11"></span></div>' +
                '<div class="z-edit normal"><input type="text" placeholder="50字以内" maxlength="50" class="u-ipt"><span class="icon-Checkmark" data-id=""></span><span class="icon-Cancel" data-id=""></span></div></li>'
        }

        //debugger;
        $(this).before(html);
        confirmTitle();//提交栏目标题
        cancelTitle();//取消栏目标题





    })
}
function cancelTitle(){
    $('.icon-Cancel').on('click',function(){
        var id = $(this).attr('data-id');
        var content = $(this).attr('data-content');
        if(id==''){
            $(this).parent('.z-edit').remove();
        }else{
            $(this).parent('.z-edit').hide();
            $(this).prev('.u-ipt').val(content);
            $(this).parent('.z-edit').prev('.z-normal').show()
        }
    })
}
function editTitle(){
    $('.icon-pencil').on('click',function(){
        $(this).parent('.z-normal').hide();
        $(this).parent('.z-normal').next('.z-edit').show();
    })
}