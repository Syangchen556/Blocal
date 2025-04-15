// Elements
const cartItemsElement = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const orderItemsElement = document.getElementById('order-items');
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const loggedInRole = localStorage.getItem('userRole');
const loggedInEmail = localStorage.getItem('userEmail');

// Add to Cart Buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        if (!loggedInRole || loggedInRole !== 'buyer') {
            // If not logged in or not logged in as a buyer, show login modal
            alert('You must be logged in as a buyer to add items to your cart.');
            showLoginModal();  // Show the login modal
            return;
        }

        const productElement = button.parentElement;
        const id = productElement.getAttribute('data-id');
        const name = productElement.getAttribute('data-name');
        const price = parseFloat(productElement.getAttribute('data-price'));
        const image = productElement.getAttribute('data-image');  // Correct: Get the image from the data attribute

        const existingProduct = cart.find(item => item.id === id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1, image });  // Ensure image is added to cart item
        }

        updateCart();
        addOrderToList(id, name, price, image);  // Pass image to addOrderToList
    });
});

// Render Order Row
function addOrderToList(id, name, price, image) {  // Added image parameter
    const tr = document.createElement('tr');
    tr.setAttribute('data-id', id);

    tr.innerHTML = `
        <td><img src="${image}" alt="${name}" class="order-item-img">  <!-- Display product image in order -->
        </td>
        <td>${name}</td>
        <td>$${price}</td>
        <td>Ordered</td>
        <td><button class="return-btn">Request Return</button></td>
    `;

    const returnBtn = tr.querySelector('.return-btn');
    returnBtn.addEventListener('click', () => requestReturn(id, tr));

    orderItemsElement.appendChild(tr);
    showNotification(`${name} added to cart.`);
}

// Handle Return
function requestReturn(orderId, orderRow) {
    const productName = orderRow.querySelector('td:nth-child(2)').textContent;
    const productPrice = orderRow.querySelector('td:nth-child(3)').textContent;

    if (confirm(`Are you sure you want to request a return for ${productName} (Price: ${productPrice})?`)) {
        alert(`You are requesting a return for ${productName} (Price: ${productPrice}).`);

        orderRow.remove();
        const index = cart.findIndex(item => item.id === orderId);
        if (index !== -1) cart.splice(index, 1);

        updateCart();
        showNotification(`${productName} return requested.`);
    }
}

// Update Cart Storage & Render
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartIcon();
}

// Render Cart Items
function renderCart() {
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">  <!-- Ensure product image is shown in cart -->
            ${item.name} - $${item.price} x ${item.quantity}
        `;
        cartItemsElement.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);
}

// Notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Cart Icon Count
function updateCartIcon() {
    const cartIcon = document.getElementById('cart-count');
    if (cartIcon) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartIcon.textContent = totalItems;
    }
}

// Show Login Modal
function showLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'block';
    }
}

// Auto redirect on page load if user is logged in
window.addEventListener('load', () => {
    if (!loggedInRole) {
        // If not logged in, show login alert
        alert('You must log in to purchase items.');
    } else {
        renderCart();
        updateCartIcon();
    }
});
