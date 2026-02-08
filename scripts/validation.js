const showInputError = (formElement, inputElement, errorMessage) => {
  const errorMsg = formElement.querySelector(`#${inputElement.id}-error`);
  errorMsg.textContent = errorMessage;
  inputElement.classList.add("modal__input_type_error");
};
const hideInputError = (formElement, inputElement) => {
  const errorMsg = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("modal__input_type_error");

  errorMsg.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const disableButton = (buttonElement) => {
  buttonElement.classList.add("button_inactive");
  buttonElement.disabled = true;
};
const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    buttonElement.classList.remove("button_inactive");
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__save-btn");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();
