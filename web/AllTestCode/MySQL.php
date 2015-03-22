<?php
echo "hello";
for($i = 0; $i < 100; $i++)
{
	if($i % 2 == 0)
		echo $i;
}

$con = mysql_connect("127.0.0.1","bupt","buptsse");
mysql_select_db("fileManage", $con);
if (!$con)
{
	die('Could not connect: ' . mysql_error());
}



$sql = "INSERT INTO `test` (`text`) VALUES('hello2')";
if (!mysql_query($sql,$con))
{
	die('Error: ' . mysql_error());
}
else
{
	echo "\nsuccess!";
} 

$result = mysql_query("SELECT * FROM `test`;");

while($row = mysql_fetch_array($result))
{
	echo $row['text']."<br />";
}


mysql_close($con);

// some code