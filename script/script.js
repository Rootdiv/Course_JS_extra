//Усложнённое задание
'use strict';

class Todo {
  constructor(form, input, todoContainer, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoContainer = document.querySelector(todoContainer);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
  }
  addToStorage() {
    localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
  }
  addTodo(event) {
    if (this.input.value.trim()) {
      event.preventDefault();
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey()
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
    } else {
      event.preventDefault();
      alert('Пустое дело добавить нельзя!');
    }
  }
  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }
  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.setAttribute('data-id', todo.key);
    li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
      <button class="todo-edit"></button>
      <button class="todo-remove"></button>
      <button class="todo-complete"></button>
      </div>
    `);
    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
    this.input.value = '';
  }
  generateKey() {
    return Math.random().toString(32).substring(2, 9) + (+new Date()).toString(32);
  }
  animate(elem) {
    let animation, count = 1;
    const transform = () => {
      animation = requestAnimationFrame(transform);
      count -= 0.02;
      if (count >= 0) {
        elem.style.opacity = count;
      } else {
        cancelAnimationFrame(animation);
        this.render();
      }
    };
    requestAnimationFrame(transform);
  }
  deleteItem(elem) {
    const key = elem.getAttribute('data-id');
    this.todoData.delete(key);
    this.animate(elem);
  }
  completedItem(elem) {
    this.todoData.forEach((value, key) => {
      if (key === elem.getAttribute('data-id') && !value.completed) {
        value.completed = true;
      } else if (key === elem.getAttribute('data-id') && value.completed) {
        value.completed = false;
      }
    });
    this.animate(elem);
  }
  saveItem(elem) {
    const editElem = elem.querySelector('.text-todo');
    this.todoData.forEach((value, key) => {
      if (key === elem.getAttribute('data-id')) {
        value.value = editElem.textContent;
      }
    });
    this.render();
  }
  editItem(target) {
    let elem;
    if (target.closest('.todo-list')) {
      elem = target.closest('.todo-item');
    } else {
      return false;
    }
    const editElem = elem.querySelector('.text-todo');
    if (editElem.hasAttribute('contenteditable')) {
      this.saveItem(elem);
    } else {
      editElem.setAttribute('contenteditable', true);
    }
  }
  handler(event) {
    const target = event.target;
    if (target.matches('.todo-remove')) {
      const elem = target.closest('.todo-item');
      this.deleteItem(elem);
    } else if (target.matches('.todo-complete')) {
      const elem = target.closest('.todo-item');
      this.completedItem(elem);
    } else if (target.matches('.todo-edit')) {
      this.editItem(target);
    }
  }
  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.todoContainer.addEventListener('click', this.handler.bind(this));
    this.render();
  }
}
const todo = new Todo('.todo-control', '.header-input', '.todo-container', '.todo-list', '.todo-completed');
todo.init();
