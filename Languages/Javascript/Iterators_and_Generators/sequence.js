import { oneDigitPrimes } from './primes.js'

function* sequence(...iterables) {
    for (let iterable of iterables) {
        for (let item of iterable) {
            yield item;
        }
    }
}

console.log([...sequence("abc", oneDigitPrimes())])  // => ["a", "b", "c", 2, 3, 5, 7]
