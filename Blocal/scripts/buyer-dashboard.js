// Example Buyer Data
const orderHistory = [
    { orderId: '123', product: 'Tomato', status: 'Shipped', price: '$2' },
    { orderId: '124', product: 'Potato', status: 'Delivered', price: '$1' }
];

// Load order history on Buyer Dashboard
function loadOrderHistory() {
    const orderHistoryTable = document.getElementById('order-history-table');
    orderHistory.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${order.orderId}</td><td>${order.product}</td><td>${order.status}</td><td>${order.price}</td>`;
        orderHistoryTable.appendChild(row);
    });
}

// Track order for buyer
function trackOrder() {
    const orderId = document.getElementById('order-id').value;
    const order = orderHistory.find(order => order.orderId === orderId);
    const orderStatus = document.getElementById('order-status');
    if (order) {
        orderStatus.innerHTML = `Order Status: ${order.status}`;
    } else {
        orderStatus.innerHTML = 'Order not found';
    }
}

// Call function on page load
if (document.getElementById('order-history-table')) loadOrderHistory();
