// -------------------------
// VALIDATION CONFIG

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// -------------------------
// DOM ELEMENTS

export const profileAvatar = document.querySelector(".profile__avatar");
export const profileNameEl = document.querySelector(".profile__name");
export const profileDescriptionEl = document.querySelector(
  ".profile__description",
);

// Buttons
export const editProfileBtn = document.querySelector(".profile__edit-btn");
export const newPostBtn = document.querySelector("#profile-add-btn");
export const avatarEditBtn = document.querySelector(
  ".profile__avatar-edit-btn",
);

// Modals
export const editProfileModal = document.querySelector("#edit-profile-modal");
export const newPostModal = document.querySelector("#new-post-modal");
export const previewModal = document.querySelector("#preview-modal");
export const avatarModal = document.querySelector("#edit-avatar-modal");
export const deleteModal = document.querySelector("#confirm-delete-modal");

// Forms
export const editProfileForm = document.querySelector("#profile-form");
export const addCardForm = document.querySelector("#add_card_form");
export const avatarForm = document.querySelector("#avatar-form");
export const deleteForm = document.querySelector("#delete-form");

// Inputs
export const nameInput = document.querySelector("#profile-name-input");
export const descriptionInput = document.querySelector(
  "#profile-description-input",
);
export const imageInput = document.querySelector("#profile-image-input");
export const captionInput = document.querySelector("#profile-caption-input");
export const avatarInput = document.querySelector("#profile-avatar-input");

// Cards
export const cardsList = document.querySelector(".cards__list");
export const cardTemplate = document.querySelector("#card-template");
