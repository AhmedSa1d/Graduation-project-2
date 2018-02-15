<?php
	require_once("includes/constant.php");
	//1. creat a database connection
	$connection=mysql_connect(db_server,db_user,db_password);
	if(!$connection)
	{
		die("the connection failed :".mysql_error);
	}
	//2. select database
	$db_select=mysql_select_db(db_name,$connection);
	if(!$db_select)
	{
		die("failed to select the database".mysql_error);
	}
?>