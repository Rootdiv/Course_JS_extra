//Усложнённое задание
'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import toggleModal from './modules/toggleModal';
import animateScroll from './modules/animateScroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calculator from './modules/calculator';
import commands from './modules/commands';
import validForm from './modules/validForm';
import contacts from './modules/contacts';
import sendForm from './modules/sendForm';

//Таймер
countTimer('14 March 2021');
//Меню
toggleMenu();
//Модальное окно
toggleModal();
//Плавная прокрутка
animateScroll();
//Табы
tabs();
//Слайдер
slider();
//Блок Калькулятор
calculator(100);
//Блок Наша команда
commands();
//Валидация форм
validForm();
//Блок Контакты
contacts();
//send-ajax-form
sendForm('form1');
sendForm('form2');
sendForm('form3');
