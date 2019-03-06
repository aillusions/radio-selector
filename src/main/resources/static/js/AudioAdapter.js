/**
 *
 */
function AudioAdapter(radioPubSub, audioElement) {
    var srv = this;

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
        audioElement.pause();
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

        audioElement.src = url;

        playRequestedButNotYetPlaying = now;

        var promise = audioElement.play();
        promise.then(function () {
            playingUrl = url;
            console.info('playing..');
            playRequestedButNotYetPlaying = 0;
        }, function (reason) {
            console.error(reason);
        })
    }
}
