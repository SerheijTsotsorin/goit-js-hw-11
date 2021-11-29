export const searchImage = async (evt) => {
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