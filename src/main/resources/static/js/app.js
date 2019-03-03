/**
 *
 */

var zws = new Z_WS('/ws/drawing');

var NUMBER_OF_ITEMS = 1268;

$(function () {

    var fieldContainer = $('#field_container');
    console.log("ready!");
    for (var i = 0; i < NUMBER_OF_ITEMS; i++) {
        fieldContainer.append("<a href='#!?idx=" + i + "'><div class='selector_item' id='selector_item_" + i + "'></div></a>");
    }

    RADIO_SELECTOR.onUiBuilt();
});


function renderPoint(x, y) {

}

