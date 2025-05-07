document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  // Retrieve cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to render cart items
  function renderCart() {
    cartItemsContainer.innerHTML = ""; // Clear existing items
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.textContent = "";
      return;
    }

    // Add table header
    const headerHTML = `
      <div class="cart-header">
        <div class="cart-column">Item</div>
        <div class="cart-column">Quantity</div>
        <div class="cart-column">Amount</div>
      </div>
    `;
    cartItemsContainer.innerHTML += headerHTML;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItemHTML = `
        <div class="cart-row">
          <div class="cart-column">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <span>${item.name}</span>
          </div>
          <div class="cart-column">
            <button onclick="decreaseQuantity(${index})">-</button>
            ${item.quantity}
            <button onclick="increaseQuantity(${index})">+</button>
          </div>
          <div class="cart-column">
            KSh ${itemTotal}
            <button onclick="removeFromCart(${index})" class="remove-button">Remove</button>
          </div>
        </div>
      `;
      cartItemsContainer.innerHTML += cartItemHTML;
    });

    cartTotal.textContent = `Total: KSh ${total}`;
    updateCartCount();
  }

  // Function to update cart count in the menu
  function updateCartCount() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Function to remove an item from the cart
  window.removeFromCart = (index) => {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  // Function to increase item quantity
  window.increaseQuantity = (index) => {
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  // Function to decrease item quantity
  window.decreaseQuantity = (index) => {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1); // Remove item if quantity is 0
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  // Function to handle checkout
  window.checkout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you for your purchase!");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  // Initialize cart
  renderCart();
});