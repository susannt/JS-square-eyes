document.addEventListener("DOMContentLoaded", function () {
    const order = JSON.parse(localStorage.getItem("order"));

    if (!order) {
        window.location.href = "index.html";
        return;
    }

    const orderNumber = Math.floor(Math.random() * 1000000);
    const orderNumberElement = document.getElementById("order-number");
    orderNumberElement.textContent = `Order number: #${orderNumber}`;

    const orderItemsContainer = document.getElementById("order-items");
    let total = 0;

    order.products.forEach(product => {
        const row = document.createElement("tr");

        const titleCell = document.createElement("td");
        titleCell.textContent = product.title;

        const qtyCell = document.createElement("td");
        qtyCell.textContent = "1"; // Antatt 1 per produkt

        const priceCell = document.createElement("td");
        priceCell.textContent = `${product.price} kr`;

        const totalCell = document.createElement("td");
        totalCell.textContent = `${product.price} kr`;

        row.appendChild(titleCell);
        row.appendChild(qtyCell);
        row.appendChild(priceCell);
        row.appendChild(totalCell);

        orderItemsContainer.appendChild(row);

        total += parseFloat(product.price);
    });

    const orderTotalElement = document.getElementById("order-total");
    orderTotalElement.textContent = `${total.toFixed(2)} kr`;

    localStorage.removeItem("cart");
});
