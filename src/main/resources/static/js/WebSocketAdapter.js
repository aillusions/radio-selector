/**
 *
 */
function WebSocketAdapter(wsEndpointUri, radioPubSub) {

    var stompClient;
    var counter = 0;

    function connectZws() {
        var socket = new SockJS(wsEndpointUri);
        stompClient = Stomp.over(socket);
        stompClient.debug = null;
        stompClient.connect({}, function (frame) {
            console.log("stompClient connected.");
            stompClient.subscribe('/topic/messages', onStationDataReceived);
        }, function (message) {
            disconnect();
            console.log("stompClient unable to connect: " + message);
        });

        return stompClient;
    }

    function disconnect() {
        if (stompClient !== null) {
            stompClient.disconnect();
            stompClient = null;
        }
        console.log("Disconnected");
    }

    function onStationDataReceived(webSocketMessage) {

        var WebSocketOutboundMsg = JSON.parse(webSocketMessage.body);
        if (WebSocketOutboundMsg["radioStreamUrl"]) {
            var streamUrl = WebSocketOutboundMsg["radioStreamUrl"];
            radioPubSub.getPubSub().publish(radioPubSub.pubSubEvents.EVT_RADIO_STREAM_URL_RECEIVED, [streamUrl]);
        }
        counter++;
        console.log("counter: " + counter);
        console.log("radioStreamUrl: " + WebSocketOutboundMsg["radioStreamUrl"]);
    }
    function issueGetRecordingByIdx(idx) {

        var StationIdxInboundMsg = {
            stationIdx: idx
        };

        if (stompClient !== null && stompClient.connected) {
            sendStationIdxInboundMsg(StationIdxInboundMsg);
        } else {
            setTimeout(function () {
                issueGetRecordingByIdx(idx)
            }, 50);
        }
    }

    function issueReportPlayback(url, time) {
        var PlayBackInboundMsg = {
            stationUrl: url,
            listeningPeriodMs: time
        };

        if (stompClient !== null && stompClient.connected) {
            sendPlayBackInboundMsg(PlayBackInboundMsg);
        } else {
            setTimeout(function () {
                issueReportPlayback(url, time)
            }, 50);
        }
    }

    function sendStationIdxInboundMsg(StationIdxInboundMsg) {
        stompClient.send("/app/station-by-idx-dest", {}, JSON.stringify(StationIdxInboundMsg));
    }

    function sendPlayBackInboundMsg(PlayBackInboundMsg) {
        stompClient.send("/app/station-playing-dest", {}, JSON.stringify(PlayBackInboundMsg));
    }

    connectZws();
    return {
        issueGetRecordingByIdx: issueGetRecordingByIdx,
        issueReportPlayback: issueReportPlayback
    }
}
