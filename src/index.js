import './css/styles.css';
import { refs } from './js/refs';
import API from './js/cat-api';
import SlimSelect from 'slim-select';

// new SlimSelect({
//   select: '.breed-select'
// })
let breeds = [];

refs.cardSelectorEl.addEventListener('change', onOpenBreed);

function createOptions() {
  API.fetchBreeds()
    .then(data => {
      breeds = data;
      getIdList(data);
    })
    .catch(error => console.error(error));
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

  API.fetchCatByBreed(breedId)
    .then(data => {
      refs.cardCatContainerEl.innerHTML = createMarkup(data, breedId);
    })
    .catch(error => console.error(error));
}

function findBreedsId(id) {
  return breeds.find(breed => breed.id === id);
}

function createMarkup(data, breedId) {
  const cat = data[0];
  const breed = findBreedsId(breedId);
  return `
      <div class="cat-info-container">
        <div class="cat-text">
          <h2>${breed.name}</h2>
          <p>${breed.temperament}</p>
          <p>${breed.description}</p>
        </div>
        <div class="cat-image">
          <img src="${cat.url}" alt="${breed.name} width="440" height="400" loading="lazy"">
        </div>
      </div>
    `;
}
