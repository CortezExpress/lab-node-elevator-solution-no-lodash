const Person = require('./person.js');
const Elevator = require('./elevator.js');

let isa  = new Person("Isa",  0, 8);
let raul = new Person("Raul", 2, 5);
let fer  = new Person("Fer",  5, 1);
let gonzu = new Person("Gonzu",  7, 4);

let elevator = new Elevator();

elevator.start();

elevator.call(isa);
elevator.call(raul);
elevator.call(fer);

setTimeout(() => {elevator.call(gonzu)}, 10000);
