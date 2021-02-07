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

### Generator Examples

### yield\* and Recursive Generators

## Advanced generator features

## Summary
