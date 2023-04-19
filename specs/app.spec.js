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
});

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
});

describe('Total amount parametric test', () => {
    it.each`
   a    |  b    |  expected
  ${[{ price: 10, quantity: 10 }]} | ${10} | ${90}
  ${[{ price: 10, quantity: 10 }]} | ${100} | ${0}
  ${[{ price: 10, quantity: 1 }, {price: 10, quantity: 9}]} | ${0} | ${100}
  ${[{ price: 100, quantity: 5 }]} | ${'5'}| ${'error'}
  ${[{ price: 100, quantity: 5 }]} | ${-1}| ${'error'}
`('returns $expected when $a is added to $b', ({a, b, expected}) => {
        if (expected === 'error') {
            expect(() => getTotal(a, b)).toThrow();
        } else {
            expect(getTotal(a, b)).toBe(expected);
        }
    });
});
