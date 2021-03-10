'use strict';
const toggleMenu = () => {
  const menu = document.querySelector('menu');
  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };
  document.body.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.menu')) {
      handlerMenu(); //Вызов меню по кнопке Меню
    } else if (target.classList.contains('close-btn')) {
      handlerMenu(); //Закрытие меню по кнопке close
    } else {
      //Блокируем вызов меню на стрелках слайдера и закрываем при клике на пунктах меню
      if (target.matches('[href^="#"]') && !target.closest('.portfolio-content')) {
        handlerMenu();
      } else if (target && !target.closest('.menu')) {
        //Закрываем меню при клике мимо или пункта меню
        menu.classList.remove('active-menu');
      }
    }
  });
};

export default toggleMenu;
