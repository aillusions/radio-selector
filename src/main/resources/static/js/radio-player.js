/**
 *
 */
function RadioPlayer(radioPubSub) {
    var srv = this;

    var playerInstance;
    var playRequestedButNotYetPlaying = 0;

    radioPubSub.getPubSub().subscribe(radioPubSub.pubSubEvents.EVT_RADIO_SELECTED, function (idx) {
        RADIO_WEBSOCK.issueGetRecordingByIdx(idx);
    });

    radioPubSub.getPubSub().subscribe(radioPubSub.pubSubEvents.EVT_RADIO_PAUSED, function () {
        srv.pauseAudio();
    });

    setInterval(function () {
        if (playingUrl) {
            RADIO_WEBSOCK.issueReportPlayback(playingUrl, 1000);
        }
    }, 1000);

    srv.pauseAudio = function () {
        playerInstance.pause();
        playingUrl = null;
    };

    var playingUrl = null;
    srv.playAudio = function (url) {

        var now = Date.now();

        if (playRequestedButNotYetPlaying
            && ((now - playRequestedButNotYetPlaying) < 10)) {
            console.info("playRequestedButNotYetPlaying");
            return;
        }

        if (!playerInstance) {
            playerInstance = document.getElementById('audioPlayerId');
            playerInstance.volume = 0.3;
        }

        playerInstance.src = url;

        playRequestedButNotYetPlaying = now;

        var promise = playerInstance.play();
        promise.then(function () {
            playingUrl = url;
            console.info('playing..');
            playRequestedButNotYetPlaying = 0;
        }, function (reason) {
            console.error(reason);
        })
    }
}
