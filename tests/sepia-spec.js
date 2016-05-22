import { expect } from 'chai';
import { transform } from '../src/sepia';

describe('brightness', () => {
    it('should apply transformation and return as imageData', () => {
        const data = [
            193,
            219,
            242,
            255,
            193,
            219,
            242,
            255
        ];

        const expectedData = [
            289.998,
            258.247,
            201.144,
            255,
            193,
            219,
            242,
            255
        ];

        transform(data, 4);
        expect(data).to.deep.equal(expectedData);
    });
});
