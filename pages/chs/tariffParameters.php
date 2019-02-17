<html>
<head>
    <meta charset="UTF-8"/>

    <link rel="stylesheet" type="text/css" href="../../css/bootstrap.css"/>
<!--    <link rel="stylesheet" type="text/css" href="../../Buttons-1.2.2/css/buttons.bootstrap.css"/>-->

    <link rel="stylesheet" type="text/css" href="../../DataTables-1.10.12/css/dataTables.bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="../../DataTables-1.10.12/css/jquery.dataTables.min.css"/>

    <script src="../../js/jquery-2.1.4.min.js"></script>
    <script src="../../js/bootstrap.bundle.js"></script>
    <script src="../../DataTables-1.10.12/js/jquery.dataTables.js"></script>
    <script src="../../DataTables-1.10.12/js/dataTables.bootstrap.js"></script>
<!--    <script src="../../Buttons-1.2.2/js/dataTables.buttons.js"></script>-->
<!--    <script src="../../Buttons-1.2.2/js/buttons.html5.js"></script>-->
    <!--    <script src="../../Buttons-1.2.2/js/buttons.flash.js"></script>-->
<!--    <script src="../../Buttons-1.2.2/js/buttons.bootstrap.min.js"></script>-->
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
    <script src="js/paramData.js"></script>



    <!--    <script src="js/indexMap.js" type="text/javascript"></script>-->
    <title>Распределение точек</title>
</head>
<body>
<ol class="breadcrumb">
    <li class="breadcrumb-item active"> Параметры</li>
    <li class="breadcrumb-item"><a href="/pages/chs/index.php">Маршруты</a></li>
</ol>
<div class="container">

    <div class="row">
        <div class="col-4">
            <h4>Категории расстояний</h4>
            <div>
                <table style="width:100%" class="table table-borderless  table-striped " id="distanceTable">
                    <thead>
                    <tr>
                        <th>От</th>
                        <th>До</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <h5>Добавить</h5>
            <form action="addDistance.php" method="post" enctype="multipart/form-data" class="form-group">

                <label class="form-control-plaintext">От
                <input name="from">
                </label>
                <label class="form-control-plaintext">До
                <input name="to"></label>

                <button type="submit" class="btn-light btn" value="Добавить">Добавить</button>
            </form>
        </div>
        <div class="col-4">
            <h4>Категории тоннажа</h4>
            <div>
                <table style="width:100%" class="table table-borderless table-striped " id="tonnageTable">
                    <thead>
                    <tr>
                        <th>Тоннаж (до)</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <h5>Добавить</h5>
            <form action="addTonnage.php" method="post" enctype="multipart/form-data" class="form-group">

                <label class="form-control-plaintext">Тоннаж
                <input name="tonnage"></label>

                <button type="submit" class="btn-light btn" value="Добавить">Добавить</button>
            </form>
        </div>
        <div class="col-4">
            <h4>Тип кузова</h4>
            <div style="width:100%">
                <table style="width:100%" class="table table-borderless table-striped " id="typeTable">
                    <thead>
                    <tr>
                        <th>Тип кузова</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <h5>Добавить</h5>
            <form action="addType.php" method="post" enctype="multipart/form-data" class="form-group">

                <label class="form-control-plaintext">Тип
                <input name="type"></label><br>

                <button type="submit" class="btn-light btn" value="Добавить">Добавить</button>
            </form>
        </div>
    </div>

    <div class="row">
        <div class="col-8">
            <h4>Тарифы (Базовая стоимость)</h4>
            <div>
                <table style="width:100%" class="table table-borderless table-striped " id="tariffTable">
                    <thead>
                    <tr>
                        <th>№ Тарифа</th>
                        <th>Тип кузова</th>
                        <th>Тоннаж</th>
                        <th>От</th>
                        <th>До</th>
                        <th>Стоимость</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <h5>Добавить</h5>
            <form action="addTariff.php" method="post" enctype="multipart/form-data" class="form-group">

                <label class="form-control-plaintext">Тип кузова
                    <select class="form-control" name="type" id="typeDropdown" ></select>
                </label>
                <label class="form-control-plaintext">Тоннаж
                    <select class="form-control" name="tonnage" id="tonnageDropdown" ></select>
                </label>
                <label class="form-control-plaintext">Дистанция
                    <select class="form-control" name="distance" id="distanceDropdown" ></select>
                </label>
                <label class="form-control-plaintext">Стоимость
                    <input class="form-control" name="cost"></label>
                <button type="submit" class="btn-light btn" value="Добавить">Добавить</button>
            </form>
        </div>
        <div class="col-4">
            <h4>Добавочный региональный коэффициент</h4>
            <div>
                <table style="width:100%" class="table table-borderless table-striped " id="areaTable">
                    <thead>
                    <tr>
                        <th>Регион</th>
                        <th>Коэффициент</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <h5>Добавить</h5>
            <form action="addMultiplier.php" method="post" enctype="multipart/form-data" class="form-group">

                <label class="form-control-plaintext">Регион
                    <select class="form-control" name="area" id="areaDropdown" ></select>
                </label>
                <label class="form-control-plaintext">Коэффициент
                    <input class="form-control" name="multiplier"></label>
                <button type="submit" class="btn-light btn" value="Добавить">Добавить</button>
            </form>
        </div>

    </div>
    <div class="container" style="height: 300px">
        <a href="calculatePrices.php" class="btn btn-block btn-primary">Перерасчитать стоимость маршрутов</a>
    </div>
    <div class="container">

    </div>

</div>
</body>
</html>
