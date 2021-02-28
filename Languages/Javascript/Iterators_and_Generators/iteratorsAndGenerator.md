# Iterators and Generator

Iterable objects are a feature of ES6

Arrays (including TypedArrays) are iterable, as well as strings, Set and Mapobjects

```javascript
let sum = 0;
for (let i of [1, 2, 3]) {
    sum += i;
}
sum
```

`...` operator to expand or "spread" an interable object into an array initializer/function invocation

```javascript
let chars = [..."abcd"]
let data = [1, 2, 3, 4, 5];
Math.max(...data)
```

Iterators + destructuring assignments:

```javascript
let purpleHaze = Uint8Array.of(255, 0, 255, 128);
let [r, g, b, a] = purpleHaze;
```

Map object

```javascript
let m = new Map([["one", 1], ["two", 2]]);
for (let [k, v] of m) console.log(k, v);
```

* `[...m]`
* `[...m.entries()]`
* `[...m.keys()]`
* `[...m.values()]`

```javascript
// Strings are iterable, so the two sets are the same
new Set("abc") // => new Set(["a", "b", "c"])
```

## How iterators work

* _Iterable_ object: object with a special iterator method that returns an iterator object.
* _Iterator_: object with a `next()` method &rarr; returns an iteration result object
* _Iteration result_ object: object with properties named `value` and `done`

Try `iterator.js`:  

```javascript
let iterable = [99];
let iterator = iterable[Symbol.iterator]();
for (let result = iterator.next(); !result.done; result = iterator.next()) {
    console.log(result.value); // => 99
}
let list = [1,2,3,4,5];
let iter = list[Symbol.iterator]();
let head = iter.next().value; // head == 1;
let tail = [...iter];         // tail == [2, 3, 4, 5]
console.log(head, tail)
```

## Implementing iterable objects

Try `node test_range.js`:  
Try `node map_and_filter.js`:  
Try `node words.js`:  

### "Closing" an iterator: The Return method

## Generators

Consider `primes.js`:  

```javascript
// A generator function that yields the set of ont digit (base-10) primes
export function* oneDigitPrimes() {
    yield 2;
    yield 3;
    yield 5;
    yield 7;
}
```

Try `node testPrimes.js`:  

```javascript
import { oneDigitPrimes } from './primes.js'

// When we invoke the generator function, we get a generator
let primes = oneDigitPrimes();

// A generator is an iterator object that iterates the yielded values
console.log(primes.next().value) // => 2
console.log(primes.next().value) // => 3
console.log(primes.next().value) // => 5
console.log(primes.next().value) // => 7
console.log(primes.next().done)  // => true

// Generators have a Symbol.iterator method to make them iterable
console.log(primes[Symbol.iterator]())   // => primes

// We can use generators like other iterable types
console.log([...oneDigitPrimes()])       // => [2, 3, 5, 7]

let sum = 0;
for (let prime of oneDigitPrimes()) sum += prime;
console.log(sum)                         // => 17
```

Another examples `seq.js`:  

```javascript
const seq = function*(from, to) {
    for (let i = from; i <= to; i++) yield i;
}
console.log([...seq(3, 5)]) // => [3, 4, 5]
```

We can use shorthand notation to omit the `function` keyword entirely when we define methods.  

```javascript
// shorthand.js
let o = {
    x: 1, y: 2, z: 3,
    // A generator that yields each of the keys of this object
    *g() {
        for (let key of Object.keys(this)) {
            yield key;
        }
    }
}

console.log([...o.g()])  // => ["x", "y", "z", "g"]
```

&rarr; there are **no** way to write a generator function using **arrow function syntax**  

### Generator Examples

Generators are more interesting if they actually _generate_ the values they yield by doing computation.  
Try `node fibonnaci.js`:  

```javascript
// fibonacci.js
function * fibonacciSequence() {
    let x = 0, y = 1;
    for (;;) {
        yield y;
        [x, y] = [y, x + y]; // NOte: destructuring assignment
    }
}

// Return the nth Fibonacci number
function fibonacci(n) {
    for (let f of fibonacciSequence()) {
        if (n -- <= 0) return f;
    }
}

let fibo = fibonacci(20)   // => 10946
console.log(fibo)

function* take(n, iterable) {
    let it = iterable[Symbol.iterator](); // Get iterator for iterable object
    while (n-- > 0) {
        let next = it.next();   
        if (next.done) return;  // If there are no more value, return early
        else yield next.value;
    }
}

let arr = [...take(5, fibonacciSequence())]; // => [1, 1, 2, 3, 5]
console.log(arr);
```

Here is another useful generator function that interleaves the elements of multiple iterable objects:  
Try `node zip.js`:  

