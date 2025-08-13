// import {
//   getAverageRentByRegion,
//   getRentPerTennent,
//   getInvalidPostcodes,
//   getPropertyStatus,
// } from './reposit';

//const reposit = require('./reposit')

// const testProperties = require('./properties.json');
// const testTennents = require('./tennents.json');

import testProperties from './properties.json' with {type: 'json'};
import testTennents from './tennents.json' with {type: 'json'};
import {getAverageRentByRegion, getRentPerTennent, getInvalidPostcodes, getPropertyStatus} from './reposit';


describe('Reposit tests', () => {
    describe('getAverageRentByRegion', ()=>{

        test('getAverageRentByRegion', () => {
            const testValue = getAverageRentByRegion("ENGLAND", testProperties)
            expect(testValue).toBe(166929)
        });
    })

    describe('getRentPerTennent', ()=>{
        test('POUNDS', ()=>{
            const testValue = getRentPerTennent(testProperties[0], "POUNDS", testTennents)
            expect(testValue).toBe(794)
        })
        test('PENCE', ()=>{
            const testValue = getRentPerTennent(testProperties[0], "PENCE", testTennents)
            expect(testValue).toBe(79400)
        })
        test('Thrown Error', ()=>{
            expect(()=>{getRentPerTennent(testProperties[0], "POUNDS", {})}).toThrow('No tennants')
        })
    })
    describe('getInvalidPostcodes', ()=>{
        const properties = [{postcode: 'EH9 1DL', id: '0'},{postcode: 'hresfdgv', id: '1'},{postcode: 'IG8 0EU', id:'2'},{postcode: 'dashgsh',id:'3'}]
        const testValue = getInvalidPostcodes(properties);
        console.log(testValue)
        expect(testValue.toString()).toBe(['1','3'].toString())

    })
    describe('getPropertyStatus', ()=>{
        test('PROPERTY_VACANT', () => {
            const testValue = getPropertyStatus(testProperties[27], testTennents)
            expect(testValue).toBe('PROPERTY_VACANT')
        });
        test('PROPERTY OVERDUE', () => {
            const testValue = getPropertyStatus(testProperties[0], testTennents)
            expect(testValue).toBe('PROPERTY_OVERDUE')
        });
        test('PARTIALLY_VACANT', () => {
            const testValue = getPropertyStatus(testProperties[1], testTennents)
            expect(testValue).toBe('PARTIALLY_VACANT')
        });
    })
})