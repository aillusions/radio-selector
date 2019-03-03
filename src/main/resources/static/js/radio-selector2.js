/**
 *
 */
function RadioSelector(radioPubSub) {
    var srv = this;

    srv.selectedIdx = null;

    this.getSelectedIdx = function () {
        return srv.selectedIdx;
    };

    this.setSelectedIdx = function (idx) {
        srv.selectedIdx = idx;
        radioPubSub.getPubSub().publish(radioPubSub.pubSubEvents.EVT_RADIO_SELECTED, [idx]);
    };
}
