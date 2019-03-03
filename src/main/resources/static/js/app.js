/**
 *
 */

var RADIO_PUB_SUB = new RadioPubSub();
var RADIO_WEBSOCK = new Z_WS('/ws/drawing');
var RADIO_SELECTOR = new RadioSelector(RADIO_PUB_SUB);
var RADIO_PLAYER = new RadioPlayer();

var NUMBER_OF_ITEMS = 1268;

$(function () {
    var fieldContainer = $('#field_container');
    console.log("ready!");
    for (var i = 0; i < NUMBER_OF_ITEMS; i++) {
        fieldContainer.append("<a href='#!?idx=" + i + "'><div class='selector_item' id='selector_item_" + i + "'></div></a>");
    }

    RADIO_SELECTOR.onUiBuilt();
});

