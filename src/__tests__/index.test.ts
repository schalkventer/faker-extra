import faker from 'faker';
import fakerE from '..';

/**
 * Frequency helper
 */

// describe('frequency', () => {
//   beforeEach(() => {
//     faker.seed(1);
//   });

//   test('50% boolean', () => {
//     const result = [
//       fakerE.frequency(50),
//       fakerE.frequency(50),
//       fakerE.frequency(50),
//       fakerE.frequency(50),
//       fakerE.frequency(50),
//       fakerE.frequency(50),
//       fakerE.frequency(50),
//     ]

//     expect(result).toEqual([true, false, false, false, true, true, true])
//   });

//   test('99% boolean', () => {
//     const result = [
//       fakerE.frequency(99),
//       fakerE.frequency(99),
//       fakerE.frequency(99),
//       fakerE.frequency(99),
//       fakerE.frequency(99),
//       fakerE.frequency(99),
//       fakerE.frequency(99),
//     ]

//     expect(result).toEqual([true, false, true, true, true, true, true])
//   });

//   test('1% boolean', () => {
//     const result = [
//       fakerE.frequency(1),
//       fakerE.frequency(1),
//       fakerE.frequency(1),
//       fakerE.frequency(1),
//       fakerE.frequency(1),
//       fakerE.frequency(1),
//       fakerE.frequency(1),
//     ]

//     expect(result).toEqual([false, false, false, false, true, false, false])
//   });

//   const ABCD_SPLIT = {
//     a: 25,
//     b: 25,
//     c: 25,
//     d: 25,
//   }

//   test('25% A, B, C and D', () => {
//     const result = [
//       fakerE.frequency(ABCD_SPLIT),
//       fakerE.frequency(ABCD_SPLIT),
//       fakerE.frequency(ABCD_SPLIT),
//       fakerE.frequency(ABCD_SPLIT),
//       fakerE.frequency(ABCD_SPLIT),
//       fakerE.frequency(ABCD_SPLIT),
//       fakerE.frequency(ABCD_SPLIT),
//     ]

//     expect(result).toEqual(['b', 'd', 'c', 'd', 'a', 'a', 'b'])
//   });

//   const ABCD_A = {
//     a: 97,
//     b: 1,
//     c: 1,
//     d: 1,
//   }

//   test('99% boolean', () => {
//     const result = [
//       fakerE.frequency(ABCD_A),
//       fakerE.frequency(ABCD_A),
//       fakerE.frequency(ABCD_A),
//       fakerE.frequency(ABCD_A),
//       fakerE.frequency(ABCD_A),
//       fakerE.frequency(ABCD_A),
//       fakerE.frequency(ABCD_A),
//     ]

//     expect(result).toEqual(['a', 'd', 'a', 'a', 'a', 'a', 'a'])
//   });

//   const ABCD_D = {
//     a: 1,
//     b: 1,
//     c: 1,
//     d: 97,
//   }

//   test('1% boolean', () => {
//     const result = [
//       fakerE.frequency(ABCD_D),
//       fakerE.frequency(ABCD_D),
//       fakerE.frequency(ABCD_D),
//       fakerE.frequency(ABCD_D),
//       fakerE.frequency(ABCD_D),
//       fakerE.frequency(ABCD_D),
//       fakerE.frequency(ABCD_D),
//     ]

//     expect(result).toEqual(['d', 'd', 'd', 'd', 'a', 'd', 'd'])
//   });

//   const ABC = {
//     a: 100 / 3,
//     b: 100 / 3,
//     c: 100 / 3,
//   }

//   test('99.99999999999999%', () => {
//     const result = [
//       fakerE.frequency(ABC),
//       fakerE.frequency(ABC),
//       fakerE.frequency(ABC),
//       fakerE.frequency(ABC),
//       fakerE.frequency(ABC),
//       fakerE.frequency(ABC),
//       fakerE.frequency(ABC)
//     ]

