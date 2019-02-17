<?php
namespace DAO;

define('PHP_NEWLINE', '<br>' . PHP_EOL);

use mysqli;

class DAO
{
    const AUTO_START_TRANSACTION = true;
    private static $_instance;
    private $_transactionStarted = false;
    private $_connection;

    private function __construct()
    {
        $this->_connection = $this->privateStartConnection();
        if ($this->_connection && $this::AUTO_START_TRANSACTION) {
            $this->startTransaction();
        }
    }

    private function privateStartConnection()
    {
        if (!$this->_connection) {
            $config = parse_ini_file('db_connection.ini');
            $connection = @new mysqli('localhost', $config['username'], $config['password'], $config['dbname']);
//            $connection = @new mysqli('185.75.182.94', 'root', 'aftR179Kp', $config['dbname']);
            if ($connection->connect_errno) {
                throw new \Exception('Connection error - ' . $connection->connect_error);
            }
            //$connection->set_charset()
            mysqli_set_charset($connection, "utf8"); // fixed encoding error
            return $connection;
        }
        return false;
    }

    public function startTransaction()
    {
        if (!$this->_transactionStarted) {
            return $this->_transactionStarted = $this->query('START TRANSACTION;');
        }
        return false;
    }

    public function select($query)
    {
        $rows = array();
        $result = $this->query($query);
        if ($result === false) {
            return false;
        }
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        return $rows;
    }

    function query($sql)
    {
        $connection = $this->getConnection();
        if (!$connection) throw new \Exception('There is no connections');
        while ($connection->more_results()) $connection->next_result();
        $result = $connection->query($sql);
        if ($connection->errno) {
            throw new \Exception('Ошибка в запросе: ' . $connection->error . '. Запрос: ' . $sql);
        }
        return $result;
//        if($this->_connection->multi_query($sql)) {
//            $result = '';
//            do {
//                $result = $this->_connection->store_result();
//            } while($this->_connection->next_result());
//            return $result;
//        }
//        else {
//            throw new \MysqlException('Ошибка в запросе: ' . $this->_connection->error . '. Запрос: ' . $sql);
//        }
    }

    function getConnection()
    {
        if (!$this->_connection) throw new \Exception('There is no connections');
        return $this->_connection;
    }

    public static function getInstance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new DAO();
        }
        return self::$_instance;
    }

    public function checkString($str)
    {
        $connection = $this->getConnection();
        return $connection->real_escape_string($str);
    }

    public function startConnection()
    {
        $this->_connection = $this->privateStartConnection();
        if ($this->_connection && $this::AUTO_START_TRANSACTION) {
            return $this->startTransaction();
        }
        return !($this->_connection === false);
//        $connection = $this->privateStartConnection();
//        if ($connection) {
//            $this->_connection = $connection;
//            if ($this::AUTO_START_TRANSACTION) {
//                return $this->startTransaction();
//            }
//        }
//        return !($connection === false);
    }

    public function rollback()
    {
        if ($this->_transactionStarted) {
            $this->_transactionStarted = !$this->query('ROLLBACK;');
            return !$this->_transactionStarted;
        }
        return false;

    }

    function __destruct()
    {
        $this->closeConnection();
    }

    function closeConnection()
    {
        if (!$this->_connection) {
            return false;
        }
        $this->commit();
        $this->_connection->close();
        $this->_connection = false;
        return true;
    }

    public function commit()
    {
        if ($this->_transactionStarted) {
            $this->query('COMMIT');
            $this->_transactionStarted = false;
            return true;
        }
        return false;
    }

}

