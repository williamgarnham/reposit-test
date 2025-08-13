import testProperties from './properties.json' with {type: 'json'};
import testTennents from './tennents.json' with {type: 'json'};


export type Property = {
  id: string;
  address: string;
  postcode: string;
  monthlyRentPence: number;
  region: string;
  capacity: number;
  tenancyEndDate: string;
};
export type Tennent = { id: string; propertyId: string; name: string };

export function getAverageRentByRegion(
  region: string,
  properties: object,
  costFormat: string = ''
): number {
  let counter: number = 0;
  let total: number = 0;
  let returnValue: number = 0;

  for (let i in properties) {
    if (properties[i].region === region) {
      total += properties[i].monthlyRentPence;
      counter++;
    }
  }
  if (costFormat === 'POUNDS') {
    returnValue = +(total / counter / 100).toFixed(2);
    return returnValue;
  }
  returnValue = +(total / counter).toFixed(0);
  return returnValue;
}

export function getRentPerTennent(
  property: Property,
  costFormat: string,
  tennents: Object
): number {
  let currentTennents: number = 0;
  for (let i in tennents) {
    if (tennents[i].propertyId === property.id) {
      currentTennents++;
    }
  }

  try {
    if (currentTennents === 0) {
      throw Error('No tennants');
    }
    let rentPerTennent = property.monthlyRentPence / currentTennents;
    if (currentTennents > 0) {
      if (costFormat === 'POUNDS') {
        return rentPerTennent / 100;
      }

      return rentPerTennent;
    }
  } catch (err) {
    throw err;
  }
  return 0;
}

function validatePostcode(postCode: string): boolean {
  let regex = new RegExp(
    '^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$',
    'i'
  );
  return regex.test(postCode);
}

export function getInvalidPostcodes(properties: Object): string[] {
  let invalidPostcodes: string[] = [];
  // validate uk postcodes, add failures to list
  for (let i in properties) {
    if (!validatePostcode(properties[i].postcode)) {
      invalidPostcodes.push(properties[i].id);
    }
  }

  return invalidPostcodes;
}


function getCurrentDate(): Date {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  let dateString: string = yyyy + '-' + mm + '-' + dd;

  return new Date(dateString);
}


export function getPropertyStatus(property: Property, tennents): string {
  //if no tennents, return PROPERTY_VACANT
  let tennentList: object[] = [];
  for (let i in tennents) {
    if (property.id === tennents[i].propertyId) {
      tennentList.push(tennents[i]);
    }
  }

  if (tennentList.length === 0) {
    return "PROPERTY_VACANT";
  }

  //if number of tennets is fewer than capacity and current date is before tenancyEndDate, return PARTIALLY_VACANT
  let currentDate = getCurrentDate();
  let endDate = new Date(property.tenancyEndDate);

  if (tennentList.length < property.capacity && currentDate < endDate) {
    return 'PARTIALLY_VACANT'
  }
  //if property has at least one tennant and is past the tenancyEndDate, return PROPERTY_OVERDUE
  if (tennentList.length > 0 && currentDate > endDate) {
    return 'PROPERTY_OVERDUE';
  }
  return '';
}

