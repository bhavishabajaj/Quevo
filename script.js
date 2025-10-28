// script.js
console.log("Quevo Login Page Loaded");

// Example: prevent default form submit for now
document.querySelector("form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login button clicked!");
});
