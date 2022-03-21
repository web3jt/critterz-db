const Parallel = require('paralleljs')

const p = new Parallel([1, 2, 3, 4, 5]);

console.log(p.data); // prints [1, 2, 3, 4, 5]

p.map(function (number) {
    return number * number;
}).then(function (data) {
    console.log(data);
})