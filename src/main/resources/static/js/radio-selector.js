/**
 *
 */

var RADIO_SELECTOR = new RadioSelector();
var SELECTED_IDX = null;

function RadioSelector() {

    var SELECTED_ITEM = null;


    function playForIndex(idx) {
        console.log("idx:" + idx);
        zws.sendMessage(idx);
    }

    function playForElement(elem) {
        var idx = elem.attr('id').substring(14);
        playForIndex(idx);
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

    this.selectorItemHandler = function (idx) {

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
    };
}
