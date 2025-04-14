// Open/close modals
document.getElementById("loginBtn").onclick = () => {
    document.getElementById("loginModal").style.display = "block";
  };
  document.getElementById("signupBtn").onclick = () => {
    document.getElementById("signupModal").style.display = "block";
  };
  document.querySelectorAll(".close").forEach(btn => {
    btn.onclick = () => {
      const target = btn.getAttribute("data-close");
      document.getElementById(target).style.display = "none";
    };
  });

  // Login form handler
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const role = document.getElementById("loginRole").value;
    localStorage.setItem("userRole", role);

    if (role === "buyer") {
      window.location.href = "buyer-dashboard.html";
    } else {
      window.location.href = "seller-dashboard.html";
    }
  });

  // Role switcher
  function switchRole() {
    const selectedRole = document.getElementById("role-switcher").value;
    localStorage.setItem("userRole", selectedRole);
    if (selectedRole === "buyer") {
      window.location.href = "buyer-dashboard.html";
    } else {
      window.location.href = "seller-dashboard.html";
    }
  }

  // Optional: Auto-redirect if already logged in
  window.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem("userRole");
    if (role === "buyer" || role === "seller") {
      console.log("User role saved:", role);
    }
  });
