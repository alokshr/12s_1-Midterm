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
              <img src="./images/madhiOG.png" alt="The OG">
              <div class="card-body">
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
