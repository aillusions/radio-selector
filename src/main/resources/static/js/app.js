/**
 *
 */

var NUMBER_OF_ITEMS = 1691;

var audioElement = document.getElementById('audioPlayerId');
audioElement.volume = 0.3;

var radioPubSub = new RadioPubSub();
var RADIO_SELECTOR = new RadioSelector(radioPubSub, NUMBER_OF_ITEMS);
var audioAdapter = new AudioAdapter(radioPubSub, audioElement);
var radioWebSock = new WebSocketAdapter('/ws/drawing', radioPubSub);

radioPubSub.getPubSub().subscribe(radioPubSub.pubSubEvents.EVT_RADIO_SELECTED, function (idx) {
    radioWebSock.issueGetRecordingByIdx(idx);
});

radioPubSub.getPubSub().subscribe(radioPubSub.pubSubEvents.EVT_RADIO_SET_TO_PAUSE, function (idx) {
    audioAdapter.pauseAudio(idx);
});

radioPubSub.getPubSub().subscribe(radioPubSub.pubSubEvents.EVT_RADIO_STREAM_URL_RECEIVED, function (url) {
    audioAdapter.playAudio(url);
});

setInterval(function () {
    if (audioAdapter.playingStreamUrl) {
        radioWebSock.issueReportPlayback(audioAdapter.playingStreamUrl, 1000);
        console.info("Listening stats reported.")
    }
}, 1000);

var app = angular.module('radio', ['ngStorage', 'ngRoute']);