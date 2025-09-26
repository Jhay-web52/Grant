// DOM Elements
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const closeModals = document.querySelectorAll(".close-modal");
const grantForm = document.getElementById("grantForm");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const bankForm = document.getElementById("bankForm");
const applicationSection = document.getElementById("apply");
const dashboardSection = document.getElementById("dashboard");
const tabs = document.querySelectorAll(".tab");
const confirmCashBtn = document.getElementById("confirmCash");
const confirmCryptoBtn = document.getElementById("confirmCrypto");
const paymentOptions = document.querySelectorAll(".payment-option");
const chatBotBtn = document.getElementById("chatBotBtn");
const chatBotWindow = document.getElementById("chatBotWindow");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendMessageBtn = document.getElementById("sendMessage");
const adjustAmount = document.getElementById("adjustAmount");
const adjustedAmountDisplay = document.getElementById("adjustedAmountDisplay");
const updateAmountBtn = document.getElementById("updateAmount");
const copyButtons = document.querySelectorAll(".btn-copy");
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

// Navigation functionality
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetPage = link.getAttribute("data-page");

    // Hide all pages
    pages.forEach((page) => {
      page.classList.remove("active");
    });

    // Show target page
    document.getElementById(`${targetPage}-page`).classList.add("active");

    // If user is logged in and on home page, show dashboard
    if (targetPage === "home" && isLoggedIn()) {
      document.getElementById("apply").style.display = "none";
      dashboardSection.style.display = "block";
    } else if (targetPage === "home") {
      document.getElementById("apply").style.display = "block";
      dashboardSection.style.display = "none";
    }
  });
});

// Show Login Modal
loginBtn.addEventListener("click", () => {
  loginModal.style.display = "flex";
});

// Show Register Modal
registerBtn.addEventListener("click", () => {
  registerModal.style.display = "flex";
});

// Close Modals
closeModals.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    loginModal.style.display = "none";
    registerModal.style.display = "none";
  });
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = "none";
  }
  if (e.target === registerModal) {
    registerModal.style.display = "none";
  }
});

// Tab functionality
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and contents
    tabs.forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });

    // Add active class to clicked tab
    tab.classList.add("active");

    // Show corresponding content
    const tabId = tab.getAttribute("data-tab");
    document.getElementById(`${tabId}-tab`).classList.add("active");
  });
});

// Payment option selection
paymentOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // Remove selected class from all options
    paymentOptions.forEach((opt) => opt.classList.remove("selected"));

    // Add selected class to clicked option
    option.classList.add("selected");
  });
});

// Copy address functionality
copyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const address = button.getAttribute("data-address");
    navigator.clipboard.writeText(address).then(() => {
      alert("Address copied to clipboard!");
    });
  });
});

// Adjust amount functionality
adjustAmount.addEventListener("input", () => {
  const value = parseInt(adjustAmount.value);
  adjustedAmountDisplay.textContent = `$${value.toLocaleString()}`;
});

updateAmountBtn.addEventListener("click", () => {
  const newAmount = parseInt(adjustAmount.value);
  document.getElementById("amount").value = newAmount;
  updateDashboard();
  alert("Amount updated successfully!");
});

// Chat bot functionality
chatBotBtn.addEventListener("click", () => {
  chatBotWindow.style.display =
    chatBotWindow.style.display === "flex" ? "none" : "flex";
});

sendMessageBtn.addEventListener("click", sendChatMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendChatMessage();
  }
});

function sendChatMessage() {
  const message = chatInput.value.trim();
  if (message) {
    // Add user message
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);

    // Clear input
    chatInput.value = "";

    // Simulate bot response
    setTimeout(() => {
      const botMessage = document.createElement("div");
      botMessage.className = "message bot-message";

      if (
        message.toLowerCase().includes("status") ||
        message.toLowerCase().includes("application")
      ) {
        botMessage.textContent =
          "You can check your application status in your dashboard after logging in.";
      } else if (
        message.toLowerCase().includes("fee") ||
        message.toLowerCase().includes("payment")
      ) {
        botMessage.textContent =
          "The processing fee is 20% of your grant amount. You can pay via bank transfer, cash delivery, or cryptocurrency.";
      } else if (
        message.toLowerCase().includes("time") ||
        message.toLowerCase().includes("how long")
      ) {
        botMessage.textContent =
          "Processing typically takes 3-5 business days after payment confirmation.";
      } else if (
        message.toLowerCase().includes("eligibility") ||
        message.toLowerCase().includes("qualify")
      ) {
        botMessage.textContent =
          "Please check our About page for detailed eligibility criteria. We support various cases including small businesses, education, housing, and more.";
      } else {
        botMessage.textContent =
          "Thank you for your message. Our support team will get back to you shortly. For immediate assistance, call 1-800-GRANT-SECURE.";
      }

      chatMessages.appendChild(botMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Grant Form Submission
grantForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Check if user is logged in
  if (!isLoggedIn()) {
    alert("Please register or login before submitting your application.");
    registerModal.style.display = "flex";
    return;
  }

  // In a real application, this would send data to a server
  // For demo purposes, we'll just show an alert and redirect to dashboard
  alert(
    "Application submitted successfully! You can now view your application status in the dashboard."
  );
  applicationSection.style.display = "none";
  dashboardSection.style.display = "block";

  // Update user name in dashboard
  document.getElementById("userName").textContent =
    localStorage.getItem("userName") || "User";

  // Generate unique application ID
  const appId =
    "GR-" +
    new Date().getFullYear() +
    "-" +
    Math.floor(1000 + Math.random() * 9000);
  document.getElementById("appId").textContent = appId;

  // Update dashboard with application details
  updateDashboard();
});

// Login Form Submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // In a real application, this would validate credentials with a server
  // For demo purposes, we'll check against stored registration
  const storedEmail = localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPassword");

  if (email === storedEmail && password === storedPassword) {
    // Successful login
    localStorage.setItem("isLoggedIn", "true");
    loginModal.style.display = "none";
    applicationSection.style.display = "none";
    dashboardSection.style.display = "block";

    // Update user name in dashboard
    document.getElementById("userName").textContent =
      localStorage.getItem("userName") || "User";

    // Generate unique application ID
    const appId =
      "GR-" +
      new Date().getFullYear() +
      "-" +
      Math.floor(1000 + Math.random() * 9000);
    document.getElementById("appId").textContent = appId;

    // Update dashboard with application details
    updateDashboard();
  } else {
    alert(
      "Invalid email or password. Please try again or register for a new account."
    );
  }
});

