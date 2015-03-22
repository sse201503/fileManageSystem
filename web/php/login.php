<?php
include './SaeMysqlLib.php';//为保障非SAE平台运行时SAE的MySQL类也可以使用
if($_POST["type"]=="login")
{
    //检测用户名和密码是否为空
    if($_POST["passwd"] && $_POST["username"])
    {

        $mysql = new SaeMysql();//与sae的数据库自动连接
        $sql = "SELECT username,code FROM `user` where username='".$_POST["username"]."';";
        $anyuser= $mysql->getData( $sql );

        //检测是否存在该用户名
        if(!$anyuser[0]['username'])
        {
            $Post = array ('type'=>"login",'status'=>0,'description'=>"不存在该用户名");
        }
        else
        {
            //用户密码做一次md5加密即为数据库中密码
            if(md5($_POST["passwd"]) == $anyuser[0]['code'])
            {
                $Post = array ('type'=>"login",'status'=>1,'username'=>$_POST["username"],'cookie'=>md5($_POST["username"]+$anyuser[0]['code'])  );
            }
            else
            {
                $Post = array ('type'=>"login",'status'=>0,'description'=>"密码错误");
            }
        }
        $mysql->closeDb();
    }
    else
    {
        $Post = array ('type'=>"login",'status'=>0,'description'=>"用户名和密码不能为空");
    }
}
//type出错时（理应不出现）
else
{
    $Post = array ('type'=>"login",'status'=>0,'description'=>"Wrong type post");
}

echo json_encode($Post);


/********  创建XML文档  ********/
/**
$doc = new DOMDocument();
$doc->formatOutput = true;

$r = $doc->createElement( "Post" );
$doc->appendChild( $r );

foreach($Post as $x=>$x_value)
{
    $TEMP = $doc->createElement($x);
    $TEMP->appendChild(
        $doc->createTextNode($x_value)
    );
    $r->appendChild($TEMP);
}

echo $doc->saveXML();
**/