/**
 *
 */

var zws = new Z_WS('/ws/drawing');


var numberOfItems = 96;
var FIELD_CONTAINER = null;
var SELECTED_ITEM = null;
var previousItemOver = null;

$(function () {

    var FIELD_CONTAINER = $('#field_container');
    console.log("ready!");
    for (var i = 0; i < numberOfItems; i++) {
        FIELD_CONTAINER.append("<div class='selector_item' id='selector_item_" + i + "'></div>");
    }

    $(".selector_item").on('mouseover', function (evt) {
        if (SELECTED_ITEM != null) {
            return;
        }

        if (previousItemOver) {
            previousItemOver.css('background-color', 'gray');
        }

        previousItemOver = $(this);

        $(this).css('background-color', 'orange');

        var x = evt.pageX - FIELD_CONTAINER.offset().left;
        var y = evt.pageY - FIELD_CONTAINER.offset().top;

        console.log("x:" + Math.round(x) + " y:" + Math.round(y));

        zws.sendMessage(Math.round(x), Math.round(y));
    });

    $(".selector_item").on('click', function (evt) {

        var thisElement = $(this);

        if (SELECTED_ITEM == null) {
            SELECTED_ITEM = thisElement;
            SELECTED_ITEM.css('background-color', 'red');
        } else if (SELECTED_ITEM.attr('id') === thisElement.attr('id')) {
            SELECTED_ITEM.css('background-color', 'orange');
            SELECTED_ITEM = null;
        }

    });

});

function renderPoint(x, y) {

}
