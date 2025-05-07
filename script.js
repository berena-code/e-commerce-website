document.addEventListener("DOMContentLoaded", () => {
    // Slideshow functionality
    let slideIndex = 0;
  
    function showSlides() {
      const slides = document.querySelectorAll(".slide");
      if (slides.length === 0) {
        console.error("No slides found. Check your HTML structure.");
        return;
      }
  
      // Hide all slides
      slides.forEach((slide) => (slide.style.display = "none"));
  
      // Increment the slide index
      slideIndex++;
      if (slideIndex > slides.length) slideIndex = 1; // Reset to the first slide
  
      // Show the current slide
      slides[slideIndex - 1].style.display = "block";
  
      // Change slide every 3 seconds
      setTimeout(showSlides, 3000);
    }
  
    // Initialize the slideshow
    showSlides();
  
    // Cart count functionality
    const cartCount = document.getElementById("cart-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    function updateCartCount() {
      cartCount.textContent = cart.length;
    }
  
    // Initialize cart count
    updateCartCount();
  });