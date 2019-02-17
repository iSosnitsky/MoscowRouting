<?php
include_once '../DAO.php';


$key ="AIzaSyCe_jQ5qmbgoaGTPmwu58K_1Cr2Jj2ELs0";

$dao = \DAO\DAO::getInstance();


try{
    $data = $dao->select("SELECT * FROM moscow_routing.distance_between_points");
    if ($data){
        foreach($data AS $value){
            $distance = calculateDistance($value['point_address'], $value['to_point_address']);
            $id = $value['distancePointId'];
            $dao->query("UPDATE distance_between_points SET distance = $distance WHERE distancePointId=$id");
        }
    }
} catch (Exception $e){
    echo $e->getMessage();
}

function calculateDistance($from, $to){
    $from = encodeAddress($from);
    $to = encodeAddress($to);
    $key ="AIzaSyCe_jQ5qmbgoaGTPmwu58K_1Cr2Jj2ELs0";
    try{
//    $data = file_get_contents("https://maps.googleapis.com/maps/api/distancematrix/json?origins=41.43206,-81.38992&destinations=-33.86748,151.20699&key=$key");
        $data = json_decode(file_get_contents("https://maps.googleapis.com/maps/api/distancematrix/json?origins=$from&destinations=$to&key=$key"));
        return (int)($data->rows[0]->elements[0]->distance->value/1000);
    } catch (Exception $exception){
        echo $exception->getMessage();
    }
    return false;

}
function FormatMapContent($str){
    return str_replace(array('.', "\n", "\t", "\r"), '', $str);
}

function encodeAddress($str){
    return str_replace(' ', '+', $str);
}

echo json_encode();