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
    $("#progressBar").hide();

    function progressFunction(evt) {
        var progressBar = document.getElementById("progressBar");
        var percentageDiv = document.getElementById("percentage");
        if (evt.lengthComputable) {
            progressBar.max = evt.total;
            progressBar.value = evt.loaded;
            percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
        }
    }  
    $("#bt_upload").click(function() {
        if(getCookie("username") == "")
        {
            alert("尚未登录"+getCookie("username"));
            //这里做一个跳转吧
        }
        else
        {
            // alert(getCookie("username")+getCookie("cookie"));
            $("#progressBar").show();
            var fileObj = document.getElementById("file").files[0]; // 获取文件对象
            var FileController = "/php/upload.php";                    // 接收上传文件的后台地址 

            // FormData 对象
            var form = new FormData();
            form.append("file", fileObj);                           // 文件对象
            form.append("username", getCookie("username"));                        // 可以增加表单数据
            form.append("type", "uploadFile");                       
            form.append("auth", "999");                        
            form.append("cookie", getCookie("cookie"));
            

            // XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();
            xhr.open("post", FileController, true);
            xhr.onload = function () {
                alert("上传完成!");
                $("#file").val("");
                $("#progressBar").hide();
            };
            xhr.upload.addEventListener("progress", progressFunction, false);
            xhr.send(form);
        }
    });
    
});