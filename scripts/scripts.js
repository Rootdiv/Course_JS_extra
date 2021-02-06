//Усложнённое задание
'use strict';
const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const currentWeek = new Date().toLocaleString('ru', {
  weekday: 'long'
});
const elem = document.querySelector('#lesson7');
week.forEach((item, i) => {
  const day = document.createElement('div');
  day.textContent = week[i];
  if (item.toLowerCase() === currentWeek) {
    day.classList.add('bold');
  }
  if (item === 'Суббота' || item === 'Воскресенье') {
    day.classList.add('italic');
  }
  elem.appendChild(day);
});
