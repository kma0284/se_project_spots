// CSS
import "./index.css";
import "../vendor/normalize.css";

// Images (Webpack)
import avatarImg from "../images/spots-images/avatar.jpg";
import logoImg from "../images/spots-images/Logo.svg";
import pencilIcon from "../images/spots-images/pencil.svg";
import plusIcon from "../images/spots-images/plussign.svg";
import closeIcon from "../images/spots-images/close.svg";

// Validation scripts
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
enableValidation(settings);

// DOM Elements
const profileAvatar = document.querySelector(".profile__avatar");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const newPostBtn = document.querySelector("#profile-add-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = document.querySelector("#profile-form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);
const newPostModal = document.querySelector("#new-post-modal");
const addCardForm = document.querySelector("#add_card_form");
const imageInput = newPostModal.querySelector("#profile-image-input");
const captionInput = newPostModal.querySelector("#profile-caption-input");
const cardSubmitButton = newPostModal.querySelector(".modal__save-btn");
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// -------------------------
// Set Static Images
profileAvatar.src = avatarImg;
document.querySelector(".header__logo").src = logoImg;
editProfileBtn.querySelector("img").src = pencilIcon;
newPostBtn.querySelector("img").src = plusIcon;
document
  .querySelectorAll(".modal__close-btn img")
  .forEach((img) => (img.src = closeIcon));

// -------------------------
// Modal Functions
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscClose);
  resetValidation(modal, settings);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_is-opened");
    if (openedModal) closeModal(openedModal);
  }
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal || evt.target.closest(".modal__close-btn"))
      closeModal(modal);
  });
});

// -------------------------
// Profile Editing
editProfileBtn.addEventListener("click", () => {
  openModal(editProfileModal);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
});

// -------------------------
// Cards
const initialCards = [
  {
    name: "Golden Gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

function createCard(data) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const likeBtn = card.querySelector(".card__like-button");
  const deleteBtn = card.querySelector(".card__delete-btn");
  const previewModal = document.querySelector("#preview-modal");
  const previewImage = previewModal.querySelector(".modal__image");
  const previewCaption = previewModal.querySelector(".modal__caption");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeBtn.addEventListener("click", () =>
    likeBtn.classList.toggle("card__like-button_active"),
  );
  deleteBtn.addEventListener("click", () => card.remove());
  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return card;
}

// Add new card
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  disableButton(cardSubmitButton, settings);

  const card = createCard({ name: captionInput.value, link: imageInput.value });
  cardsList.prepend(card);
  addCardForm.reset();
  closeModal(newPostModal);
});

// Open New Post Modal
newPostBtn.addEventListener("click", () => openModal(newPostModal));

// Render initial cards
initialCards.forEach((item) => cardsList.append(createCard(item)));
