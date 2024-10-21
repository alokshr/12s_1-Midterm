document.addEventListener("DOMContentLoaded", loadProductContent);

/** Displays the given product filled with given JSON data to a given carousel
 * 
 * JSON data must have:
 * - id
 * - name
 * - description
 * - image
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
            <div class="col col-md-4">
                <img class="ps-5 link-light link-opacity-50-hover link-underline-opacity-50-hover"><img src="${data.image.url}" class="img-fluid rounded-2 img-thumbnail border-light border-3 bg-light-subtle" alt="Image of ${data.name}, ${data.image.author}\nSource: ${data.image.source}">
            </div>
            <div class="col col-md-8">
                <div class="card-body">
                    <h3 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.description}</p>
                    <p class="card-text"><small class="text-muted">$${data.price}</small></p>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col col-md-4">
                <a href="${data.link}" class="btn btn-primary w-100" id="purchase-btn">Buy here!</a>
            </div>
        </div>
    </div>`;
    card = card.firstElementChild;
    items.appendChild(card);

    let buyButton = document.getElementById("purchase-btn");

    console.log(data.link)

    if (!data.link) {
        buyButton.innerHTML = "Not available for purchase yet";
        buyButton.classList.add("disabled");
    }

}

function loadProductContent() {
    let id = new URLSearchParams(document.location.search).get("id");

    fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        for (product of data) {
            if (product.id == id) {
                displayProduct(product);
            }
        }
    })
    .catch(error => console.log(error));
}

