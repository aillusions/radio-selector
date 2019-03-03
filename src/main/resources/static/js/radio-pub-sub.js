/**
 *
 */
function RadioPubSub() {

    var srv = this;

    srv.getPubSub = function () {
        return window.pubsub;
    };

    srv.pubSubEvents = {
        EVT_RADIO_SELECTED: "EVT_RADIO_SELECTED"
    }
}
