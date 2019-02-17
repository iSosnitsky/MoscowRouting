<?php
include_once '../DAO.php';

$dao = \DAO\DAO::getInstance();
$value = $_POST['type'];
try{
    $dao->query("INSERT INTO type_categories (type) VALUE ('$value')");
} catch (Exception $e){
    echo $e->getMessage();
}

header('Location: ' . $_SERVER['HTTP_REFERER']);