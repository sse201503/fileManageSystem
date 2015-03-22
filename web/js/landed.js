function setCookie(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +encodeURIComponent(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/"
}

function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        { 
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return decodeURIComponent(document.cookie.substring(c_start,c_end));
        } 
    }
    return ""
}

$(document).ready(function(){
    
    //当存在登录信息时
    if(getCookie("ZZFLSCookie")!="")
    {
        //这里需要判断cookie是否是伪造的，因此利用cookie重新检验登录
        $.ajax({
            type: 'POST',
            url: "/php/isCookieValid.php" ,
            data: {
                type:"isCookieValid",
                username: getCookie("username"),
                cookie: getCookie("ZZFLSCookie")
            },
            success: function(data) 
            {
                if(data == "1")
                {
                    $("#user-name").text(getCookie("username"));
                    $("div.unLanded").hide();
                }
                else
                {
                    $("div.alreadyLanded").hide();
                    alert("登录已失效，请重新登录");
                    alert(data);   
                }
            },
            dataType:'json',
            error : function() {       
                alert("网络异常！");    
            }    
        });
        
    }
    else
    {
        $("div.alreadyLanded").hide();
    }
    
    
    /***********  登录状态下   **********/
    $("#div_user_name_menu").hide();
    $(".alreadyLanded").mouseover(
        function()
        {
            $("#div_user_name_menu").show();
        }
    );
    $(".div_landed").mouseleave(
        function()
        {
            $("#div_user_name_menu").hide();
        }
    );
    $("#quit").click(
        function()
        {
            //删除cookie（取消自动登录）
            setCookie("ZZFLSCookie",'',-1);
            setCookie("username",'',-1);
            //刷新页面
            window.location.reload();
        }
    );
    
    /***********  非登录状态下  **********/
    $(".div_user_landed").hide();
    $("a#landed").click(
        function()
        {
            $(".div_user_landed").show();
        }
    );
    $(".btn-cancel").click(
        function()
        {
            $(".div_user_landed").hide();
            $("#loginMsg").text();
        }
    );
    
    /************  利用Ajax登录验证  ***********/
    
    $("#bt_ensure").click(
        function login()
        {                       
            $.ajax({
                type: 'POST',
                url: "/php/login.php" ,
                data: {
                    type:"login",
                    username: $("#input_username").val(),
                    passwd: $("#input_passwd").val()
                },
                success: function(data) 
                {
                    if(data['status'] == "1")
                    {
                        //登录成功，先设置cookie
                        setCookie("ZZFLSCookie",data['cookie'],7);
                        setCookie("username",data['username'],7);
                        
                        //刷新页面
                        window.location.reload();
                    }
                    else
                    {
                        $("#loginMsg").text(data['description']);
                    }
                },
                dataType:'json',
                error : function() {       
                    alert("网络异常！");    
                }    
            });
        }                  
    );
      
});