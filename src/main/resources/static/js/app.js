/**
 *
 */

var zws = new Z_WS('/ws/drawing');

var NUMBER_OF_ITEMS = 1268;

$(function () {

    var FIELD_CONTAINER = $('#field_container');
    console.log("ready!");
    for (var i = 0; i < NUMBER_OF_ITEMS; i++) {
        FIELD_CONTAINER.append("<a href='#!?idx=" + i + "'><div class='selector_item' id='selector_item_" + i + "'></div></a>");
    }

    if (SELECTED_IDX) {
        RADIO_SELECTOR.selectorItemHandler(SELECTED_IDX);
    }
});


function renderPoint(x, y) {

}

