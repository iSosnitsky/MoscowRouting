<html>
<head>
    <meta charset="UTF-8"/>
    <script src="../../js/jquery-2.1.4.min.js"></script>
    <script src="../../js/bootstrap.bundle.js"></script>
    <script src="../../DataTables-1.10.12/js/jquery.dataTables.js"></script>
    <script src="../../DataTables-1.10.12/js/dataTables.bootstrap.js"></script>
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
<!--    <script src="js/paramData.js"></script>-->


    <link rel="stylesheet" type="text/css" href="../../css/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="../../DataTables-1.10.12/css/dataTables.bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="../../DataTables-1.10.12/css/jquery.dataTables.min.css"/>
    <!--    <script src="js/indexMap.js" type="text/javascript"></script>-->
    <title>Распределение точек</title>
</head>
<body>
<ol class="breadcrumb">
    <li class="breadcrumb-item active">Карта</li>
    <!--    <li class="breadcrumb-item active">Обсуждение тарифа №</li>-->
</ol>
<div class="container">
    <div class="row">
        <div class="col-12">
            <h4>Тарифы</h4>
            <div>
                <table style="width:100%" class="table  table-striped " id="distanceTable">
                    <thead>
                    <tr>
                        <th>Дистанция</th>
                        <th>Тоннаж</th>
                        <th>Тип кузова</th>
                        <th>Стоимость</th>
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

    </div>
</div>

</div>
</body>
</html>
