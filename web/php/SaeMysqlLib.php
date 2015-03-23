<?php
//如果不适用SAE平台的话，关于数据库的连接只需要修改这里即可
Class SaeMysql
{	
	var $sql;
	var $con;
	function __construct()
	{
		$con = mysql_connect("127.0.0.1","bupt","buptsse");
		mysql_query("set names 'utf8'",$con); 
		mysql_select_db("fileManage", $con);
	}
	function getData($sql)
	{
		$result = mysql_query($sql);
		while($arr[]=mysql_fetch_array($result)){}
			return $arr;
	}
	function runSql($sql)
	{
		if (!mysql_query($sql))
		{
			return false;
		}
		return true;
	}
} 
