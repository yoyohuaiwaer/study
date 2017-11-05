/**
 * Created by A on 2017/7/19.
 */
$(document).ready(function(){
    producer();//公司
    isUpdate = 0;
    loadDetail();
    confirmPerson();
    cancel()
})
function cancel(){
    $(".cancel").on('click',function(){
        newPage();
    })
}
function newPage(){
    $.ajax({
        url:menuUrl+'order-list.html',
        success: function(data){
            $('.main').html(data);
        }
    })
}
function getDay(day){
    var today = new Date();

    var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;

    today.setTime(targetday_milliseconds); //注意，这行是关键代码

    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear+"-"+tMonth+"-"+tDate;
}
function doHandleMonth(month){
    var m = month;
    if(month.toString().length == 1){
        m = "0" + month;
    }
    return m;
}
function loadDetail(){
    var _shiftId = $.cookie('shiftId');
    var tomorrow = getDay(1);
    console.log(tomorrow);
    $.ajax({
        url: commUrl+'/shift/group?token='+$.cookie("token")+'&trans=0&id='+_shiftId+'&startDate='+tomorrow,
        //type:'POST',
        //data:arr,
        //dataType: 'json',
        //contentType: 'application/json; charset=UTF-8',
        success: function(data){
            data = eval('(' + data + ')')
            if(data.code == 1){
                console.log(data);
                /*debugger;*/
                if(data.data.datas.length !== 0){
                    isUpdate = 1;
                    var arr = data.data.datas[0].arrangements;

                    $.each(arr,function(i,key){
                        $('.person').each(function(){
                            if($(this).attr('data-id') == key.eid){
                                $(this).prop( "checked", true );
                                var $subBox = $('.person');
                                //$subBox.click(function(){
                                    $(this).parents('.personBox').find(".allperson").prop("checked",$(this).parents('.personBox').find('.person').length == $(this).parents('.personBox').find('.person:checked').length ? true : false);
                                //});
                            }
                        })
                    })


                }
            }
            /*if(data.code == '1'){
             newPage();
             }else {
             alert(data.msg);
             }*/
        },
        error: function(text){
            alert('出错啦~！');
        }
    })
}
function loadPerson(id){
    $.ajax({
        url:commUrl+'/shift/group',
        data: {
            token: $.cookie('token'),
            id: id,
            page:1,
            row:'10000',
        },
        success: function(response){
            response = JSON.parse(response);
            if(response.code == 1){
                var key = response.data.datas[0]
                var lenth = key.arrangements.length;
                var arr = key.arrangements;
                var adLeth = $('.person').length;
                if(lenth > 0){
                    //var arr = response.data.adIds
                    if(lenth == adLeth){
                        $(".allperson").prop('checked',true);
                    }
                    $.each(arr,function(i,key){
                        $('.selectOption input[type="checkbox"]').each(function(){
                            if($(this).attr('data-id') == key.eid){
                                $(this).prop( "checked", true );
                            }
                        })
                    })
                }
            }
        },
        error: function(text){
            alert("鍑洪敊鍟锛�")
        }
    });
}
function newPage(){
    $.ajax({
        url:menuUrl+'order-list.html',
        success: function(data){
            $('.main').html(data);
        }
    })
}
function confirmPerson(){
  $('.confirmPerson').on('click',function(){
      var arr = [];
      $('.person').each(function(){
          if($(this).is(':checked')){
              var obj = {
                  id : $(this).attr('data-id'),
                  value: $(this).attr('data-name')
              }
              //obj.eid = $(this).attr('data-id');
              //obj.ename = $(this).attr('data-name');
              arr.push(obj);
          }
      })
      //时间列表加载人员名单
      var mydate = new Date();
      var years = "" + mydate.getFullYear() + "-";
      var months =mydate.getMonth()+1;
      //var day =
      console.log(months)
      if(months < 10){
          months =''+'0'+months;
      }
      var str = years+months;
      if(arr.length == 0){
          alert('请选择人员');
          return false;
      }
      arr = JSON.stringify(arr);
      console.log(arr);
      /*debugger;*/
      var _shiftId = $.cookie('shiftId');
      $.ajax({
          url:commUrl+'/shift/group/normal?token='+$.cookie("token")+'&shiftId='+_shiftId+'&isUpdate='+isUpdate,
          type:'POST',
          data:arr,
          dataType: 'json',
          contentType: 'application/json; charset=UTF-8',
          success: function(data){
              data = eval('(' + data + ')')
              if(data.code == '1'){
                  newPage();
              }else {
                  alert(data.msg);
              }
          },
          error: function(text){
              alert('出错啦~！');
          }
      })

      //console.log(arr);
      //arr.forEach(function(person){

      //})
      //$('#person').hide();
      //return arr;
  })
};
function producer(){
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
                //if(data.data.length > 1){
                var str = ''
                //str = '<option value="">选择公司</option>';
                $.each(data.data,function(i,key){
                    str +='<option value="'+key.id+'">'+key.nick+'</option>'
                });
                //if(data.data.length == 1){
                //$('#producer').html(str);

                //}else {
                $('#producer').html(str);
                //$('.chooseCompany').show();
                //}
                var _companyId = $('#producer').children('option:selected').attr('value');
                classId(_companyId);//根据商家获取该商家下的部门
            }
        },
        error: function(text){

        }
    })
}
function chooseAll(){//全选
    $(".allperson").click(function() {

        $(this).parents('.personBox').find('.person').prop("checked",this.checked);
    });
    var $subBox = $('.person');
    $subBox.click(function(){
        $(this).parents('.personBox').find(".allperson").prop("checked",$(this).parents('.personBox').find('.person').length == $(this).parents('.personBox').find('.person:checked').length ? true : false);
    });
};

