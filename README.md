# 🎠 Faker Extra

[![](https://img.shields.io/npm/v/faker-extra)](https://www.npmjs.com/package/faker-extra) ![](https://img.shields.io/github/stars/schalkventer/faker-extra?style=social) ![](https://github.com/schalkventer/faker-extra/workflows/NPM%20Package/badge.svg) [![](https://img.shields.io/npm/dm/faker-extra.svg)](https://www.npmjs.com/package/faker-extra)

_⭐️ If you find this useful please star it on [Github](https://github.com/schalkventer/faker-extra) ⭐️_

_💚 Looking for a replacement for the original Faker library (deleted from Github in 2022)? You can use faker-extra as a drop in replacement for Faker (even without using any of extra functionality)! 💚_

Contains original Faker.js functionality and extra methods, similar to [fs-extra](https://www.npmjs.com/package/fs-extra).

![](https://raw.githubusercontent.com/schalkventer/faker-extra/master/docs/assets/logo.png)

## Embedded Faker

Due to the removal of the original Faker.js library from Github in early 2022, this project has the latest working version and types of Faker.js (1.5.3) built directly into it. This means that the import from `faker-extra` functions exactly in the same way as the original Faker.js package (and can even be used as a replacement for the original Package).

The only difference is that `faker-extra` has an optional extra property called `extra` that can be accessed by means of `faker-extra`. You can use the original faker methods and the extra methods as follows:


  ```js
  import faker from 'faker-extra';

  faker.seed(1);

  const competitorIds = faker.extra.array([10, 3000], faker.datatype.uuid);

  const competitors = faker.extra.object(
    competitorIds,
    () => ({
      awards: faker.extra.array([0, 3], ['red', 'green', 'blue', 'orange'], true).
      score: faker.datatype.number({ min: 0, max: 1000 }),
      league: faker.extra.frequency({ bronze: 65, silver: 30, gold: 5 }),
    }),
  )

  /*
   * Will return an object with anywhere between 10 to 3000 key/value pairs.
   *
   * These will be randomly generated against the same seed (they will
   * always be the same random values). They might look something like this:
   *
   * {
   *   4aa71604-2d35-4de2-8c86-9b6791bbc90a: {
   *    badges: ['orange', 'green', 'red']
   *    score: 667,
   *    league: 'bronze'
   *  },
   *
   *  e572ca5e-c857-493b-a212-95e3ec812b2c: {
   *    badges: [],
   *    score: 446,
   *    league: 'silver'
   *  },
   *
   *   82b46b13-2e0e-4572-a2cd-ded291cdb3f4: {
   *    badges: ['red']
   *    score: 915,
   *    league: 'bronze'
   *  },
   *
   *   ...
   * }
   *
   */
  ```

## Why Faker Extra?

- **Returning random values at different frequencies**:

  ```js
  /* 65% chance to be 'bronze', 30% chance to be 'silver' and 5% chance to be 'gold' */

  const league = faker.extra.frequency({ bronze: 65, silver: 30, gold: 5 });
  ```

- **Returning an array of random length**:

  ```js
  /* An array of anywhere between 10 and 3000 unique IDs. */

  const competitorId = faker.extra.array([10, 3000], faker.datatype.uuid);
  ```

- **Returning an array of random length with no duplicates**:

  ```js
  /* An array that contains between 0 and 3 separate values from source. */

  const attended = faker.extra.array(
    [0, 3],
    ["2019", "2020", "2021", "2022", "2023"],
    true
  );
  ```

- **Returning an object with random values**:

  ```js
  /* An object that has all years and the amount of winners as values. */

  const winners = faker.extra.object(["2019", "2020", "2021", "2022", "2023"], () =>
    faker.datatype.number(10)
  );
  ```
## Overview

**Installing**

- [ES Module](#es-modules)
- [TypeScript](#typescript)
- [CommonJS](#commonjs)
- HTML _(coming soon)_

**Usage:**

- 🔢 [`faker.extra.frequency()`](#-fakrefrequency)
- 🔁 [`faker.extra.array()`](#-fakerearray)
- 🔀 [`faker.extra.object()`](#-fakereobject)

**Examples:**

- Basic JavaScript example _(coming soon)_
- Using with Jest _(coming soon)_
- Using with Mocha _(coming soon)_
- Using in React _(coming soon)_

---

## 💾 Installing

1. **Run via terminal/command-line in root of project.**

   _Note: Packages should be installed as a development dependencies since you want to avoid using mock values in your production output._

   `npm install --save-dev faker faker-extra`

2. **Then import as follows:**

   _Note: that you can also destructure only the required helpers (via named exports) if you want to reduce file size._

   ##### ES Modules

   ```js
   import faker from "faker-extra";

   faker.extra.frequency({ a: 10, b: 10, c: 90 });
   faker.extra.array(10, Math.random);
   ```

   ##### TypeScript

   ```ts
   import faker from "faker-extra";

   faker.extra.frequency<string>({ a: 10, b: 10, c: 90 });
   faker.extra.array<number>(10, Math.random);
   ```

   ##### CommonJS

   ```js
   const faker = require("faker-extra");

   faker.extra.frequency({ a: 10, b: 10, c: 90 });
   faker.extra.array(10, Math.random);
   ```

---

## 🔢 `faker.extra.frequency()`

**Creates an array/object who's length is equal, or ranging between, predefined amounts.**

```ts
<T extends any>(
  ratios:
    | number
    | Record<T, number>
    | { percentage: number; value: T; call?: boolean }[]
) => T;
```

- To return a boolean value:

  ```js
  faker.extra.frequency(70);

  /*
   * - Has a 70% chance to return `true`
   * - Has a 30% chance to return `false`
   */
  ```

- To return a value from a pre-defined list.

  ```js
  faker.extra.frequency({ a: 70, b: 30 });

  /*
   * - Has a 70% chance to return "a".
   * - Has a 30% chance to return "c".
   */
  ```

- To return a value from a pre-defined list that has more than 2 items. _(Note that an error will be thrown if all frequencies do not add up to 100.)_

  ```js
  faker.extra.frequency({ "A B C": 10, "A C B": 20, "C A B": 20, "C B A": 50 });

  /*
   * - Has a 10% chance to return "A B C".
   * - Has a 20% chance to return "A C B" or "C A B".
   * - Has a 50% chance to return "C B A".
   */
  ```

- To return a values other than strings or numbers:

  ```js
  faker.extra.frequency([
    {
      percentage: 10,
      value: new Error("Oops!"),
    },
    {
      percentage: 20,
      value: [1, 2, 3, 4, 5],
    },
    {
      percentage: 20,
      value: faker.commerce.productName(),
    },
    {
      percentage: 50,
      value: false,
    },
  ]);

  /*
   * - Has a 10% chance to return the result of `new Error('Oops!')`.
   * - Has a 20% chance to return `[1, 2, 3, 4, 5]` or the result of `faker.commerce.productName()`
   * - Has a 50% chance to return `false`.
   */
  ```

_Note that the above returns the result of `faker.commerce.productName()`. This means that it will not generate a new product name when that relevant value needs to be returned. If you want to dynamically provide a value each time you need to pass the function itself._

- To execute a function everytime a value is aclled.

  ```js
  faker.extra.frequency([
    {
      percentage: 10,
      value: () => faker.datatype.number({ min: 10, max: 70 }),
    },
    {
      percentage: 10,
      value: faker.address.streetName,
    },
    {
      percentage: 20,
      value: () => new Date(),
    },
    {
      percentage: 50,
      value: () => faker.extra.array([1, 5], true),
    },
  ]);

  /*
   * - Has a 10% chance to that a number between 10 and 70 will be returned.
   * - Has a 20% chance to that a random street name or the current date will be returned.
   * - Has a 50% that an array with containing between 1 and 5 instances of `true` .
   */
  ```

_Functions are automatically called by default. This means that if you want the result itself to be the provided function you should set `call` to `false`._

- To return a functions as the actual result:

  ```js
  faker.extra.frequency([
    {
      percentage: 10,
      value: () => console.log("1"),
      call: false,
    },
    {
      percentage: 10,
      value: () => console.log("2"),
      call: false,
    },
    {
      percentage: 20,
      value: () => console.log("3"),
      call: false,
    },
    {
      percentage: 50,
      value: () => console.log("4"),
      call: false,
    },
  ]);

  /*
   * - Has a 10% chance to return a function that will log "1" to the console when called.
   * - Has a 20% chance to return a function that will log "2" or "3" to the console when called.
   * - Has a 50% chance to return a function that will log "4" to the console when called.
   */
  ```

---

## 🔁 `faker.extra.array()`

**Returns an array created from pre-defined values.**

```ts
<T extends any>(
  length: number | [number, number],
  value?: T | (() => T) | T[],
  extract?: boolean
): T[]
```

- To create an array with a length of 5:

  ```js
  faker.extra.array(5);

  /*
   * Will be `[undefined, undefined, undefined, undefined, undefined]`.
   */
  ```

- To create an array with a random length between 3 and 6:

  ```js
  faker.extra.array([3, 6]);

  /*
   * - Has a 25% chance to be `[undefined, undefined, undefined]`
   * - Has a 25% chance to be `[undefined, undefined, undefined, undefined]`.
   * - Has a 25% chance to be `[undefined, undefined, undefined, undefined, undefined]`.
   * - Has a 25% chance to be `[undefined, undefined, undefined, undefined, undefined, undefined]`.
   */
  ```

- To populate it with a value:

  ```js
  faker.extra.array(5, "abc");

  /*
   * Will be `["abc", "abc", "abc", "abc", "abc"]`.
   */
  ```

- To populate it with by means of a callback:

  ```js
  faker.extra.array(3, Math.random);

  /*
   *  Might something like `[0.3667866123486143, 0.44642296430964445, 0.915051909777594]`
   */
  ```

- To extract from an existing array add `true` as the third argument.

  ```js
  faker.exra.array([2, 4], ["a", "b", "c", "d", "e"], true);

  /*
   *  Might something like `['c', 'e']` or [`'d', 'a', 'e', 'b']`
   */
  ```

  - To populate an array with objects via a callback:

  ```js
  faker.extra.array(3, () => ({
    score: Math.round(Math.random() * 1000),
  }));

  /*
   *  Might look something like:
   *
   * [
   *  { score: 667 },
   *  { score: 446 },
   *  { score: 915 },
   * ]
   *
   */
  ```

---

## 🔀 `faker.extra.object()`

**Returns an array created from pre-defined values.**

```ts
<K extends any, T extends any>(
  length: K[],
  value?: T | ((key?: K) => T),
) => Record<K, T>
```

- To create an object from `['a', 'b', 'c', 'd', 'e']` keys:

  ```js
  faker.extra.object(["a", "b", "c", "d", "e"]);

  /*
   * Will be:
   *
   * {
   *    a: undefined,
   *    b: undefined,
   *    c: undefined,
   *    d: undefined,
   *    e: undefined,
   * }
   *
   */
  ```

- To create an object from the `[1, 2, 3, 4, 5]` keys and `'abc'` as a value:

  ```js
  faker.extra.object([1, 2, 3, 4, 5], "abc");

  /*
   * Will be:
   *
   * {
   *    1: 'abc',
   *    2: 'abc',
   *    3: 'abc',
   *    4: 'abc',
   *    5: 'abc',
   * }
   *
   */
  ```

- To create an object from `[1, 2, 3, 4, 5]` and use a callback to create a value:

  ```js
  faker.object([1, 2, 3, 4, 5], () => faker.random.number(100));

  /*
   * Might look something like this:
   *
   * {
   *    1: 63,
   *    2: 9,
   *    3: 71,
   *    4: 3,
   *    5: 51,
   * }
   *
   */
  ```
