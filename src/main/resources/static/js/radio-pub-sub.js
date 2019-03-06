/**
 *
 */
function RadioPubSub() {

    var srv = this;

    srv.getPubSub = function () {
        return window.pubsub;
    };

    srv.pubSubEvents = {
        EVT_RADIO_SELECTED: "EVT_RADIO_SELECTED",
        EVT_RADIO_SET_TO_PAUSE: "EVT_RADIO_SET_TO_PAUSE",
        EVT_RADIO_STREAM_URL_RECEIVED: "EVT_RADIO_STREAM_URL_RECEIVED",
        EVT_RADIO_PLAYBACK_STARTED: "EVT_RADIO_PLAYBACK_STARTED",
        EVT_RADIO_PLAYBACK_PAUSED: "EVT_RADIO_PLAYBACK_PAUSED"
    }
}
