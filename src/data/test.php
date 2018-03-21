<?php
	header('Content-Type:application/json; charset=utf-8');

	$data = array('user'=>0,'login'=>1,'hasproduct'=>1);

	exit(json_encode($data));
?>
