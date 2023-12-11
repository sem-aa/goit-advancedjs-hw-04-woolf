import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { PER_PAGE, searchImg } from './api';
const form = document.querySelector('.search-form');
const input = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.style.display = 'none';
const simplelightbox = new SimpleLightbox('.gallery a');

let page = 0;
const warningMessage = {
  message:
    'Sorry, there are no images matching your search query. Please try again.',
  color: 'red',
  position: 'center',
};

form.addEventListener('submit', async e => {
  e.preventDefault();
  loadMoreBtn.style.display = 'none';
  const value = input.value.trim();

  if (!value) {
    iziToast.show({ ...warningMessage, message: 'Enter word for search' });
    input.value = '';
    return;
  }

  gallery.innerHTML = '';
  page += 1;

  try {
    const arrImgs = await searchImg(value, page);

    if (!arrImgs.hits.length) {
      iziToast.show(warningMessage);
      return;
    } else {
      iziToast.show({
        message: `Hooray! We found ${arrImgs.totalHits} images.`,
        position: 'topRight',
        color: 'green',
      });
    }

    if (arrImgs.hits.length === PER_PAGE) {
      loadMoreBtn.style.display = 'block';
    } else {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        color: 'green',
      });
      loadMoreBtn.style.display = 'none';
    }

    const markup = createMarkup(arrImgs);
    gallery.insertAdjacentHTML('beforeend', markup);
    simplelightbox.refresh();
  } catch (error) {}
});

input.addEventListener('input', () => {
  page = 0;
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  try {
    const arrImgs = await searchImg(input.value.trim(), page);
    if (arrImgs.hits.length !== PER_PAGE) {
      loadMoreBtn.style.display = 'none';
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        color: 'green',
      });
    }

    const markup = createMarkup(arrImgs);
    gallery.insertAdjacentHTML('beforeend', markup);
    simplelightbox.refresh();
  } catch (error) {
    console.log(error);
  }
});

function createMarkup(arrImgs) {
  if (arrImgs.hits.length) {
    return arrImgs.hits
      .map(
        img => `
            <a href=${img.largeImageURL}>
                <div class="photo-card">
                    <img class="image" src=${img.webformatURL} alt=${img.tags} loading="lazy" />
                        <div class="info">
                            <p class="info-item">
                                Likes
                                <b>${img.likes}</b>
                            </p>
                            <p class="info-item">
                                Views
                                <b>${img.views}</b>
                            </p>
                            <p class="info-item">
                                Comments
                                <b>${img.comments}</b>
                            </p>
                            <p class="info-item">
                                Downloads
                                <b>${img.downloads}</b>
                            </p>
                        </div>
                </div>  
            </a>
  `
      )
      .join('');
  }
}
