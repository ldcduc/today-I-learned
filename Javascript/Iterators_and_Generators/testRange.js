import { Range } from './range.js'

for (let x of new Range(1, 10)) console.log(x);
let arr = [...new Range(-2, 2)];
console.log("Range: ", arr)                
