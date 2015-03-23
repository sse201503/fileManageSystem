<?php
include './SaeMysqlLib.php';//为保障非SAE平台运行时SAE的MySQL类也可以使用
if($_POST["type"]=="login")
{
    //检测用户名和密码是否为空
    if($_POST["passwd"] && $_POST["username"])
    {
        $mysql = new SaeMysql();//与sae的数据库自动连接
        $sql = "SELECT * FROM `user` where username='".$_POST["username"]."';";
        $anyuser= $mysql->getData( $sql );

        //检测是否存在该用户名
        if(!$anyuser[0]['username'])
        {
            $POST = array ('type'=>"login",'status'=>0,'description'=>"不存在该用户名");
        }
        else
        {
            //用户密码做一次md5加密即为数据库中密码
            if(md5($_POST["passwd"]) == $anyuser[0]['passwd'])
            {
                $POST = array ('type'=>"login",'status'=>1,'username'=>$_POST["username"],'cookie'=>md5($_POST["username"]+$anyuser[0]['passwd'])  );
            }
            else
            {
                $POST = array ('type'=>"login",'status'=>0,'description'=>"密码错误");
            }
        }
        // $mysql->closeDb();
    }
    else
    {
        $POST = array ('type'=>"login",'status'=>0,'description'=>"用户名和密码不能为空");
    }
}
//type出错时（理应不出现）
else
{
    $POST = array ('type'=>"login",'status'=>0,'description'=>"Wrong type POST");
}

echo json_encode($POST);