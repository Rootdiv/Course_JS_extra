//Усложнённое задание
'use strict';
const strInput = prompt('Введите произвольный текст');
const notStr = 'Это не строка';
const strReg = /\D/;

function strChange(str) {
  if (typeof str === 'string' && str !== '') {
    if (!strReg.test(str)) {
      return notStr;
    } else if (str.length > 30) {
      return str.substring(0, 30).concat('...');
    } else {
      console.log('"' + str + '"');
      return '"' + str.trim() + '"';
    }
  }
  return notStr;
}
console.log(strChange(strInput));
