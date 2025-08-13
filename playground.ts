import testProperties from './properties.json' with {type: 'json'};
import testTennents from './tennents.json' with {type: 'json'};
import {getAverageRentByRegion, getRentPerTennent, getInvalidPostcodes, getPropertyStatus} from './reposit.ts';

console.log(getAverageRentByRegion("ENGLAND", testProperties));

console.log(getRentPerTennent(testProperties[0], "POUNDS", testTennents));

console.log(getInvalidPostcodes(testProperties));

console.log(getPropertyStatus(testProperties[27], testTennents));