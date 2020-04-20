# 🎠 Faker.js Enhanced 

[![](https://travis-ci.org/schalkventer/react-html-connector.svg?branch=master)](https://travis-ci.org/schalkventer/react-html-connect) [![](https://img.shields.io/npm/dm/react-html-connector.svg)](https://www.npmjs.com/package/react-html-connector) [![](https://img.shields.io/badge/stability-experimental-orange.svg)](#package-state)

**Adds additional functionality and configurations options to base Faker.js library**

![](assets/es-logo.png)

---

- [**Getting started**](#getting-started)
  - [Via HTML scripts](#via-html-scripts)
  - [Via JavaScript modules](#via-javascript-modules)
    - [1. Install](#1-install)
    - [2. Usage](#2-usage)
      - [ES Modules](#es-modules)
      - [CommonJS](#commonjs)
      - [TypeScript](#typescript)
- [**API**](#api)
  - [`frequency()`](#frequency)
    - [Examples](#examples)
      - [Random boolean](#random-boolean)
      - [Random values](#random-values)
      - [Random values with custom frequencies](#random-values-with-custom-frequencies)
  - [`randomIteration()`](#randomiteration)
    - [Examples](#examples-1)
      - [Array length between 0 - 10 (default) from values](#array-length-between-0---10-default-from-values)
      - [Array length between 0 - 5 from values](#array-length-between-0---5-from-values)
      - [Array length between 3 - 5 from values](#array-length-between-3---5-from-values)
      - [Array length between 3 - 5 from value callback](#array-length-between-3---5-from-value-callback)
      - [Array length between 3 - 5 from object callback](#array-length-between-3---5-from-object-callback)
      - [Array length between 3 - 5 from frequency callback](#array-length-between-3---5-from-frequency-callback)
- [**FAQ**](#faq)
  - [Does `faker-enhanced` honor any existing `faker.seed()` configuration?](#does-faker-enhanced-honor-any-existing-fakerseed-configuration)

## **Getting started**

### Via HTML scripts

```html
<html>
  <head>
    <!-- "defer" makes sure that scripts run in the order they are declared only after all HTML has loaded -->
    <script src="https://unpkg.com/faker" defer></script>
    <script src="https://unpkg.com/faker-extra" defer></script>
  </head>
  <body>
    <script defer>
      fakerE.frequency({ a: 10, b: 10, c: 90 });
      fakerE.randomIteration(Math.random, 5, 20);g
    </script>
  </body>
<html>
```

### Via JavaScript modules

#### 1. Install
   
Run via terminal/command-line in root of project.

_Note: Packages should be imported as a development dependency since you avoid using mock values in your production output._

- **NPM:** `npm install --save-dev faker faker-enhanced`
   
- **Yarn:** `yarn add -D faker faker-enhanced`

#### 2. Usage

##### ES Modules

```js
import { frequency, randomIteration } from 'faker-enhanced';

fakerE.frequency({ a: 10, b: 10, c: 90 });
fakerE.randomIteration(Math.random, 5, 20);
```

##### CommonJS

```js
const { frequency, randomIteration } = require('faker-enhanced');

fakerE.frequency<string>({ a: 10, b: 10, c: 90 });
fakerE.randomIteration<number>(Math.random, 5, 20);
```

##### TypeScript

```ts
import { frequency, randomIteration } from 'faker-extra';

fakerE.frequency<string>({ a: 10, b: 10, c: 90 });
fakerE.randomIteration<number>(Math.random, 5, 20);
```

## **API**

### `frequency()`

```ts
(percentages: number | Record<number, any>, values?: [any, any]) => any
```

#### Examples

##### Random boolean

```js
/**
 * Returns random boolean value
 * 
 * 70% chance to be true
 * 30% change to be false
 */
frequency(70)
```

##### Random values

```js
/**
 * Returns random value from supplied array
 * 
 * 70% change to be 'a'
 * 30% change to be 'b'
 */
frequency(70, ['a', 'b'])
```

##### Random values with custom frequencies

```js
/**
 * Returns random key from object, with the value-pair as the frequency. 
 * Note that an error will be thrown if frequencies do not add up to 100.
 * 
 * 10% change to be 'a'
 * 10% change to be 'b'
 * 20% chance to be 'c'
 * 20% change to be 'd'
 * 40% change to be 'e'
 */
frequency({
  a: 10,
  b: 10,
  c: 20,
  d: 20,
  e: 40,
})
```

### `randomIteration()`
```ts
(percentages: number | any[] | Record<number, any>) => any
```

#### Examples

##### Array length between 0 - 10 (default) from values

```js
/**
 * Array of supplied values with length between 0 and 10.
 * 
 * @example []
 * @example ['d', 'a', 'e', 'c', 'a']
 * @example ['c', 'e', 'e', 'b', 'd', 'c', 'b', 'c', 'a', 'e']
 */
randomIteration['a', 'b', 'c', 'd', 'e'])
```

##### Array length between 0 - 5 from values

```js
/**
 * Array of supplied values with length between 0 and 5.
 * 
 * @example  []
 * @example  ['d', 'a']
 * @example  ['c', 'e', 'e', 'b', 'd']
 */
randomIteration['a', 'b', 'c', 'd', 'e'], 5)
```

##### Array length between 3 - 5 from values

```js
/**
 * Array of supplied values with length between 3 and 5.
 * 
 * @example  ['d', 'a'', 'a']
 * @example  ['b', 'c', 'a', 'e']
 * @example  ['c', 'e', 'e', 'b', 'd']
 */
randomIteration['a', 'b', 'c', 'd', 'e'], 3, 5)
```

##### Array length between 3 - 5 from value callback

```js
/**
 * Array of `Math.random()` result with length between 3 and 5.
 * 
 * @example [0.3667866123486143, 0.44642296430964445, 0.915051909777594]
 * @example [ 0.6168982362162574, 0.33763440760609464, 0.5117408531603971, 0.8418701365530443, 0, 15739907213241544 ]
 */
randomIteration(Math.random)
```

##### Array length between 3 - 5 from object callback

```js
/**
 * Array of `Math.random()` results with length between 3 and 5. Possible results:
 * 
 * @example [{ number: 0.3667866123486143 }, { number: 0.44642296430964445 }, { number: 0.915051909777594 }]
 * @example [{ number: 0.6168982362162574 }, { number: 0.33763440760609464 }, { number: 0.5117408531603971 }, { number: 0.8418701365530443 }, { number: 0.15739907213241544 }]
 */
randomIteration(() => ({ number: Math.random() }))
```

##### Array length between 3 - 5 from frequency callback

```js
/**
 * Array of `frequency()` results with length between 3 and 5. Possible results:
 * 
 * @example ['b', 'c', 'c']
 * @example ['a', 'c', 'b', 'a', 'b']
 */
randomIteration(() => frequency({ a: 25, b: 25, c: 50 })))
```

## **FAQ**

### Does `faker-enhanced` honor any existing `faker.seed()` configuration?

_**Yes.**_

_Faker Enhanced honours the behaviour of the `Faker.seed()` configuration as outlined in the [original Python faker documentation](https://faker.readthedocs.io/en/master/#seeding-the-generator) (note that FakerJS is a port of the former library)._