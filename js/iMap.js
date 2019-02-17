var polygonMap = {};

$(document).ready(function () {

    counter = 0;
    pointsCount = 0;
    assignedPoints = [];

    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map('map', {
                center: [55.73, 37.75],
                zoom: 9,
                controls: ['geolocationControl', 'searchControl']
            }),
            objectManager = new ymaps.ObjectManager({
                // Чтобы метки начали кластеризоваться, выставляем опцию.
                clusterize: false,
                // ObjectManager принимает те же опции, что и кластеризатор.
                gridSize: 32,
                clusterDisableClickZoom: true
            }),
            deliveryPoint = new ymaps.GeoObject({
                geometry: {type: 'Point'},
                properties: {iconCaption: 'Адрес'}
            }, {
                preset: 'islands#blackDotIconWithCaption',
                draggable: true,
                iconCaptionMaxWidth: '215'
            }),
            searchControl = myMap.controls.get('searchControl');
        searchControl.options.set({noPlacemark: true, placeholderContent: 'Введите адрес доставки'});
        myMap.geoObjects.add(deliveryPoint);
        myMap.geoObjects.add(objectManager);
        var deliveryZones;

        function onZonesLoad(json) {
            // json.features.forEach(function (item) {
            //     polygonMap[item.id] = [];
            // });
            // console.log(JSON.stringify(polygonMap));
            // console.log(json);
            // Добавляем зоны на карту.
            deliveryZones = ymaps.geoQuery(json).addToMap(myMap);
            // Задаём цвет и контент балунов полигонов.
            deliveryZones.each(function (obj) {
                var color = obj.options.get('fillColor');
                color = color.substring(0, color.length);
                obj.options.set({fillColor: color, fillOpacity: 0.4});
                obj.properties.set('balloonContent', obj.properties.get('name'));
                // obj.properties.set('id', obj.properties.get('polId'));
                obj.properties.set('balloonContentHeader', 'Стоимость доставки: ' + obj.properties.get('price') + ' р.')
            });

            // Проверим попадание результата поиска в одну из зон доставки.
            searchControl.events.add('resultshow', function (e) {
                highlightResult(searchControl.getResultsArray()[e.get('index')]);
            });

            objectManager.objects.events.add('click', function (e) {

                obj = objectManager.objects.getById(e._sourceEvent.originalEvent.objectId);
                // console.log(obj);
                coords = obj.geometry.coordinates;
                polygon = deliveryZones.searchContaining(coords).get(0);
                // console.log(coords);
                if (polygon) {
                    // console.log(polygon);
                    obj.options.set('iconColor', polygon._options.fillColor);
                }
            });

            // Проверим попадание метки геолокации в одну из зон доставки.
            myMap.controls.get('geolocationControl').events.add('locationchange', function (e) {
                highlightResult(e.get('geoObjects').get(0));
            });

            // При перемещении метки сбрасываем подпись, содержимое балуна и перекрашиваем метку.
            deliveryPoint.events.add('dragstart', function () {
                deliveryPoint.properties.set({iconCaption: '', balloonContent: ''});
                deliveryPoint.options.set('iconColor', 'black');
            });

            // По окончании перемещения метки вызываем функцию выделения зоны доставки.
            deliveryPoint.events.add('dragend', function () {
                highlightResult(deliveryPoint);
            });

            $.ajax({
                url: "../pages/getAllPoints.php",
                async: false
            }).success(function (data) {
                data = JSON.parse(data);

                // addPoint(data[0]);
                pointsCount = data.length;
                // console.log("size:");
                // console.log(data.length);
                data.forEach(function (item) {
                    addPoint(item);
                });


                // polygonMapKeys = Object.keys(polygonMap);


                // for(var item in Object.values(polygonMap)){
                //         console.log(item);
                // makeRoute(item);
                // }
                // for (var prop in polygonMap) {
                //
                // }
                // polygonMapKeys.forEach(function (key) {
                //     console.log(polygonMap[key]);
                //     makeRoute(polygonMap[key]);
                // })
                // addPoint({x: 55.831903, y: 37.411961})
            }).then(function (data) {
                // var valuesArray = Object.values(polygonMap);

                // valuesArray.forEach(function (item) {
                //     console.log(item[0]);
                //     makeRoute(item);
                // })
                // checkPoints();
            });

            function makeRoute(polygonObjects) {

                // console.log("polygonObjects:");
                // console.log(polygonObjects);

                polygonObjects.sort(sortByTime);
                routePoints = [];
                polygonObjects.forEach(function (point) {
                    routePoints.add(point.coordinates);

                });

                // console.log(routePoints);

                var multiRoute = new ymaps.multiRouter.MultiRoute({
                    // Описание опорных точек мультимаршрута.
                    referencePoints: routePoints,
                    // Параметры маршрутизации.
                    params: {
                        // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
                        results: 2
                    }
                });

                myMap.geoObjects.add(multiRoute);
            }


            function sortByTime(a, b) {
                var nameA = a.time.toUpperCase(); // ignore upper and lowercase
                var nameB = b.time.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            }


            function highlightResult(obj) {
                // Сохраняем координаты переданного объекта.
                var coords = obj.geometry.getCoordinates();
                // Находим полигон, в который входят переданные координаты.
                polygon = deliveryZones.searchContaining(coords).get(0);
                // console.log(coords);

                if (polygon) {
                    // Уменьшаем прозрачность всех полигонов, кроме того, в который входят переданные координаты.
                    deliveryZones.setOptions('fillOpacity', 0.4);
                    polygon.options.set('fillOpacity', 0.8);
                    // Перемещаем метку с подписью в переданные координаты и перекрашиваем её в цвет полигона.
                    deliveryPoint.geometry.setCoordinates(coords);
                    deliveryPoint.options.set('iconColor', polygon.options.get('fillColor'));
                    // Задаем подпись для метки.
                    if (typeof(obj.getThoroughfare) === 'function') {
                        setData(obj);
                    } else {
                        // Если вы не хотите, чтобы при каждом перемещении метки отправлялся запрос к геокодеру,
                        // закомментируйте код ниже.
                        ymaps.geocode(coords, {results: 1}).then(function (res) {
                            var obj = res.geoObjects.get(0);
                            setData(obj);
                        });
                    }
                    // console.log(deliveryPoint);
                } else {
                    // Если переданные координаты не попадают в полигон, то задаём стандартную прозрачность полигонов.
                    deliveryZones.setOptions('fillOpacity', 0.4);
                    // Перемещаем метку по переданным координатам.
                    deliveryPoint.geometry.setCoordinates(coords);
                    // Задаём контент балуна и метки.
                    deliveryPoint.properties.set({
                        iconCaption: 'Доставка транспортной компанией',
                        balloonContent: 'Cвяжитесь с оператором',
                        balloonContentHeader: ''
                    });
                    // Перекрашиваем метку в чёрный цвет.
                    deliveryPoint.options.set('iconColor', 'black');

                }


                function setData(obj) {
                    var address = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
                    if (address.trim() === '') {
                        address = obj.getAddressLine();
                    }
                    deliveryPoint.properties.set({
                        iconCaption: address,
                        balloonContent: address,
                        balloonContentHeader: '<b>Стоимость доставки: ' + polygon.properties.get('price') + ' р.</b>'
                    });
                }


            }

            function checkPoints() {
                // counter+=i;
                // console.log(assignedPoints.length);
                // console.log(pointsCount);
                if (assignedPoints.length >= pointsCount / 2) {
                    // console.log("polygonMap:");
                    // console.log(JSON.stringify(polygonMap));


                    // makeRoute(item);
                    for (let i = 0; i <= 13; i++) {
                        makeRoute(polygonMap[i]);
                    }


                } else {
                    window.setTimeout(checkPoints, 4000);
                }
            }
        }

        function addPoint(pointData) {
            if (pointData.x == 0) {
                addUncoordinatedPoint(pointData)
            } else {


                coordinates = [pointData.x, pointData.y];
                thisPoint = new ymaps.Placemark([pointData.x, pointData.y], {}, {
                    // Задаем стиль метки (метка в виде круга).
                    preset: "islands#circleDotIcon",
                    // Задаем цвет метки (в формате RGB).
                    iconColor: '#ff0000'
                });

                polygon = deliveryZones.searchContaining(coordinates).get(0);

                if (polygon) {
                    // Уменьшаем прозрачность всех полигонов, кроме того, в который входят переданные координаты.
                    // deliveryZones.setOptions('fillOpacity', 0.4);
                    // polygon.options.set('fillOpacity', 0.8);
                    // Перемещаем метку с подписью в переданные координаты и перекрашиваем её в цвет полигона.
                    // thisPoint.geometry.setCoordinates(coordinates);
                    thisPoint.options.set('iconColor', polygon.options.get('fillColor'));
                    // Задаем подпись для метки.
                    // console.log(deliveryPoint);
                }


                myMap.geoObjects.add(thisPoint);


            }
            ;
        }

        function addUncoordinatedPoint(pointData) {
            // console.log("looking for:"+pointData.point_name);
            ymaps.geocode(pointData.point_name, {
                /**
                 * Опции запроса
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
                 */
                // Сортировка результатов от центра окна карты.
                // boundedBy: myMap.getBounds(),
                // strictBounds: true,
                // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy.
                // Если нужен только один результат, экономим трафик пользователей.
                results: 1
            }).then(function (res) {

                // Выбираем первый результат геокодирования.
                var firstGeoObject = res.geoObjects.get(0),
                    // Координаты геообъекта.
                    coords = firstGeoObject.geometry.getCoordinates(),
                    // Область видимости геообъекта.
                    bounds = firstGeoObject.properties.get('boundedBy');

                firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
                // Получаем строку с адресом и выводим в иконке геообъекта.
                firstGeoObject.properties.set('iconCaption', pointData.point_name);
                // console.log(firstGeoObject);


                // firstGeoObject.properties.set('balloonContent', pointData.point_name);
                // Добавляем первый найденный геообъект на карту.
                // myMap.geoObjects.add(firstGeoObject);
                // console.log("FGO addded");
                // Масштабируем карту на область видимости геообъекта.
                // myMap.setBounds(bounds, {
                //     // Проверяем наличие тайлов на данном масштабе.
                //     checkZoomRange: true
                // });

                /**
                 * Все данные в виде javascript-объекта.
                 */
                // console.log('Все данные геообъекта: ', firstGeoObject.properties.getAll());
                /**
                 * Метаданные запроса и ответа геокодера.
                 * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderResponseMetaData.xml
                 */
                // console.log('Метаданные ответа геокодера: ', res.metaData);
                /**
                 * Метаданные геокодера, возвращаемые для найденного объекта.
                 * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderMetaData.xml
                 */
                // console.log('Метаданные геокодера: ', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData'));
                /**
                 * Точность ответа (precision) возвращается только для домов.
                 * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/precision.xml
                 */
                // console.log('precision', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.precision'));
                /**
                 * Тип найденного объекта (kind).
                 * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/kind.xml
                 */
                // console.log('Тип геообъекта: %s', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.kind'));
                // console.log('Название объекта: %s', firstGeoObject.properties.get('name'));
                // console.log('Описание объекта: %s', firstGeoObject.properties.get('description'));
                // console.log('Полное описание объекта: %s', firstGeoObject.properties.get('text'));
                /**
                 * Прямые методы для работы с результатами геокодирования.
                 * @see https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeocodeResult-docpage/#getAddressLine
                 */
                // console.log('\nГосударство: %s', firstGeoObject.getCountry());
                // console.log('Населенный пункт: %s', firstGeoObject.getLocalities().join(', '));
                // console.log('Адрес объекта: %s', firstGeoObject.getAddressLine());
                // console.log('Наименование здания: %s', firstGeoObject.getPremise() || '-');
                // console.log('Номер здания: %s', firstGeoObject.getPremiseNumber() || '-');

                /**
                 * Если нужно добавить по найденным геокодером координатам метку со своими стилями и контентом балуна, создаем новую метку по координатам найденной и добавляем ее на карту вместо найденной.
                 */

                fillColour = "#000000";

                // var myPlacemark = null;

                polygon = deliveryZones.searchContaining(coords).get(0);

                if (polygon) {
                    // console.log(polygon.options.get('fillColor'));
                    // console.log("polygon:");
                    // console.log(JSON.stringify(polygon));
                    // Уменьшаем прозрачность всех полигонов, кроме того, в который входят переданные координаты.
                    // deliveryZones.setOptions('fillOpacity', 0.4);
                    // polygon.options.set('fillOpacity', 0.8);
                    // Перемещаем метку с подписью в переданные координаты и перекрашиваем её в цвет полигона.
                    // thisPoint.geometry.setCoordinates(coordinates);
                    fillColour = polygon.options.get('fillColor');
                    // console.log(polygon.properties._data.name);
                    // myPlacemark.options.set('iconColor', polygon.options.get('fillColor'));
                    // myPlacemark.options.set('balloonContent', "has polygon");
                    // Задаем подпись для метки.
                    // console.log(deliveryPoint);


                    myPlacemark = new ymaps.Placemark(coords, {
                        hint: pointData.point_name,
                        balloonContent: pointData.point_name + '<br><strong>' + pointData.time + '</strong>'
                    }, {
                        preset: 'islands#icon',
                        iconColor: fillColour
                    });
                    myMap.geoObjects.add(myPlacemark);
                    // console.log(polygon);
                    if(polygonMap.hasOwnProperty(polygon.properties._data.polId)){
                        var mapped = false;
                        if(containsArrayWithNoSuchTime(polygonMap[polygon.properties._data.polId],fixTime(pointData.time))){
                            polygonMap[polygon.properties._data.polId].forEach(function (el,index) {
                                if(!mapped && (!containsTime(el, fixTime(pointData.time)))){
                                    polygonMap[polygon.properties._data.polId][index].push({
                                        pointName: pointData.point_name,
                                        coordinates: coords,
                                        time: fixTime(pointData.time)
                                    });
                                    mapped = true;
                                }
                            });
                        } else {
                            polygonMap[polygon.properties._data.polId].push([{
                                pointName: pointData.point_name,
                                coordinates: coords,
                                time: fixTime(pointData.time)
                            }]);
                        }

                    } else {
                        polygonMap[polygon.properties._data.polId]=[[{
                            pointName: pointData.point_name,
                            coordinates: coords,
                            time: fixTime(pointData.time)
                        }]];
                    }
                    // console.log(polygonMap[polygon.properties._data.polId]);
                    polygonMap[polygon.properties._data.polId].forEach(function (item, index) {
                        console.log(index);
                        renderRoute(item,polygon.properties._data.name+' Маршрут-'+(index+1), (polygon.properties._data.polId+"-"+index));
                    });
                    console.log(polygonMap[polygon.properties._data.polId]);
                    // renderRoute(polygonMap[polygon.properties._data.polId],polygon.properties._data.name,polygon.properties._data.polId);
                } else {
                    myPlacemark = new ymaps.Placemark(coords, {
                        hint: pointData.point_name,
                        balloonContent: pointData.point_name + '<br><strong>' + pointData.time + '</strong>'
                    }, {
                        preset: 'islands#icon',
                        iconColor: fillColour
                    });

                    myMap.geoObjects.add(myPlacemark);
                }

                assignedPoints.push({});
            }).then(function (err) {
                assignedPoints.push({});
            });
        }

        $.ajax({
            url: 'js/polygons.json',
            dataType: 'json',
            success: onZonesLoad,
            complete: function (data) {
                // console.log("polygonMap:");
                // console.log(JSON.stringify(polygonMap));
            }
        });


    };



    function renderRoute(routeData, routeName, id) {
        // console.log(id);
        cardElement = $('#' + id + '');
        // console.log("before sort:");
        // console.log(routeData);
        routeData = routeData.sort(sortByTime);
        // console.log("after sort:");
        // console.log(routeData);

        if (cardElement.length) {
            cardElement.remove();
            let html = '';
            html+= "<div class='card' style=\"width: 18rem; display: inline-block; margin: 10px\" id=" + id + ">\n" +
                "<div class='card-header' >" +
                routeName +
                "</div>" +
                "<ul class='list-group list-group-flush'>";

            routeData.forEach(function (item) {
                html += '<li class="list-group-item">' + item.pointName + '<br><span class="badge pull-left">'+item.time+'</span></li>';
            });

            html += '</ul>\n' +
                '</div>';
            // console.log(html);
            $('#cards').append(html);
        } else {
            let html = '';
            html+= "<div class='card' style='width: 17rem; display: inline-block; margin:10px;' id='" + id + "'>" +
                "<div class='card-header'>" +
                routeName +
                "</div>" +
                "<ul class='list-group list-group-flush'>";

            routeData.forEach(function (item) {
                html += '<li class="list-group-item">' + item.pointName + '<br><span class="badge pull-left">'+item.time+'</span></li>';
            });

            html += '</ul>' +
                '</div>';
            $('#cards').append(html);
        }



    }





    function sortByTime(a, b) {
        var nameA = a.time.toUpperCase(); // ignore upper and lowercase
        var nameB = b.time.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    }

});
function containsTime(array, time) {
    var bool = false;
    array.forEach(function (item) {
        console.log(escape(time.trim()));
        console.log(escape(item.time.trim()));
        if(escape(item.time.trim())===escape(time.trim())){
            console.log(time.trim()+' EQUALS '+item.time.trim());
            bool= true;
        }
    });
    return bool;
}

function containsArrayWithNoSuchTime(array, time) {
    console.log(array);
    var bool = false;
    array.forEach(function (subArray) {
        if (!containsTime(subArray,time)){
            // console.log('does contain time:'+time);
            // console.log(subArray);
            bool= true;
        } else {
            // console.log('does not contain time:'+time);
            // console.log(subArray);
        }
    });
    // console.log('does not contain time:'+time);
    return bool;
}


function fixTime(time) {
    var regex = /^(\d{1})\./;
    reTimeArray = [];
    time = time.replace('%3A','.');
    timeArray = time.split("-");
    timeArray.forEach(function (item) {
        // console.log("time inbetween:"+item);
        if (regex.test(item)){
            // console.log("time testing:"+item);
            reTimeArray.push('0'+item);
            // console.log('pushed:'+'0'+item);
            // return ('0'+item);
        } else {
            reTimeArray.push(item);
            // console.log('no time found, pushed:'+item);
            // return item;
        }
    });
    // console.log("time after:"+reTimeArray);
    return reTimeArray.join("-");

}
