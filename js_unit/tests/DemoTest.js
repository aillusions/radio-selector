'use strict';

describe('DemoTest', function () {

    console.log('jasmine-version:' + jasmine.version);

    it('simple-check', function (done) {
        expect(1).toBe(1);
        done();
    });

    it('pub sub test', function (done) {

        pubsub.subscribe('hello-world', function() {
            console.log('hello world....');
        });

        //publish event on 'hello/world' namespace
        pubsub.publish('hello-world');

        done();
    });

});