document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const marketType = urlParams.get("type"); // Get 'buy' or 'rent'

  // Simulate image data with different prices for rent vs buy
  const images = generateImageData(24, marketType);

  // Display images on the page
  displayImages(images, marketType);

  function generateImageData(count, type) {
    let data = [];
    for (let i = 0; i < count; i++) {
      let basePrice = Math.floor(Math.random() * 5000) + 100;
      let adjustedPrice =
        type === "rent" ? Math.floor(basePrice * 0.1) : basePrice; // Lower rent price by ~70%

      data.push({
        src: "https://picsum.photos/200?random=" + i,
        owner: generateRandomName(),
        price: adjustedPrice,
        date: new Date().getTime() - Math.floor(Math.random() * 10000000), // Random date
        popularity: Math.floor(Math.random() * 100) + 1,
      });
    }
    return data;
  }

  function generateRandomName() {
    const names = ["John Doe", "Jane Smith", "Alice Brown", "Bob Johnson"];
    return names[Math.floor(Math.random() * names.length)];
  }

  function displayImages(images, type) {
    const imageGrid = document.getElementById("imageGrid");
    imageGrid.innerHTML = "";

    images.forEach((image) => {
      const card = document.createElement("div");
      card.classList.add("image-card");

      card.innerHTML = `
                <img src="${image.src}" alt="image" class="image-card-img">
                <div class="image-card-hover">
                    <p>Owner: ${image.owner}</p>
                    <button class="pay-button">${
                      type === "rent" ? "Rent" : "Buy"
                    } ₹${image.price}</button>
                </div>
            `;

      imageGrid.appendChild(card);
    });
  }

  // Handling the filter dropdown change
  const filterDropdown = document.getElementById("filterDropdown");
  filterDropdown.addEventListener("change", function () {
    const selectedFilter = filterDropdown.value;
    filterImages(selectedFilter);
  });

  function filterImages(criteria) {
    let sortedImages = [...images];

    if (criteria === "popularity") {
      sortedImages.sort((a, b) => b.popularity - a.popularity);
    } else if (criteria === "price") {
      sortedImages.sort((a, b) => a.price - b.price);
    } else if (criteria === "date") {
      sortedImages.sort((a, b) => a.date - b.date);
    }

    displayImages(sortedImages, marketType);
  }
});
