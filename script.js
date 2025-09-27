// DOM Elements
const grantForm = document.getElementById("grantForm");
const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const contactSuccess = document.getElementById("contactSuccess");
const applicationIdSpan = document.getElementById("applicationId");
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const amountInput = document.getElementById("amount");
const requestedAmount = document.getElementById("requestedAmount");
const processingFee = document.getElementById("processingFee");
const netAmount = document.getElementById("netAmount");
const processingFeeValue = document.getElementById("processingFeeValue");
const netAmountValue = document.getElementById("netAmountValue");
const applicationIdValue = document.getElementById("applicationIdValue");
const usdtAmount = document.getElementById("usdtAmount");
const paymentOptions = document.querySelectorAll(".payment-option");
const paymentMethodField = document.getElementById("paymentMethod");
const copyButtons = document.querySelectorAll(".btn-copy");
const submitBtn = document.getElementById("submitBtn");
const contactSubmitBtn = document.getElementById("contactSubmitBtn");
const replyTo = document.getElementById("replyTo");
const contactReplyTo = document.getElementById("contactReplyTo");

// Navigation functionality
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetPage = link.getAttribute("data-page");

    // Update active nav link
    navLinks.forEach((nav) => nav.classList.remove("active"));
    link.classList.add("active");

    // Hide all pages
    pages.forEach((page) => {
      page.classList.remove("active");
    });

    // Show target page
    document.getElementById(`${targetPage}-page`).classList.add("active");
  });
});

// Payment method selection
paymentOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // Remove selected class from all options
    paymentOptions.forEach((opt) => opt.classList.remove("selected"));

    // Add selected class to clicked option
    option.classList.add("selected");

    // Get selected method
    const method = option.getAttribute("data-method");
    paymentMethodField.value = method;

    // Hide all payment details
    document.querySelectorAll(".payment-details").forEach((detail) => {
      detail.classList.remove("active");
    });

    // Show selected payment details
    document.getElementById(`${method}-details`).classList.add("active");
  });
});

// Copy address functionality
copyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const address = button.getAttribute("data-address");
    navigator.clipboard
      .writeText(address)
      .then(() => {
        alert("Wallet address copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Wallet address copied to clipboard!");
      });
  });
});

// Calculate and display processing fee in real-time (5% fee)
amountInput.addEventListener("input", updateFeeDisplay);

function updateFeeDisplay() {
  const amount = parseFloat(amountInput.value) || 0;
  const fee = amount * 0.05; // 5% processing fee
  const net = amount - fee;

  requestedAmount.textContent = `$${amount.toLocaleString()}`;
  processingFee.textContent = `$${fee.toLocaleString()}`;
  netAmount.textContent = `$${net.toLocaleString()}`;
  usdtAmount.value = `${fee.toLocaleString()} USDT`;

  // Update hidden fields for Formspree
  processingFeeValue.value = fee;
  netAmountValue.value = net;
}

// Initialize fee display
updateFeeDisplay();

// Form validation function for grant application
function validateGrantForm() {
  let isValid = true;
  const requiredFields = document.querySelectorAll(
    "#grantForm input[required], #grantForm select[required], #grantForm textarea[required]"
  );

  // Reset all error states
  document
    .querySelectorAll("#grantForm .error")
    .forEach((el) => el.classList.remove("error"));
  document
    .querySelectorAll("#grantForm .error-message")
    .forEach((el) => (el.style.display = "none"));

  // Check each required field
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add("error");
      const errorId = field.id + "Error";
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.style.display = "block";
      }
    }
  });

  // Check policy agreement
  const policyCheckbox = document.getElementById("agreePolicy");
  if (!policyCheckbox.checked) {
    isValid = false;
    policyCheckbox.classList.add("error");
    document.getElementById("policyError").style.display = "block";
  }

  // Check amount range (minimum now $10,000)
  const amount = parseFloat(amountInput.value);
  if (amount < 10000 || amount > 800000) {
    isValid = false;
    amountInput.classList.add("error");
    document.getElementById("amountError").style.display = "block";
  }

  // Check email format
  const email = document.getElementById("email").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    isValid = false;
    document.getElementById("email").classList.add("error");
    document.getElementById("emailError").textContent =
      "Please enter a valid email address";
    document.getElementById("emailError").style.display = "block";
  }

  return isValid;
}

// Form validation function for contact form
function validateContactForm() {
  let isValid = true;
  const requiredFields = document.querySelectorAll(
    "#contactForm input[required], #contactForm select[required], #contactForm textarea[required]"
  );

  // Reset all error states
  document
    .querySelectorAll("#contactForm .error")
    .forEach((el) => el.classList.remove("error"));
  document
    .querySelectorAll("#contactForm .error-message")
    .forEach((el) => (el.style.display = "none"));

  // Check each required field
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add("error");
      const errorId = field.id + "Error";
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.style.display = "block";
      }
    }
  });

  // Check email format
  const email = document.getElementById("contactEmail").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    isValid = false;
    document.getElementById("contactEmail").classList.add("error");
    document.getElementById("contactEmailError").textContent =
      "Please enter a valid email address";
    document.getElementById("contactEmailError").style.display = "block";
  }

  return isValid;
}

