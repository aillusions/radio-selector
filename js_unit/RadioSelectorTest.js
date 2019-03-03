'use strict';

describe('RadioSelectorTest', function () {

    it('should change selected index', function (done) {

        var radioSelector = new RadioSelector();

        expect( radioSelector.getSelectedIdx()).toBe(null);

        radioSelector.setSelectedIdx(1);
        expect(radioSelector.getSelectedIdx()).toBe(1);

        radioSelector.setSelectedIdx(2);
        expect(radioSelector.getSelectedIdx()).toBe(2);

        done();
    });

});