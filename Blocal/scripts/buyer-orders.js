// buyer-orders.js

function renderOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const list = document.getElementById("orderList");
    list.innerHTML = "";
  
    orders.forEach((order, i) => {
      const item = document.createElement("li");
      item.innerHTML = `<strong>${order.name}</strong> - Qty: ${order.qty}, $${order.price} <button onclick="requestReturn(${i})">Request Return</button>`;
      list.appendChild(item);
    });
  }
  
  function renderReturns() {
    const returns = JSON.parse(localStorage.getItem("returns")) || [];
    const list = document.getElementById("returnList");
    list.innerHTML = "";
  
    returns.forEach(ret => {
      const item = document.createElement("li");
      item.textContent = `${ret.name} - Qty: ${ret.qty}, $${ret.price}`;
      list.appendChild(item);
    });
  }
  
  function requestReturn(index) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const returns = JSON.parse(localStorage.getItem("returns")) || [];
    const order = orders[index];
  
    returns.push(order);
    localStorage.setItem("returns", JSON.stringify(returns));
    renderReturns();
  }
  
  document.getElementById("addOrderForm").addEventListener("submit", e => {
    e.preventDefault();
  
    const name = document.getElementById("productName").value;
    const qty = parseInt(document.getElementById("productQty").value);
    const price = parseFloat(document.getElementById("productPrice").value);
  
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ name, qty, price });
    localStorage.setItem("orders", JSON.stringify(orders));
  
    e.target.reset();
    renderOrders();
  });
  
  window.addEventListener("DOMContentLoaded", () => {
    updateNavbarRoleLink();
    renderOrders();
    renderReturns();
  });
  