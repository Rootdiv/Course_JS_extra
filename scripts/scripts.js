//Усложнённое задание
'use strict';
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let gameSet = 10;
let number = Math.floor(Math.random() * 100) + 1;

function startGame() {
  const numberInput = +prompt('Угадай число от 1 до 100');

  function game(num) {
    gameSet -= 1;
    if (gameSet === 0) {
      if (confirm('Попытки закончились, хотите сыграть еще?')) {
        gameSet = 10;
        number = Math.floor(Math.random() * 100) + 1;
        console.log(number);
        startGame();
      } else {
        return alert('Игра окончена');
      }
    }
    if (!isNumber(num) && num !== 0) {
      alert('Введите число!');
      startGame();
    } else if (num < number && num !== 0) {
      alert('Загаданное число больше, осталось попыток ' + gameSet);
      startGame();
    } else if (num > number) {
      alert('Загаданное число меньше, осталось попыток ' + gameSet);
      startGame();
    } else if (num === number) {
      return alert('Поздравляю, Вы угадали!!!');
    } else {
      return alert('Игра окончена');
    }
  }
  return game(numberInput);
}
console.log(number);
startGame();
