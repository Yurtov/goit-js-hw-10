import './css/styles.css';
import { refs } from './js/refs';
import SlimSelect from 'slim-select';
import API from './js/cat-api';
import Notiflix from 'notiflix';

new SlimSelect({
  select: '.breed-select',
});

let breeds = [];

refs.cardSelectorEl.style.display = 'none';

refs.cardSelectorEl.addEventListener('change', onOpenBreed);

function createOptions() {
  API.fetchBreeds()
    .then(data => {
      refs.loaderTextEl.style.display = 'none';
      breeds = data;
      getIdList(data);
    })
    .catch(error => {
      Notiflix.Report.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally((refs.loaderTextEl.style.display = 'none'));
}

function getIdList(array) {
  for (let i = 0; i < array.length; i += 1) {
    let value = array[i].id;
    let text = array[i].name;

    const optionsElement = document.createElement('option');
    optionsElement.value = value;
    optionsElement.textContent = text;
    refs.cardSelectorEl.appendChild(optionsElement);
  }
}

createOptions();

function onOpenBreed() {
  const breedId = refs.cardSelectorEl.value;
  refs.loaderTextEl.style.display = 'block';

  if (!breedId) {
    return;
  }

  API.fetchCatByBreed(breedId)
    .then(data => {
      refs.loaderTextEl.style.display = 'none';
      refs.cardCatContainerEl.innerHTML = createMarkup(data, breedId);
      document.body.style.backgroundColor = getRandomHexColor();
    })
    .catch(error => {
      showError();
      refs.loaderTextEl.style.display = 'none';
     
    });
}

function findBreedsId(id) {
  return breeds.find(breed => breed.id === id);
}

function createMarkup(data, breedId) {
  const cat = data[0];
  const breed = findBreedsId(breedId);
  return `
      <div class="cat-container">
       <img class="cat-img" src="${cat.url}" alt="${breed.name} width="440" height="400" loading="lazy"">
        <div class="cat-info">
          <h2 class="cat-name">${breed.name}</h2>
          <p class="cat-temp">${breed.temperament}</p>
          <p class="cat-dscr">${breed.description}</p>
        </div>
      </div>
    `;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function showError() {
  Notiflix.Report.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
