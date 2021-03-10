'use strict';
const calculator = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block');
  const calcType = document.querySelector('.calc-type');
  const calcSquare = document.querySelector('.calc-square');
  const calcCount = document.querySelector('.calc-count');
  const calcDay = document.querySelector('.calc-day');
  const totalValue = document.getElementById('total');
  let countId, count = 0; //Переменная для анимации итоговой суммы и счётчика
  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1;
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
      const step = Math.round(total / 100 * 24);
      countId = setInterval(() => {
        if (count >= total) {
          clearInterval(countId);
          totalValue.textContent = Math.floor(total);
        } else {
          count += step;
          totalValue.textContent = count;
        }
      }, 37);
    } else {
      totalValue.textContent = total;
    }
  };
  calcBlock.addEventListener('change', (event) => {
    const target = event.target;
    if (target.matches('select') || target.matches('input')) {
      //Сброс анимации итоговой суммы и счётчика, если значения калькулятора изменились 
      clearInterval(countId);
      count = 0;
      countSum();
    }
  });
  calcBlock.addEventListener('input', (event) => {
    if (event.target.matches('input')) {
      event.target.value = event.target.value.replace(/\D/, '');
    }
  });
};

export default calculator;
