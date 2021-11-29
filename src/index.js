import './sass/main.scss';
import imageService from "./js/fetchImages";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';



const refs = {
  loadMoreBtn: document.querySelector('.load-more'),
  searchForm: document.querySelector('#search-form'),
  imageList: document.querySelector('.image-list'),
  gallery: document.querySelector('.gallery')
};

const searchImage = async (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const userInput = form.elements.searchQuery.value.trim();
    imageService.query = userInput;
    refs.imageList.innerHTML = "";
    imageService.resetPage();
    form.reset();
  
      if (userInput === '') {
      refs.imageList.innerHTML = "";
      refs.searchForm.classList.add('is-hidden');
      return Notiflix.Notify.failure('Please enter your serch data.');
      };
  
    try {
      const { total, hits } = await imageService.fetchImages();
      const markup = imagesMarkup(hits);
      refs.imageList.insertAdjacentHTML('beforeend', markup);
      const gallery = new SimpleLightbox('.gallery a');
      gallery.refresh();
      scroll();
      loadMoreBtn.show();

       if (total === 0) {
        refs.searchForm.classList.add('is-hidden');
        refs.loadMoreBtn.classList.add('is-hidden');
        refs.imageList.innerHTML = "";
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.');
      }
      
    } catch (error) {
      console.log(error);
  };
};

async function fetchImageMore() {
    try {
      const { hits, totalHits } = await imageService.fetchImages();
      const markup = imagesMarkup(hits);
      refs.imageList.insertAdjacentHTML('beforeend', markup);
      const gallery = new SimpleLightbox('.gallery a');
      gallery.refresh();
      scroll();

      if (totalHits < 40) {
        refs.searchForm.classList.add('is-hidden');
        refs.loadMoreBtn.classList.add('is-hidden');
        refs.imageList.innerHTML = "";
        return Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results.");
      }

    } catch (error) {
     
  };
};

refs.searchForm.addEventListener('submit', searchImage);
refs.loadMoreBtn.addEventListener('click', fetchImageMore);

function imagesMarkup(hits) {
    return hits.map(hit => {
        return `<li><a href="${hit.largeImageURL}" class='gallery-item'>
              <div class="photo-card">
                <img src="${hit.webformatURL}" alt="${hit.tags}" class='gallery-img' loading="lazy" />
                <div class="info">
                    <p class="info-item">
                      <b class="info-description">Likes</b>
                      <span class="info-number">${hit.likes}</span>
                    </p>
                    <p class="info-item">
                      <b class="info-description">Views</b>
                      <span class="info-number">${hit.views}</span>
                    </p>
                    <p class="info-item">
                      <b class="info-description">Comments</b>
                      <span class="info-number">${hit.comments}</span>
                    </p>
                    <p class="info-item">
                      <b class="info-description">Downloads</b>
                      <span class="info-number">${hit.downloads}</span>
                    </p>
                </div>
              </div>
          </a>
          </li>`
    }).join('');
};



function scroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
};


const loadMoreBtn = {
  enable() {
    refs.loadMoreBtn.disabled = false;
  },
  disable() {
    refs.loadMoreBtn.disabled = true;
  },
  show() {
    refs.loadMoreBtn.classList.remove('is-hidden');
  },
};

