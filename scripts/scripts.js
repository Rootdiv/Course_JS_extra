//Усложнённое задание
'use strict';

const isStr = function(str) {
  const strReg = /^[a-zа-яё]+(\s[a-zа-яё]+)?$/i;
  return !strReg.test(str);
};

function twoDigits(num) {
  return ('0' + num).slice(-2);
}

const login = document.querySelector('h1');
const reg = document.getElementById('reg');
const auth = document.getElementById('auth');
const user = document.getElementById('user');
const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function regDate() {
  const time = new Date();
  const date = `${twoDigits(time.getDate())} ${month[time.getMonth()]} ${time.getFullYear()} г., 
  ${twoDigits(time.getHours())}:${twoDigits(time.getMinutes())}:${twoDigits(time.getSeconds())}`;
  return date;
}

const userData = [];

const loadLocalStorage = function() {
  const locStor = localStorage.getItem('userList');
  if (locStor !== null) {
    const saveTodo = JSON.parse(locStor);
    saveTodo.forEach(function(item) {
      userData.push(item);
    });
  }
};

const saveLocalStorage = function() {
  const json = JSON.stringify(userData);
  localStorage.setItem('userList', json);
};

const render = function() {
  user.textContent = '';
  userData.forEach(function(item, i) {
    const li = document.createElement('li');
    li.classList.add('user-item');
    li.innerHTML = '<span> Имя: ' + item.firstName + '</span>' +
      '<span> Фамилия: ' + item.lastName + ',</span>' +
      '<span> зарегистрирован: ' + item.regDate + '</span>' +
      '<button class="user-remove">Удалить</button>';
    user.append(li);
    const btnRemove = li.querySelector('.user-remove');
    btnRemove.addEventListener('click', function() {
      li.remove();
      userData.splice(i, 1);
      render();
      if (userData.length !== 0) {
        saveLocalStorage();
      } else {
        localStorage.removeItem('userList');
      }
    });
  });
};

reg.addEventListener('click', function() {
  let regUser = [];
  const addUser = prompt('Введите Имя и Фамилию через пробел');
  if (addUser.trim() !== '') {
    if (isStr(addUser)) {
      return alert('Ошибка, больше одного пробела');
    } else {
      regUser = addUser.split(' ');
    }
  } else {
    return false;
  }
  const loginUser = prompt('Введите Логин');
  const passUser = prompt('Введите Пароль');
  const newUser = {
    firstName: regUser[0],
    lastName: regUser[1],
    loginUser: loginUser,
    passUser: passUser,
    regDate: regDate()
  };
  userData.push(newUser);
  saveLocalStorage();
  render();
});

auth.addEventListener('click', function() {
  const loginUser = prompt('Введите Логин');
  const passUser = prompt('Введите Пароль');
  let user = false;
  userData.forEach(function(item) {
    if (item.loginUser === loginUser && item.passUser === passUser) {
      login.textContent = 'Привет ' + item.firstName;
      user = true;
    }
  });
  if (!user) {
    alert('Пользователь не найден');
  }
});

loadLocalStorage();
document.addEventListener('DOMContentLoaded', render);
