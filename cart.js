function build_cart_item(item, index) {
    var cart_item_div = document.createElement("div");
    cart_item_div.classList.add("cart-item");
    cart_item_div.id = "cart-item-" + index;

    cart_item_div.innerHTML = '<button class="remove-button">X</button><img class="original-image cart-item-image"> <div class="cart-item-description"> <h2 class="product-name"></h2> <div class="product-attributes"> <div class="product-data"> <div class="product-glaze"> <span class="glaze product-data-label">Glaze:</span> <select name="glaze" id="glaze-dropdown"> <option value="">None</option> <option value="Sugar-milk">Sugar-milk</option> <option value="Vanilla-milk">Vanilla-milk</option> <option value="Double-chocolate">Double-chocolate</option> </select> </div> <div class="product-quantity"> <span class="quantity product-data-label">Quantity:</span> <select name="quantity" id="quantity-dropdown"> <option value="1">1 roll</option> <option value="3">3 rolls</option> <option value="6">6 rolls</option> <option value="12">12 rolls</option> </select> </div> </div> <div class="cart-item-price"> <span class="total-price-header">Total: </span> <span class="total-price">$<span class="item-price">2.00</span></span> </div> </div> </div>';
    cart_item_div.querySelector('.cart-item-image').src = item.product_image;
    cart_item_div.querySelector('.cart-item-image').alt = item.product_name;
    cart_item_div.querySelector('.product-name').innerHTML = item.product_name;
    var glaze_element = cart_item_div.querySelector('select[name="glaze"]');
    glaze_element.id = "glaze-" + index;
    glaze_element.value =  item.glazing;
    glaze_element.onchange = function () {
        var cart = get_cart();
        cart[index].glazing = this.value;
        set_cart(cart);
    };

    var item_price_element = cart_item_div.querySelector('.item-price');
    item_price_element.innerHTML = item.total_price.toFixed(2);

    var quantity_element = cart_item_div.querySelector('select[name="quantity"]');
    quantity_element.id = "quantity-" + index;
    quantity_element.value =  item.quantity;
    quantity_element.onchange = function () {
        var quantity = parseInt(this.value);
        var cart = get_cart();
        cart[index].quantity = quantity;
        var new_total_price = cart[index].individual_price * quantity;
        cart[index].total_price = new_total_price;
        set_cart(cart);
        item_price_element.innerHTML = new_total_price.toFixed(2);
        calculate_summary();
    };

    cart_item_div.querySelector('.remove-button').onclick = function () {
        var confirm_deletion = confirm('Are you sure you want to delete this item (' + item.product_name + ')?');
        if (confirm_deletion) {
            cart_item_div.parentNode.removeChild(cart_item_div);
            var cart = get_cart();
            cart.splice(index, 1);
            set_cart(cart);
            calculate_summary();
            update_cart_display(); // from main.js
            if (!cart.length) {
                build_cart_items();
            }
        }
    }

    return cart_item_div;
}

function get_cart() {
    return JSON.parse(localStorage.getItem("nadia_shopping_cart") || '[]');
}

function set_cart(cart) {
    localStorage.setItem('nadia_shopping_cart', JSON.stringify(cart));
}

function build_cart_items() {
    document.getElementById('cart-items').innerHTML = '';
    var current_cart = get_cart();
    if (!current_cart.length) {
        var empty_item = '<p class="no-cart-item">No items in the cart</p>';
        document.getElementById('cart-items').innerHTML = empty_item;
        return;
    }
    for (var i = 0; i < current_cart.length; i++) {
        var item = current_cart[i];
        document.getElementById('cart-items').appendChild(build_cart_item(item, i));
    }
}

function bind_place_order() {
    document.getElementById("place-order-button").onclick = function () {
        var cart = get_cart();
        if (!cart.length) {
            alert('You have no items in your cart!');
            return;
        }

        alert("Your order has been placed. Redirecting you to the home page...");
        window.location.assign("index.html");
        set_cart([]);
    }
}

function calculate_summary() {
    var tax_rate = 0.10;
    var shipping_rate = 5;
    var current_cart = get_cart();
    var items_total = 0;

    for (var item of current_cart) {
        items_total += item.total_price;
    }

    document.getElementById('items-total-value').innerHTML = items_total.toFixed(2);

    if (!current_cart.length) {
        shipping_rate = 0;
    }

    document.getElementById('items-shipping-value').innerHTML = shipping_rate.toFixed(2);

    var subtotal = items_total + shipping_rate;
    document.getElementById('subtotal-value').innerHTML = subtotal.toFixed(2);

    var tax = subtotal * tax_rate;
    document.getElementById('tax-value').innerHTML = tax.toFixed(2);

    var order_total = subtotal + tax;
    document.getElementById('order-total-value').innerHTML = order_total.toFixed(2);
}

window.addEventListener('load', function () {
    build_cart_items();
    calculate_summary();
    bind_place_order();
})
