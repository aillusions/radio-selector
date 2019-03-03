'use strict';

describe('DemoTest', function () {

    console.log('jasmine-version:' + jasmine.version);

    it('simple-check', function (done) {
        expect(1).toBe(1);
        done();
    });

});