function myFunc() {
    let a = 10;
    if (true) {
        let a = 5;
        console.log(a);
    }

    console.log(a)
}

myFunc();

let x = 30;
let y = "200"
console.log(x+y)

const square = num => num * num;
console.log(square(3) + 5);

arr = [3, 5, 10, 20];

console.log(arr[2])

const letters = ["a", "b", "c"];

letters.splice(1, 0, 'd');

console.log(letters);

const numbers = [0, 3, 7, 8];

console.log(numbers.indexOf(0));

console.log(numbers.indexOf(1));

const numbers_2 = [10, 20, 8, 17];
numbers_2.filter(e => e > 10);
console.log(numbers_2);

const numbers_3 = [30, 35, 42, 20, 15];
console.log(numbers_3.every(num => numbers_3 > 20)); /*false*/

console.log(null == undefined); /*true*/

console.log(10 == '10'); /*true*/

console.log(true == 1); /*true*/

console.log(false === 0); /*false*/

console.log(false == 0); /*true*/

console.log(10 === '10'); /*false*/

console.log(null === undefined) /*false*/

console.log(true === 1); /*false*/

console.log(false == '0'); /*true*/
