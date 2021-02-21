//Усложнённое задание
'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
//Проверяем содержит ли строка только цифры или она пустая
const isStr = function(str) {
  return isNumber(str) || str === '' || str === null;
};

const calculate = document.getElementById('start');
const incomePlus = document.getElementsByTagName('button')[0];
const expensesPlus = document.getElementsByTagName('button')[1];
const deposit = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item'); //Возможный доход
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-items .income-title');
const incomeItems = document.querySelectorAll('.income-items'); //Дополнительный доход
const expensesTitle = document.querySelector('.expenses-items .expenses-title');
const expensesItems = document.querySelectorAll('.expenses-items'); //Обязательные расходы
const targetAmount = document.querySelector('.target-amount'); //Цель
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const data = document.querySelector('.data');
const cancel = document.getElementById('cancel');

class AppData {
  constructor() {
    this.money = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.targetMonth = 0;
    this.expensesMonth = 0;
  }
  start() {
    this.money = +salaryAmount.value;
    this.blockInput();
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpInc();
    this.getBudget();
    this.showResult();
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = this.calcSavedMoney();
    });
  }
  //Блок дополнительных доходов и обязательных расходов
  addIncExpBlock(event) {
    const target = event.target;
    const startStr = target.parentNode.className;
    const cloneItem = document.querySelector(`.${startStr}-items`).cloneNode(true);
    const clone = target.parentNode.insertBefore(cloneItem, target);
    const cloneItems = document.querySelectorAll(`.${startStr}-items`);
    for (let i = 1; i <= cloneItems.length; i++) {
      clone.querySelector(`.${startStr}-title`).value = '';
      clone.querySelector(`.${startStr}-amount`).value = '';
    }
    if (cloneItems.length === 3) {
      target.style.display = 'none';
    }
  }
  //Расчёт обязательных расходов и дополнительных доходов
  getExpInc() {
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = +itemAmount;
      }
    };
    expensesItems.forEach(count);
    incomeItems.forEach(count);
    for (let key in this.income) {
      this.incomeMonth += this.income[key];
    }
  }
  //Возможный доход и Возможные расходы
  getAddExpInc() {
    const addExpenses = additionalExpensesItem.value.split(',');
    this.addExpenses = addExpenses.map(elem => elem.trim()).filter(elem => elem !== '');
    const addIncomeArray = [...additionalIncomeItem];
    this.addIncome = addIncomeArray.map(elem => elem.value.trim()).filter(elem => elem !== '');
  }
  //Сумма расходов за месяц
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }
  getBudget() {
    this.budgetMonth = this.money + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }
  getStatusIncome() {
    if (this.budgetDay > 1200) {
      return 'У Вас высокий уровень дохода';
    } else if (this.budgetDay <= 1200 && this.budgetDay >= 600) {
      return 'У Вас средний уровень дохода';
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
      return 'К сожалению у Вас уровень дохода ниже среднего';
    } else {
      return 'Что то пошло не так';
    }
  }
  getInfoDeposit() {
    if (this.deposit) {
      let moneyDeposit, percentDeposit;
      do {
        percentDeposit = prompt('Какой годовой процент');
      } while (!isNumber(percentDeposit));
      this.percentDeposit = Number(percentDeposit);
      do {
        moneyDeposit = prompt('Какая сумма заложена');
      } while (!isNumber(moneyDeposit));
      this.moneyDeposit = Number(moneyDeposit);
    }
  }
  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }
  inputToggle() {
    const inputArray = data.querySelectorAll('input[type=text]');
    for (let item of inputArray) {
      item.toggleAttribute('disabled');
    }
  }
  blockInput() {
    this.inputToggle();
    calculate.style.display = 'none';
    cancel.style.display = 'block';
  }
  remIncExpBlock(element) {
    const elemLength = element.length;
    for (let i = 1; i < elemLength; i++) {
      element[i].remove();
    }
  }
  reset() {
    this.inputToggle();
    const inputReset = document.querySelectorAll('input[type=text]');
    for (let item of inputReset) {
      item.value = '';
    }
    this.remIncExpBlock(document.querySelectorAll('.income-items'));
    this.remIncExpBlock(document.querySelectorAll('.expenses-items'));
    expensesPlus.style.display = 'block';
    incomePlus.style.display = 'block';
    calculate.removeAttribute('style');
    cancel.removeAttribute('style');
    periodAmount.textContent = periodSelect.value = 1;
    this.money = +salaryAmount.value;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
  }
  eventsListeners() {
    document.querySelector('.calc').addEventListener('mouseover', () => {
      if (salaryAmount.value === '') {
        calculate.setAttribute('disabled', '');
      } else {
        calculate.removeAttribute('disabled');
      }
    });
    calculate.addEventListener('click', () => this.start());
    cancel.addEventListener('click', () => this.reset());
    expensesPlus.addEventListener('click', (event) => this.addIncExpBlock(event));
    incomePlus.addEventListener('click', (event) => this.addIncExpBlock(event));
    periodSelect.addEventListener('input', () => {
      periodAmount.textContent = periodSelect.value;
    });
  }
}
const appData = new AppData();

appData.eventsListeners();

const validStr = document.querySelectorAll('[placeholder="Наименование"]');
validStr.forEach(item => {
  item.addEventListener('input', function() {
    item.value = item.value.replace(/[^а-яё\s!?:,.]/gi, '');
  });
});

const validNum = document.querySelectorAll('[placeholder="Сумма"]');
validNum.forEach(item => {
  item.addEventListener('input', function() {
    item.value = item.value.replace(/[^\d]/g, '');
  });
});