//     expect(result).toEqual(['b', 'c', 'c', 'c', 'a', 'a', 'a'])
//   });

// });

/**
 * Array helper
 */

describe('array', () => {

  beforeEach(() => {
    faker.seed(1);
  });

  test('empty', () => {
    expect(fakerE.array(0)).toEqual([])
  });

  test('10 undefined', () => {
    expect(fakerE.array(10)).toEqual([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined])
  });

  test('10 abcd', () => {
    expect(fakerE.array(10, 'abcd')).toEqual(['abcd', 'abcd', 'abcd', 'abcd', 'abcd', 'abcd', 'abcd', 'abcd', 'abcd', 'abcd'])
  });

  test('10 false', () => {
    expect(fakerE.array(10, false)).toEqual([false, false, false, false, false, false, false, false, false, false])
  });

  test('10 null', () => {
    expect(fakerE.array(10, null)).toEqual([null, null, null, null, null, null, null, null, null, null])
  });

  // test('3 - 12 true', () => {
  //   const results = [
  //     fakerE.array<true>([3, 12], true).length,
  //     fakerE.array<true>([3, 12], true).length,
  //     fakerE.array<true>([3, 12], true).length,
  //     fakerE.array<true>([3, 12], true).length,
  //     fakerE.array<true>([3, 12], true).length,
  //     fakerE.array<true>([3, 12], true).length,
  //     fakerE.array<true>([3, 12], true).length,
  //     fakerE.array<true>([3, 12], true).length,
  //     fakerE.array<true>([3, 12], true).length,
  //     fakerE.array<true>([3, 12], true).length,
  //     fakerE.array<true>([3, 12], true).length,
  //     fakerE.array<true>([3, 12], true).length,
  //     fakerE.array<true>([3, 12], true).length,
  //   ];

  //   expect(results).toEqual([7,12,10,12,3,4,6,12,4,5,3,6,4])
  // });

  test('5 callback', () => {
    expect(fakerE.array<number>(5, () => faker.datatype.number(100))).toEqual([
      42,
      100,
      72,
      94,
      0
    ])
  });

  // test('extract array 3-5', () => {
  //   const result = [
  //     fakerE.array<number>([3, 5], [1, 2, 3, 4, 5, 6, 7, 8, 9], true).length,
  //     fakerE.array<number>([3, 5], [1, 2, 3, 4, 5, 6, 7, 8, 9], true).length,
  //     fakerE.array<number>([3, 5], [1, 2, 3, 4, 5, 6, 7, 8, 9], true).length,
  //     fakerE.array<number>([3, 5], [1, 2, 3, 4, 5, 6, 7, 8, 9], true).length,
  //     fakerE.array<number>([3, 5], [1, 2, 3, 4, 5, 6, 7, 8, 9], true).length,
  //   ]

  //   expect(result).toEqual([4,3,4,5,3])
  // });
});


/**
 * Object helper
 */

describe('object', () => {

  beforeEach(() => {
    faker.seed(1);
  });

  test('empty', () => {
    expect(fakerE.object([], () => true)).toEqual({})
  });

  test('1-6 false', () => {
    expect(fakerE.object([1, 2, 3, 4, 5, 6], false)).toEqual({
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
    })
  });

  test('a-g Hello World!', () => {
    expect(fakerE.object(['a', 'b', 'c', 'd', 'e', 'g'], { message: 'Hello World!' })).toEqual({
      a: { message: 'Hello World!' },
      b: { message: 'Hello World!' },
      c: { message: 'Hello World!' },
      d: { message: 'Hello World!' },
      e: { message: 'Hello World!' },
      g: { message: 'Hello World!' },
    })
  });

  test('a-g random number', () => {
    expect(fakerE.object(['a', 'b', 'c', 'd', 'e', 'g'], () => faker.datatype.number(100))).toEqual({
      a: 42,
      b: 100,
      c: 72,
      d: 94,
      e: 0,
      g: 12,
    })
  });
});

