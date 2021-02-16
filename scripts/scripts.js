//Усложнённое задание
'use strict';

function DomElement(selector, height, width, bg, fontSize, text) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.text = text;
  this.position = 'absolute';
}

const elem = document.createElement('div');
DomElement.prototype.createElem = function() {
  const one = this.selector[0];
  if (one === '.') {
    elem.className = this.selector.substring(1);
  } else if (one === '#') {
    elem.setAttribute('id', this.selector.substring(1));
  }
  elem.style.cssText = 'height: ' + this.height + '; width: ' + this.width + ';' +
    ' background: ' + this.bg + '; font-size: ' + this.fontSize + '; position: ' + this.position + ';' +
    ' left: ' + Math.round(window.innerWidth / 2 - parseInt(this.width) / 2) + 'px;' +
    ' top: ' + Math.round(window.innerHeight / 2 - parseInt(this.height) / 2) + 'px;';
  elem.textContent = this.text;
  document.body.prepend(elem);
};
DomElement.prototype.moved = function(key) {
  const top = parseInt(elem.style.top);
  const left = parseInt(elem.style.left);
  if (key === 'ArrowUp') {
    elem.style.top = top - 10 + 'px';
  } else if (key === 'ArrowRight') {
    elem.style.left = left + 10 + 'px';
  } else if (key === 'ArrowLeft') {
    elem.style.left = left - 10 + 'px';
  } else if (key === 'ArrowDown') {
    elem.style.top = top + 10 + 'px';
  }
  if (top < 0) {
    elem.style.top = 0;
  } else if (left < 0) {
    elem.style.left = 0;
  }
};
DomElement.prototype.eventsListeners = function() {
  const _this = this;
  document.addEventListener('keydown', function(event) {
    const key = event.code;
    _this.moved(key);
  });
};

const domElement = new DomElement('#elem', '100px', '100px', 'green', '24px', 'Элемент класса');
domElement.eventsListeners();

document.addEventListener('DOMContentLoaded', domElement.createElem());
