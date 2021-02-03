//Усложнённое задание
'use strict';
const arr = ['1565452', '246545', '5115135', '4553135', '254535', '7115532', '463536', ];
console.log('Выводим начинающееся с цифры 2 или 4');
arr.forEach((item) => {
  if (item[0] === '2' || item[0] === '4') {
    console.log(item);
  }
});

console.log('Выводим простые числа от 1 до 100');
const count = 100;
nextPrime: for (let i = 2; i <= count; i++) {
  for (let j = 2; j < i; j++) {
    if (i % j === 0) {
      continue nextPrime;
    }
  }
  console.log('Делители числа ' + i + ': 1 и ' + i);
}
