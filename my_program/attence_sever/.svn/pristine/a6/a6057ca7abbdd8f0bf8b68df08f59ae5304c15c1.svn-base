/**
 * Created by A on 2017/6/20.
 */
$(document).ready(function(){
    listPage();
    changeShop();
})
function changeShop(){
  $('#shop').on('change',function(){
      listPage();
  })
};
function listPage(){
    var shopId =$("#shop").find("option:selected").attr("value");
    var obj ={
        token:$.cookie("token"),
        meid: $.cookie('meid'),
        date: $.cookie('date'),
    }

    //console.log(shopId);
    if(shopId !== undefined)
    {
        obj.state = shopId
    }

    $.ajax({
        url:commUrl+'/employee/attendanceDetail',
        //type:'POST',
        cache:false,
        data:obj,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            //$("#grid").empty();
            var html =  '<tr class="grid-head-th"> <th class="start_Time" style="width: 260px;">时间</th> ' +
                '<th class="totalNum" style="width: 160px;">姓名</th> ' +
                '<th class="successNum" style="width: 180px; ">班次</th> ' +
                '<th class="successNum" style="width: 180px; ">班类型</th> ' +
                '<th class="perc" style="width: 180px; ">考勤类型</th></tr>';
            var page = '';
            if(data.code == '1'){
                $.each(data.data,function(i,key){
                    //var accuracy =(key.value.successCount/key.value.total)
                    //var perc = (parseFloat(accuracy.toFixed(3))*100).toFixed(1);
                    html += '<tr class="grid-body-tr" > <td class="start_Time"  style="width:260px"><a class="info" data-date="'+key.date+'">'+key.date+'</a></td> ' +
                        '<td class="totalNum"  style="width:160px;">'+key.name+'</td> ' +
                        '<td class="successNum"  style="width:180px;">'+key.shiftName+'</td> '+
                        '<td class="totalNum"  style="width:180px;">'+key.option+'</td> ' ;
                    var state = key.state;
                    console.log(typeof state);
                    switch (state) {
                        case 'normal':
                            html += '<td class="perc" style="width:180px;">正常出勤</td></tr>';
                            break;
                        case 'late':
                            html +='<td class="perc" style="width:180px;">迟到</td></tr>';
                            break;
                        case 'leave':
                            html+='<td class="perc" style="width:180px;">请假</td></tr>';
                            break;
                        case 'abnormal':
                            html+='<td class="perc" style="width:180px;">未到</td></tr>';
                            break;
                        case 'early':
                            html+='<td class="perc" style="width:180px;">早退</td></tr>';
                            break;

                    }

                })
            }
            //console.log(html);
            //}

            $(".grid").html(html);
            checkInfo();
            //$(".pages ul").html(page);
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
