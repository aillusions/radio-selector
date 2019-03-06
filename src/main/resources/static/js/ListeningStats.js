/**
 *
 */
function ListeningStats() {
    var srv = this;

    setInterval(function () {
        if (AUDIO_ADAPTER.playingStreamUrl) {
            RADIO_WEBSOCK.issueReportPlayback(AUDIO_ADAPTER.playingStreamUrl, 1000);
            console.info("Listening stats reported.")
        }
    }, 1000);
}
