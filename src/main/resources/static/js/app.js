/**
 *
 */

var zws = new Z_WS('/ws/drawing');


var numberOfItems = 1268;
var FIELD_CONTAINER = null;
var SELECTED_ITEM = null;
var SELECTED_IDX = null;
var previousItemOver = null;

$(function () {

    var FIELD_CONTAINER = $('#field_container');
    console.log("ready!");
    for (var i = 0; i < numberOfItems; i++) {
        FIELD_CONTAINER.append("<a href='#!?idx=" + i + "'><div class='selector_item' id='selector_item_" + i + "'></div></a>");
    }

    /*$(".selector_item").on('mouseover', function (evt) {
        if (SELECTED_ITEM != null) {
            return;
        }

        if (previousItemOver) {
            unHighlightElement(previousItemOver);
        }

        var thisItem = $(this);
        previousItemOver = thisItem;

        highlightElement(thisItem);

        playForElement(thisItem);
    });*/

    if (SELECTED_IDX) {
        selectorItemHandler(SELECTED_IDX);
    }
});

function playForIndex(idx) {
    console.log("idx:" + idx);
    zws.sendMessage(idx);
}

function playForElement(elem) {
    var idx = elem.attr('id').substring(14);
    playForIndex(idx);
}

//$(".selector_item").on('click', );

function selectorItemHandler(idx) {

    SELECTED_IDX = idx;

    var thisElement = $("#selector_item_" + idx);
    if (!thisElement.length) {
        return
    }

    if (SELECTED_ITEM == null) {
        selectElement(thisElement);
        playForElement(thisElement);
    } else if (SELECTED_ITEM.attr('id') === thisElement.attr('id')) {
        pauseSelectElement();
        PLAYER_INSTANCE.pause();
        console.info("Paused.")
    } else {
        var prevSelected = SELECTED_ITEM;
        deSelectElement();
        unHighlightElement(prevSelected);
        selectElement(thisElement);
        playForElement(thisElement);
    }
}

function highlightElement(elem) {
    elem.css('background-color', 'orange');
}

function unHighlightElement(elem) {
    elem.css('background-color', 'gray');
}

function selectElement(elem) {
    SELECTED_ITEM = elem;
    SELECTED_ITEM.css('background-color', 'green');
}

function deSelectElement() {
    SELECTED_ITEM = null;
}

function pauseSelectElement() {
    SELECTED_ITEM.css('background-color', 'orange');
}

function renderPoint(x, y) {

}

