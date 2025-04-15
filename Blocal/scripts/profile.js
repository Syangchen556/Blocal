// Modal Handling
const modals = document.querySelectorAll('.modal');
const openModalButtons = document.querySelectorAll('#loginBtn, #signupBtn');
const closeModalButtons = document.querySelectorAll('[data-close]');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetModal = button.id === 'loginBtn' ? 'loginModal' : 'signupModal';
        document.getElementById(targetModal).style.display = 'block';
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.style.display = 'none';
    });
});

// Login Submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const role = document.getElementById('loginRole').value;

    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);

    document.getElementById('loginModal').style.display = 'none';
    updateNavbarAndRedirect(role);
});

// Signup Submission
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Sign-up successful! Please login.');
    document.getElementById('signupModal').style.display = 'none';
    document.getElementById('loginModal').style.display = 'block';
});

// Redirect based on role
function updateNavbarAndRedirect(role) {
    if (typeof updateNavbarRoleLink === 'function') updateNavbarRoleLink();

    if (role === 'buyer') {
        window.location.href = 'buyer-dashboard.html';
    } else if (role === 'seller') {
        window.location.href = 'seller-dashboard.html';
    }
}

// BONUS: Role switcher
function switchRole() {
    const selectedRole = document.getElementById("role-switcher").value;
    localStorage.setItem("userRole", selectedRole);
    updateNavbarAndRedirect(selectedRole);
}

// Auto redirect on page load
window.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem('userRole');
    if (role) updateNavbarAndRedirect(role);
});
