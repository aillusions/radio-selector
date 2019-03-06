/**
 *
 */
function AudioAdapter(radioPubSub, audioElement) {
    var srv = this;

    var playRequestedButNotYetPlaying = 0;

    srv.pauseAudio = function () {
        if (!srv.playingStreamUrl) {
            return;
        }

        audioElement.pause();
        srv.playingStreamUrl = null;
        radioPubSub.getPubSub().publish(radioPubSub.pubSubEvents.EVT_RADIO_PLAYBACK_PAUSED, []);
    };

    srv.playingStreamUrl = null;
    srv.playAudio = function (url) {

        var now = Date.now();

        if (playRequestedButNotYetPlaying && ((now - playRequestedButNotYetPlaying) < 10)) {
            console.info("playRequestedButNotYetPlaying");
            return;
        }

        audioElement.src = url;

        playRequestedButNotYetPlaying = now;

        var promise = audioElement.play();
        promise.then(function () {
            srv.playingStreamUrl = url;
            console.info('playing..');
            playRequestedButNotYetPlaying = 0;
            radioPubSub.getPubSub().publish(radioPubSub.pubSubEvents.EVT_RADIO_PLAYBACK_STARTED, []);
        }, function (reason) {
            console.error(reason);
        })
    }
}
