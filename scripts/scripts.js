//Усложнённое задание
'use strict';
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const calculate = document.getElementById('start');
const incomePlus = document.getElementsByTagName('button')[0];
const expensesPlus = document.getElementsByTagName('button')[1];
const deposit = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const additionalIncome1 = document.querySelectorAll('.additional_income-item')[0];
const additionalIncome2 = document.querySelectorAll('.additional_income-item')[1];
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
let incomeItems = document.querySelectorAll('.income-items');
const expensesTitle = document.querySelector('.expenses-items .expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');

const appData = {
  money: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budgetDay: 0,
  budgetMonth: 0,
  targetMonth: 0,
  expensesMonth: 0,
  start: function() {
    appData.money = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
  },
  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcSavedMoney();
    periodSelect.addEventListener('input', function() {
      incomePeriodValue.value = appData.calcSavedMoney();
    });
  },
  //Блок обязательных расходов
  addExpensesBlock: function() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    const clone = expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    for (let i = 1; i <= expensesItems.length; i++) {
      clone.querySelector('.expenses-title').value = '';
      clone.querySelector('.expenses-amount').value = '';
    }
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getAddExpenses: function() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });

  },
  //Блок дополнительных доходов
  addIncomeBlock: function() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    const clone = incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    for (let i = 1; i <= expensesItems.length; i++) {
      clone.querySelector('.income-title').value = '';
      clone.querySelector('.income-amount').value = '';
    }
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      }
      for (let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
      }
    });
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  //Сумма расходов за месяц
  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function() {
    appData.budgetMonth = appData.money + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function() {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },
  getStatusIncome: function() {
    if (appData.budgetDay > 1200) {
      return 'У Вас высокий уровень дохода';
    } else if (appData.budgetDay <= 1200 && appData.budgetDay >= 600) {
      return 'У Вас средний уровень дохода';
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
      return 'К сожалению у Вас уровень дохода ниже среднего';
    } else {
      return 'Что то пошло не так';
    }
  },
  getInfoDeposit: function() {
    if (appData.deposit) {
      let moneyDeposit, percentDeposit;
      do {
        percentDeposit = prompt('Какой годовой процент');
      } while (!isNumber(percentDeposit));
      appData.percentDeposit = Number(percentDeposit);
      do {
        moneyDeposit = prompt('Какая сумма заложена');
      } while (!isNumber(moneyDeposit));
      appData.moneyDeposit = Number(moneyDeposit);
    }
  },
  calcSavedMoney: function() {
    return appData.budgetMonth * periodSelect.value;
  }
};

const validStr = document.querySelectorAll('[placeholder="Наименование"]');
validStr.forEach(function(item) {
  item.addEventListener('input', function() {
    item.value = item.value.replace(/[^а-яё\s!?:,.]/gi, '');
  });
});

const validNum = document.querySelectorAll('[placeholder="Сумма"]');
validNum.forEach(function(item) {
  item.addEventListener('input', function() {
    item.value = item.value.replace(/[^\d]/g, '');
  });
});

document.querySelector('.calc').addEventListener('mouseover', function() {
  if (salaryAmount.value === '') {
    calculate.setAttribute('disabled', '');
  } else {
    calculate.removeAttribute('disabled');
    calculate.addEventListener('click', function() {
      appData.start();
    });
  }
});
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function() {
  periodAmount.textContent = periodSelect.value;
});
