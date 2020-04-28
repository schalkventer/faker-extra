# 🎠 Faker.js Enhanced

![](https://img.shields.io/badge/Release-1.0.3-blue) ![](https://github.com/schalkventer/faker-enhanced/workflows/Unit%20Tests/badge.svg) ![](https://github.com/schalkventer/faker-enhanced/workflows/NPM%20Package/badge.svg) [![](https://img.shields.io/npm/dm/faker-enhanced.svg)](https://www.npmjs.com/package/faker-enhanced)

**Adds additional functionality and configurations options to base Faker.js library**

![](https://raw.githubusercontent.com/schalkventer/faker-enhanced/master/docs/assets/logo.png)

## Why Faker Enhanced?

- You want to mock a random value from a list, but you want some values to be returned more fequently than others.
- You want to create arrays/objects of randomized lengths and with randomized values.

For example you might want to extend `faker` with `faker-enhanced` to mock something like this:

```js
import faker from 'faker';
import fakerE from 'faker-enhanced';

faker.seed(1);

const uniqueIds = fakerE.iteration(
  [300, 2000], 
  () => Math.floor(Math.random() * 1000000000)
);

fakerE.object(
  uniqueIds, 
  () => ({ 
    awards: fakerE.array([0, 3], ['red', 'green', 'blue', 'orange'], true).
    score: Math.round(Math.random() * 1000),
    league: fakerE.frequency({ 70: 'bronze', 25: 'silver', 5: 'gold' }),
  }),
)

/*
 * Will return an object with anywhere between 300 to 2000 key/value pairs.
 * These might look something like the following:
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

**Usage:**

- 🔢 [`fakerE.frequency()`](#-fakerefrequency)
- 🔁 [`fakerE.array()`](#-fakerearray)
- 🔀 [`fakerE.object()`](#-fakereobject)

**Examples:**

- Creating an array containing mock users with different permission levels _(coming soon)_
- Using with Jest _(coming soon)_
- Using with Mocha _(coming soon)_

---

## 💾 Installing

1. **Run via terminal/command-line in root of project.**

   _Note: Packages should be imported as a development dependencies since you want to avoid using mock values in your production output._

   `npm install --save-dev faker faker-enhanced`

2. **Then import as follows:**
   
   _Note: that you can also descructure only the required helpers from import if you want._

##### ES Modules

```js
import fakerE from 'faker-enhanced';

fakerE.frequency({ a: 10, b: 10, c: 90 });
fakerE.iteration(10, Math.random);
```

##### CommonJS

```js
const fakerE = require('faker-enhanced');

fakerE.frequency({ a: 10, b: 10, c: 90 });
fakerE.iteration(10, Math.random);
```

##### TypeScript

```ts
import fakerE from 'faker-enhanced';

fakerE.frequency<string>({ a: 10, b: 10, c: 90 });
fakerE.iteration<number>(10, Math.random);
```

---

## 🔢 `fakerE.frequency()`

**Creates an array/object who's length is equal, or ranging between, predefined amounts.**

```ts
<T extends any>(ratios: number | Record<T, number>) => T
```

- To return a boolean value:

```js
fakerE.frequency(70) 

/*
 * - Has a 70% chance to return `true`
 * - Has a 30% chance to return `false`
 */
```

- To return a value from a pre-defined list.

```js
fakerE.frequency({ a: 70, b: 30 })

/*
 * - Has a 70% chance to return "a".
 * - Has a 30% chance to return "c".
 */
```

- To return a value from a pre-defined list that has more than 2 items.
  
  _Note that an error will be thrown if all frequencies do not add up to 100._

```js
fakerE.frequency({ 'A B C': 10, '': 20, 'C A B': 20, 'C B A': 20 })

/*
 * - Has a 10% chance to return "A B C".
 * - Has a 20% chance to return "A C B" or "C A B".
 * - Has a 50% chance to return "C B A".
 */
```

---

## 🔁 `fakerE.array()`

**Returns an array created from pre-defined values.**

```ts
<T extends any>(
  length: number | [number, number],
  value?: T,
) => T[] 
```

- To create an array with a length of 5:

```js
fakerE.iteration(5) 

/*
 * Will be `[undefined, undefined, undefined, undefined, undefined]`.
 */
```

- To create an array with a random length between 3 and 6:

```js
fakerE.iteration([3, 6]) 

/*
 * - Has a 25% chance to be `[undefined, undefined, undefined]`
 * - Has a 25% chance to be `[undefined, undefined, undefined, undefined]`.
 * - Has a 25% chance to be `[undefined, undefined, undefined, undefined, undefined]`.
 * - Has a 25% chance to be `[undefined, undefined, undefined, undefined, undefined, undefined]`.
 */
```

- To populate it with a value:

```js
fakerE.iteration(5, 'abc') 

/*
 * Will be `["abc", "abc", "abc", "abc", "abc"]`.
 */
```

- To populate it with by means of a callback:

```js
fakerE.iteration(3, Math.random) 

/*
 *  Might something like `[0.3667866123486143, 0.44642296430964445, 0.915051909777594]`
 */
```

- To extract from an existing array add `true` as the third argument.

```js
fakerE.iteration([2, 4], ['a', 'b', 'c', 'd', 'e'], true) 

/*
 *  Might something like `['c', 'e']` or [`'d', 'a', 'e', 'b']`
 */
```

- To populate an array with objects via a callback:

```js
fakerE.iteration(
  3, 
  () => ({
    score: Math.round(Math.random() * 1000), 
  }),
)

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

## 🔀 `fakerE.object()`

**Returns an array created from pre-defined values.**

```ts
<K extends any, T extends any>(
  length: K[],
  value?: T | ((key?: K) => T),
) => Record<K, T> 
```

- To create an object from `['a', 'b', 'c', 'd', 'e']` keys:

```js
fakerE.object(['a', 'b', 'c', 'd', 'e']) 

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
fakerE.object([1, 2, 3, 4, 5], 'abc') 

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
fakerE.object([1, 2, 3, 4, 5], () => faker.random.number(100)) 

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
