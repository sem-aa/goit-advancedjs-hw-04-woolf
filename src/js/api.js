import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '41181401-cfbb9dc400356a899a7dc1037';
export const PER_PAGE = 40;

export const searchImg = (query, page) =>
  axios
    .get(
      `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`
    )
    .then(data => data.data);
