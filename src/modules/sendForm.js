'use strict';
const sendForm = (formId) => {
  const errorMessage = 'Что-то пошло не так...';
  const loadMessage = '<img src="./images/loader.svg" alt="Загрузка...">';
  const successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';
  const form = document.getElementById(formId);
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem; color: #ffffff';
  //Функция отправки данных на сервер и обработки ответа
  const postData = (formData) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
      /*headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)*/
    });
  };
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.appendChild(statusMessage);
    statusMessage.innerHTML = loadMessage;
    const formData = new FormData(form);
    form.reset();
    /*let body = {};
    formData.forEach((val, key) => {
      body[key] = val;
    });*/
    postData(formData).then((response) => {
      if (response.status !== 200) {
        throw new Error('Status network not 200');
      }
      statusMessage.textContent = successMessage;
    }).catch(error => {
      statusMessage.textContent = errorMessage;
      console.error(error);
    });
  });
};

export default sendForm;
