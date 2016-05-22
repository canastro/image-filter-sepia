import { expect } from 'chai';
import sinon from 'sinon';
import worker from '../src/worker';
import * as sepia from '../src/sepia';

describe('worker', () => {
    let self;

    beforeEach(() => {
        self = {
            postMessage: sinon.stub(),
            close: sinon.stub()
        };

        sinon.stub(sepia, 'transform');
    });

    context('message', () => {
        it('should make a postMessage and close itself', (done) => {

            self.addEventListener = (type, fn) => {
                const e = {
                    data: {
                        data: {
                            data: [
                                193,
                                219,
                                242,
                                255,
                                193,
                                219,
                                242,
                                255
                            ]
                        },
                        length: 8,
                        index: 0
                    }
                };

                fn(e);

                expect(self.postMessage.calledWith({
                    result: [
                        198,
                        224,
                        247,
                        255,
                        193,
                        219,
                        242,
                        255
                    ],
                    index: 0
                }));
                expect(self.postMessage.calledOnce).to.equal(true);
                expect(self.close.calledOnce).to.equal(true);

                done();
            };

            worker(self);


        });
    });
});
