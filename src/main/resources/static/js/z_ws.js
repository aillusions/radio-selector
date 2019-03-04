/**
 *
 */
function Z_WS(wsEndpointUri) {

    var stompClient;
    var counter = 0;

    function connectZws() {
        var socket = new SockJS(wsEndpointUri);
        stompClient = Stomp.over(socket);
        stompClient.debug = null;
        stompClient.connect({}, function (frame) {
            console.log("stompClient connected.");
            stompClient.subscribe('/topic/messages', function (chatMessage) {

                var JSON_ = JSON.parse(chatMessage.body);
                //renderPoint(JSON_["requestedX"], JSON_["requestedY"]);
                if (JSON_["song"]) {
                    RADIO_PLAYER.playAudio(JSON_["song"]);
                }
                counter++;
                console.log("counter: " + counter);
                console.log("song: " + JSON_["song"]);
            });
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

    function sendMessage(idx) {
        if (!stompClient.connected) {
            setTimeout(function () {
                sendMessage(idx)
            }, 50);
            return;
        }

        var StationIdxInboundMsg = {
            stationIdx: idx
        };
        if (stompClient !== null && stompClient.connected) {
            sendStationIdxInboundMsg(StationIdxInboundMsg);
        } else {
            connectZws(function () {
                sendStationIdxInboundMsg(StationIdxInboundMsg);
            });
        }
    }

    function sendStationIdxInboundMsg(StationIdxInboundMsg) {
        stompClient.send("/app/station-by-idx-dest", {}, JSON.stringify(StationIdxInboundMsg));
    }

    connectZws();
    return {
        sendMessage: sendMessage
    }
}
