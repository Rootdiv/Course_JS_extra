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
  //Слайдер
  const slider = () => {
    const slider = document.querySelector('.portfolio-content');
    const slide = document.querySelectorAll('.portfolio-item');
    const btnDot = document.querySelector('.portfolio-dots');
    for (let i = 0; i < slide.length; i++) {
      const dots = document.createElement('li');
      dots.classList.add('dot');
      if (i === 0) {
        dots.classList.add('dot-active');
      }
      btnDot.append(dots);
    }
    const dot = document.querySelectorAll('.dot');
    let currentSlide = 0,
      interval;
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
      clearTimeout(interval);
    };
    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });
    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });
    startSlide(1500);
  };
  slider();
  //Блок Калькулятор
  const calculator = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const calcType = document.querySelector('.calc-type');
    const calcSquare = document.querySelector('.calc-square');
    const calcCount = document.querySelector('.calc-count');
    const calcDay = document.querySelector('.calc-day');
    const totalValue = document.getElementById('total');
    let countId; //Переменная для анимации итоговой суммы
    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      let count = 0;
      const typeValue = calcType.options[calcType.selectedIndex].value;
      const squareValue = +calcSquare.value;
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
        //Запуск анимации итоговой суммы
        countId = setInterval(() => {
          if (count === total) {
            clearInterval(countId);
          } else {
            count++;
            totalValue.textContent = count;
          }
        }, 1);
      } else {
        totalValue.textContent = total;
      }
    };
    calcBlock.addEventListener('change', (event) => {
      const target = event.target;
      if (target.matches('select') || target.matches('input')) {
        //Сброс анимации итоговой суммы, если значения калькулятора изменились 
        clearInterval(countId);
        countSum();
      }
    });
    calcBlock.addEventListener('input', (event) => {
      if (event.target.matches('input')) {
        event.target.value = event.target.value.replace(/\D/, '');
      }
    });
  };
  calculator(100);
  //Блок Наша команда
  const commands = () => {
    const command = document.getElementById('command');
    const changeImg = (event) => {
      if (event.target.closest('.command__photo')) {
        const img = event.target.src;
        event.target.src = event.target.dataset.img;
        event.target.dataset.img = img;
      }
    };
    command.addEventListener('mouseover', (event) => {
      changeImg(event);
    });
    command.addEventListener('mouseout', (event) => {
      changeImg(event);
    });
  };
  commands();
  //Валидация форм
  const validFormName = () => {
    const formName = document.querySelectorAll('[placeholder="Ваше имя"]');
    formName.forEach(item => {
      item.addEventListener('blur', () => {
        item.value = item.value.trim().replace(/[^а-яё\s]/gi, '');
        item.value = item.value.split(/\s+/).map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
      });
    });
  };
  validFormName();
  const validFormEmail = () => {
    const formEmail = document.querySelectorAll('[placeholder="E-mail"]');
    formEmail.forEach(item => {
      item.addEventListener('blur', () => {
        item.value = item.value.trim().replace(/[^a-z@\-_.!~*']/gi, '').replace(/^-|-$/g, '').replace(/\s+/g, ' ').replace(/-+/g, '-');
      });
    });
  };
  validFormEmail();
  const validFormPhone = () => {
    const formPhone = document.querySelectorAll('[placeholder="Номер телефона"]');
    formPhone.forEach(item => {
      item.addEventListener('blur', () => {
        item.value = item.value.trim().replace(/[^\d\-()]/g, '').replace(/^-|-$/g, '').replace(/-+/g, '-');
      });
    });
  };
  validFormPhone();
  //Блок Контакты
  const contacts = () => {
    const message = document.getElementById('form2-message');
    message.addEventListener('blur', () => {
      message.value = message.value.trim().replace(/[^а-яё\s]/gi, '').replace(/\s+/g, ' ').replace(/-+/g, '-');
    });
  };
  contacts();
});
