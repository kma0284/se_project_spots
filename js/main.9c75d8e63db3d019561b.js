(()=>{"use strict";```js
// ==========================
// API CLASS IMPORT
// ==========================
import Api from "../utils/Api.js";

// ==========================
// API INSTANCE
// ==========================
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "YOUR_TOKEN_HERE",
    "Content-Type": "application/json"
  }
});

// ==========================
// DOM ELEMENTS
// ==========================

// Profile
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

// Buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Modals
const editModal = document.querySelector("#edit-profile-modal");
const addModal = document.querySelector("#new-post-modal");
const previewModal = document.querySelector("#preview-modal");
const avatarModal = document.querySelector("#edit-avatar-modal");
const deleteModal = document.querySelector("#confirm-delete-modal");

// Forms
const profileForm = document.querySelector("#profile-form");
const addForm = document.querySelector("#add-card-form");
const avatarForm = document.querySelector("#avatar-form");
const deleteForm = document.querySelector("#delete-form");

// Inputs
const nameInput = document.querySelector("#profile-name-input");
const jobInput = document.querySelector("#profile-description-input");

const cardTitleInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");

const avatarInput = document.querySelector("#avatar-input");

// Card container
const cardsContainer = document.querySelector(".cards__list");

// Template
const cardTemplate = document.querySelector("#card-template").content;

// ==========================
// MODAL FUNCTIONS
// ==========================
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

// Close on overlay click
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

// Close buttons
document.querySelectorAll(".modal__close-button").forEach((btn) => {
  const modal = btn.closest(".modal");
  btn.addEventListener("click", () => closeModal(modal));
});

// ==========================
// LOADING STATE
// ==========================
function renderLoading(isLoading, button, text) {
  button.textContent = isLoading ? text : "Save";
}

// ==========================
// CARD CREATION
// ==========================
let selectedCard;
let selectedCardId;

function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector(".card");

  const image = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const deleteBtn = card.querySelector(".card__delete-button");
  const likeBtn = card.querySelector(".card__like-button");

  image.src = data.link;
  image.alt = data.name;
  title.textContent = data.name;

  // Preview
  image.addEventListener("click", () => {
    previewModal.querySelector(".modal__image").src = data.link;
    previewModal.querySelector(".modal__caption").textContent = data.name;
    openModal(previewModal);
  });

  // Delete
  deleteBtn.addEventListener("click", () => {
    selectedCard = card;
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  // Like
  likeBtn.addEventListener("click", () => {
    const isLiked = likeBtn.classList.contains("card__like-button_active");

    const request = isLiked
      ? api.unlikeCard(data._id)
      : api.likeCard(data._id);

    request
      .then(() => {
        likeBtn.classList.toggle("card__like-button_active");
      })
      .catch(console.error);
  });

  return card;
}

function renderCard(data) {
  const card = createCard(data);
  cardsContainer.prepend(card);
}

// ==========================
// PROFILE EDIT
// ==========================
editButton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  openModal(editModal);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const submitBtn = profileForm.querySelector(".modal__save-button");
  renderLoading(true, submitBtn, "Saving...");

  api.editUserInfo({
    name: nameInput.value,
    about: jobInput.value
  })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileJobElement.textContent = data.about;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, submitBtn, "Save"));
});

// ==========================
// ADD CARD
// ==========================
addButton.addEventListener("click", () => openModal(addModal));

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const submitBtn = addForm.querySelector(".modal__save-button");
  renderLoading(true, submitBtn, "Saving...");

  api.addCard({
    name: cardTitleInput.value,
    link: cardLinkInput.value
  })
    .then((data) => {
      renderCard(data);
      closeModal(addModal);
      addForm.reset();
    })
    .catch(console.error)
    .finally(() => renderLoading(false, submitBtn, "Add Card"));
});

// ==========================
// DELETE CARD
// ==========================
deleteForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const btn = deleteForm.querySelector(".modal__confirm-button");
  renderLoading(true, btn, "Deleting...");

  api.removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, btn, "Delete"));
});

// ==========================
// AVATAR UPDATE
// ==========================
profileAvatar.addEventListener("click", () => openModal(avatarModal));

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const btn = avatarForm.querySelector(".modal__save-button");
  renderLoading(true, btn, "Saving...");

  api.updateAvatar(avatarInput.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch(console.error)
    .finally(() => renderLoading(false, btn, "Save"));
});

// ==========================
// INITIAL LOAD
// ==========================
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    profileNameElement.textContent = userData.name;
    profileJobElement.textContent = userData.about;
    profileAvatar.src = userData.avatar;

    cards.forEach(renderCard);
  })
  .catch(console.error);
```})();
//# sourceMappingURL=main.9c75d8e63db3d019561b.js.map