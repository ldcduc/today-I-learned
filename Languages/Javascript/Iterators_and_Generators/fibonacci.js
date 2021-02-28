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
