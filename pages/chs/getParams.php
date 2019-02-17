<?php
include_once '../DAO.php';

$dao = \DAO\DAO::getInstance();

$data = array();

$tonnage =$dao->select("SELECT * FROM tonnage_categories");

if($tonnage){
    $data['tonnage'] = $tonnage;
}

$types =$dao->select("SELECT * FROM type_categories");

if($types){
    $data['type'] = $types;
}

$distances =$dao->select("SELECT * FROM distance_categories");

if($distances){
    $data['distance'] = $distances;
}

$tariffs = $dao->select("SELECT tariffs.id AS id, tariffs.cost AS cost, type.type AS type, tonnage.tonnage AS tonnage, distance.distance_min AS min, distance.distance_max AS max FROM tariffs INNER JOIN distance_categories distance ON distance.id = tariffs.distance_id INNER JOIN tonnage_categories tonnage ON tonnage.id = tonnage_id INNER JOIN type_categories type ON type.id = tariffs.type_id");

if ($tariffs){
    $data['tariff'] = $tariffs;
}

$multipliers = $dao->select("SELECT * FROM area_multiplier");

if ($multipliers){
    $data['multiplier'] = $multipliers;
}

$area = $dao->select("SELECT DISTINCT region FROM s_Points;");
if ($area){
    $data['regions'] = $area;
}

echo json_encode($data);


