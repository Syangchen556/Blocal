// Cart and Order Elements
const cartItemsElement = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const orderItemsElement = document.getElementById('order-items');

// Load Cart from LocalStorage and initialize it
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to Cart Functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const id = productElement.getAttribute('data-id');
        const name = productElement.getAttribute('data-name');
        const price = parseFloat(productElement.getAttribute('data-price'));

        // Add to cart array (existing functionality)
        const existingProduct = cart.find(item => item.id === id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        // Update Cart in LocalStorage
        updateCart();

        // Add to order list UI
        addOrderToList(id, name, price);
    });
});

// Add an order to the order list table in the UI
function addOrderToList(id, name, price) {
    const tr = document.createElement('tr');
    tr.setAttribute('data-id', id);

    const tdName = document.createElement('td');
    tdName.textContent = name;
    tr.appendChild(tdName);

    const tdPrice = document.createElement('td');
    tdPrice.textContent = `$${price}`;
    tr.appendChild(tdPrice);

    const tdStatus = document.createElement('td');
    tdStatus.textContent = 'Ordered';
    tr.appendChild(tdStatus);

    const tdAction = document.createElement('td');
    const returnButton = document.createElement('button');
    returnButton.textContent = 'Request Return';
    returnButton.classList.add('return-btn');
    returnButton.addEventListener('click', () => requestReturn(id, tr));
    tdAction.appendChild(returnButton);
    tr.appendChild(tdAction);

    orderItemsElement.appendChild(tr);

    // Show success message when an item is added
    showNotification(`${name} added to cart.`);
}

// Handle the return request and remove the order
function requestReturn(orderId, orderRow) {
    const productName = orderRow.querySelector('td:first-child').textContent;
    const productPrice = orderRow.querySelector('td:nth-child(2)').textContent;

    // Confirm return action
    const confirmReturn = confirm(`Are you sure you want to request a return for ${productName} (Price: ${productPrice})?`);

    if (confirmReturn) {
        alert(`You are requesting a return for ${productName} (Price: ${productPrice}).`);

        // Remove the order row from the table (or hide it)
        orderRow.remove();

        // Remove item from cart array and update UI
        const index = cart.findIndex(item => item.id === orderId);
        if (index !== -1) {
            cart.splice(index, 1);
        }

        // Update Cart after removing the item
        updateCart();

        // Show return confirmation
        showNotification(`${productName} return requested.`);
    }
}

// Update the Cart in LocalStorage
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Load Cart from LocalStorage and display cart items
window.addEventListener('load', () => {
    renderCart();
});

// Render Cart on the Cart Page
function renderCart() {
    const totalPriceElement = document.getElementById('total-price');
    cartItemsElement.innerHTML = '';  // Clear current cart items
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItemsElement.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);
}

// Show notification to the user
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Optional: update cart icon with the total item count
function updateCartIcon() {
    const cartIcon = document.getElementById('cart-count');
    if (cartIcon) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartIcon.textContent = totalItems;
    }
}

// Initialize icon count on load
window.addEventListener('load', updateCartIcon);


