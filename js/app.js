// app.js - Perfect JavaScript for home.html

document.addEventListener("DOMContentLoaded", function () {
  // Modal Elements
  const loginModal = document.getElementById("loginModal");
  const loginFormContainer = document.getElementById("loginFormContainer");
  const signupModal = document.getElementById("signupModal");

  // Toggle between Login and Signup forms in the modal
  window.toggleModalForms = function (e) {
    e.preventDefault();
    loginFormContainer.classList.toggle("hidden");
    signupModal.classList.toggle("hidden");
  };

  // Open the login modal
  window.openModal = function () {
    loginModal.style.display = "flex";
  };

  // Close the login modal
  window.closeModal = function () {
    loginModal.style.display = "none";
  };

  // Close modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target === loginModal) {
      closeModal();
    }
  });

  // Smooth scrolling for internal navigation links (if applicable)
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

// app.js

/**
 * Toggles between the login and signup forms in the modal.
 */
function toggleModalForms(e) {
  e.preventDefault();
  const loginForm = document.getElementById("loginFormContainer");
  const signupForm = document.getElementById("signupModal");
  loginForm.classList.toggle("hidden");
  signupForm.classList.toggle("hidden");
}

/**
 * Opens the login modal.
 */
function openModal() {
  document.getElementById("loginModal").style.display = "flex";
}

/**
 * Closes the login modal.
 */
function closeModal() {
  document.getElementById("loginModal").style.display = "none";
}

// Close modal when clicking outside the modal content.
window.addEventListener("click", function(event) {
  const modal = document.getElementById("loginModal");
  if (event.target === modal) {
    closeModal();
  }
});
