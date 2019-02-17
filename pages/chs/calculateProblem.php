<?php
include_once '../DAO.php';

$dao = \DAO\DAO::getInstance();

$supply = $dao->select("SELECT * FROM s_Points WHERE type='Suppliers' O");
$suppliers =[];
foreach ($supply AS $value){
    array_push($suppliers, new Supply($value));
}

$demand = $dao->select("SELECT * FROM s_Points WHERE type='Suppliers'");
$factories =[];
foreach ($demand AS $value){
    array_push($factories, new Demand($value));
}

$routesData = $dao->select("SELECT *, (cost/tonnage) AS costPerTonnage FROM distance_between_points WHERE route='A' ORDER BY costPerTonnage;");



class Cell{
    private $factory, $supplier, $cost;

    /**
     * Cell constructor.
     * @param $factory
     * @param $supplier
     * @param $cost
     */
    public function __construct($factory, $supplier, $cost)
    {
        $this->factory = $factory;
        $this->supplier = $supplier;
        $this->cost = $cost;
    }
}


class Demand{
    private $demand;
    private $name;
    private $cost;

    /**
     * Demand constructor.
     * @param $demand
     */
    public function __construct($array)
    {
        $this->demand = $array['tonnage'];
        $this->name = $array['name'];
    }
}

class Supply{
    private $supply;

    /**
     * Demand constructor.
     * @param $demand
     */
    public function __construct($array)
    {
        $this->supply = $array['tonnage'];
        $this->name = $array['name'];
    }
}