/*
 * Third-party modules
 */

import faker from 'faker';


/*
 * Module exports 
 */

/**
 * Returns a random value from a list at a pre-defined frequency
 */
export const frequency = <T extends any>(ratios: number | Record<T, number>): boolean | T => {
  const isNumber: boolean = typeof ratios === 'number';
  const randomNumber = faker.random.number(100);

  if (isNumber) {
    const ratiosAsNumber = ratios as number;
    return randomNumber < ratiosAsNumber;
  }

  const ratiosAsObj = ratios as Record<any, number>;
  const values = Object.keys(ratios);
  const percentages = values.map(key => ratiosAsObj[key]);
  const zipped = values.map((value) => ({ percentage: ratiosAsObj[value], value }));
 
  const total = percentages.reduce(
    (result, percentage) => result + percentage,
    0,
  )

  if (total !== 100) {
    throw new Error('All supplied percentages do not add up to 100%');
  }

  let accumulator = 0;
  
  for (const { percentage, value } of zipped) {
    if (randomNumber < accumulator + percentage) {
      return value as any;
    }

    accumulator += percentage;
  }

  return values[values.length - 1] as any;
}

/**
 * Returns a random value from a list at a pre-defined frequency
 */
export const iteration = <T extends any>(
  length: number | [number, number] | any[],
  value: any
): any[] | Record<any, any> => {


  if (isNumber) {
    return faker.random.number =< ratios ? ;
  }
}

export default {
  frequency,
  iteration,
}