const cart = [];
const cartItemsElement = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const id = productElement.getAttribute('data-id');
        const name = productElement.getAttribute('data-name');
        const price = parseFloat(productElement.getAttribute('data-price'));

        const existingProduct = cart.find(item => item.id === id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        updateCart();
    });
});

function updateCart() {
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