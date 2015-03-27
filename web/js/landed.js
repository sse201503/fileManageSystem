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
    
    //�����ڵ�¼��Ϣʱ
    if(getCookie("cookie")!="")
    {
        //������Ҫ�ж�cookie�Ƿ���α��ģ��������cookie���¼����¼
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
                    // alert("�Ѿ���¼��");
                }
                else
                {
                    window.location.href = "index.html";
                    alert("��¼��ʧЧ�������µ�¼");  
                }
            },
            dataType:'json',
            error : function() {       
                alert("�����쳣��");    
            }    
        });
        
    }
    else
    {
        $("div.alreadyLanded").hide();
    }
    
    /************  ����Ajax��¼��֤  ***********/
    
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
                        //��¼�ɹ���������cookie
                        setCookie("cookie",data['cookie'],7);
                        setCookie("username",data['username'],7);
                        setCookie("auth",data['auth'],7);
                        
                        //ˢ��ҳ��
                        window.location.reload("file.html");
                    }
                    else
                    {
                        $("#loginMsg").text(data['description']);
                    }
                },
                dataType:'json',
                error : function() {       
                    alert("�����쳣��");    
                }    
            });
        }                  
    );
      
});