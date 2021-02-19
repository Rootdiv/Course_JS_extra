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
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');

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
    this.incomePeriod = 0;
  }
  start() {
    this.money = +salaryAmount.value;
    this.blockInput();
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpInc();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
    this.saveLocalStorage();
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    this.targetMonth = targetMonthValue.value = this.getTargetMonth();
    this.incomePeriod = incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', () => {
      this.incomePeriod = incomePeriodValue.value = this.calcSavedMoney();
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
    const addExpInc = item => {
      return item.map(elem => elem.trim()).filter(elem => elem !== '');
    };
    this.addExpenses = addExpInc(additionalExpensesItem.value.split(','));
    this.addIncome = addExpInc([additionalIncomeItem[0].value, additionalIncomeItem[1].value]);
  }
  //Сумма расходов за месяц
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.money + this.incomeMonth - this.expensesMonth + monthDeposit;
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
      this.percentDeposit = +depositPercent.value;
      this.moneyDeposit = +depositAmount.value;
    }
  }
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.value = '';
      depositPercent.style.display = 'inline-block';
      depositPercent.addEventListener('input', () => {
        depositPercent.value = depositPercent.value.replace(/[^\d]/g, '');
        if (depositPercent.value !== '' && depositPercent.value < 1 || depositPercent.value > 100) {
          calculate.disabled = true;
          alert('Введите корректное значение в поле проценты');
        } else if (salaryAmount.value !== '') {
          calculate.disabled = false;
        }
      });
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }
  }
  depositHandler() {
    if (deposit.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
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
  reset() {
    this.inputToggle();
    localStorage.removeItem('appDataSaved');
    const inputReset = document.querySelectorAll('input[type=text]');
    for (let item of inputReset) {
      item.value = '';
    }
    const remIncExpBlock = item => {
      for (let i = 1; i < item.length; i++) {
        item[i].remove();
      }
    };
    remIncExpBlock(document.querySelectorAll('.income-items'));
    remIncExpBlock(document.querySelectorAll('.expenses-items'));
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
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.targetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.incomePeriod = 0;
  }
  saveLocalStorage() {
    const json = JSON.stringify(this);
    localStorage.setItem('appDataSaved', json);
    for (let key in this) {
      this.setCookie(key, this[key]);
    }
    this.setCookie('isLoad', 'true');
  }
  setCookie(key, value, year, month, day, path, domain, secure) {
    let cookieStr = encodeURI(key) + '=' + encodeURI(value);
    if (year) {
      const expires = new Date(year, month - 1, day);
      cookieStr += '; expires=' + expires.toUTCString();
    } else {
      const expires = new Date();
      expires.setMonth(expires.getMonth() + 1);
      cookieStr += '; expires=' + expires.toUTCString();
    }
    cookieStr += path ? '; path=' + encodeURI(path) : '';
    cookieStr += domain ? '; domain=' + encodeURI(domain) : '';
    cookieStr += secure ? '; secure' : '';
    document.cookie = cookieStr;
  }
  eventsListeners() {
    salaryAmount.addEventListener('input', () => {
      salaryAmount.value = salaryAmount.value.replace(/[^\d]/g, '');
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
    deposit.addEventListener('change', () => this.depositHandler());
  }
}
const appData = new AppData();

document.addEventListener('DOMContentLoaded', calculate.setAttribute('disabled', ''));

appData.eventsListeners();

function CookiesDelete() {
  const cookies = document.cookie.split('; ');
  for (var i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

const loadLocalStorage = function() {
  const appDataSaved = JSON.parse(localStorage.getItem('appDataSaved'));
  const locStorValid = [];
  for (let key in appDataSaved) {
    locStorValid.push(key);
  }
  const cookieValid = [];
  const cookies = document.cookie.split('; ');
  const cookiesLength = cookies.length;
  for (let i = 0; i < cookiesLength; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] !== 'isLoad') {
      cookieValid.push(cookie[0]);
    }
  }
  const compareArrays = (arr1, arr2) => {
    const len = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < len; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };
  if (compareArrays(cookieValid, locStorValid)) {
    const appDataSaved = JSON.parse(localStorage.getItem('appDataSaved'));
    budgetDayValue.value = appDataSaved.budgetDay;
    budgetMonthValue.value = appDataSaved.budgetMonth;
    expensesMonthValue.value = appDataSaved.expensesMonth;
    additionalExpensesValue.value = appDataSaved.addExpenses.join(', ');
    additionalIncomeValue.value = appDataSaved.addIncome.join(', ');
    incomePeriodValue.value = appDataSaved.incomePeriod;
    targetMonthValue.value = appDataSaved.targetMonth;
    appData.inputToggle();
  } else {
    localStorage.removeItem('appDataSaved');
    budgetDayValue.value = '';
    budgetMonthValue.value = '';
    expensesMonthValue.value = '';
    additionalExpensesValue.value = '';
    additionalIncomeValue.value = '';
    incomePeriodValue.value = '';
    targetMonthValue.value = '';
    CookiesDelete();
  }
};

loadLocalStorage();

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
