import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

describe('Working condition of nameIsValid func', function () {
    it('imports without error', function () {
        expect(nameIsValid).toBeDefined();
    });
    it('Does not get empty value', function () {
        expect(nameIsValid('')).toBeFalsy();
    });
    it('Value should have more than 2 characters', function () {
        expect(nameIsValid('Peter')).toBeTruthy();
    });
    it('Does not have less than 2 characters', function () {
        expect(nameIsValid('A')).toBeFalsy();
    });
})

describe('Working condition of fullTrim func', function () {
    it('Imports without error', function () {
        expect(fullTrim).toBeDefined();
    });
    it('Returns no spaces', function () {
        expect(fullTrim('A B C ')).toBe('ABC');
    });
    it('Empty value returns empty string', function () {
        expect(fullTrim('')).toBe('');
    });
    it('Number returns error', function () {
        expect(function () { return fullTrim(9) }).toThrow();
    });
    it('Empty object returns error', function () {
        expect(function () { return fullTrim({}) }).toThrow();
    });
})

describe('Working condition of getTotal func', function () {
    it('Imports without error', function () {
        expect(getTotal).toBeDefined();
    });
})
