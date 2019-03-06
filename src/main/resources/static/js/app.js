/**
 *
 */

var NUMBER_OF_ITEMS = 1691;


var audioElement = document.getElementById('audioPlayerId');
audioElement.volume = 0.3;

var RADIO_PUB_SUB = new RadioPubSub();
var RADIO_WEBSOCK = new Z_WS('/ws/drawing');
var RADIO_SELECTOR = new RadioSelector(RADIO_PUB_SUB, NUMBER_OF_ITEMS);
var AUDIO_ADAPTER = new AudioAdapter(RADIO_PUB_SUB, audioElement);

var app = angular.module('radio', ['ngStorage', 'ngRoute']);
