//Усложнённое задание
'use strict';
const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const currentWeek = new Date().getDay() - 1;
const elem = document.querySelector('#lesson7');
week.forEach((item, i) => {
  const day = document.createElement('div');
  day.textContent = week[i];
  if (i === currentWeek) {
    day.classList.add('bold');
  }
  if (item === 'Суббота' || item === 'Воскресенье') {
    day.classList.add('italic');
  }
  elem.appendChild(day);
});
