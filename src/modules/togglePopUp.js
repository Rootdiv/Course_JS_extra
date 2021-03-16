'use strict';
const togglePopUp = () => {
  //Получаем блок содержащий кнопку вызова модального окна
  const servicePopUpBtn = document.querySelector('.service');
  const popUp = document.querySelector('.popup');
  const popUpContent = document.querySelector('.popup-content');
  const width = parseInt(getComputedStyle(popUpContent).width) / 2;
  const startPos = Math.floor(width);
  popUpContent.style.transform = `translateX(${100 + startPos}%)`;
  let animation, count = 100 + startPos;
  const transform = () => {
    animation = requestAnimationFrame(transform);
    count -= 2;
    if (count >= 0) {
      popUpContent.style.transform = `translateX(${count}%)`;
    } else {
      cancelAnimationFrame(animation);
    }
  };
  const closePopUp = () => {
    count = 100 + startPos;
    popUp.style.display = 'none';
    popUpContent.style.transform = `translateX(${100 + startPos}%)`;
  };
  servicePopUpBtn.addEventListener('click', (event) => {
    if (event.target.matches('.popup-btn')) {
      popUp.style.display = 'block';
      if (document.body.clientWidth > 768) {
        requestAnimationFrame(transform);
      } else {
        popUpContent.style.transform = 'translateX(0)';
      }
    }
  });
  popUp.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('popup-close')) {
      closePopUp();
    } else {
      target = target.closest('.popup-content');
      if (!target) {
        closePopUp();
      }
    }
  });
};

export default togglePopUp;
