<?php
include './SaeMysqlLib.php';//为保障非SAE平台运行时SAE的MySQL类也可以使用
if($_POST["type"]=="addDepartment")
{
    //检测用户名和密码是否为空
    if($_POST["cookie"])
    {
        $mysql = new SaeMysql();//与sae的数据库自动连接
        $sql = "SELECT * FROM `user` where username='".$_POST['username']."';";
        $anyuser= $mysql->getData( $sql );

        if(md5($_POST["username"] + $anyuser[0]['passwd']) != $_POST["cookie"])
        {
            $POST = array ('type'=>"addDepartment",'status'=>0,'description'=>"登录信息有误");       
        }
        else
        {
            if($anyuser[0]['auth'] == -1)
            {
                if($_POST['departName']!="")
                {
                    $sql = "INSERT INTO `department` SET (`name`,`setupUserID`) VALUES ('".$_POST['departName']."', '".$anyuser[0]['id']."')";
                    if($mysql -> runSql($sql))
                    {
                        $POST = array ('type'=>"addDepartment",'status'=>1);
                    }
                    else
                    {
                        $POST = array ('type'=>"addDepartment",'status'=>0,'description'=>"数据库错误"); 
                    }
                }
                else
                {
                    $POST = array ('type'=>"addDepartment",'status'=>0,'description'=>"缺少参数"); 
                }
            }
            else
            {
                $POST = array ('type'=>"addDepartment",'status'=>0,'description'=>"权限不足"); 
            }
        }
        // $mysql->closeDb();
    }
    else
    {
        $POST = array ('type'=>"addDepartment",'status'=>0,'description'=>"没有登录");
    }
}
//type出错时（理应不出现）
else
{
    $POST = array ('type'=>"addDepartment",'status'=>0,'description'=>"Wrong type POST");
}

echo json_encode($POST);