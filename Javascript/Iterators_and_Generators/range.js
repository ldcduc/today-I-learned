/*
* A Range object represents a range of numbers {x: from <= x <= to}
* Range defines a has() method for testing whether a given number is a member * of the range. Range is iterable and iterates all integers within the range. */
export class Range {
    constructor (from, to) {
        this.from = from;
        this.to = to; 
    }
    // Make a Range act like a Set of numbers
    has(x) { return typeof x === "number" && this.from <= x && x <= this.to; } 
    
    // Return string representation of the range using set notation
    toString() { return `{ x | ${this.from} ≤ x ≤ ${this.to} }`; }

    // Make a Range iterable by returning an iterator object.
    // Note that the name of this method is a special symbol, not a string.
    [Symbol.iterator]() {
        // Each iterator instance must iterate the range independently of 
        // others. So we need a state variable to track our location in the         // iteration. We start at the first integer >= from.
        let next = Math.ceil(this.from);
        let last = this.to;
        return {
            // This next() method is what makes this an iterator object
            // It must return an iterator result object.
            next() {
                return (next <= last) // If we haven't returned last value yet
                ? { value: next++ }   // return next value and increment it 
                : { done: true };     // otherwise indicate that we're done.
            },

            // As a convenience, we make the iterator itself iterable.
            [Symbol.iterator]() { return this; } 
        };
    }
}