function classId(id){
    var _data = {
        token: $.cookie("token")
    }
    if(id !== undefined){
        _data.meid = id;
    }
    $.ajax({
        url: commUrl + '/employee/findDept',
        type: 'POST',
        cache: false,
        data: _data,
        //dataType: 'json',
        //contentType: 'application/json; charset=UTF-8',
        success: function(data) {
            data = eval('(' + data + ')');
            if(data.code == '1') {
                var str = ''
                str = '<li><h4>部门:</h4></li>';
                $.each(data.data,function(i,key){
                    //str +='<option value="'+key.id+'">'+key.deptName+'</option>'
                    var _id = key.id;
                    var html = '';
                    html = loadAd(_id);//获取各部门下人员
                    str += '<li class="depId" data-id="'+key.id+'" data-name="'+key.deptName+'"><a data-id="'+key.id+'" >'+key.deptName+'</a>'+html+'</li>';
                });
                $(".selectOption").html(str);
                $('.depId:eq(0)').addClass('selected').find('.personBox').show()
                depId();
                chooseAll();
            }
        },
        error: function(text){
        }
    })
}
function depId(){//切换部门 出现该部门下人员
    $('.depId').on('click',function(){
        $('.depId').removeClass('selected');
        $(this).addClass('selected');
        $('.personBox').hide();
        $(this).find('.personBox').show();
    })
}
function loadAd(id){//加载部门
    var _companyId = $('#producer').children('option:selected').attr('value')
    var obj = {
        token:$.cookie("token"),
        meid: _companyId,
        //detpId:id

    };
    if(id !== undefined){
        obj.detpId = id;
    }
    var html = '';
    $.ajax({
        url:commUrl+'/employee/employeeExtList',
         type:'POST',
        data:obj,
        async: false,
        cache:false,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            //$(".selectOption").empty();
            html = '<ul class="personBox" style="display: none;"><li class="chooseALl"><input type="checkbox" class="allperson">选择全部</li>';//
            if(data.code == '1'){

                $.each(data.data,function(i,key){
                    html += '<li><input type="checkbox" class="person" data-id="'+key.id+'" data-name="'+key.name+'"/>'+key.name+'</li>';
                })
                html+='</ul>';
                //console.log(html);
                return html;
            }
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
    return html;

}
