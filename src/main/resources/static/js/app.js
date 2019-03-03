/**
 *
 */

var NUMBER_OF_ITEMS = 1268;

var RADIO_PUB_SUB = new RadioPubSub();
var RADIO_WEBSOCK = new Z_WS('/ws/drawing');
var RADIO_SELECTOR = new RadioSelector(RADIO_PUB_SUB, NUMBER_OF_ITEMS);
var RADIO_PLAYER = new RadioPlayer(RADIO_PUB_SUB);

var app = angular.module('radio', ['ngStorage', 'ngRoute']);
