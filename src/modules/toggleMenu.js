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
      //Блокируем вызов меню на стрелках слайдера и в футере
      if (!target.closest('.portfolio-content') && !target.closest('footer')) {
        if (target.matches('[href^="#"]')) {
          handlerMenu();
        } else if (target && !target.closest('.menu')) {
          //Закрываем меню при клике мимо или пункта меню
          menu.classList.remove('active-menu');
        }
      }
    }
  });
};

export default toggleMenu;
