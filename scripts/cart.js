// Function to update the cart table
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const orderBtn = document.getElementById('order-btn');
    
    // Clear the current cart table rows
    cartItemsContainer.innerHTML = '';

    // Get cart items from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        // If the cart is empty, display a message
        const emptyMessage = document.createElement('tr');
        emptyMessage.innerHTML = `<td colspan="5" class="empty-cart">Your cart is empty!</td>`;
        cartItemsContainer.appendChild(emptyMessage);
        totalPriceElement.textContent = 'NU.0.00';
        orderBtn.disabled = true;
        return;
    }

    // Populate the cart items table and calculate the total price
    let totalPrice = 0;
    cart.forEach(item => {
        // Create a row for each cart item
        const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-meta">
                <span>Qty: 
                    <span class="quantity-control">
                    <button class="decrease-btn" data-id="${item.id}">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="increase-btn" data-id="${item.id}">+</button>
                    </span>
                </span>
                <span>Price: $${item.price.toFixed(2)}</span>
                <span>Total: $${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;

            cartItemsContainer.appendChild(li);


        // Update total price
        totalPrice += item.price * item.quantity;
    });

    // Update the total price display
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

    // Enable the order button if there are items in the cart
    orderBtn.disabled = cart.length === 0;

    // Add event listeners for quantity change and remove buttons
    addCartEventListeners();
}

// Function to add event listeners for quantity changes and remove buttons
function addCartEventListeners() {
    const decreaseBtns = document.querySelectorAll('.decrease-btn');
    const increaseBtns = document.querySelectorAll('.increase-btn');
    const removeBtns = document.querySelectorAll('.remove-btn');

    // Event listeners for decreasing quantity
    decreaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.getAttribute('data-id');
            changeQuantity(productId, -1);
        });
    });

    // Event listeners for increasing quantity
    increaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.getAttribute('data-id');
            changeQuantity(productId, 1);
        });
    });

    // Event listeners for removing items
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
}

// Function to change the quantity of an item in the cart
function changeQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Find the product in the cart
    const product = cart.find(item => item.id === productId);
    
    if (product) {
        // Update the quantity
        product.quantity += change;
        
        // If quantity is 0 or less, remove the item from the cart
        if (product.quantity <= 0) {
            removeFromCart(productId);
        } else {
            // Otherwise, update the cart in localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }
    }
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the product from the cart array
    cart = cart.filter(item => item.id !== productId);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Function to handle order placement
function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const loggedInEmail = localStorage.getItem('userEmail'); // Get the logged-in user's email (or other identifier)
    
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to the cart before placing an order.");
        return;
    }

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Generate a unique order ID
    const orderId = generateOrderId();

    const orderDetails = {
        orderId: orderId,
        email: loggedInEmail,
        items: cart,
        totalPrice: totalPrice.toFixed(2),
        orderDate: new Date().toISOString(),
        shopId: cart[0].shopId, // Assuming the cart items are from the same shop, otherwise, handle this differently
    };

    // Store the order details in localStorage for tracking
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orderHistory.push(orderDetails);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    // Notify the seller based on shopId
    const shopId = orderDetails.shopId;
    notifySeller(shopId, orderDetails);

    // Clear the cart and update UI
    localStorage.setItem('cart', JSON.stringify([])); // Empty the cart
    updateCart(); // Re-render the cart table
    alert(`Your order has been placed successfully! Order ID: ${orderId}`);
}

// Function to generate a unique order ID (you can modify this to match your needs)
function generateOrderId() {
    return 'ORD-' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
}

// Function to notify the seller
function notifySeller(shopId, orderDetails) {
    // Example: You could send this data to a server or use WebSockets to notify the seller
    console.log(`Notifying seller for shop ID ${shopId} about the new order:`, orderDetails);
}

// Add event listener for place order button
document.getElementById('order-btn').addEventListener('click', placeOrder);

// Initial call to display the cart items when the page loads
document.addEventListener('DOMContentLoaded', updateCart);
