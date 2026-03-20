// Validation settings for forms
export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Show/hide input errors
export const showInputError = (form, input, message, settings) => {
  const errorEl = form.querySelector(`#${input.id}-error`);
  if (!errorEl) return;
  errorEl.textContent = message;
  input.classList.add(settings.inputErrorClass);
};

export const hideInputError = (form, input, settings) => {
  const errorEl = form.querySelector(`#${input.id}-error`);
  if (!errorEl) return;
  input.classList.remove(settings.inputErrorClass);
  errorEl.textContent = "";
};

// Check if input is valid
export const checkInputValidity = (form, input, settings) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, settings);
  } else {
    hideInputError(form, input, settings);
  }
};

// Button state
export const hasInvalidInput = (inputs) =>
  inputs.some((input) => !input.validity.valid);

export const disableButton = (button) => {
  button.classList.add(settings.inactiveButtonClass);
  button.disabled = true;
};

export const toggleButtonState = (inputs, button) => {
  if (!button) return;
  if (hasInvalidInput(inputs)) disableButton(button);
  else {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
};

// Set event listeners for a form
export const setFormEventListeners = (form) => {
  if (!form) return;
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputs, button);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, settings);
      toggleButtonState(inputs, button);
    });
  });
};

// Reset form validation
export const resetValidation = (form) => {
  if (!form) return;
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  inputs.forEach((input) => {
    input.classList.remove(settings.inputErrorClass);
    const errorEl = form.querySelector(`#${input.id}-error`);
    if (errorEl) errorEl.textContent = "";
  });

  toggleButtonState(inputs, button);
};

// Enable validation for all forms
export const enableValidation = () => {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach(setFormEventListeners);
};

enableValidation();

// Safe openModal/closeModal for all modals
export function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscClose);

  const form = modal.querySelector("form");
  if (form) resetValidation(form);
}

export function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}