```javascript
// zip.js
import { oneDigitPrimes } from './primes.js'
// Given an array of iterables, yield their elements in interleaved order
function* zip(...iterables) {
    // Get an iterator for each iterable
    let iterators = iterables.map(i => i[Symbol.iterator]());
    let index = 0;
    while (iterators.length > 0) {
        if (index >= iterators.length) { // If we reached the last iterator
            index = 0;                   // go back to the first one
        }
        let item = iterators[index].next(); // Get next item from next iterator
        if (item.done) {                    // If that iterator is done
            iterators.splice(index, 1);     // then remove it from the array
        } else {
            yield item.value;
            index++;
        }
    }
}

// Interleave three iterable objects
let arr = [...zip(oneDigitPrimes(), "ab", [0])]; // => [2, "a", 0, 3, "b", 5, 7]
console.log(arr)
```

### yield\* and Recursive Generators

In addition to the `zip()` generator defined before &rarr; now is an example of a generator function that yields the elements of multiple iterable objects sequentially:  

```javascript
// sequence.js
import { oneDigitPrimes } from './primes.js'

function* sequence(...iterables) {
    for (let iterable of iterables) {
        for (let item of iterable) {
            yield item;
        }
    }
}

console.log([...sequence("abc", oneDigitPrimes())])  // => ["a", "b", "c", 2, 3, 5, 7]
```

&rarr; This process of yielding the elements of some other iterable object is common enough in generator functions &rarr; ES6 has special syntax for it: The `yield*` keyword is like `yield` except that, rather than yielding a single value &rarr; it iterates an iterable object and yields each of the resulting values.  

```javascript
// sequence2.js
import { oneDigitPrimes } from './primes.js'

function* sequence2(...iterables) {
    for (let iterable of iterables) {
        yield* iterable;
    }
}

console.log([...sequence2("abc", oneDigitPrimes())]) // => ["a", "b", "c", 2, 3, 5, 7]
```

Consider the array `forEach()` method:  

```javascript
function* sequence3(...iterables) {
    iterables.forEach(iterable => yield* iterable); // Error
}
```

&rarr; This **does not** work: `yield` and `yield*` can only be used within generator functions, but the nested arrow function in this code is a regular function, not a `function*` generator function &rarr; so `yield` is not allowed.  

* `yield*` can be used with any kind of iterable object, including iterables implemented with generators
* This means that `yield*` allows us to define recursive generators &rarr; might use this feature to allow simple non-recursive iteration over a **recursively** defined tree struction, for example

## Advanced generator features

### The Return Value of a Generator Function

* The return value of the `next()` function = object `{ value, done }`
    * _value_ is defined &rarr; _done_ is undefined or `false`
    * _done_ is `true` &rarr; _value_ is undefined
* In case of a generator that returns a value, the final call to `next` returns `{ value: return-vale, done: true }`

```javascript
function *oneAndDone() {
    yield 1;
    return "done";
}

[...oneAndDone()] // => [1]
// But it is available if you explicitly call next()
let generator = oneAndDone();
generator.next() // => { value: 1, done: false}
generator.next() // => { value: "done", done: true }
// If the generator is already done, the return value is not returned again 
generator.next() // => { value: undefined, done: true }
```

### The Value of a `yield` Expression

* When the next() method of a generator is invoked, the generator function runs until it reaches a yield expression.
    * The expression that follows the `yield` keyword is evaluated &rarr; becomes the return value of the `next()` invocation
    * The next time the `next()` method of the generator is called, the argument passed to `next()` becomes the value of the `yield` expression that was paused. So the generator returns values to its caller with `yield`, and the caller passes values in to the generator with `next()`. 
* The generator and caller are two separate streams of execution passing values (and control) back and forth.

```javascript
// smallNumbers.js
function* smallNumbers() {
    console.log("next() invoked the first time; argument discarded"); let y1 = yield 1; // y1 == "b"
    console.log("next() invoked a second time with argument", y1);
    let y2 = yield 2; // y2 == "c"
    console.log("next() invoked a third time with argument", y2);
    let y3 = yield 3; // y3 == "d"
    console.log("next() invoked a fourth time with argument", y3); return 4;
}

let g = smallNumbers();
console.log("generator created; no code runs yet");
let n1 = g.next("a"); // n1.value == 1 
console.log("generator yielded", n1.value);
let n2 = g.next("b"); // n2.value == 2 
console.log("generator yielded", n2.value);
let n3 = g.next("c"); // n3.value == 3 
console.log("generator yielded", n3.value);
let n4 = g.next("d"); // n4 == { value: 4, done: true } 
console.log("generator returned", n4.value);
```

* Note the asymmetry in this code. The first invocation of next() starts the generator, but the value passed to that invocation is not accessible to the generator.

### The `return()` and `throw()` Methods of a Generator

### Final Note

* It's possible to use generators to create a kind of cooperative threading system within single-threaded Javascript code.
* Possible to mask **asynchronous** parts of your program &rarr; to make it appears sequential and synchronous.

## Summary
