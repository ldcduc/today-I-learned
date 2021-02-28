// Return an iterable object that iterates the result of applying f() // to each value from the source iterable
export function map(iterable, f) {
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
export function filter(iterable, predicate) {
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
