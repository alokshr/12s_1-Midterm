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
function addCardToAlbum(data) {

    // Creating card to add to carousel
    let items = document.getElementById("product-container");
    let card = document.createElement("div");

    card.innerHTML = `
    <div class="col">
            <div class="card shadow-sm">
              <img src="${data.image.url}" alt="Image of ${data.name}, ${data.image.author}\nSource: ${data.image.source}" class="mt-3 img-fluid img-thumbnail border-light border-3 bg-light-subtle">
              <div class="card-body">
                <h3 class="card-title">${data.name}</h3>
                <p class="card-text">${data.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary"><a href="./product.html?id=${data.id}">Buy ${data.name} Now</a></button>
                  </div>
                  <small class="text-body-secondary">$${data.price}</small>
                </div>
              </div>
            </div>
          </div>
          `;
    card = card.firstElementChild;

    items.appendChild(card);
}

function loadHomeContent() {
    fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            addCardToAlbum(data[i]);
        }
    })
    .catch(error => console.log(error));
    
    let carouselTopSelling = document.getElementById("carouselTopSelling");
}
