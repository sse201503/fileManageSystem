<?php
include './SaeMysqlLib.php';//为保障非SAE平台运行时SAE的MySQL类也可以使用
if($_POST["type"] == "isCookieValid" && $_POST["username"] && $_POST["cookie"])
{
    $mysql = new SaeMysql();//与sae的数据库自动连接
    $sql = "SELECT username,passwd FROM `user` where username='".$_POST["username"]."';";
    $anyuser= $mysql->getData( $sql );
    // $mysql->closeDb();
    
    if(md5($_POST["username"] + $anyuser[0]['passwd']) == $_POST["cookie"])
        echo "1";
    else
    	echo "0";
}
else
{
    echo "0";
}


//cookie过期问题除了浏览器自己做处理外，应该在加密环节也做处理，这个以后再说吧