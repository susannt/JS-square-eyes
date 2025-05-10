const cartContainer = document.getElementById("cart-items");
const emptyCartButton = document.getElementById("empty-cart");
const placeOrderButton = document.querySelector(".cta-submit");
const cartSummary = document.getElementById("cart-summary");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    cartContainer.innerHTML = "";
    cartSummary.innerHTML = "";

    if (cart.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "Your cart is empty.";
        cartContainer.appendChild(emptyMsg);
        return;  
    }

    cart.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("cart-item");

        const img = document.createElement("img");
        img.src = product.image.url;
        img.alt = product.title;
        img.width = 50;

        const title = document.createElement("h4");
        title.textContent = product.title;

        const price = document.createElement("p");
        price.textContent = `${product.price} kr`;

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.dataset.id = product.id;
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", removeFromCart);

        productElement.appendChild(img);
        productElement.appendChild(title);
        productElement.appendChild(price);
        productElement.appendChild(removeBtn);

        cartContainer.appendChild(productElement);
    });

    const total = cart.reduce((sum, product) => sum + parseFloat(product.price), 0);
    const totalText = document.createElement("p");
    totalText.textContent = `Total: ${total.toFixed(2)} kr`;
    cartSummary.appendChild(totalText);
}

function removeFromCart(event) {
    const productId = event.target.dataset.id;
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function emptyCart(event) {
    event.preventDefault();
    if (confirm("Are you sure you want to empty the cart?")) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

function placeOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty. Add products before placing an order.");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const streetAddress = document.getElementById("street-address").value.trim();
    const postCode = document.getElementById("post-code").value.trim();
    const city = document.getElementById("city").value.trim();

    const order = {
        name,
        email,
        phone,
        streetAddress,
        postCode,
        city,
        products: cart,
        total: cart.reduce((total, product) => total + parseFloat(product.price), 0)
    };

    localStorage.setItem("order", JSON.stringify(order));
    window.location.href = "confirmation.html";
}

placeOrderButton.addEventListener("click", placeOrder);

renderCart();
