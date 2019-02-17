<html>
<head>
    <meta charset="UTF-8"/>
    <script src="js/jquery-2.1.4.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
    <script src="js/bootstrap.bundle.js"></script>
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
<!--    <script src="js/indexMap.js" type="text/javascript"></script>-->
    <script src="js/iMap.js"></script>
    <title>Распределение точек</title>
</head>
<body>
<ol class="breadcrumb">
    <li class="breadcrumb-item active" >Карта</li>
<!--    <li class="breadcrumb-item active">Обсуждение тарифа №</li>-->
</ol>
<div class="container-fluid">
    <div id="map" style="width: 100%; height: 80%"></div>
    <form action="pages/upload.php" method="post" enctype="multipart/form-data" class="form-group">
        <label >XLS файл<input class="form-control-file" name="xls" type="file"></label>
        <div class="form-group">
            <input type="submit" value="Загрузить" class="btn btn-primary btn-light">
        </div>
    </form>
</div>
<div class="container-fluid" id="cards">
</div>
</body>
</html>
