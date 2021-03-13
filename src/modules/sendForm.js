'use strict';
const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...';
  const loadMessage = 'Загрузка...';
  const successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';
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
    });
  };
  const formSubmit = (target) => {
    target.appendChild(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(target);
    target.reset();
    const removeMessage = () => {
      setTimeout(() => statusMessage.remove(), 5000);
    };
    postData(formData).then((response) => {
      if (response.status !== 200) {
        throw new Error('Status network not 200');
      }
      statusMessage.textContent = successMessage;
      removeMessage();
    }).catch(error => {
      statusMessage.textContent = errorMessage;
      console.error(error);
      removeMessage();
    });
  };
  document.body.addEventListener('submit', (event) => {
    event.preventDefault();
    formSubmit(event.target);
  });
};

export default sendForm;
