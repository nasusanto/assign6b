function get_cart_quantity() {
    var current_cart = JSON.parse(localStorage.getItem("nadia_shopping_cart") || "[]");
    return current_cart.length;
}

function update_cart_display() {
    document.querySelectorAll(".cart-item-count").forEach(function (element) {
        element.innerHTML = get_cart_quantity();
    });
}

function inject_navbar_cart() {
    var navigation_bar = document.querySelector(".navbar");
    var cart_element = document.createElement("div");
    cart_element.classList.add("carticon");
    var cart_number = document.createElement("div");
    cart_number.className = "cart-item-count cart-icon-item-count";
    cart_element.appendChild(cart_number);
    var cart_link = document.createElement("a");
    cart_link.href = "cart.html";
    cart_link.innerHTML = '<img src="images/shopping-cart.png" alt="cart icon">';
    cart_element.appendChild(cart_link);
    navigation_bar.appendChild(cart_element);
}

window.addEventListener("load", function () {
    inject_navbar_cart();
    update_cart_display();
});
