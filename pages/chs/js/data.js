$(document).ready(function () {
    var BCdata = [
        {factory:'Алексеевка',tonnage1:8,tonnage2:0},
        {factory:'Воронеж',tonnage1:0,tonnage2:9}
    ];

    var ABdata = [
        {factory:'ЗАО "Донмаслопродукт"',tonnage1:1,tonnage2:2},
        {factory:'ОАО "Донское солнечное" ',tonnage1:2,tonnage2:0},
        {factory:'ООО АДВАГ',tonnage1:0,tonnage2:3},
        {factory:'ИП Каребин В.П.',tonnage1:0,tonnage2:4},
        {factory:'ООО ТД "ЕвроОйл"',tonnage1:3,tonnage2:0},
        {factory:'ООО "Масло Потаповское"',tonnage1:2,tonnage2:0},
    ];

    var tableData;
    $.get('tableData.php').success(function (data) {
        console.log(data);
        tableData = JSON.parse(data);
        console.log(tableData.factories);
        var supplierTable = $("#supplierTable").DataTable({
            data: tableData.factories,
            paging: 10,
            dom: "p",
            //ajax: 'content/getData.php',
            sort: false,
            language: {
                url: 'datatablesRus.json'
            },
            "paging": true, // no pagination
            searching: false,
            "columnDefs": [
                {"name": "supplierName", "data": "supplierName", "targets": 0},
                {"name": "factoryName", "data": "factoryName", "targets": 1},
                {"name": "distance", "data": "distance", "targets": 2, defaultContent: "",render: function(data){return (data) ? data+" км" : ""}},
                {"name": "cost", "data": "cost", "targets": 3 , defaultContent: "",render: function(data){return (data) ? data+" ₽" : ""}},
                {"name": "tariff", "data": "tariff", "targets": 4, defaultContent: ""},
                {"name": "repeat", "data": "r", "targets": 5, defaultContent: ""}
            ]
        });

        var portTable = $("#portTable").DataTable({
            data: tableData.ports,
            paging: 10,
            sort: false,
            dom: "p",
            //ajax: 'content/getData.php',
            "paging": true, // no pagination
            searching: false,
            language: {
                url: 'datatablesRus.json'
            },
            "columnDefs": [
                {"name": "factoryName", "data": "factoryName", "targets": 0},
                {"name": "portName", "data": "portName", "targets": 1},
                {"name": "distance", "data": "distance", "targets": 2, defaultContent: "",render: function(data){return (data) ? data+" км" : ""}},
                {"name": "cost", "data": "cost", "targets": 3, defaultContent: "",render: function(data){return (data) ? data+" ₽" : ""}},
                {"name": "tariff", "data": "tariff", "targets": 4, defaultContent: ""},
                {"name": "repeat", "data": "r", "targets": 5, defaultContent: ""}
            ]
        });

        var routeTable = $("#tariffTable").DataTable({
            data: tableData.route,
            dom: "Bp",
            paging: 20,
            language: {
                url: 'datatablesRus.json'
            },
            sort: false,
            //ajax: 'content/getData.php',
            "paging": true, // no pagination
            searching: false,
            "columnDefs": [
                {"name": "supplier", "data": "supplier", "targets": 0},
                {"name": "factory", "data": "factory", "targets": 1},
                {"name": "port", "data": "port", "targets": 2},
                {"name": "totalDistance", "data": "totalDistance", "targets": 3,render: function(data){return (data) ? data+" км" : ""}},
                {"name": "totalCost", "data": "totalCost", "targets": 4,render: function(data){return (data) ? data+" ₽" : ""}}
            ]
        });

        var ABTable = $("#ABTable").DataTable({
            data: ABdata,
            dom: "Bp",
            paging: 20,
            language: {
                url: 'datatablesRus.json'
            },
            sort: false,
            //ajax: 'content/getData.php',
            "paging": true, // no pagination
            searching: false,
            "columnDefs": [
                {"name": "factory", "data": "factory", "targets": 0},
                {"name": "value1", "data": "tonnage1", "targets": 1,render: function(data){return (data) ? data+" т." : ""}},
                {"name": "value2", "data": "tonnage2", "targets": 2,render: function(data){return (data) ? data+" т." : ""}},
            ]
        });
        var BCTable = $("#BCTable").DataTable({
            data: BCdata,
            dom: "Bp",
            paging: 20,
            language: {
                url: 'datatablesRus.json'
            },
            sort: false,
            //ajax: 'content/getData.php',
            "paging": true, // no pagination
            searching: false,
            "columnDefs": [
                {"name": "factory", "data": "factory", "targets": 0},
                {"name": "value1", "data": "tonnage1", "targets": 1,render: function(data){return (data) ? data+" т." : ""}},
                {"name": "value2", "data": "tonnage2", "targets": 2,render: function(data){return (data) ? data+" т." : ""}},
            ]
        })
    });


});