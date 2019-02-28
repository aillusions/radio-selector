/**
 *
 * @returns {{sendMessage: _sendMessage}}
 * @constructor
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
                renderPoint(JSON_["requestedX"], JSON_["requestedY"]);
                if (JSON_["song"]) {
                    playAudio(JSON_["song"]);
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

    function sendMessage(x, y) {
        var message = {
            x: x,
            y: y
        };
        if (stompClient !== null && stompClient.connected) {
            stompClient.send("/app/message", {}, JSON.stringify(message));
        } else {
            connectZws(function () {
                stompClient.send("/app/message", {}, message);
            });
        }
    }

    connectZws();
    return {
        sendMessage: sendMessage
    }
}

var player;
var playRequestedButNotYetPlaying = 0;
var lastUrl = null;

function playAudio(url) {

    var now = Date.now();

    if (url === lastUrl) {
        console.info("url === lastUrl");
        return;
    }

    lastUrl = url;

    if (playRequestedButNotYetPlaying
        && ((now - playRequestedButNotYetPlaying) < 200)) {
        console.info("playRequestedButNotYetPlaying");
        return;
    }

    if (!player) {
        player = document.getElementById('audioPlayerId');
    }

    player.src = url;
    player.volume = 0.8;

    playRequestedButNotYetPlaying = now;

    var promise = player.play();
    promise.then(function () {
        console.info('playing..');
        setTimeout(function () {
            playRequestedButNotYetPlaying = 0;
        }, 50);
    }, function (reason) {
        console.error(reason);
    })

}

