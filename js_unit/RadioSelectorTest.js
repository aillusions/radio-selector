'use strict';

describe('RadioSelectorTest', function () {

    it('should change selected index', function (done) {

        var radioPubSub = new RadioPubSub();

        var radioSelector = new RadioSelector(radioPubSub);

        expect(radioSelector.getSelectedIdx()).toBe(null);

        var selectedIdxs = [];
        radioPubSub.getPubSub().subscribe(radioPubSub.pubSubEvents.EVT_RADIO_SELECTED, function (idx) {
            selectedIdxs.push(idx);
        });

        radioSelector.setSelectedIdx(1);
        expect(radioSelector.getSelectedIdx()).toBe(1);

        radioSelector.setSelectedIdx(2);
        expect(radioSelector.getSelectedIdx()).toBe(2);

        expect(selectedIdxs.length).toBe(2);

        done();
    });

});