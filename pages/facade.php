<?php
/**
 * Created by PhpStorm.
 * User: Kurbanov
 * Date: 19/04/2018
 * Time: 14:52
 */

require_once 'DAO.php';

class Facade{
    private $dao;
    private static $_instance;

    private function __construct()
    {
        $this->dao= \DAO\DAO::getInstance();
    }


    public static function getInstance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new Facade();
        }
        return self::$_instance;
    }


    public function insertPointFromRow($row){
        $this->dao->query("INSERT INTO points (point_name, time) VALUE ('$row[3]','$row[1]')");
    }


    public function selectPoints(){
        return $this->dao->select("SELECT * FROM points;");
    }
}