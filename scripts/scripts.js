//Усложнённое задание
'use strict';

function weekString(week) {
  switch (week) {
    case 0:
      return 'Понедельник';
    case 1:
      return 'Вторник';
    case 2:
      return 'Среда';
    case 3:
      return 'Четверг';
    case 4:
      return 'Пятница';
    case 5:
      return 'Суббота';
    case 6:
      return 'Воскресенье';
  }
}

function monthString(month) {
  switch (month) {
    case 0:
      return 'января';
    case 1:
      return 'февраля';
    case 2:
      return 'марта';
    case 3:
      return 'апреля';
    case 4:
      return 'мая';
    case 5:
      return 'июня';
    case 6:
      return 'июля';
    case 7:
      return 'августа';
    case 8:
      return 'сентября';
    case 9:
      return 'октября';
    case 10:
      return 'ноября';
    case 11:
      return 'декабря';
  }
}

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
const shortDate = document.getElementById('short-date');
const fullDate = document.getElementById('full-date');
const week = new Date().toLocaleString('ru', {
  weekday: 'long'
});
const curWeek = week.charAt(0).toUpperCase() + week.slice(1);
const month = monthString(date.getMonth());
const hour = hours(date.getHours());
const minute = minutes(date.getHours());
const second = seconds(date.getHours());

function newDate() {
  const time = new Date();
  fullDate.textContent = `Сегодня ${curWeek}, ${twoDigits(time.getDate())} ${month} ${time.getFullYear()} года 
  ${time.getHours()} ${hour} ${time.getMinutes()} ${minute} ${time.getSeconds()} ${second}`;
}
newDate();
setInterval(function() {
  return newDate();
}, 1000);

function currentDate() {
  const time = new Date();
  shortDate.textContent = time.toLocaleDateString() + ' - ' + time.toLocaleTimeString();
}
currentDate();
setInterval(function() {
  return currentDate();
}, 1000);
