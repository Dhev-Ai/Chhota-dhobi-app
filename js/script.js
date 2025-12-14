/**
 * Chhota Dhobhi - Main JavaScript
 * Interactive functionality for the laundry service website
 */

document.addEventListener("DOMContentLoaded", function () {
  // ===========================
  // Navigation
  // ===========================
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");

  function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) navLink.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink);

  // ===========================
  // Pricing Toggle
  // ===========================
  const pricingToggle = document.getElementById("pricing-toggle");
  const toggleLabels = document.querySelectorAll(".toggle-label");
  const pricingCards = document.querySelectorAll(".pricing-card");

  if (pricingToggle) {
    pricingToggle.addEventListener("click", function () {
      this.classList.toggle("active");

      // Update toggle labels
      toggleLabels.forEach((label) => label.classList.toggle("active"));

      // Show/hide pricing cards
      const showSubscription = this.classList.contains("active");

      pricingCards.forEach((card) => {
        const category = card.dataset.category;

        if (showSubscription) {
          card.classList.toggle("hidden", category === "individual");
        } else {
          card.classList.toggle("hidden", category === "subscription");
        }
      });
    });
  }

  // ===========================
  // Schedule Form
  // ===========================
  const scheduleForm = document.getElementById("schedule-form");
  const dateInput = document.getElementById("date");

  // Set minimum date to today
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  if (scheduleForm) {
    scheduleForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Collect form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Simple validation
      if (
        !data.name ||
        !data.phone ||
        !data.address ||
        !data.date ||
        !data.time ||
        !data.service
      ) {
        showNotification("Please fill in all required fields.", "error");
        return;
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Generate order ID
        const orderId =
          "CD-" + Math.random().toString(36).substr(2, 5).toUpperCase();

        showNotification(
          `Pickup scheduled successfully! Your Order ID: ${orderId}`,
          "success"
        );

        // Reset form
        this.reset();
        if (dateInput) {
          const today = new Date();
          dateInput.value = today.toISOString().split("T")[0];
        }

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // ===========================
  // Order Tracking
  // ===========================
  const trackBtn = document.getElementById("track-btn");
  const orderIdInput = document.getElementById("order-id");
  const trackResult = document.getElementById("track-result");

  if (trackBtn && orderIdInput && trackResult) {
    trackBtn.addEventListener("click", function () {
      const orderId = orderIdInput.value.trim();

      if (!orderId) {
        showNotification("Please enter an order ID.", "error");
        return;
      }

      // Simulate tracking
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      this.disabled = true;

      setTimeout(() => {
        // Show demo tracking result
        trackResult.classList.remove("hidden");

        // Update displayed order ID
        const orderHeader = trackResult.querySelector(".order-header h4");
        if (orderHeader) {
          orderHeader.textContent = `Order #${orderId.toUpperCase()}`;
        }

        // Scroll to result
        trackResult.scrollIntoView({ behavior: "smooth", block: "center" });

        this.innerHTML = originalText;
        this.disabled = false;
      }, 1000);
    });

    // Allow pressing Enter to track
    orderIdInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        trackBtn.click();
      }
    });
  }

  // ===========================
  // Contact Form
  // ===========================
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      if (!data.name || !data.email || !data.message) {
        showNotification("Please fill in all required fields.", "error");
        return;
      }

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification(
          "Message sent successfully! We'll get back to you soon.",
          "success"
        );
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // ===========================
  // Back to Top Button
  // ===========================
  const backToTop = document.getElementById("back-to-top");

  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 500) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ===========================
  // Smooth Scroll for Anchor Links
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ===========================
  // Notification System
  // ===========================
  function showNotification(message, type = "info") {
    // Remove existing notification
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${
                  type === "success"
                    ? "fa-check-circle"
                    : type === "error"
                    ? "fa-exclamation-circle"
                    : "fa-info-circle"
                }"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            padding: 16px 20px;
            background: ${
              type === "success"
                ? "#d1fae5"
                : type === "error"
                ? "#fee2e2"
                : "#e0f2fe"
            };
            color: ${
              type === "success"
                ? "#065f46"
                : type === "error"
                ? "#991b1b"
                : "#0369a1"
            };
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            animation: slideIn 0.3s ease;
        `;

    const notificationContent = notification.querySelector(
      ".notification-content"
    );
    notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
        `;

    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.style.cssText = `
            background: none;
            border: none;
            cursor: pointer;
            color: inherit;
            opacity: 0.7;
            font-size: 1rem;
        `;

    // Add animation keyframes
    if (!document.querySelector("#notification-styles")) {
      const style = document.createElement("style");
      style.id = "notification-styles";
      style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button functionality
    closeBtn.addEventListener("click", () => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // ===========================
  // Intersection Observer for Animations
  // ===========================
  const animateOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Add animation classes to elements
  document
    .querySelectorAll(".service-card, .pricing-card, .testimonial-card, .step")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      animateOnScroll.observe(el);
    });

  // Add the animate-in style
  const animateStyle = document.createElement("style");
  animateStyle.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
  document.head.appendChild(animateStyle);

  // ===========================
  // Phone Number Formatting
  // ===========================
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach((input) => {
    input.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "");

      // Limit to 10 digits (excluding country code)
      if (value.length > 10) {
        value = value.slice(0, 10);
      }

      // Format as XXX XXX XXXX
      if (value.length > 6) {
        value =
          value.slice(0, 3) + " " + value.slice(3, 6) + " " + value.slice(6);
      } else if (value.length > 3) {
        value = value.slice(0, 3) + " " + value.slice(3);
      }

      this.value = value;
    });
  });

  // ===========================
  // Service Card Click Interaction
  // ===========================
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("click", function () {
      const serviceName = this.querySelector("h3").textContent;
      const scheduleSection = document.getElementById("schedule");
      const serviceSelect = document.getElementById("service");

      // Map service names to select values
      const serviceMap = {
        "Wash & Fold": "wash-fold",
        "Dry Cleaning": "dry-clean",
        "Wash & Iron": "wash-iron",
        "Stain Removal": "wash-fold",
        "Bedding & Linens": "bedding",
        "Shoe Cleaning": "wash-fold",
      };

      if (serviceSelect && serviceMap[serviceName]) {
        serviceSelect.value = serviceMap[serviceName];
      }

      if (scheduleSection) {
        scheduleSection.scrollIntoView({ behavior: "smooth" });
      }
    });

    card.style.cursor = "pointer";
  });

  // ===========================
  // Pricing Card Selection
  // ===========================
  document.querySelectorAll(".pricing-card .btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const card = this.closest(".pricing-card");
      const planName = card.querySelector("h3").textContent;
      const scheduleSection = document.getElementById("schedule");

      showNotification(
        `Great choice! You selected the "${planName}" plan.`,
        "success"
      );

      if (scheduleSection) {
        setTimeout(() => {
          scheduleSection.scrollIntoView({ behavior: "smooth" });
        }, 1000);
      }
    });
  });

  console.log("Chhota Dhobhi website initialized successfully! 🧺");
});
