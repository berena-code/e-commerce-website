document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart-count");
  const notification = document.getElementById("notification");

  // Retrieve cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to add a product to the cart
  window.addToCart = (name, price, event) => {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showNotification(`${name} has been added to your cart!`, event.target);
  };

  // Function to update cart count in the menu
  function updateCartCount() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Function to show a notification near the clicked button
  function showNotification(message, targetElement) {
    notification.textContent = message;

    // Get the position of the clicked button
    const rect = targetElement.getBoundingClientRect();
    notification.style.top = `${rect.top + window.scrollY - 40}px`; // Position above the button
    notification.style.left = `${rect.left + window.scrollX}px`; // Align horizontally with the button

    notification.classList.add("show");

    // Hide the notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  // Initialize cart count
  updateCartCount();
});