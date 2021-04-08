var selected_quantity = null;
var glazing = null;
var price = null;
var total_price = 0;

function listen_button_roll_change() {
    var all_button_rolls = document.querySelectorAll(".button-rolls");
    all_button_rolls.forEach(function (element) {
        element.onclick = function () {
            // Update quantity and total
            selected_quantity = parseInt(this.getAttribute("data-qty"), 10);
            update_total();
            // Change highlighed label
            all_button_rolls.forEach(function (roll) {
                roll.classList.remove("button-roll-active");
            });
            this.classList.add("button-roll-active");
        }
    });
}

function listen_glazing_change() {
    var all_glazings = document.querySelectorAll(".glazings");
    all_glazings.forEach(function (element) {
        element.onclick = function () {
            // Update highlighted
            glazing = this.getAttribute("data-glazing");
            all_glazings.forEach(function (roll) {
                roll.classList.remove("glazings-active");
            });
            this.classList.add("glazings-active");

            // Update product name
            if (glazing) {
                document.querySelector(".added-detail").innerHTML = " - " + glazing;
            } else {
                document.querySelector(".added-detail").innerHTML = "";
            }

            // TODO: Update product image
        }
    });
}

function update_total() {
    total_price = price * selected_quantity;
    document.querySelector("#total-price").innerHTML = total_price.toFixed(2);
}

function get_initial_data() {
    selected_quantity = document.querySelector(".button-roll-active").getAttribute("data-qty");
    glazing = document.querySelector(".glazings-active").getAttribute("data-glazing");
    price = parseFloat(document.querySelector(".price").getAttribute("data-price"));
}

function populate_cart_storage() {
    if (!localStorage.getItem("nadia_shopping_cart")) {
        localStorage.setItem("nadia_shopping_cart", "[]");
    }
}

function save_cart_to_storage() {
    var current_cart = JSON.parse(localStorage.getItem("nadia_shopping_cart"));
    current_cart.push({
        quantity: selected_quantity,
        glazing,
        individual_price: price,
        total_price,
    });
    localStorage.setItem("nadia_shopping_cart", JSON.stringify(current_cart));
}

function add_to_cart() {
    populate_cart_storage(); // add an empty array in case it's the first time the user used the website
    save_cart_to_storage(); // saves to localStorage
    update_cart_display(); // updates the icon indicator at the top of the screen
    alert("Item has been added to cart.");
}

window.onload = function () {
    get_initial_data();
    update_total();
    listen_button_roll_change();
    listen_glazing_change();
}