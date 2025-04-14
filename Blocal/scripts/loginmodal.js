// Modal handling
const modals = document.querySelectorAll('.modal');
const openModalButtons = document.querySelectorAll('#loginBtn, #signupBtn');
const closeModalButtons = document.querySelectorAll('[data-close]');

// Open login or sign-up modal
openModalButtons.forEach(button => {
    button.addEventListener('click', function () {
        const targetModal = button.id === 'loginBtn' ? 'loginModal' : 'signupModal';
        document.getElementById(targetModal).style.display = 'block';
    });
});

// Close modal functionality
closeModalButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modal = button.closest('.modal');
        modal.style.display = 'none';
    });
});

// Handle login submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    const role = document.getElementById('loginRole').value;

    // Save the role in localStorage (simulating login)
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);

    // Close login modal
    document.getElementById('loginModal').style.display = 'none';

    // Call a function to update navigation and redirect
    updateNavbarAndRedirect(role);
});

// Handle signup submission
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = signupForm.querySelector('input[type="text"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;

    // Assume sign-up success and redirect to login
    alert('Sign-up successful! Please login.');
    document.getElementById('signupModal').style.display = 'none';
    document.getElementById('loginModal').style.display = 'block';
});

// Function to update navbar and redirect based on user role
function updateNavbarAndRedirect(role) {
    const navLinks = document.getElementById('nav-links');
    navLinks.innerHTML = '';  // Clear current links

    // Add common links
    const homeLink = document.createElement('li');
    homeLink.innerHTML = '<a href="index.html">Home</a>';
    navLinks.appendChild(homeLink);

    const profileLink = document.createElement('li');
    profileLink.innerHTML = '<a href="profile.html">Profile</a>';
    navLinks.appendChild(profileLink);

    const helpLink = document.createElement('li');
    helpLink.innerHTML = '<a href="help.html">Help Center</a>';
    navLinks.appendChild(helpLink);

    // Add role-specific links
    if (role === 'buyer') {
        const cartLink = document.createElement('li');
        cartLink.innerHTML = '<a href="cart.html">Cart</a>';
        navLinks.appendChild(cartLink);

        const blogLink = document.createElement('li');
        blogLink.innerHTML = '<a href="blog.html">Blog</a>';
        navLinks.appendChild(blogLink);

        // Redirect to Buyer Dashboard
        window.location.href = 'buyer-dashboard.html';
    } else if (role === 'seller') {
        const ordersLink = document.createElement('li');
        ordersLink.innerHTML = '<a href="orders.html">Orders & Returns</a>';
        navLinks.appendChild(ordersLink);

        const blogLink = document.createElement('li');
        blogLink.innerHTML = '<a href="blog.html">Blog</a>';
        navLinks.appendChild(blogLink);

        // Redirect to Seller Dashboard
        window.location.href = 'seller-dashboard.html';
    }
}

// Check if the user is logged in and update the navbar on page load
window.onload = function () {
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
        updateNavbarAndRedirect(userRole);
    }
};
