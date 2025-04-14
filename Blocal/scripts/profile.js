const tabs = document.querySelectorAll('.tab-link');
const formContainers = document.querySelectorAll('.form-container');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        formContainers.forEach(container => container.classList.remove('active'));
        document.getElementById(tab.dataset.role).classList.add('active');

        switchForm(`${tab.dataset.role}-login`);
    });
});

function switchForm(formId) {
    const allForms = document.querySelectorAll("form");
    const allSwitches = document.querySelectorAll(".form-switch");

    allForms.forEach(form => form.classList.add("hidden-form"));
    allSwitches.forEach(sw => sw.classList.add("hidden-form"));

    document.getElementById(formId).classList.remove("hidden-form");

    if (formId.includes("buyer")) {
        if (formId === "buyer-signup") {
            document.getElementById("buyer-switch-back").classList.remove("hidden-form");
        } else {
            document.querySelector("#buyer .form-switch").classList.remove("hidden-form");
        }
    }

    if (formId.includes("seller")) {
        if (formId === "seller-signup") {
            document.getElementById("seller-switch-back").classList.remove("hidden-form");
        } else {
            document.querySelector("#seller .form-switch").classList.remove("hidden-form");
        }
    }
}

// Handle Sign Up and Login Actions
document.getElementById("buyer-signup").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Buyer Sign-Up Successful!");
    switchForm("buyer-login");
});

document.getElementById("seller-signup").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Seller Sign-Up Successful!");
    switchForm("seller-login");
});

document.getElementById("buyer-login").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Buyer Logged In!");
    window.location.href = "buyer-dashboard.html"; // redirect to buyer dashboard
});

document.getElementById("seller-login").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Seller Logged In!");
    window.location.href = "seller-dashboard.html"; // redirect to seller dashboard
});


document.getElementById('buyer-login').addEventListener('submit', function(e) {
    e.preventDefault();
    window.location.href = 'buyer-dashboard.html';
});

document.getElementById('seller-login').addEventListener('submit', function(e) {
    e.preventDefault();
    window.location.href = 'seller-dashboard.html';
});

// Assume we have a function that checks the credentials and logs the user in
function login(username, password) {
    // Simulate successful login and set user data
    const userRole = (username === 'buyer@example.com') ? 'buyer' : 'seller'; // Example roles
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', userRole); // Store the role of the user (buyer/seller)

    // Redirect to profile page after login
    window.location.href = 'profile.html';
}


function logout() {
    // Clear login status from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');

    // Redirect to home page or login page
    window.location.href = 'index.html';
}
