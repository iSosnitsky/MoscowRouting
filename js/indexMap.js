ymaps.ready(init);
var myPolygon;

function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.73, 37.75],
        zoom: 9
    }, {
        searchControlProvider: 'yandex#search'
    });

    // Создаем многоугольник без вершин.
    myPolygon = new ymaps.Polygon([], {}, {
        // Курсор в режиме добавления новых вершин.
        editorDrawingCursor: "crosshair",
        // Максимально допустимое количество вершин.
        // editorMaxPoints: 6,
        // Цвет заливки.
        fillColor: '#00FF00',
        // Цвет обводки.
        strokeColor: '#0000FF',
        // Ширина обводки.
        strokeWidth: 1,
        change: function(oldValue, newValue){
            console.log(newValue);
        }
    });
    // Добавляем многоугольник на карту.
    myMap.geoObjects.add(myPolygon);
    // В режиме добавления новых вершин меняем цвет обводки многоугольника.
    var stateMonitor = new ymaps.Monitor(myPolygon.editor.state);
    stateMonitor.add("drawing", function (newValue) {
        myPolygon.options.set("strokeColor", newValue ? '#FF0000' : '#0000FF');
        console.log(newValue);
    });
    myPolygon.options.set({fillOpacity: 0.3, strokeOpacity: 0.0});


    function onZonesLoad(json) {
        console.log(json);
        // Добавляем зоны на карту.
        var deliveryZones = ymaps.geoQuery(json).addToMap(myMap);
        // Задаём цвет и контент балунов полигонов.
        deliveryZones.each(function (obj) {
            var color = obj.options.get('fillColor');
            color = color.substring(0, color.length);
            obj.options.set({fillColor: color, fillOpacity: 0.4});
            obj.properties.set('balloonContent', obj.properties.get('name'));
            obj.properties.set('balloonContentHeader', 'Стоимость доставки: ' + obj.properties.get('price') + ' р.')
        });
    }

    $.ajax({
        url: 'js/polygons.json',
        dataType: 'json',
        success: onZonesLoad
    });
    // Включаем режим редактирования с возможностью добавления новых вершин.
    myPolygon.editor.startDrawing();
}

