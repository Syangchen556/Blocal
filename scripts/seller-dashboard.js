// Function to load orders for the seller based on the shop ID
function loadSellerOrders() {
    const sellerShopId = localStorage.getItem('shopId'); // Assuming shopId is stored in localStorage

    if (!sellerShopId) {
        console.error('Shop ID not found in localStorage.');
        return;
    }

    // Get the order history from localStorage
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

    // Filter orders related to this seller's shopId
    const sellerOrders = orderHistory.filter(order => order.shopId === sellerShopId);

    const orderManagementContainer = document.getElementById('order-management');
    orderManagementContainer.innerHTML = ''; // Clear existing orders

    // Populate the order management table with seller's orders
    sellerOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.email}</td>
            <td>${order.status || 'Pending'}</td>
            <td><button onclick="viewOrderDetails('${order.orderId}')">View</button></td>
        `;
        orderManagementContainer.appendChild(row);
    });
}

// Function to view order details
function viewOrderDetails(orderId) {
    // Fetch the order details from localStorage
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const order = orderHistory.find(order => order.orderId === orderId);

    if (order) {
        alert(`
            Order ID: ${order.orderId}
            Buyer Email: ${order.email}
            Total Price: Nu.${order.totalPrice}
            Order Date: ${order.orderDate}
            Items: ${order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
        `);
    }
}

// Function to open the add product form
function addProduct() {
    const formHTML = `
        <div class="add-product-form">
            <h2>Add New Product</h2>
            <form id="product-form">
                <input type="text" id="product-id" placeholder="Product ID" required />
                <input type="text" id="product-name" placeholder="Product Name" required />
                <textarea id="product-description" placeholder="Product Description" required></textarea>
                <input type="number" id="product-cost" placeholder="Product Cost" required />
                <input type="file" id="product-image" accept="image/*" required />
                <button type="submit">Add Product</button>
                <button type="button" onclick="cancelAddProduct()">Cancel</button>
            </form>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', formHTML);
    document.getElementById("product-form").addEventListener("submit", handleProductFormSubmit);
}

// Function to handle product form submission
function handleProductFormSubmit(event) {
    event.preventDefault();

    // Get values from form
    const productId = document.getElementById("product-id").value;
    const productName = document.getElementById("product-name").value;
    const productDescription = document.getElementById("product-description").value;
    const productCost = document.getElementById("product-cost").value;
    const productImage = document.getElementById("product-image").files[0];
    const shopId = localStorage.getItem("shopId");

    // Check if the product image is selected
    if (!productImage) {
        alert("Please select an image for the product.");
        return;
    }

    // Create a product object
    const newProduct = {
        productId,
        productName,
        productDescription,
        productCost,
        productImage: URL.createObjectURL(productImage), // Convert image to a URL
        shopId
    };

    // Save product in localStorage (You may replace this with a server-side request)
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    // Update homepage with the new product
    updateHomepage();

    // Close the form
    cancelAddProduct();
}

// Function to cancel adding a product
function cancelAddProduct() {
    const form = document.querySelector(".add-product-form");
    if (form) {
        form.remove();
    }
}

// Function to update the homepage with the list of products
function updateHomepage() {
    const productListContainer = document.getElementById("product-list");
    productListContainer.innerHTML = ''; // Clear existing products

    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Add each product dynamically to the homepage
    products.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <img src="${product.productImage}" alt="${product.productName}" />
                <h3>${product.productName}</h3>
                <p>${product.productDescription}</p>
                <p><strong>$${product.productCost}</strong></p>
                <button onclick="viewProductDetails('${product.productId}')">View Details</button>
            </div>
        `;
        productListContainer.insertAdjacentHTML('beforeend', productHTML);
    });
}

// Function to view product details
function viewProductDetails(productId) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.productId === productId);

    if (product) {
        alert(`
            Product ID: ${product.productId}
            Name: ${product.productName}
            Description: ${product.productDescription}
            Cost: $${product.productCost}
        `);
    }
}

// Initialize homepage product display on load
window.addEventListener("DOMContentLoaded", updateHomepage);

// Call loadSellerOrders on page load to populate the orders table
window.addEventListener('DOMContentLoaded', loadSellerOrders);
