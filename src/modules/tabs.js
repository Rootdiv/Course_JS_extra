'use strict';
const tabs = () => {
  const service = document.querySelector('.service');
  const tabHeader = document.querySelectorAll('.service-header-tab');
  const tabContent = document.querySelectorAll('.service-tab');
  const toggleTabContent = (index) => {
    tabContent.forEach((item, i) => {
      if (item.classList.contains('d-none') && index === i) {
        item.classList.remove('d-none');
      } else if (!item.classList.contains('d-none') && index === i) {
        item.classList.add('d-none');
      }
    });
  };
  service.addEventListener('click', (event) => {
    let target = event.target;
    target = target.closest('.service-header-tab');
    if (target) {
      tabHeader.forEach((item, i) => {
        if (!item.classList.contains('active') && item === target) {
          item.classList.add('active');
          toggleTabContent(i);
        } else if (item.classList.contains('active') && item !== target) {
          item.classList.remove('active');
          toggleTabContent(i);
        }
      });
    }
  });
};

export default tabs;
