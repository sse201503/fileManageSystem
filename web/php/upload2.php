<?php
include './SaeMysqlLib.php';//为保障非SAE平台运行时SAE的MySQL类也可以使用
if($_POST['type'] == "uploadFile")
{
	// if ($_FILES["file"]["error"] > 0)
	// {
	// 	$POST = array ('type'=>"uploadFile",'status'=>0,'description'=>"没有选择文件");
	// }
	// else if($_POST['department'])
	// {
	// 	$POST = array ('type'=>"uploadFile",'status'=>0,'description'=>"缺乏参数");		
	// }
	// else
	// {
		$mysql = new SaeMysql();//与sae的数据库自动连接
		$sql = "SELECT * FROM `user` where username='".$_POST["username"]."';";
		$anyuser= $mysql->getData( $sql );

		if(md5($_POST["username"] + $anyuser[0]['passwd']) != $_POST["cookie"])
		{
			$POST = array ('type'=>"uploadFile",'status'=>0,'description'=>"登录信息有误");		
		}
		else if($anyuser[0]['auth'] == -1 || $anyuser[0]['auth'] == $_POST['auth'])
		{
			//目录名
			$folder = md5(time().$anyuser[0]['id'].rand(1,99999));
			mkdir("../upload/",0777);
			mkdir("../upload/".$_POST['auth'],0777);
			mkdir("../upload/".$_POST['auth']."/".$folder."/",0777);
			$url = "../upload/".$_POST['auth']."/".$folder."/";

			//传文件
			move_uploaded_file($_FILES["file"]["tmp_name"],$url.$_FILES["file"]["name"]);

			//存数据库
			$sql = "INSERT INTO `file` (`name`,`userId`,`auth`,`location`,`status`,`md5`) VALUES ('".$_FILES["file"]["name"]."', 'aaaa', '11111111', 'aaa', 1, '".md5_file($url.$_FILES["file"]["name"])."');";
			if($mysql -> runSql($sql))
			{
				$POST = array ('type'=>"uploadFile",'status'=>1,'fileName'=>$_FILES["file"]["name"]);
			}
			else
			{
				$POST = array ('type'=>"uploadFile",'status'=>0,'description'=>"未知错误");	
			}
		}
		else
		{
			$POST = array ('type'=>"uploadFile",'status'=>0,'description'=>"没有权限");		
		}		
	// }
}
else
{
	$POST = array ('type'=>"uploadFile",'status'=>0,'description'=>"Wrong type POST");
}
echo json_encode($POST);



?>