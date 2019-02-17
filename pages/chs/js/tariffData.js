$(document).ready(function () {
    var tableData;
    $.get('getParams.php').success(function (data) {
        console.log(data);
        tableData = JSON.parse(data);
        console.log(tableData);

    });
});