<?php
include_once '../DAO.php';

$dao = \DAO\DAO::getInstance();
$area = $_POST['area'];
$multiplier = $_POST['multiplier'];
try{
    $dao->query("INSERT INTO area_multiplier (area_name, multiplier) VALUE ('$area', $multiplier)");
} catch (Exception $e){
    echo $e->getMessage();
}

header('Location: ' . $_SERVER['HTTP_REFERER']);