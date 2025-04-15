// Function to generate unique order ID (could be a timestamp)
function generateOrderId() {
    return 'ORD-' + new Date().getTime();
}

// Function to render orders (order history)
function renderOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const list = document.getElementById("order-history-table");
    list.innerHTML = "";  // Clear the list before rendering

    orders.forEach((order) => {
        const row = document.createElement("tr");
        const total = (order.price * order.quantity).toFixed(2);
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.name}</td>
            <td>${order.status}</td>
            <td>$${total}</td>
        `;
        list.appendChild(row);
    });
}

// Function to render return requests
function renderReturns() {
    const returns = JSON.parse(localStorage.getItem("returns")) || [];
    const list = document.getElementById("returnList");
    list.innerHTML = "";  // Clear the list before rendering

    returns.forEach(ret => {
        const item = document.createElement("li");
        const total = (ret.price * ret.quantity).toFixed(2);
        item.textContent = `${ret.name} - Qty: ${ret.quantity}, Total: $${total}`;
        list.appendChild(item);
    });
}

// Function to request a return (move order to return list)
function requestReturn(index) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const returns = JSON.parse(localStorage.getItem("returns")) || [];
    const returnedOrder = orders.splice(index, 1)[0]; // Remove the order and get it

    returns.push(returnedOrder);  // Add it to the returns array
    localStorage.setItem("orders", JSON.stringify(orders));  // Save updated orders
    localStorage.setItem("returns", JSON.stringify(returns));  // Save updated returns

    renderOrders();  // Re-render orders
    renderReturns();  // Re-render returns
}

// Function to track the status of an order
function trackOrder() {
    const orderIdInput = document.getElementById("order-id");
    const statusDiv = document.getElementById("order-status");

    if (!orderIdInput || !statusDiv) return;

    const orderId = orderIdInput.value.trim();
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const foundOrder = orders.find(order => order.orderId === orderId);

    // Display order status or error message
    if (!orderId) {
        statusDiv.innerHTML = "<p>Please enter a valid Order ID.</p>";
    } else if (foundOrder) {
        statusDiv.innerHTML = `<p>Order #${orderId} is currently <strong>${foundOrder.status}</strong>.</p>`;
    } else {
        statusDiv.innerHTML = "<p>Order not found.</p>";
    }
}

// Add event listener for order tracking
document.getElementById('trackOrderBtn').addEventListener('click', trackOrder);

// Initialize page on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    renderOrders();
    renderReturns();
});
