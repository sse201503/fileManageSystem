<?php
include './SaeMysqlLib.php';//为保障非SAE平台运行时SAE的MySQL类也可以使用
if($_POST["type"]=="showList")
{
    //检测用户名和密码是否为空
    if($_POST["cookie"])
    {
        $mysql = new SaeMysql();//与sae的数据库自动连接
        $sql = "SELECT * FROM `user` where username='".$_POST["username"]."';";
        $anyuser= $mysql->getData( $sql );

        if(md5($_POST["username"] + $anyuser[0]['passwd']) != $_POST["cookie"])
        {
            $POST = array ('type'=>"showList",'status'=>0,'description'=>"登录信息有误");       
        }
        else
        {
            if($anyuser[0]['auth'] == -1)
            {
                $sql = "SELECT * FROM `department` WHERE 1;";
                $anyDepart = $mysql->getData($sql);

                $departList = array();
                for($i = 1; $anyDepart[$i-1]; $i++)
                {
                    $departList[$i] = $anyDepart[$i-1]['name'];
                }

                $POST = array ('type'=>"showList",'status'=>1,'data'=>$department);
            }
            else if($_POST['auth']!='0')
            {
                $sql = "SELECT * FROM `department` WHERE id = ".$_POST['auth'].";";
                $anyDepart = $mysql->getData($sql);

                $departList = array();
                $departList[$anyDepart[0]['id']] = $anyDepart[0]['name'];

                $POST = array ('type'=>"showList",'status'=>1,'data'=>$department);
            }
            else
            {
                $POST = array ('type'=>"showList",'status'=>0,'description'=>"还没有激活权限");
            }
        }
        // $mysql->closeDb();
    }
    else
    {
        $POST = array ('type'=>"showList",'status'=>0,'description'=>"没有登录");
    }
}
//type出错时（理应不出现）
else
{
    $POST = array ('type'=>"showList",'status'=>0,'description'=>"Wrong type POST");
}

echo json_encode($POST);