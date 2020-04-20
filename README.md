# 🎠 Faker.js Enhanced 

[![](https://travis-ci.org/schalkventer/react-html-connector.svg?branch=master)](https://travis-ci.org/schalkventer/react-html-connect) [![](https://img.shields.io/npm/dm/react-html-connector.svg)](https://www.npmjs.com/package/react-html-connector) [![](https://img.shields.io/badge/stability-experimental-orange.svg)](#package-state)

**Adds additional functionality and configurations options to base Faker.js library**

![](https://raw.githubusercontent.com/schalkventer/faker-enhanced/master/assets/es-logo.png)

## Why Faker Enhanced?

- You want to mock a random value from a list, but you want some values to be returned more fequently than others.
- You want to create arrays/objects of randomized lengths.

For example you might want to extend faker to mock something like follows:

```js
faker.seed(1);

const uniqueIds = fakerE.iteration(
  [300, 2000], 
  () => Math.floor(Math.random() * 1000000000)
);

fakerE.iteration(
  uniqueIds, 
  () => ({ 
    score: Math.round(Math.random() * 1000),
    league: fakerE.frequency({ 70: 'bronze', 25: 'silver', 5: 'gold' }),
  }),
)

/*
 * Will return an object with anywhere between 300 to 2000 key/value pairs.
 * These might look like the following:
 *
 * { 
 *   4aa71604-2d35-4de2-8c86-9b6791bbc90a: { score: 667, league: 'bronze' },
 *   e572ca5e-c857-493b-a212-95e3ec812b2c: { score: 446, league: 'silver' },
 *   82b46b13-2e0e-4572-a2cd-ded291cdb3f4: { score: 915, league: 'bronze' },
 *   ...
 * }
 * 
 */
```

**Usage:**

- 🔢 [`fakerE.frequency()`](#fakerefrequency)
- 🔁 [`fakerE.iteration()`](#fakereiteration)

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

```ts
<T extends any>(ratios: number | Record<T, number> | Map<T, number>) => T
```

**Returns a random value from a list at a pre-defined frequency. Cam be used as follows:**

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

- To return a value from a pre-defined list of arrays/objects.
  
  _Note that an error will be thrown if all frequencies do not add up to 100._

```js
const FIRST_OBJ = { id: 'a49a4c75-823a-4c97-861e-7e8517affa08', permissions: 'contributor' });
const SECOND_OBJ = { id: '0a154718-dfd5-4cc7-99d2-9e1ba3cfbe48', permissions: 'editor' });
const FIRST_ARRAY = ['0a154718-dfd5-4cc7-99d2-9e1ba3cfbe48', 'contributor'];
const SECOND_ARRAY = ['0a154718-dfd5-4cc7-99d2-9e1ba3cfbe48', 'admin']; 

fakerE.frequency(new Map([FIRST_OBJ, 10], [SECOND_OBJ, 20], [FIRST_ARRAY, 20], [SECOND_ARRAY, 50]]))

/*
 * - Has a 10% chance to return `FIRST_OBJ`.
 * - Has a 20% chance to return `SECOND_OBJ` or `FIRST_ARRAY`.
 * - Has a 50% chance to return 'SECOND_ARRAY'.
 */
```

---

## 🔁 `fakerE.iteration()`

```ts
<T extends any>(
  length: number | [number, number] | any[]
  value: any
) => any[] | Record<any, any>
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

- To populate an array with object via a callback:

```js
fakerE.iteration(
  3, 
  () => ({
    score: Math.round(Math.random() * 1000), 
  }),
)

/*
 *  Might something like:
 *
 * [ 
 *  { score: 667 },
 *  { score: 446 },
 *  { score: 915 },
 * ]
 *
 */
```

- To populate an object with the following keys and by means of the following callback:

```js
const IDS = [
  '4aa71604-2d35-4de2-8c86-9b6791bbc90a', 
  'e572ca5e-c857-493b-a212-95e3ec812b2c', 
  '82b46b13-2e0e-4572-a2cd-ded291cdb3f4'
]

fakerE.iteration(
  IDS, 
  () => ({ 
    score: Math.round(Math.random() * 1000), 
  }),
)

/*
 *  Might something like:
 *
 * { 
 *   4aa71604-2d35-4de2-8c86-9b6791bbc90a: { score: 667 },
 *   e572ca5e-c857-493b-a212-95e3ec812b2c: { score: 446 },
 *   82b46b13-2e0e-4572-a2cd-ded291cdb3f4: { score: 915 },
 * }
 * 
 */
```
