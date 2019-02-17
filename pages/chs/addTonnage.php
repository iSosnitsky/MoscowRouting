<?php
include_once '../DAO.php';

$dao = \DAO\DAO::getInstance();
$value = $_POST['tonnage'];
try{
    $dao->query("INSERT INTO tonnage_categories (tonnage) VALUE ($value)");
} catch (Exception $e){
    echo $e->getMessage();
}

header('Location: ' . $_SERVER['HTTP_REFERER']);