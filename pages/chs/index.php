<html>
<head>
    <meta charset="UTF-8"/>
    <script src="../../js/jquery-2.1.4.min.js"></script>
    <script src="../../js/bootstrap.bundle.js"></script>
    <script src="../../DataTables-1.10.12/js/jquery.dataTables.js"></script>
    <script src="../../DataTables-1.10.12/js/dataTables.bootstrap.js"></script>
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
    <script src="js/data.js"></script>


    <link rel="stylesheet" type="text/css" href="../../css/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="../../DataTables-1.10.12/css/dataTables.bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="../../DataTables-1.10.12/css/jquery.dataTables.min.css"/>
    <!--    <script src="js/indexMap.js" type="text/javascript"></script>-->
    <title>Распределение точек</title>
</head>
<body>
<ol class="breadcrumb">
    <li class="breadcrumb-item"> <a href="/pages/chs/tariffParameters.php">Параметры</a></li>
        <li class="breadcrumb-item active">Маршруты</li>
</ol>
<div class="container-fluid">
    <div class="row">
    <div class="col-6">
        <h2>Поставщик -> Завод</h2>
        <div>
            <table class="table table-striped " id="supplierTable">
                <thead>
                <tr>
                    <th>Поставщик</th>
                    <th>Завод</th>
                    <th>Расст.</th>
                    <th>Стоимость</th>
                    <th>Тариф</th>
                    <th>Рейсы</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
    <div class="col-6">
        <h2>Завод -> Порт</h2>
        <div>
            <table class="table  table-striped " id="portTable">
                <thead>
                <tr>
                    <th>Завод</th>
                    <th>Порт</th>
                    <th>Расст.</th>
                    <th>Стоимость</th>
                    <th>Тариф</th>
                    <th>Рейсы</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
    </div>
    <div class="row">
    <div class="col-12">
        <h2>Маршруты</h2>
        <div>
            <table class="table  table-striped " id="tariffTable">
                <thead>
                <tr>
                    <th>Поставщик</th>
                    <th>Завод</th>
                    <th>Порт</th>
                    <th>Расстояние итого</th>
                    <th>Стоимость итого</th>
                </tr>
                </thead>
            </table>
        </div></div>
    </div>
    <div class="container" style="height: 50px">
    </div>
    </div>
    <div class="row">
        <div class="col-6">
            <h2>Поставщик -> Завод</h2>
            <div>
                <table class="table  table-striped " id="ABTable">
                    <thead>
                    <tr>
                        <th>Поставщик</th>
                        <th>Алексеевка</th>
                        <th>Воронеж</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="col-6">
            <h2>Завод -> Порт</h2>
            <div>
                <table class="table  table-striped " id="BCTable">
                    <thead>
                    <tr>
                        <th>Завод</th>
                        <th>ТЕМРЮК</th>
                        <th>ЕЙСК</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
<!--    <div class="col-50">-->
<!---->
<!--    </div>-->

</div>
<div class="container-fluid" id="cards">
</div>
</body>
</html>
