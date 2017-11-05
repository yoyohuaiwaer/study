/**
 * Created by A on 2016/9/6.
 */


$(document).ready(function(){
    //$('#codeImage').attr('src','http://112.74.14.173:8080/server/login/logincode?abc='+Math.random());
    if($.cookie('rmbUser') == "true"){
        $('#username').val($.cookie('username'));
    }
   $('input[type="text"]').each(function() {
        var vdefault = this.value;
       //alert(this.id);
       if(this.id == 'password'){
           $(this).focus(function() {
               if (this.value == vdefault) {
                   this.value = "";
                   this.type = 'password';
               }
           });
       }else{
           $(this).focus(function() {
               if (this.value == vdefault) {
                   this.value = "";
               }
           });
       };


       /*$(this).blur(function() {
         if (this.value == "") {
         this.value = vdefault;
         }
       });*/
    });

    /*$('#codeImage').click(function(){
        $('#codeImage').attr('src','http://112.74.14.173:8080/server/login/logincode?abc='+Math.random());//ˢ����֤��
    });*/
    $("#submit").click(function(e){
        if($('input[type="text"]').val() !== ''){
            $.ajax({
                url:commUrl+'/login/logincheck',
                type:'POST',
                data:{
                    username:$('#username').val(),
                    password:$('#password').val(),
                    //strCode:$('#strCode').val(),
                    //abc:$('#codeImage').attr('src').substr($('#codeImage').attr('src').indexOf("=")+1)//abc��ȡ�Ⱥź����string
                },
                dataType:'json',
                success: function(data){
                    data = eval('(' + data + ')');//json�ַ�תΪjson����
                    function newcode(){
                        $(".tipscode").empty();
                        $(".tipsueser").empty();
                        $(".tipspassword").empty();
                        $('#strCode').val("");
                        //$('#codeImage').attr('src','http://112.74.14.173:8080/server/login/logincode?abc='+Math.random());
                    }

                    if(data.code == '1'){
                        console.log(data.data);
                        if($('.remberme').prop("checked")){
                            $.cookie('rmbUser',true,{ path: '/' });
                            $.cookie('username',$('#username').val(),{ path: '/' });
                        }
                        $.cookie('Qusername',data.data.username,{ path: '/' });
                        $.cookie('token',data.token,{ path: '/' });

                        window.location.href = 'home.html';//http://112.74.14.173/server/
                    }
                    else if (data.code == '-1'){
                        newcode();
                        $(".tipspassword").html(data.msg);
                    }
                    else if(data.code == '-3'){
                        newcode();
                        $(".tipscode").html(data.msg);
                    }
                    else if(data.code == '-2'){
                        newcode();
                        $(".tipscode").html(data.msg);
                    }
                    else {
                        newcode();
                        $(".tipsueser").html(data.msg);
                    }
                },
                error: function(data,text,status){
                    alert(data.readyState);
                    alert(data.status);
                }
            })
            e.preventDefault();//��ֹĬ����Ϊ
        }
        else {
            return false;
        }
    })

})