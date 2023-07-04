import axios from 'axios';
import Notiflix from 'notiflix';
import { refs } from './refs';

axios.defaults.headers.common['x-api-key'] =
  'live_GrxUuSdKNccmQw5HQDFY0YtVFIG2EMkBMCZiacU99K1wA3BKiueT2Mx3TvkIH279';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`).then(response => {
    if (!response.ok) {
      Notiflix.Report.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    }
    refs.cardSelectorEl.style.display = 'block';
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`).then(
    response => {
      if (!response.ok) {
        Notiflix.Report.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      }
      return response.json();
    }
  );
}

export default { fetchBreeds, fetchCatByBreed };
