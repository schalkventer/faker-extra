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
 * Returns an array created from pre-defined values.
 */
export const array = <T extends any>(
  length: number | [number, number],
  value?: T | (() => T) | T[],
  extract?: boolean
): T[] => {

  const valueIsFn = typeof value === 'function';
  const finalLength = !Array.isArray(length) ? length : faker.random.number({ min: length[0], max: length[1] });

  if (!valueIsFn && !extract) {
    const valueAsValue = value as T;
    return new Array(finalLength).fill(valueAsValue === null ? null : valueAsValue ?? undefined) as T[];
  }

  if (valueIsFn && !extract) {
    const valueAsFn = value as () => T;

    return new Array(finalLength)
      .fill(undefined).map(valueAsFn) as T[];
  }

  if (!Array.isArray(value)) {
    throw new Error('If extracting from an existing array value needs to be the source array')
  }

  const valueAsArray = value as T[];

  if (finalLength > valueAsArray.length) {
    throw new Error('Specified range can not have more items than source array')
  }

  const lengthDifference = valueAsArray.length - finalLength;

  return new Array(lengthDifference).fill(undefined).reduce(
    (result) => {
      const index = faker.random.number({ min: 0, max: result.length - 1 });

      return [
        ...result.slice(0, index),
        ...result.slice(index + 1),
      ]
    },
    valueAsArray as T[]
  )
}

/**
 * Returns an object created from pre-defined values.
 */
export const object = <K extends any, T extends any, >(
  length: K[],
  value?: T | ((key?: K) => T),
): Record<K, T> => {
  const valueIsFn = typeof value === 'function';
  const lenghtAsArray = length as K[];

  if (!valueIsFn) {
    return lenghtAsArray.reduce((result, key) => {
      return {
        ...result,
        [key as K]: value as T,
      } 
    },
    {} as Record<K, T>) as Record<K, T>
  }

  const valueAsFn = value as (key: K) => T;

  return lenghtAsArray.reduce((result, key) => {
    return {
      ...result,
      [key as K]: valueAsFn(key) as T,
    }
  },
  {} as Record<K, T>) as Record<K, T>
}

export default {
  frequency,
  array,
  object,
}