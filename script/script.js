//Усложнённое задание
window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  //Таймер
  const countTimer = (deadline) => {
    const timerHours = document.getElementById('timer-hours');
    const timerMinutes = document.getElementById('timer-minutes');
    const timerSeconds = document.getElementById('timer-seconds');

    const twoDigits = (num) => {
      return ('0' + num).slice(-2);
    };

    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime();
      const dateNow = new Date().getTime();
      const fullStop = dateNow > dateStop ? true : false;
      const timeRemaining = (dateStop - dateNow) / 1000;
      const seconds = twoDigits(Math.floor(timeRemaining % 60));
      const minutes = twoDigits(Math.floor((timeRemaining / 60) % 60));
      const hours = twoDigits(Math.floor(timeRemaining / 60 / 60));
      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
        fullStop
      };
    };

    const updateClock = () => {
      const timer = getTimeRemaining();
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
    };
    if (getTimeRemaining().timeRemaining > 0) {
      updateClock();
      const timerId = setInterval(() => {
        if (getTimeRemaining().fullStop) {
          clearInterval(timerId);
        } else {
          updateClock();
        }
      }, 1000);
    }
  };
  countTimer('25 February 2021');
  //Меню
  const toggleMenu = () => {
    const menu = document.querySelector('menu');
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };
    document.body.addEventListener('click', (event) => {
      let target = event.target;
      if (target.closest('.menu')) {
        handlerMenu();
      } else if (target.classList.contains('close-btn')) {
        handlerMenu();
      } else {
        target = target.matches('[href^="#"]');
        if (target) {
          handlerMenu();
        } else if (target && !target.closest('.menu')) {
          menu.classList.remove('active-menu');
        }
      }
    });
  };
  toggleMenu();
  //Модальное окно
  const toggleModal = () => {
    const popUp = document.querySelector('.popup');
    const popUpBtn = document.querySelectorAll('.popup-btn');
    popUp.style.display = 'block';
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
    popUpBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (document.body.clientWidth > 768) {
          requestAnimationFrame(transform);
        } else {
          popUp.style.transform = 'translateX(0)';
        }
      });
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
  toggleModal();
  //Плавная прокрутка
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
  animateScroll();
  //Табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header');
    const tab = document.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');
    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();
});
