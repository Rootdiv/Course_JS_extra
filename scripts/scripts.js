//Усложнённое задание
'use strict';

function twoDigits(num) {
  return ('0' + num).slice(-2);
}

function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function hours(num) {
  return declOfNum(num, ['час', 'часа', 'часов']);
}

function minutes(num) {
  return declOfNum(num, ['минута', 'минуты', 'минут']);
}

function seconds(num) {
  return declOfNum(num, ['секунда', 'секунды', 'секунд']);
}

const date = new Date();
const shortTextDate = document.getElementById('short-date');
const longDate = document.getElementById('full-date');
const day = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const hour = hours(date.getHours());
const minute = minutes(date.getHours());
const second = seconds(date.getHours());

function fullDate() {
  const time = new Date();
  longDate.textContent = `Сегодня ${day[time.getDay()-1]} ${twoDigits(time.getDate())} ${month[time.getMonth()]} ${time.getFullYear()} года 
  ${twoDigits(time.getHours())} ${hour} ${twoDigits(time.getMinutes())} ${minute} ${twoDigits(time.getSeconds())} ${second}`;
}

fullDate();
setInterval(function() {
  fullDate();
}, 1000);

function shortDate() {
  const time = new Date();
  shortTextDate.textContent = `${twoDigits(time.getDate())}.${twoDigits(time.getMonth()+1)}.${time.getFullYear()} - 
  ${twoDigits(time.getHours())}:${twoDigits(time.getMinutes())}:${twoDigits(time.getSeconds())}`;
}
shortDate();
setInterval(function() {
  shortDate();
}, 1000);
