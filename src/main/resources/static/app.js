/**
 *
 */

var zws = new Z_WS('/ws/drawing');


var numberOfItems = 1268;
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
            unHighlightElement(previousItemOver);
        }

        var thisItem = $(this);
        previousItemOver = thisItem;

        highlightElement(thisItem);

        playForElement(thisItem);
    });

    function playForElement(elem) {
        var idx = elem.attr('id').substring(14);
        console.log("idx:" + idx);
        zws.sendMessage(idx, 0);
    }

    $(".selector_item").on('click', function (evt) {

        var thisElement = $(this);

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
    });

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

});

function renderPoint(x, y) {

}

