//Усложнённое задание
'use strict';

const textColor = document.getElementById('text-color');
const button = document.querySelector('button');

function randColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const color = '#' + red.toString(16) + green.toString(16) + blue.toString(16);
  document.body.style.backgroundColor = color;
  textColor.textContent = color;
  button.style.color = color;
  if (color === '#000000') {
    button.backgroundColor = 'white';
    textColor.style.color = 'white';
  } else if (color === '#ffffff') {
    button.style.backgroundColor = 'black';
    textColor.style.color = 'black';
  }
}

randColor();
button.addEventListener('click', function() {
  randColor();
});
