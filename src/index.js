import './css/styles.css';
import { refs } from './js/refs';
import API from './js/cat-api';
import SlimSelect from 'slim-select';

// new SlimSelect({
//   select: '.breed-select'
// })

refs.cardSelectorEl.addEventListener('change', onOpenBreed());

createOptins();

function createOptins() {
  API.fetchBreeds()
    .then(getIdList)
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


function onOpenBreed() {
   
  const breedId = refs.cardSelectorEl.value;
  console.log(breedId);


  API.fetchCatByBreed(breedId)
    .then(createMarkUp)
    .catch(error => console.error(error));
}

function createMarkUp(array) {
  let urlImg = array.map(link => link.url);
  let catName = array.map(name => name);

  const markUp = `
  <img class="img-cat" src="" width="440" height="400" loading="lazy">
  <div>
    <h2></h2>
    <p class="cat-info"></p>
    <p class="cat-info">Temperament: </p>
  </div>
`;
  refs.cardCatContainerEl.insertAdjacentHTML('beforeend', markUp);
}
