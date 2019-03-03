/**
 *
 */
function RadioSelector() {
    var selectedIdx = null;
    var selectedItem = null;

    function playForIndex(idx) {
        console.log("idx:" + idx);
        RADIO_WEBSOCK.sendMessage(idx);
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
        selectedItem = elem;
        selectedItem.css('background-color', 'green');
    }

    function deSelectElement() {
        selectedItem = null;
    }

    function pauseSelectElement() {
        selectedItem.css('background-color', 'orange');
    }

    this.onUiBuilt = function () {
        if (selectedIdx) {
            RADIO_SELECTOR.selectorItemHandler(selectedIdx);
        }
    };

    this.selectorItemHandler = function (idx) {

        selectedIdx = idx;

        var thisElement = $("#selector_item_" + idx);
        if (!thisElement.length) {
            return
        }

        if (selectedItem == null) {
            selectElement(thisElement);
            playForElement(thisElement);
        } else if (selectedItem.attr('id') === thisElement.attr('id')) {
            pauseSelectElement();
            PLAYER_INSTANCE.pause();
            console.info("Paused.")
        } else {
            var prevSelected = selectedItem;
            deSelectElement();
            unHighlightElement(prevSelected);
            selectElement(thisElement);
            playForElement(thisElement);
        }
    };
}
