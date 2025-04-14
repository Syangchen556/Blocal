// Function to update the navigation bar based on the user role
function updateNavBar() {
    const userRole = localStorage.getItem('userRole'); // Get user role from localStorage
    const navbar = document.getElementById('navbar');  // Get navbar container

    // Clear existing navbar links (if any)
    navbar.innerHTML = '';

    // Define navigation links based on user role
    if (userRole === 'buyer') {
        // If the user is a buyer, add buyer-specific links
        navbar.innerHTML = `
            <li><a href="index.html">Home</a></li>
            <li><a href="profile.html">Profile</a></li>
            <li><a href="help.html">Help Center</a></li>
            <li><a href="cart.html">Cart</a></li>
            <li><a href="blog.html">Blog</a></li>
        `;
    } else if (userRole === 'seller') {
        // If the user is a seller, add seller-specific links
        navbar.innerHTML = `
            <li><a href="index.html">Home</a></li>
            <li><a href="profile.html">Profile</a></li>
            <li><a href="help.html">Help Center</a></li>
            <li><a href="orders.html">Orders & Returns</a></li>
            <li><a href="blog.html">Blog</a></li>
        `;
    } else {
        // Default state if no role is found (e.g., logged out)
        navbar.innerHTML = `
            <li><a href="index.html">Home</a></li>
            <li><a href="login.html">Login</a></li>
            <li><a href="signup.html">Sign Up</a></li>
        `;
    }
}

// Execute the function on page load to update the nav bar based on the user role
window.onload = function() {
    updateNavBar();
};
