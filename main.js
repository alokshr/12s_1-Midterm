// Adds a card filled with given JSON data to a given carousel
function addCardToCarousel(data, carousel) {
    let numSlides = parseInt(carousel.dataset.slides);

    // Creating card to add to carousel
    let items = carousel.getElementsByClassName("carousel-inner")[0];
    let card = document.createElement("div");

    card.innerHTML = `
    <div class="card carousel-item">
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${data.image}" class="img-fluid rounded-start product-image" alt="Image of ${data.title}">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.description}</p>
                <p class="card-text"><small class="text-muted">$${data.price}</small></p>
            </div>
            </div>
        </div>
    </div>`;
    card = card.firstElementChild;
    console.log(card);

    // Creating the indicator for card
    let indicators = carousel.getElementsByClassName("carousel-indicators")[0];
    let indicator = document.createElement("div");

    indicator.innerHTML = `
    <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
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

let carousel = document.getElementById("carouselExample");
addCardToCarousel("", carousel);
addCardToCarousel("", carousel);
addCardToCarousel("", carousel);
addCardToCarousel("", carousel);
