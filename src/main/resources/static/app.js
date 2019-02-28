/**
 *
 */

var zws = new Z_WS('/ws/drawing');


var numberOfItems = 1260;
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
            unHighlightElement();
        }

        var thisItem = $(this);
        previousItemOver = thisItem;

        highlightElement(thisItem);

        var idx = thisItem.attr('id').substring(14);
        console.log("idx:" + idx);
        zws.sendMessage(idx, 0);
    });

    $(".selector_item").on('click', function (evt) {

        var thisElement = $(this);

        if (SELECTED_ITEM == null) {
            selectElement(thisElement);
        } else if (SELECTED_ITEM.attr('id') === thisElement.attr('id')) {
            deSelectElement()
        }
    });

    function highlightElement(elem) {
        elem.css('background-color', 'orange');
    }

    function unHighlightElement() {
        previousItemOver.css('background-color', 'gray');
    }

    function selectElement(elem) {
        SELECTED_ITEM = elem;
        SELECTED_ITEM.css('background-color', 'red');
    }

    function deSelectElement() {
        SELECTED_ITEM.css('background-color', 'orange');
        SELECTED_ITEM = null;
    }

});

function renderPoint(x, y) {

}
