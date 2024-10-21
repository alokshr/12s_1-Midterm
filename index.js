document.addEventListener("DOMContentLoaded", loadHomeContent)

/** Adds a card filled with given JSON data to a given carousel
 * 
 * JSON data must have:
 * - id
 * - name
 * - description
 * - image
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
                <div class="col col-4">
                    <a href="./product.html?id=${data.id}" class="ps-5 link-light link-opacity-50-hover link-underline-opacity-50-hover"><img src="${data.image}" class="img-fluid rounded-2" alt="Image of ${data.name}"></a>
                </div>
                <div class="col col-8">
                    <div class="card-body pe-5">
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
        aria-label="Slide ${numSlides+1}"
    ></button>`;
    indicator = indicator.firstElementChild;

    // Making sure the carousel has a default slide to display
    if (numSlides == 0) {
        card.classList.add("active");
        indicator.classList.add("active")
        indicator.ariaCurrent = "true";
    }

    items.appendChild(card);
    indicators.appendChild(indicator);
    carousel.dataset.slides = numSlides+1;
}

function loadHomeContent() {
    fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        let carouselPopular = document.getElementById("carouselPopular");
        
        for (let i = 0; i < data.length; i++) {
            addCardToCarousel(data[i], carouselPopular);
        }
    })
    .catch(error => console.log(error));
    
    let carouselTopSelling = document.getElementById("carouselTopSelling");
    addCardToCarousel("", carouselTopSelling);
    addCardToCarousel("", carouselTopSelling);
    addCardToCarousel("", carouselTopSelling);
    addCardToCarousel("", carouselTopSelling);
}
