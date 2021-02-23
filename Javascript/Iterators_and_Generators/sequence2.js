import { oneDigitPrimes } from './primes.js'

function* sequence2(...iterables) {
    for (let iterable of iterables) {
        yield* iterable;
    }
}

console.log([...sequence3("abc", oneDigitPrimes())]) // => ["a", "b", "c", 2, 3, 5, 7]
