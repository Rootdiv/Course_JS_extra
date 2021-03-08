//Усложнённое задание
'use strict';

const select = document.getElementById('cars');
const output = document.getElementById('output');

const getData = (url) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.setRequestHeader('Content-type', 'application/json');
    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        const response = JSON.parse(request.responseText);
        resolve(response);
      } else {
        reject(request.statusText);
      }
    });
    request.send();
  });
};
const cars = (data) => {
  data.cars.forEach(item => {
    if (item.brand === select.value) {
      const {
        brand,
        model,
        price
      } = item;
      output.innerHTML = `Тачка ${brand} ${model} <br> Цена: ${price}$`;
    } else if (select.value === 'no') {
      output.textContent = 'Тачка не выбрана';
    }
  });
};
select.addEventListener('change', () => {
  getData('./cars.json').then(cars).catch(error => output.textContent = 'Произошла ошибка: ' + error);
});
