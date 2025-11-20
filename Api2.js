const productList = document.getElementById("product-list");

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    // Display only food-like items (optional filtering)
    const groceryItems = products.filter(item =>
      item.category.includes("electricals") || item.category.includes("grocery")
    );

    displayProducts(groceryItems.length ? groceryItems : products);
  } catch (error) {
    console.error("Error from fetching products:", error);
    productList.innerHTML = `<p>Failed to load the products. Please try again later.</p>`;
  }
}

function displayProducts(items) {
  productList.innerHTML = "";
  items.forEach(item => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.category}</p>
      <p class="price">$${item.price.toFixed(2)}</p>
    `;

    productList.appendChild(productDiv);
  });
}

fetchProducts();