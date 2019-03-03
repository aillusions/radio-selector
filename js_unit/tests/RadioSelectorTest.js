'use strict';

describe('RadioSelectorTest', function () {

    it('should change selected index', function (done) {

        var radioPubSub = new RadioPubSub();

        var radioSelector = new RadioSelector(radioPubSub, 10);

        expect(radioSelector.getSelectedIdx()).toBe(null);

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

});