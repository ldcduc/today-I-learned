let o = {
    x: 1, y: 2, z: 3,
    // A generator that yields each of the keys of this object
    *g() {
        for (let key of Object.keys(this)) {
            yield key;
        }
    }
}

console.log([...o.g()])  // => ["x", "y", "z", "g"]
