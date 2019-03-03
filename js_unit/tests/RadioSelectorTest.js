'use strict';

describe('RadioSelectorTest', function () {

    it('should initialize radioSelector', function (done) {

        var radioPubSub = new RadioPubSub();
        var radioSelector = new RadioSelector(radioPubSub, 10);

        expect(radioSelector.availableItems.length).toBe(10);
        expect(radioSelector.availableItems[0].stationNumber).toBe(1);
        expect(radioSelector.availableItems[0].stationStatus).toBe(radioSelector.stationStatuses.INITIAL);

        expect(radioSelector.getSelectedIdx()).toBe(null);

        done();
    });

    it('should change selected number', function (done) {
        var radioPubSub = new RadioPubSub();
        var radioSelector = new RadioSelector(radioPubSub, 10);

        var selectedIdxs = [];
        radioPubSub.getPubSub().subscribe(radioPubSub.pubSubEvents.EVT_RADIO_SELECTED, function (idx) {
            selectedIdxs.push(idx);
        });

        radioSelector.setSelectedNumber(1);
        expect(radioSelector.getSelectedIdx()).toBe(0);

        radioSelector.setSelectedNumber(2);
        expect(radioSelector.getSelectedIdx()).toBe(1);

        expect(selectedIdxs.length).toBe(2);

        done();
    });

    it('should pause selected number', function (done) {
        var radioPubSub = new RadioPubSub();
        var radioSelector = new RadioSelector(radioPubSub, 10);

        radioSelector.setSelectedNumber(2);
        expect(radioSelector.availableItems[1].stationStatus).toBe(radioSelector.stationStatuses.PLAYING);
        expect(radioSelector.getSelectedIdx()).toBe(1);

        radioSelector.setSelectedNumber(-2);
        expect(radioSelector.getSelectedIdx()).toBe(1);

        expect(radioSelector.availableItems[1].stationStatus).toBe(radioSelector.stationStatuses.PAUSED);

        done();
    });

});