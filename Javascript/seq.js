const seq = function*(from, to) {
    for (let i = from; i <= to; i++) yield i;
}
console.log([...seq(3, 5)]) // => [3, 4, 5]
