//Усложнённое задание
'use strict';
const animateScroll = () => {
  const menu = document.querySelector('menu');
  const btnMouse = document.querySelector('main a');
  const scroll = (event) => {
    let target = event.target.closest('[href^="#"]');
    //Проверяем что target не null и не кнопка закрытия меню
    if (target && !target.matches('[href="#close"]')) {
      const link = target.getAttribute('href').substring(1);
      const scrollBlock = document.getElementById(link).offsetTop;
      let animation, count = window.pageYOffset; //Позиция начала прокрутки
      const scrollRun = () => {
        animation = requestAnimationFrame(scrollRun);
        count += 15;
        if (count < scrollBlock) {
          document.documentElement.scrollTop = count;
        } else {
          cancelAnimationFrame(animation);
        }
      };
      requestAnimationFrame(scrollRun);
    }
  };
  [menu, btnMouse].map(elem => elem.addEventListener('click', (event) => {
    event.preventDefault();
    scroll(event);
  }));
};

export default animateScroll;
