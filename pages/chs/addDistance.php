<?php
include_once '../DAO.php';

$dao = \DAO\DAO::getInstance();
$from = $_POST['from'];
$to = $_POST['to'];
try{
    $dao->query("INSERT INTO distance_categories (distance_min, distance_max) VALUE ($from, $to)");
} catch (Exception $e){
    echo $e->getMessage();
}

header('Location: ' . $_SERVER['HTTP_REFERER']);