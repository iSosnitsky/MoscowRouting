<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once 'facade.php';
$facade = Facade::getInstance();
$array = $facade->selectPoints();
echo json_encode($array);