// ==================================================
// GLOBAL VARIABLES
// ==================================================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==================================================
// PAGE LOAD
// ==================================================
window.onload = function () {
    loadTheme();
    renderCart();
};

// ==================================================
// THEME TOGGLE (FIXED - SINGLE FUNCTION)
// ==================================================
function toggleTheme() {
    let html = document.documentElement;

    if (html.getAttribute("data-theme") === "dark") {
        html.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
}

// ==================================================
// ADD TO CART
// ==================================================
function addToCart(name, price) {
    cart.push({ name, price });

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

    alert(name + " added to cart!");
}

// ==================================================
// REMOVE FROM CART (FIXED)
// ==================================================
function removeFromCart(index) {
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

// ==================================================
// CLEAR CART
// ==================================================
function clearCart() {
    cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

// ==================================================
// RENDER CART (CLEAN UI VERSION)
// ==================================================
function renderCart() {
    const cartBox = document.getElementById("cartItems");
    const totalBox = document.getElementById("cartTotal");

    if (!cartBox || !totalBox) return;

    cartBox.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartBox.innerHTML = "<p>Your cart is empty.</p>";
        totalBox.innerText = "0";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;

        cartBox.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - Rs.${item.price}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartBox.innerHTML += `
        <button onclick="clearCart()">Clear Cart</button>
    `;

    totalBox.innerText = total;
}

// ==================================================
// SEARCH (SAFE VERSION)
// ==================================================
function searchProducts() {
    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    const searchText = searchInput.value.toLowerCase();

    const products = document.querySelectorAll(".card");

    products.forEach(product => {

        const name = (product.querySelector("h3")?.innerText || "").toLowerCase();

        const match = name.includes(searchText);

        if(match){
            product.classList.remove("hidden");
        } else {
            product.classList.add("hidden");
        }
    });
}

// ==================================================
// BUY NOW (FIX - was missing)
// ==================================================
function buyNow(productName) {
    alert("Proceeding to buy: " + productName);
}

// ==================================================
// PLACE ORDER
// ==================================================
function placeOrder() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    alert("Order placed successfully!");

    clearCart();
}