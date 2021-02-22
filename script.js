//Усложнённое задание
'use strict';

const img = document.querySelector('img');
const run = document.getElementById('run');
const reset = document.getElementById('reset');
let count = 0;
let animation;
const car = () => {
  animation = requestAnimationFrame(car);
  count++;
  if (count < 700) {
    img.style.left = count * 2 + 'px';
  } else {
    cancelAnimationFrame(animation);
  }
};
let animate = false;
run.addEventListener('click', () => {
  if (!animate) {
    animation = requestAnimationFrame(car);
    animate = true;
  } else {
    animate = false;
    cancelAnimationFrame(animation);
  }
});
reset.addEventListener('click', () => {
  count = 0;
  animate = false;
  cancelAnimationFrame(animation);
  img.removeAttribute('style');
});
