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

