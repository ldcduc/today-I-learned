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
