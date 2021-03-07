//Усложнённое задание
'use strict';

const filter = document.getElementById('filter');
const section = document.querySelector('section');

const getData = (url, cb) => {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) return;
    if (request.status === 200) {
      const response = JSON.parse(request.responseText);
      cb(response);
    } else {
      new Error(request.status);
    }
  });
  request.send();
};

const render = (heroes) => {
  section.textContent = '';
  heroes.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const nameHero = document.createElement('h2');
    const cardHero = document.createElement('div');
    cardHero.classList.add('hero');
    const photo = document.createElement('img');
    const info = document.createElement('div');
    info.classList.add('info');
    const realName = document.createElement('p');
    const species = document.createElement('p');
    const citizenship = document.createElement('p');
    const gender = document.createElement('p');
    const birthDay = document.createElement('p');
    const deathDay = document.createElement('p');
    const status = document.createElement('p');
    const actors = document.createElement('p');
    const moviesAbout = document.createElement('p');
    const movies = document.createElement('ul');

    nameHero.textContent = item.name;
    realName.innerHTML = `<b>Real Name:</b> ${item.realName ? item.realName : 'no data'}`;
    photo.src = item.photo;
    species.innerHTML = `<b>Species:</b> ${item.species ? item.species : 'no data'}`;
    citizenship.innerHTML = `<b>Citizenship:</b> ${item.citizenship ? item.citizenship : 'no data'}`;
    gender.innerHTML = `<b>Gender:</b> ${item.gender ? item.gender : 'no data'}`;
    birthDay.innerHTML = `<b>Birth Day:</b> ${item.birthDay ? item.birthDay : 'no data'}`;
    deathDay.innerHTML = `<b>Death Day:</b> ${item.deathDay ? item.deathDay : 'no data'}`;
    status.innerHTML = `<b>Status:</b> ${item.status ? item.status : 'no data'}`;
    actors.innerHTML = `<b>Actors:</b> ${item.actors ? item.actors : 'no data'}`;

    cardHero.append(nameHero);
    cardHero.append(card);
    card.append(photo);
    card.append(info);
    info.append(realName);
    info.append(species);
    info.append(citizenship);
    info.append(gender);
    info.append(birthDay);
    info.append(deathDay);
    info.append(status);
    info.append(actors);

    if (item.movies) {
      moviesAbout.innerHTML = '<b>Movies:</b> ';
      item.movies.forEach(elem => {
        const listItem = document.createElement('li');
        listItem.textContent = elem;
        movies.append(listItem);
      });
      info.append(moviesAbout);
      info.append(movies);
    }
    section.append(cardHero);
  });
};

const listMovies = (heroes) => {
  const movies = heroes.reduce((accum, item) => accum.concat(item.movies), []);
  const allMovies = movies.filter((item, i) => movies.indexOf(item) === i && item);

  allMovies.sort().forEach(movie => {
    const option = document.createElement('option');
    option.value = movie;
    option.textContent = movie;
    filter.append(option);
  });
};

const heroFilms = (heroes, movie = '') => {
  if (movie) {
    const filterMovie = heroes.filter(item => item.movies && item.movies.includes(movie));
    render(filterMovie);
  } else {
    render(heroes);
  }
};

getData('./dbHeroes.json', data => {
  listMovies(data);
  heroFilms(data);
  filter.addEventListener('change', (event) => {
    const movie = event.target.value;
    heroFilms(data, movie);
  });
});
