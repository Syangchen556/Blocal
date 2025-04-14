// Handle the order functionality when placing an order
const orderBtn = document.getElementById('order-btn');
orderBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert("Your order has been placed!");
        cart.length = 0; // Clear the cart after the order
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        renderCart();
    }
});

// Render the cart when the page loads
window.addEventListener('load', () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(...savedCart);
    renderCart();
});

// Render the cart list
function renderCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItemsElement.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);
}
