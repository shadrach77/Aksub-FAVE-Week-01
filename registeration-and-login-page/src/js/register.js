const textInputFields = document.querySelectorAll(".text-input-field");
const passwordField = document.querySelector("#password");
const retypePasswordField = document.querySelector("#retype-password");
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

function incorrectPasswordFormatTest() {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

  if (
    !passwordRegex.test(passwordField.value) &&
    passwordField.value.trim() !== ""
  ) {
    const error = document.querySelector("#incorrect-format-error");
    error.style.display = "block";
    return false;
  } else {
    return true;
  }
}

function incorrectRetypePasswordTest() {
  if (
    retypePasswordField.value !== passwordField.value &&
    retypePasswordField.value.trim() !== ""
  ) {
    const error = document.querySelector("#incorrect-retype-password-error");
    error.style.display = "block";
    return false;
  } else {
    return true;
  }
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
  if (!incorrectPasswordFormatTest()) {
    existingErrors = true;
  }
  if (!incorrectRetypePasswordTest()) {
    existingErrors = true;
  }

  if (existingErrors) {
    return;
  }

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const user = {
    name,
    email,
    password,
  };

  // Add User to Existing Users
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  window.location.href = "./src/pages/successful-register.html";
});