// Register Form Submission
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("regFirstName").value;
  const lastName = document.getElementById("regLastName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long!");
    return;
  }

  // In a real application, this would send registration data to a server
  // For demo purposes, we'll store in localStorage
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);
  localStorage.setItem("userName", `${firstName} ${lastName}`);
  localStorage.setItem("isLoggedIn", "true");

  alert("Registration successful! You can now submit your grant application.");
  registerModal.style.display = "none";
});

// Bank Form Submission
bankForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // In a real application, this would send bank details to a server
  alert(
    "Bank details submitted successfully! Your funds will be transferred within 3-5 business days."
  );
});

// Confirm Cash Delivery
confirmCashBtn.addEventListener("click", () => {
  alert(
    "Cash delivery confirmed! Your funds will be delivered via FedEx within 3-5 business days."
  );
});

// Confirm Crypto Payment
confirmCryptoBtn.addEventListener("click", () => {
  const receipt = document.getElementById("receipt").files[0];
  if (!receipt) {
    alert("Please upload your payment receipt to confirm payment.");
    return;
  }

  alert(
    "Cryptocurrency payment confirmed! Your grant will be processed once we verify the transaction."
  );
});

// Logout
logoutBtn.addEventListener("click", () => {
  // In a real application, this would clear session data
  localStorage.setItem("isLoggedIn", "false");
  dashboardSection.style.display = "none";
  applicationSection.style.display = "block";
});

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

// Calculate processing fee and net amount based on grant amount
const amountInput = document.getElementById("amount");
const displayAmount = document.getElementById("displayAmount");
const displayFee = document.getElementById("displayFee");
const displayNetAmount = document.getElementById("displayNetAmount");
const grantAmountDisplay = document.getElementById("grantAmount");
const processingFeeDisplay = document.getElementById("processingFee");
const netAmountDisplay = document.getElementById("netAmount");
const btcAmount = document.getElementById("btcAmount");
const ethAmount = document.getElementById("ethAmount");
const usdtAmount = document.getElementById("usdtAmount");

amountInput.addEventListener("input", () => {
  const amount = parseFloat(amountInput.value) || 0;

  // Update the grant amount display in the dashboard
  grantAmountDisplay.textContent = `$${amount.toLocaleString()}`;
  adjustAmount.value = amount;
  adjustedAmountDisplay.textContent = `$${amount.toLocaleString()}`;
});

// Update dashboard with application details
function updateDashboard() {
  const amount = parseFloat(amountInput.value) || 5000;
  const processingFee = amount * 0.2; // 20% fee
  const netAmount = amount - processingFee;

  // Update fee breakdown in dashboard
  displayAmount.textContent = `$${amount.toLocaleString()}`;
  displayFee.textContent = `$${processingFee.toLocaleString()}`;
  displayNetAmount.textContent = `$${netAmount.toLocaleString()}`;

  // Update payment section
  grantAmountDisplay.textContent = `$${amount.toLocaleString()}`;
  processingFeeDisplay.textContent = `$${processingFee.toLocaleString()}`;
  netAmountDisplay.textContent = `$${netAmount.toLocaleString()}`;

  // Update crypto amounts
  btcAmount.textContent = `${(processingFee / 40000).toFixed(6)} BTC`;
  ethAmount.textContent = `${(processingFee / 2000).toFixed(4)} ETH`;
  usdtAmount.textContent = `$${processingFee.toLocaleString()} USDT`;

  // Update delivery address
  document.getElementById("deliveryAddress").textContent =
    document.getElementById("address").value || "123 Main St, Anytown, USA";
}

// Initialize with default values
amountInput.dispatchEvent(new Event("input"));

// Check if user is already logged in
if (isLoggedIn()) {
  applicationSection.style.display = "none";
  dashboardSection.style.display = "block";
  document.getElementById("userName").textContent =
    localStorage.getItem("userName") || "User";

  // Generate unique application ID
  const appId =
    "GR-" +
    new Date().getFullYear() +
    "-" +
    Math.floor(1000 + Math.random() * 9000);
  document.getElementById("appId").textContent = appId;

  updateDashboard();
}
