'use strict';
const commands = () => {
  const command = document.getElementById('command');
  const changeImg = (event) => {
    if (event.target.closest('.command__photo')) {
      const img = event.target.src;
      event.target.src = event.target.dataset.img;
      event.target.dataset.img = img;
    }
  };
  command.addEventListener('mouseover', (event) => {
    changeImg(event);
  });
  command.addEventListener('mouseout', (event) => {
    changeImg(event);
  });
};

export default commands;
