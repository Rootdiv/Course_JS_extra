//Усложнённое задание
'use strict';

const elemInput = document.querySelector('input');
const elemP = document.querySelector('p');

function funcInput() {
  elemP.textContent = elemInput.value;
}

function throttle(fn, interval) {
  let lastTime;
  return function throttled() {
    let timeSinceLastExecution = Date.now() - lastTime;
    if (!lastTime || (timeSinceLastExecution >= interval)) {
      fn.apply(this, arguments);
      lastTime = Date.now();
    }
  };
}
const throttledInput = throttle(funcInput, 300);
elemInput.addEventListener('input', throttledInput);
