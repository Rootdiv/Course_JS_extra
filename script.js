//Усложнённое задание
'use strict';

const select = document.querySelector('.select');
const usd = document.getElementById('usd');
const eur = document.getElementById('eur');
const dollar = document.querySelector('.dollar');
const euro = document.querySelector('.euro');
const direction = document.getElementById('direction');
const btn = document.querySelector('button');
const rubInput = document.querySelector('.rub-input');
const usdInput = document.querySelector('.usd-input');
const eurInput = document.querySelector('.eur-input');

const getData = (url) => {
  return fetch(url, {
    mode: 'cors'
  });
};
const convert = (data) => {
  const eurValue = data.rates.EUR;
  const usdValue = data.rates.USD;
  if (direction.checked) { //Конвертируем валюту в рубли
    if (usdInput.value.trim() !== '' && usd.checked) {
      //Конвертируем доллары в рубли
      const usdToRub = +usdInput.value / usdValue;
      rubInput.value = usdToRub.toFixed(2);
    } else if (eurInput.value.trim() !== '' && eur.checked) {
      //Конвертируем евро в рубли
      const eurToRub = +eurInput.value / eurValue;
      rubInput.value = eurToRub.toFixed(2);
    }
  } else { //Конвертируем рубли в валюту
    if (rubInput.value.trim() !== '' && usd.checked) {
      //Конвертируем рубли в доллары
      const usdToRub = +rubInput.value * usdValue;
      usdInput.value = usdToRub.toFixed(2);
    } else if (rubInput.value.trim() !== '' && eur.checked) {
      //Конвертируем рубли в евро
      const eurToRub = +rubInput.value * eurValue;
      eurInput.value = eurToRub.toFixed(2);
    }
  }
};
const result = () => {
  getData('https://api.exchangeratesapi.io/latest?base=RUB&symbols=USD,EUR').then((response) => {
    if (response.status !== 200) {
      throw new Error('Status network not 200');
    }
    return response.json();
  }).then(data => convert(data)).catch(error => console.error(error));
};
const validInput = () => {
  const inputText = document.querySelectorAll('input[type="text"]');
  inputText.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[\D]/g, '');
    });
  });
};
validInput();
select.addEventListener('click', () => {
  if (usd.checked) {
    dollar.style.display = 'inline-block';
    euro.style.display = 'none';
    eurInput.value = '';
  } else {
    euro.style.display = 'inline-block';
    dollar.style.display = 'none';
    usdInput.value = '';
  }
  if (direction.checked) {
    rubInput.value = '';
    eurInput.value = '';
    usdInput.value = '';
  }
});
btn.addEventListener('click', result);
document.addEventListener('keyup', (event) => {
  if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    result();
  }
});
