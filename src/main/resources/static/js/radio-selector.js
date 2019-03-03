/**
 *
 */
function RadioSelector(radioPubSub, itemsNum) {
    var srv = this;

    srv.stationStatuses = {
        INITIAL: "INITIAL",
        PLAYING: "PLAYING",
        PAUSED: "PAUSED",
        VISITED: "VISITED"
    };

    srv.availableItems = [];
    srv.selectedIdx = null;

    srv.getSelectedStation = function () {
        return srv.availableItems[srv.selectedIdx];
    };

    srv.getSelectedIdx = function () {
        return srv.selectedIdx;
    };

    srv.setPausedNumber = function (num) {
        var idx = num - 1;
        srv.availableItems[idx].stationStatus = srv.stationStatuses.PAUSED;
        radioPubSub.getPubSub().publish(radioPubSub.pubSubEvents.EVT_RADIO_PAUSED, [idx]);
    };

    srv.setSelectedNumber = function (num) {

        if (num < 0) {
            srv.setPausedNumber(-num);
            return
        }

        var previousIdx = srv.selectedIdx;
        var idx = num - 1;

        if (previousIdx != null) {
            srv.availableItems[previousIdx].stationStatus = srv.stationStatuses.VISITED;
        }
        srv.selectedIdx = idx;
        srv.availableItems[idx].stationStatus = srv.stationStatuses.PLAYING;
        radioPubSub.getPubSub().publish(radioPubSub.pubSubEvents.EVT_RADIO_SELECTED, [idx]);
    };

    for (let i = 0; i < itemsNum; i++) {
        srv.availableItems.push({
            stationIndex: i,
            stationNumber: i + 1,
            stationStatus: srv.stationStatuses.INITIAL
        })
    }
}
