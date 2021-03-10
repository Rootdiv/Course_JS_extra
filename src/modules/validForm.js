'use strict';
const validForm = () => {
  const validFormName = () => {
    const formName = document.querySelectorAll('[placeholder="Ваше имя"]');
    formName.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^а-яё\s]/gi, '');
      });
      item.addEventListener('blur', () => {
        item.value = item.value.split(/\s+/).map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
      });
    });
  };
  validFormName();
  const validFormEmail = () => {
    //Выбираем все поля плейсхолдер которых содержит строку "E-mail"
    const formEmail = document.querySelectorAll('[placeholder~="E-mail"]');
    formEmail.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^a-z@\-_.!~*']/gi, '');
      });
      item.addEventListener('blur', () => {
        item.value = item.value.replace(/^[\s-]+|[\s-]+$/gi, '').replace(/-+/g, '-');
      });
    });
  };
  validFormEmail();
  const validFormPhone = () => {
    //Выбираем все поля плейсхолдер которых содержит подстроку "телефон"
    const formPhone = document.querySelectorAll('[placeholder*="телефон"]');
    formPhone.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^+\d]/g, '');
      });
      item.addEventListener('blur', () => {
        item.value = item.value.replace(/^[\s]+|[\s\+]{1,}$/g, '');
      });
    });
  };
  validFormPhone();
};

export default validForm;
