const steps = document.querySelectorAll(".form-step");
const indicators = document.querySelectorAll(".step");
const form = document.getElementById("multi-form");
const success = document.getElementById("success");

let currentStep = 0;

// Show step
function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
    indicators[i].classList.toggle("active", i === index);
  });
}

// Error helpers
function showError(input, message) {
  const errorElement = input.parentElement.querySelector(".error");
  if (errorElement) errorElement.textContent = message;
}

function clearError(input) {
  const errorElement = input.parentElement.querySelector(".error");
  if (errorElement) errorElement.textContent = "";
}

// Step 1 validation
function validateStep1() {
  let valid = true;
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  if (nameInput.value.trim().length < 3) {
    showError(nameInput, "Name must be at least 3 characters");
    valid = false;
  } else clearError(nameInput);

  if (!emailInput.value.includes("@")) {
    showError(emailInput, "Please enter a valid email");
    valid = false;
  } else clearError(emailInput);

  return valid;
}

// Step 2 validation
function validateStep2() {
  let valid = true;
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirm-password");

  if (passwordInput.value.length < 6) {
    showError(passwordInput, "Password must be at least 6 characters");
    valid = false;
  } else clearError(passwordInput);

  if (confirmInput.value !== passwordInput.value) {
    showError(confirmInput, "Passwords do not match");
    valid = false;
  } else clearError(confirmInput);

  return valid;
}

// Update summary for Step 3
function updateSummary() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirm-password");
  const summary = document.querySelector(".summary");

  const passwordStatus =
    passwordInput.value.length >= 6 && passwordInput.value === confirmInput.value
      ? "Password set and confirmed"
      : "Password not valid or mismatch";

  summary.innerHTML = `
    <strong>Review your details:</strong><br>
    Name: ${nameInput.value}<br>
    Email: ${emailInput.value}<br>
    ${passwordStatus}
  `;
}

// Navigation
document.querySelectorAll(".next").forEach(btn =>
  btn.addEventListener("click", () => {
    let valid = true;
    if (currentStep === 0) valid = validateStep1();
    if (currentStep === 1) valid = validateStep2();

    if (valid && currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);

      // If we just entered Step 3, update summary
      if (currentStep === 2) {
        updateSummary();
      }
    }
  })
);

document.querySelectorAll(".prev").forEach(btn =>
  btn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  })
);

// Submit
form.addEventListener("submit", e => {
  e.preventDefault();
  success.classList.remove("hidden");

  // Stay on last step
  currentStep = steps.length - 1;
  showStep(currentStep);
});
