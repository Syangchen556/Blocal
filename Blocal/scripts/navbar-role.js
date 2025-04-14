function updateNavbarRoleLink() {
  const role = localStorage.getItem("userRole");
  const roleLink = document.getElementById("role-link");
  const authLink = document.getElementById("auth-link");
  const sellerNav = document.getElementById("seller-only");

  if (role === "buyer") {
    roleLink.innerHTML = '<a href="buyer-dashboard.html"><i class="fa-regular fa-user"></i> Buyer Dashboard</a>';
    const cartItem = document.createElement("li");
    cartItem.innerHTML = '<a href="cart.html"><i class="fa-solid fa-cart-shopping"></i> Cart</a>';
    document.getElementById("nav-links").insertBefore(cartItem, roleLink);
    if (sellerNav) sellerNav.style.display = "none";
    authLink.innerHTML = '<a href="#" onclick="logout()">Logout</a>';
  } else if (role === "seller") {
    roleLink.innerHTML = '<a href="seller-dashboard.html"><i class="fa-regular fa-user"></i> Seller Dashboard</a>';
    if (sellerNav) sellerNav.style.display = "list-item";
    authLink.innerHTML = '<a href="#" onclick="logout()">Logout</a>';
  } else {
    roleLink.innerHTML = '<a href="profile.html"><i class="fa-regular fa-user"></i> Login</a>';
    authLink.innerHTML = ''; // Hide logout when not logged in
  }
}

function logout() {
  localStorage.removeItem("userRole");
  window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", updateNavbarRoleLink);