//Усложнённое задание
'use strict';
const num = 266219;
const numArr = num.toString().split('');
const result = numArr.map(Number).reduce((res, current) => res * current, 1);
const degree = result ** 3;
console.log(degree.toString().slice(0, 2));