// Real-time validation for grant form fields
document
  .querySelectorAll("#grantForm input, #grantForm select, #grantForm textarea")
  .forEach((field) => {
    field.addEventListener("blur", function () {
      validateGrantForm();
    });
  });

// Real-time validation for contact form fields
document
  .querySelectorAll(
    "#contactForm input, #contactForm select, #contactForm textarea"
  )
  .forEach((field) => {
    field.addEventListener("blur", function () {
      validateContactForm();
    });
  });

// Grant form submission handling
grantForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateGrantForm()) {
    // Generate application ID
    const appId =
      "GR-" +
      new Date().getFullYear() +
      "-" +
      Math.floor(10000 + Math.random() * 90000);
    applicationIdSpan.textContent = appId;
    applicationIdValue.value = appId;

    // Set reply-to email for Formspree
    const email = document.getElementById("email").value;
    replyTo.value = email;

    // Disable submit button to prevent multiple submissions
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    // Show success message
    successMessage.style.display = "block";

    // Scroll to success message
    setTimeout(() => {
      successMessage.scrollIntoView({ behavior: "smooth" });
    }, 100);

    // Submit the form to Formspree
    const formData = new FormData(grantForm);

    // Using Fetch API to submit the form
    fetch(grantForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Grant form submitted successfully");
          // Reset form after successful submission
          grantForm.reset();
        } else {
          console.error("Grant form submission failed");
          // Re-enable button if submission failed
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Application";
        }
      })
      .catch((error) => {
        console.error("Error submitting grant form:", error);
        // Re-enable button if submission failed
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Application";
      });
  } else {
    // Scroll to first error
    const firstError = document.querySelector("#grantForm .error");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
});

// Contact form submission handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateContactForm()) {
    // Set reply-to email for Formspree
    const email = document.getElementById("contactEmail").value;
    contactReplyTo.value = email;

    // Disable submit button to prevent multiple submissions
    contactSubmitBtn.disabled = true;
    contactSubmitBtn.textContent = "Sending...";

    // Show success message
    contactSuccess.style.display = "block";

    // Scroll to success message
    setTimeout(() => {
      contactSuccess.scrollIntoView({ behavior: "smooth" });
    }, 100);

    // Submit the form to Formspree
    const formData = new FormData(contactForm);

    // Using Fetch API to submit the form
    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Contact form submitted successfully");
          // Reset form after successful submission
          contactForm.reset();
        } else {
          console.error("Contact form submission failed");
          // Re-enable button if submission failed
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.textContent = "Send Message";
        }
      })
      .catch((error) => {
        console.error("Error submitting contact form:", error);
        // Re-enable button if submission failed
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.textContent = "Send Message";
      });
  } else {
    // Scroll to first error
    const firstError = document.querySelector("#contactForm .error");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
});

// SSN formatting
document.getElementById("ssn").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 3 && value.length <= 5) {
    value = value.slice(0, 3) + "-" + value.slice(3);
  } else if (value.length > 5) {
    value =
      value.slice(0, 3) + "-" + value.slice(3, 5) + "-" + value.slice(5, 9);
  }
  e.target.value = value;
});

// Phone number formatting
document.getElementById("phone").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 3 && value.length <= 6) {
    value = "(" + value.slice(0, 3) + ") " + value.slice(3);
  } else if (value.length > 6) {
    value =
      "(" +
      value.slice(0, 3) +
      ") " +
      value.slice(3, 6) +
      "-" +
      value.slice(6, 10);
  }
  e.target.value = value;
});

function updatePaymentFieldRequirements() {
  const method = paymentMethodField.value;

  // FedEx fields
  const fedexFields = [
    "fedexAddress",
    "contactPerson",
    "contactPhone",
  ].map((id) => document.getElementById(id));

  // Bank fields
  const bankFields = [
    "bankName",
    "accountHolder",
    "accountNumber",
    "routingNumber",
    "bankAddress",
  ].map((id) => document.getElementById(id));

  if (method === "fedex") {
    fedexFields.forEach((f) => f && f.setAttribute("required", "required"));
    bankFields.forEach((f) => f && f.removeAttribute("required"));
  } else if (method === "bank") {
    fedexFields.forEach((f) => f && f.removeAttribute("required"));
    bankFields.forEach((f) => f && f.setAttribute("required", "required"));
  }
}

// Call on page load and when payment method changes
updatePaymentFieldRequirements();
paymentOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // ...existing code...
    updatePaymentFieldRequirements();
  });
});
