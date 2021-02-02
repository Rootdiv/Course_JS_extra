//Усложнённое задание
'use strict';
const strInput = prompt('Введите произвольный текст');

function strChange(str) {
  if (typeof str === 'string' && str !== '') {
    if (str.length > 30) {
      return str.substring(0, 30).trim().concat('...');
    } else {
      console.log('"' + str + '"');
      return '"' + str.trim() + '"';
    }
  }
  return 'Это не строка';
}
console.log(strChange(strInput));
