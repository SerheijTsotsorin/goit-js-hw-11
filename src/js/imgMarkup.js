export function imagesMarkup(hits) {
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