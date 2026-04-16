// validation.js

import { settings } from "../utils/constants.js";
const config = settings;
// ---------------- SHOW / HIDE ERRORS ----------------
function showInputError(form, input, errorMessage, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  if (!errorElement) return;

  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  if (!errorElement) return;

  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

// ---------------- VALIDATION ----------------
function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
}

// ---------------- BUTTON STATE ----------------
function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

export function disableButton(button, config) {
  if (!button) return;

  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
}

function enableButton(button, config) {
  if (!button) return;

  button.classList.remove(config.inactiveButtonClass);
  button.disabled = false;
}

function toggleButtonState(inputList, button, config) {
  if (!button) return;

  if (hasInvalidInput(inputList)) {
    disableButton(button, config);
  } else {
    enableButton(button, config);
  }
}

// ---------------- SET LISTENERS ----------------
function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  const button = form.querySelector(config.submitButtonSelector);

  if (!button) return;

  toggleButtonState(inputList, button, config);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputList, button, config);
    });
  });
}

// ---------------- ENABLE VALIDATION ----------------
export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((form) => {
    const submitButton = form.querySelector(config.submitButtonSelector);

    // 🔥 Skip delete modal (no submit button)
    if (!submitButton) return;

    setEventListeners(form, config);
  });
}

// ---------------- RESET VALIDATION ----------------

export function resetValidation(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  const button = form.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => {
    hideInputError(form, input, config);
  });

  if (button) {
    toggleButtonState(inputList, button, config);
  }
}
