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
                    // alert("已经登录了");
                }
                else
                {
                    window.location.href = "index.html";
                    alert("尚未登录");  
                }
            },
            dataType:'json',
            error : function() {       
                alert("网络异常！");    
            }    
        });
        
    }

    
    $("#bt_cancelLogin").click(function()
    {
        setCookie("cookie","",0);
        setCookie("username","",0);
        window.location.href = "index.html";
    });
      
});