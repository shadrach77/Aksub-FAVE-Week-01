const textInputFields = document.querySelectorAll(".text-input-field");
const passwordField = document.querySelector("#password");
const form = document.querySelector("form");

function emptyInputFieldsTest() {
  let hasEmptyField = false;

  textInputFields.forEach((inputField) => {
    if (inputField.value.trim() === "") {
      const error = inputField.parentElement.querySelector(".empty-error");
      error.style.display = "block";
      hasEmptyField = true;
    }
  });

  return !hasEmptyField;
}

function incorrectPasswordTest(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  let passwordCorrect = false;
  users.forEach((user) => {
    if (user.email == email && user.password == password) {
      passwordCorrect = true;
    }
  });
  if (!email || !password) {
    passwordCorrect = true;
  }
  return passwordCorrect;
}

function clearAllErrors() {
  textInputFields.forEach((inputField) => {
    const errors = inputField.parentElement.querySelectorAll(".error-message");
    errors.forEach((error) => {
      error.style.display = "none";
    });
  });
}

form.addEventListener("submit", function submitForm(event) {
  // Submit Form
  event.preventDefault();

  // Clear Existing Errors
  clearAllErrors();

  // Detect Errors
  let existingErrors = false;

  if (!emptyInputFieldsTest()) {
    existingErrors = true;
  }
  if (
    !incorrectPasswordTest(
      document.querySelector("#email").value,
      document.querySelector("#password").value,
    )
  ) {
    const error = document.querySelector("#incorrect-password-error");
    error.style.display = "block";
    existingErrors = true;
  }

  if (existingErrors) {
    return;
  }

  window.location.href = "/src/pages/successful-login.html";
});
