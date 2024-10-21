document.addEventListener("DOMContentLoaded", loadProductContent);

/** Displays the given product filled with given JSON data to a given carousel
 *
 * JSON data must have:
 * - id
 * - name
 * - description
 * - image
 *   - url
 *   - author
 *   - source
 * - price
 * - link
 */
function displayProduct(data) {
  // Creating card
  let items = document.getElementById("product-container");
  let card = document.createElement("div");

  card.innerHTML = `
    <div class="card p-3 mt-5" data-bs-theme="dark">
        <div class="row g-0">
            <div class="col-md-4 d-flex justify-content-center">
                <img src="${data.image.url}" class="img-fluid rounded-2 img-thumbnail border-light border-3 bg-light-subtle" alt="Image of ${data.name}, ${data.image.author}\nSource: ${data.image.source}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h3 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.description}</p>
                    <p class="card-text"><small class="text-muted">$${data.price}</small></p>
                </div>
            </div>
        </div>
        <div class="row g-0 mt-2">
            <div class="col-md-4 d-flex justify-content-center">
                <a href="${data.link}" class="btn btn-primary w-100" id="purchase-btn">Buy here!</a>
            </div>
        </div>
    </div>
        
    </div>`;
  card = card.firstElementChild;
  items.appendChild(card);

  let buyButton = document.getElementById("purchase-btn");

  console.log(data.link);

  if (!data.link) {
    buyButton.innerHTML = "Not available for purchase yet";
    buyButton.classList.add("disabled");
  }
}

/** Adds a card filled with given JSON data to a given carousel
 *
 * JSON data must have:
 * - id
 * - name
 * - description
 * - image
 *    - url
 *    - author
 *    - source
 * - price
 */
function addCardToCarousel(data, carousel) {
  let numSlides = parseInt(carousel.dataset.slides);

  // Creating card to add to carousel
  let items = carousel.getElementsByClassName("carousel-inner")[0];
  let card = document.createElement("div");

  card.innerHTML = `
  <div class="carousel-item">
      <div class="card p-3">
          <div class="row g-0">
              <div class="col-md-4 ps-5 d-flex justify-content-center">
                  <a href="./product.html?id=${data.id}" class="align-content-center link-light link-opacity-50-hover link-underline-opacity-50-hover"><img src="${data.image.url}" class="img-fluid rounded-2 img-thumbnail border-light border-3 bg-light-subtle" alt="Image of ${data.name}, ${data.image.author}\nSource: ${data.image.source}"></a>
              </div>
              <div class="col-md-8 pe-5">
                  <div class="card-body">
                      <h3 class="card-title"><a href="./product.html?id=${data.id}" class="link-light link-opacity-50-hover link-underline-opacity-50-hover">${data.name}</a></h5>
                      <p class="card-text">${data.description}</p>
                      <p class="card-text"><small class="text-muted">$${data.price}</small></p>
                  </div>
              </div>
          </div>
      </div>
  </div>`;
  card = card.firstElementChild;

  // Creating the indicator for card
  let indicators = carousel.getElementsByClassName("carousel-indicators")[0];
  let indicator = document.createElement("div");

  indicator.innerHTML = `
  <button
      type="button"
      data-bs-target="#${carousel.id}"
      data-bs-slide-to="${numSlides}"
      aria-label="Slide ${numSlides + 1}"
  ></button>`;
  indicator = indicator.firstElementChild;

  // Making sure the carousel has a default slide to display
  if (numSlides == 0) {
    card.classList.add("active");
    indicator.classList.add("active");
    indicator.ariaCurrent = "true";
  }

  items.appendChild(card);
  indicators.appendChild(indicator);
  carousel.dataset.slides = numSlides + 1;
}

function loadProductContent() {
  let id = new URLSearchParams(document.location.search).get("id");

  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      for (product of data) {
        let carousel = document.getElementById("carouselRecommended");
        addCardToCarousel(product, carousel);

        if (product.id == id) {
          displayProduct(product);
        }
      }
    })
    .catch((error) => console.log(error));
}
