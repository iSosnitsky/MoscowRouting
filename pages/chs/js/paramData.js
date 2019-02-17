$(document).ready(function () {
    var tableData;
    $.get('getParams.php').success(function (data) {
        console.log(data);
        tableData = JSON.parse(data);
        console.log(tableData);
        var distanceTable = $("#distanceTable").DataTable({
            data: tableData.distance,
            dom: "Bp",
            paging: 10,
            language: {
                url: 'datatablesRus.json'
            },
            //ajax: 'content/getData.php',
            searching: false,
            "columnDefs": [
                {"name": "from", "data": "distance_min", "targets": 0,render: function(data){return (data) ? data+" км" : ""}},
                {"name": "to", "data": "distance_max", "targets": 1,render: function(data){return (data) ? data+" км" : ""}},

            ]
        });

        var tonnageTable = $("#tonnageTable").DataTable({
            data: tableData.tonnage,
            dom: "Bp",
            language: {
                url: 'datatablesRus.json'
            },
            paging: 10,
            //ajax: 'content/getData.php',
            searching: false,
            "columnDefs": [
                {"name": "tonnage", "data": "tonnage", "targets": 0,render: function(data){return (data) ? data+" т." : ""}}
            ]
        });

        var typeTable = $("#typeTable").DataTable({
            data: tableData.type,
            dom: "Bp",
            //ajax: 'content/getData.php',
            language: {
                url: 'datatablesRus.json'
            },
            "paging": 10, // no pagination
            searching: false,
            "columnDefs": [
                {"name": "type", "data": "type", "targets": 0}
            ]
        });

        var tariffTable = $("#tariffTable").DataTable({
            data: tableData.tariff,
            //ajax: 'content/getData.php',
            dom: 'Brtip',
            paging: 20,
            buttons: [
                {
                    text: 'Перерассчитать стоимость маршрутов',
                    action: function (e, dt, node, config) {
                        window.open("calculatePrices.php");
                    }
                }
            ],
            searching: false,
            language: {
                url: 'dataTablesRus.json'
            },
            "columnDefs": [
                {"name": "id", "data": "id", "targets": 0},
                {"name": "type", "data": "type", "targets": 1},
                {"name": "tonnage", "data": "tonnage", "targets": 2,render: function(data){return (data) ? data+" т." : ""}},
                {"name": "min", "data": "min", "targets": 3,render: function(data){return (data) ? data+" км" : ""}},
                {"name": "max", "data": "max", "targets": 4,render: function(data){return (data) ? data+" км" : ""}},
                {"name": "cost", "data": "cost", "targets": 5,render: function(data){return (data) ? data+" ₽/км" : ""}},
            ]
        });

        var distanceDropdown = $("#distanceDropdown");
        $.each(tableData.distance, function() {
            distanceDropdown.append($("<option />").val(this.id).text(this.distance_min+'–'+this.distance_max));
        });

        var type = $("#typeDropdown");
        $.each(tableData.type, function() {
            type.append($("<option />").val(this.id).text(this.type));
        });

        var tonnage = $("#tonnageDropdown");
        $.each(tableData.tonnage, function() {
            tonnage.append($("<option />").val(this.id).text(this.tonnage));
        });


        var areaTable = $("#areaTable").DataTable({
            data: tableData.multiplier,
            //ajax: 'content/getData.php',
            "paging": false, // no pagination
            language: {
                url: 'dataTablesRus.json'
            },
            searching: false,
            "columnDefs": [
                {"name": "areaName", "data": "area_name", "targets": 0},
                {"name": "multiplier", "data": "multiplier", "targets": 1,render: function(data){return (data) ? "x"+data : ""}},
            ]
        });

        var area = $("#areaDropdown");
        $.each(tableData.regions, function() {
            area.append($("<option />").val(this.region).text(this.region));
        });

    });
});