<?php
require_once 'php_files/index.php';
require_once 'facade.php';
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

//error_reporting(E_ALL);
//ini_set('display_errors', 1);
class MyReadFilter implements \PhpOffice\PhpSpreadsheet\Reader\IReadFilter {

    public function readCell($column, $row, $worksheetName = '') {
        // Read title row and rows 20 - 30
        if ($row != 1) {
            return true;
        }
        return false;
    }
}
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $dao = \DAO\DAO::getInstance();
$file = $_FILES['xls'];
$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
$reader->setReadDataOnly(true);
$reader->setReadFilter(new MyReadFilter());
$array = $reader->load($file['tmp_name'])->getActiveSheet()->toArray();
$facade = Facade::getInstance();
unset($array[0]);

foreach ($array as $row) {
    $facade->insertPointFromRow($row);
}
header('Location: '.'http://185.75.182.94:20119');


