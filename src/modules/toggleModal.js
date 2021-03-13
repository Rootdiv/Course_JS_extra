'use strict';
const toggleModal = () => {
  //Получаем блок содержащий кнопку вызова модального окна
  const servicePopUpBtn = document.querySelector('.service');
  const popUp = document.querySelector('.popup');
  popUp.style.display = 'block'; //Получем модально окно и подключаем стили для анимации
  popUp.style.transform = 'translateX(100%)';
  let animation, count = 100;
  const transform = () => {
    animation = requestAnimationFrame(transform);
    count--;
    if (count >= 0) {
      popUp.style.transform = `translateX(${count}%)`;
    } else {
      cancelAnimationFrame(animation);
    }
  };
  servicePopUpBtn.addEventListener('click', (event) => {
    if (event.target.matches('.popup-btn')) {
      if (document.body.clientWidth > 768) {
        requestAnimationFrame(transform);
      } else {
        popUp.style.transform = 'translateX(0)';
      }
    }
  });
  popUp.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('popup-close')) {
      count = 100;
      popUp.style.transform = 'translateX(100%)';
    } else {
      target = target.closest('.popup-content');
      if (!target) {
        count = 100;
        popUp.style.transform = 'translateX(100%)';
      }
    }
  });
};

export default toggleModal;
