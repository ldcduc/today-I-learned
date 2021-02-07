import { Range } from './range.js';

// Return an iterable object that iterates the result of applying f() // to each value from the source iterable
function map(iterable, f) {
    let iterator = iterable[Symbol.iterator]();
    return { // This object is both iterator and iterable
        [Symbol.iterator]() { return this; }, 
        next() {
            let v = iterator.next(); 
            if (v.done) {
                return v; 
            } else {
                return { value: f(v.value) }; 
            }
        } 
    };
}


// Return an iterable object that filters the specified iterable,
// iterating only those elements for which the predicate returns true 
function filter(iterable, predicate) {
    let iterator = iterable[Symbol.iterator]();
        return { // This object is both iterator and iterable
        [Symbol.iterator]() { return this; }, 
        next() {
            for(;;) {
                let v = iterator.next();
                if (v.done || predicate(v.value)) {
                    return v; 
                }
            } 
        }
    }; 
}


// Map a range of integers to their squares and convert to an array 
let arr1 = [...map(new Range(1,4), x => x*x)] 
console.log("Map: ", arr1) // => [1, 4, 9, 16]


// Filter a range so we're left with only even numbers 
let arr2 = [...filter(new Range(1,10), x => x % 2 === 0)]
console.log("Filter: ", arr2) // => [2,4,6,8,10]
