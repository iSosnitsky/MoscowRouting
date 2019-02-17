<?php
include_once '../DAO.php';

try{


$dao = \DAO\DAO::getInstance();
$array = [];

$factories = $dao->select("SELECT point_name AS supplierName, to_point_name AS factoryName, distance, tariff, cost,`repeat` AS r  FROM distance_between_points WHERE route='A';");

if($factories){
    $array['factories'] = $factories;
}
} catch (Exception $e){
    echo $e->getMessage();
}

$ports = $dao->select("SELECT point_name AS factoryName, to_point_name AS portName, distance, tariff, cost,`repeat` AS r  FROM distance_between_points WHERE route='B';");

try{
if($ports){
    $array['ports'] = $ports;
}
} catch (Exception $e){
    echo $e->getMessage();
}

$routes = $dao->select("SELECT a.point_name AS supplier, a.to_point_name AS factory, b.to_point_name AS port, (a.cost+b.cost) AS totalCost, (a.distance+b.distance) AS totalDistance FROM ((SELECT * FROM distance_between_points WHERE route='A') as a CROSS JOIN (SELECT * FROM distance_between_points WHERE route='B') as b) WHERE a.to_point_id=b.point_id;");

try{
    if($routes){
        $array['route'] = $routes;
    }
} catch (Exception $e){
    echo $e->getMessage();
}


function FormatMapContent($str){
    return str_replace(array('.', "\n", "\t", "\r"), '', $str);
}

function encodeAddress($str){
    return str_replace(' ', '+', $str);
}

echo json_encode($array);