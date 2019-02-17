<?php
include_once '../DAO.php';
$dao = \DAO\DAO::getInstance();
try{
    $distance = $_POST['distance'];
    $tonnage = $_POST['tonnage'];
    $type = $_POST['type'];
    $cost = $_POST['cost'];
$dao->query("INSERT INTO tariffs (distance_id, tonnage_id, type_id, cost) VALUES ($distance,$tonnage,$type,$cost);");
} catch (Exception $e){
    echo $e->getMessage();
}

header('Location: ' . $_SERVER['HTTP_REFERER']);