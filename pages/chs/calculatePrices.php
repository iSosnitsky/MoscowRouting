<?php
include_once '../DAO.php';
try{
$dao = \DAO\DAO::getInstance();


    $tariffsData = $dao->select("SELECT tariffs.id, distance_min, distance_max, type, tonnage, cost FROM tariffs INNER JOIN tonnage_categories AS tonnages ON tonnage_id=tonnages.id INNER JOIN type_categories AS types ON type_id=types.id INNER JOIN distance_categories AS distances ON distance_id=distances.id;");
//    echo  json_encode($tariffsData);
    $tariffs = [];
    $areas = $dao->select("SELECT * FROM area_multiplier");
    $tariffs = [];
    if ($tariffsData){
        foreach($tariffsData AS $value) {
            array_push($tariffs, new Tariff($value));
        }
        $routesData = $dao->select("SELECT * FROM distance_between_points");
        $routes=[];
        foreach($routesData AS $value) {
            $route = new Route($value,$areas);
            $route->pickTariff($tariffs);
            array_push($routes, $route);
        }
        foreach($routes AS $value) {
            if($value->tariffId!=null && $value->cost!=null){
                $dao->query("UPDATE distance_between_points SET cost=$value->cost,tariff=$value->tariffId,`repeat`=$value->repeat WHERE distancePointId=$value->id;");
            }
        }

//        echo "<div> routes<br>";
//        echo json_encode($routes);
//        echo "</div><br>tariffs<br>";
//        echo json_encode($tariffs);
//        echo "fgsfds";
        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }

} catch (Exception $e){
    echo $e->getMessage();
}



class Route{
    public $id, $distance, $tonnage, $cost, $routeType, $tariff, $tariffId, $area, $areaMultiplier =1.0, $repeat;

    public function __construct($array,$areaArray)
    {
        $this->id=$array['distancePointId'];
        $this->distance=$array['distance'];
        $this->tonnage=$array['tonnage'];
        $this->routeType=$array['route'];
        $this->area=$array['delivery_area'];
        foreach($areaArray AS $multiplier){
            if($multiplier['areaName']==$this->area) $this->areaMultiplier=$multiplier['multiplier'];
        }
    }

    public function pickTariff($array){
        $filtereadArray = array_filter($array, function($value){
            if ($value->maxDistance<$this->distance){
                return false;
            }
            if ($value->minDistance>$this->distance){
                return false;
            }
            return true;
        });
        $this->setBestTariff($filtereadArray);

    }


    private function setBestTariff($array){
        $bestTariff=null;
        $bestCost=null;
        $repeats=1;
        foreach ($array AS $tariff){
            $multiplier = 1;
            $areaMultiplier = 1;
            if ($tariff->tonnage<$this->tonnage){
                $tempTonnage = $tariff->tonnage;
                do {
                    $tempTonnage-=$this->tonnage;
                    $multiplier++;
                } while ($tempTonnage>0);
            }
            $tempCost = (int)((($tariff->costPerKilometer*$this->distance)*$areaMultiplier)*$multiplier);
            if(($bestCost==null)||$bestCost>$tempCost) {
                $bestTariff = $tariff;
                $bestCost = $tempCost;
                $repeats = $multiplier;
            }
        }
        $this->tariff= $bestTariff;
        $this->tariffId = $this->tariff->id;
        $this->cost = $bestCost;
        $this->repeat = $repeats;
    }

}


class Tariff{
    public $id,$minDistance,$maxDistance,$tonnage,$type,$costPerKilometer;

    /**
     * Tariff constructor.
     * @param $array
     */
    public function __construct($array)
    {
        $this->id=$array['id'];
        $this->minDistance=$array['distance_min'];
        $this->maxDistance=$array['distance_max'];
        $this->maxDistance=$array['distance_max'];
        $this->tonnage=$array['tonnage'];
        $this->type=$array['type'];
        $this->costPerKilometer=$array['cost'];
    }
}

