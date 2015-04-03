<?php
include './SaeMysqlLib.php';//为保障非SAE平台运行时SAE的MySQL类也可以使用
if($_POST["type"]=="showFile")
{
    //检测用户名和密码是否为空
    if($_POST["cookie"])
    {
        $mysql = new SaeMysql();//与sae的数据库自动连接
        $sql = "SELECT * FROM `user` where username='".$_POST["username"]."';";
        $anyuser= $mysql->getData( $sql );

        if(md5($_POST["username"] + $anyuser[0]['passwd']) != $_POST["cookie"])
        {
            $POST = array ('type'=>"showFile",'status'=>0,'description'=>"登录信息有误");       
        }
        else
        {
            if($_POST['auth']!='0')
            {
                $sql = "SELECT * FROM `file` WHERE status = 1 AND auth = ".$_POST['auth'].";";
                $anyFile = $mysql->getData($sql);

                $allFile = array();
                for($i = 1; $allFile[$i-1]; $i++)
                {
                    $allFile[$i] = array('filename'=>$anyFile[$i-1]['name'],
                        'time'=>$anyFile[$i-1]['time'],
                        'location'=>$anyFile[$i-1]['location'],
                        'md5'=>$anyFile[$i-1]['md5']
                        );
                }

                $POST = array ('type'=>"showFile",'status'=>1,'data'=>$allFile);
            }
            else
            {
                $POST = array ('type'=>"showFile",'status'=>0,'description'=>"还没有激活权限");
            }
        }
        // $mysql->closeDb();
    }
    else
    {
        $POST = array ('type'=>"showFile",'status'=>0,'description'=>"没有登录");
    }
}
//type出错时（理应不出现）
else
{
    $POST = array ('type'=>"showFile",'status'=>0,'description'=>"Wrong type POST");
}

echo json_encode($POST);