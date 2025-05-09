const API_URL = "https://v2.api.noroff.dev/square-eyes";
const container = document.getElementById("product-container");
const breadcrumbTitle = document.getElementById("breadcrumb-title");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
  const errorMsg = document.createElement("p");
  errorMsg.textContent = "Missing product ID in URL";
  container.appendChild(errorMsg);
} else {
  fetchProduct(productId);
}

async function fetchProduct(id) {
    container.innerHTML = "<p>Loading product...</p>";

  try {
    const response = await fetch(`${API_URL}/${id}`);
    const result = await response.json();
    const product = result.data;

    if (!product) {
      const notFound = document.createElement("p");
      notFound.textContent = "Product not found.";
      container.appendChild(notFound);
      return;
    }

    container.innerHTML = "";

    if (breadcrumbTitle) {
      breadcrumbTitle.textContent = product.title;
    }

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("product-specific__image");

    const img = document.createElement("img");
    img.src = product.image.url;
    img.alt = product.title;
    imageDiv.appendChild(img);

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("product-specific__details");

    const title = document.createElement("h2");
    title.textContent = `${product.title} (${product.released})`;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("p");
    price.className = "product-specific__price";
    price.textContent = `${product.price} kr`;

    const addButton = document.createElement("button");
    addButton.className = "cta cta-cart";
    addButton.id = "add-to-cart";
    addButton.textContent = "Add to cart";

    addButton.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const exists = cart.find(item => item.id === product.id);

      if (!exists) {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to the cart!");
      } else {
        alert("The product is already in the cart.");
      }
    });

    detailsDiv.appendChild(title);
    detailsDiv.appendChild(description);
    detailsDiv.appendChild(price);
    detailsDiv.appendChild(addButton);

    container.appendChild(imageDiv);
    container.appendChild(detailsDiv);

  } catch (error) {
    console.error("Error fetching product:", error);
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Could not load the product. Please try again later.";
    container.appendChild(errorMsg);
  }
}
