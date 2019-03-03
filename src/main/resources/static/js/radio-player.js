/**
 *
 */
function RadioPlayer() {

    var playerInstance;
    var playRequestedButNotYetPlaying = 0;

    this.playAudio = function (url) {

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
            console.info('playing..');
            playRequestedButNotYetPlaying = 0;
        }, function (reason) {
            console.error(reason);
        })
    }
}
