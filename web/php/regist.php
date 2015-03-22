<?php
/**
 * receiving method: Post
 * receiving msg: type=regist 或 isUsernameOK
 * 				&username=NEWUSERNAME
 * 				&passwd=PASSWD
 * 				&email=EMAIL
 * 				&verification=VERIFICSTION
 * 				(&qq=QQ)
 * 				(&name=NAME)
 * 				&identity=IDENTITY
 * 				(&birty=BIRTY)
 * 				(&graduateyear=GRADUATEYEAR)
 * 				(&classno=CLASSNO)
 * 	answering type: JSON
 * 	answering msg: {"type":"regist","status":1,"description":"","username":"","cookie":""}
 */

include './SaeMysqlLib.php';//为保障非SAE平台运行时SAE的MySQL类也可以使用
if($_POST['type'] == "isUsernameOK")
{
	if(preg_match("|^[0-9]{5,10}$|u",$_POST['username']) == 0)
	{
		$returnMsg = array(
			'type' => "isUsernameOK", 
			'username' => $_POST['username'], 
			'status' => 0,
			'description' => "用户名格式错误" );
	}
	else
	{
		$mysql = new SaeMysql();
		$sql = "SELECT * FROM `user` WHERE `username` = '".$_POST['username']."'";
		$anyuser = $mysql -> getData($sql);
		if($anyuser[0] == null)
		{
			$returnMsg = array(
				'type' => "isUsernameOK", 
				'username' => $_POST['username'], 
				'status' => 1);
		}
		else
		{
			$returnMsg = array(
				'type' => "isUsernameOK", 
				'username' => $_POST['username'], 
				'status' => 0,
				'description' => "用户名重复，请更换一个尝试" );
		}
	}
}
else if($_POST['type'] == "regist")
{
	
} 
else
{
	$returnMsg = array('type'=>"regist",'status'=>0,'description'=>"Wrong type post");
}
echo json_encode($returnMsg);

?>