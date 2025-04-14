// Sample products available for the buyer
const availableProducts = [
    { name: 'Tomato', price: '$2' },
    { name: 'Potato', price: '$1' },
    { name: 'Carrot', price: '$1.5' },
];

// Store favorites in the browser's localStorage (persist data across sessions)
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Load favorite products dynamically on page load
function loadFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = ''; // Clear the list before reloading
    favorites.forEach(favorite => {
        const li = document.createElement('li');
        li.innerHTML = `${favorite.name} - ${favorite.price} <button onclick="removeFromFavorites('${favorite.name}')">Remove</button>`;
        favoritesList.appendChild(li);
    });
}

// Add product to favorites
function addToFavorites(productName) {
    // Check if product is already in favorites
    const existingProduct = favorites.find(fav => fav.name === productName);
    if (existingProduct) {
        alert('This product is already in your favorites!');
        return;
    }

    // Find product from availableProducts list
    const product = availableProducts.find(p => p.name === productName);
    if (product) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Save to localStorage
        loadFavorites(); // Reload the list of favorites
    }
}

// Remove product from favorites
function removeFromFavorites(productName) {
    favorites = favorites.filter(fav => fav.name !== productName);
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Update localStorage
    loadFavorites(); // Reload the list of favorites
}

// Clear all favorites
document.getElementById('clear-favorites').addEventListener('click', () => {
    favorites = [];
    localStorage.removeItem('favorites');
    loadFavorites();
});

// Load the initial favorites list when the page loads
loadFavorites();

// For each available product, add an "Add to Favorites" button
function loadAvailableProducts() {
    const productContainer = document.getElementById('available-products');
    availableProducts.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML = `
            <span>${product.name} - ${product.price}</span>
            <button onclick="addToFavorites('${product.name}')">Add to Favorites</button>
        `;
        productContainer.appendChild(div);
    });
}

// Call to load available products on page load
if (document.getElementById('available-products')) loadAvailableProducts();
