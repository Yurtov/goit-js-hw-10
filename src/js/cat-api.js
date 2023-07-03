import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_GrxUuSdKNccmQw5HQDFY0YtVFIG2EMkBMCZiacU99K1wA3BKiueT2Mx3TvkIH279';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`).then(response => {
    if (response.status === 404) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`).then(
    response => response.json()
  );
}

export default { fetchBreeds, fetchCatByBreed };
