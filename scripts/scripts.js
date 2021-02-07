//Усложнённое задание
'use strict';
const week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
const currentWeek = new Date().toLocaleString('ru', {
  weekday: 'long'
});
const elem = document.querySelector('#lesson7');
week.forEach((item, i) => {
  const day = document.createElement('div');
  day.textContent = week[i];
  if (item === currentWeek) {
    day.classList.add('bold');
  }
  if (item === 'суббота' || item === 'воскресенье') {
    day.classList.add('italic');
  }
  elem.appendChild(day);
});
