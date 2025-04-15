function updateNavbarRoleLink() {
  const role = localStorage.getItem("userRole");
  const roleLink = document.getElementById("role-link");
  const authLink = document.getElementById("auth-link");
  const sellerNav = document.getElementById("seller-only");

  if (role === "buyer") {
    roleLink.innerHTML = '<a href="buyer-dashboard.html"><i class="fa-regular fa-user"></i> Buyer</a>';
    
    // Add cart icon if not already present
    if (!document.getElementById("nav-cart-link")) {
      const cartItem = document.createElement("li");
      cartItem.id = "nav-cart-link";
      cartItem.innerHTML = '<a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a>';
      document.getElementById("nav-links").insertBefore(cartItem, roleLink);
    }

    if (sellerNav) sellerNav.style.display = "none";
    authLink.innerHTML = '<a href="#" onclick="logout()">Logout</a>';
  } else if (role === "seller") {
    roleLink.innerHTML = '<a href="seller-dashboard.html"><i class="fa-regular fa-user"></i> Seller</a>';
    if (sellerNav) sellerNav.style.display = "list-item";
    authLink.innerHTML = '<a href="#" onclick="logout()">Logout</a>';

    // Remove cart icon if present
    const cartItem = document.getElementById("nav-cart-link");
    if (cartItem) cartItem.remove();
  } else {
    roleLink.innerHTML = '<a href="profile.html"><i class="fa-regular fa-user"></i> Login</a>';
    authLink.innerHTML = ''; // Hide logout when not logged in

    // Cleanup role-based links
    const cartItem = document.getElementById("nav-cart-link");
    if (cartItem) cartItem.remove();
    if (sellerNav) sellerNav.style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("userRole");
  window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", updateNavbarRoleLink);
