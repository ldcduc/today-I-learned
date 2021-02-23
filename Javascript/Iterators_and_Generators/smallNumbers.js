// smallNumbers.js
function* smallNumbers() {
    console.log("next() invoked the first time; argument discarded"); let y1 = yield 1; // y1 == "b"
    console.log("next() invoked a second time with argument", y1);
    let y2 = yield 2; // y2 == "c"
    console.log("next() invoked a third time with argument", y2);
    let y3 = yield 3; // y3 == "d"
    console.log("next() invoked a fourth time with argument", y3); return 4;
}

let g = smallNumbers();
console.log("generator created; no code runs yet");
let n1 = g.next("a"); // n1.value == 1 
console.log("generator yielded", n1.value);
let n2 = g.next("b"); // n2.value == 2 
console.log("generator yielded", n2.value);
let n3 = g.next("c"); // n3.value == 3 
console.log("generator yielded", n3.value);
let n4 = g.next("d"); // n4 == { value: 4, done: true } 
console.log("generator returned", n4.value);
