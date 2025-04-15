// Toggle between login and signup
const showLoginBtn = document.getElementById("showLogin");
const showSignupBtn = document.getElementById("showSignup");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

showLoginBtn.addEventListener("click", () => {
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  showLoginBtn.classList.add("active");
  showSignupBtn.classList.remove("active");
});

showSignupBtn.addEventListener("click", () => {
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  showSignupBtn.classList.add("active");
  showLoginBtn.classList.remove("active");
});

// Handle login
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const role = document.getElementById("loginRole").value;

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userRole", role);

  // Redirect to respective dashboard
  if (role === "buyer") {
    window.location.href = "buyer-dashboard.html";
  } else if (role === "seller") {
    window.location.href = "seller-dashboard.html";
  }
});

// Handle signup
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Sign-up successful! Please login.");
  showLoginBtn.click(); // Switch to login form
});

// Optional: Auto redirect if already logged in
window.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("userRole");
  if (role === "buyer") {
    window.location.href = "buyer-dashboard.html";
  } else if (role === "seller") {
    window.location.href = "seller-dashboard.html";
  }
});
