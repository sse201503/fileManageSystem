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
    if(getCookie("cookie")!="")
    {
        //这里需要判断cookie是否是伪造的，因此利用cookie重新检验登录
        $.ajax({
            type: 'POST',
            url: "/php/isCookieValid.php" ,
            data: {
                type:"isCookieValid",
                username: getCookie("username"),
                cookie: getCookie("cookie")
            },
            success: function(data) 
            {
                if(data == "1")
                {
                    $("#user-name").text(getCookie("username"));
                    $("div.unLanded").hide();
                    window.location.href = "file.html";
                    // alert("已经登录了");
                }
                else
                {
                    window.location.href = "index.html";
                    alert("登录已失效，请重新登录");  
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
                        setCookie("cookie",data['cookie'],7);
                        setCookie("username",data['username'],7);
                        setCookie("auth",data['auth'],7);
                        
                        //刷新页面
                        window.location.reload("file.html");
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