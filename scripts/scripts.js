//Усложнённое задание
const lang = prompt('Ваш язык? | Your language?', 'ru');
const langArray = {
  'ru': ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  'en': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};

if (lang === 'ru') {
  console.log(langArray.ru);
} else if (lang === 'en') {
  console.log(langArray.en);
} else {
  console.log('Your language is undefined');
}

switch (lang) {
  case 'ru':
    console.log(langArray.ru);
    break;
  case 'en':
    console.log(langArray.en);
    break;
  default:
    console.log('Your language is undefined');
}

console.log(langArray[lang]);

const namePerson = prompt('Ваше имя?');
const resultName = (namePerson === 'Артём') ? 'Директор' :
  (namePerson === 'Артем') ? 'Директор' :
  (namePerson === 'Максим') ? 'Преподаватель' : 'Студент';
console.log(resultName);
