// CSS
import "./index.css";
import "../vendor/normalize.css";

// API
import Api from "../utils/Api.js";

// IMAGES (Webpack)
import avatarImg from "../images/spots-images/avatar.jpg";
import logoImg from "../images/spots-images/Logo.svg";
import editIcon from "../images/spots-images/editIcon.svg";
import addIcon from "../images/spots-images/addIcon.svg";
import closeIcon from "../images/spots-images/close.svg";
import editIconLight from "../images/spots-images/editIcon-light.svg";
import closePreview from "../images/spots-images/closePreview.svg";

// CONSTANTS
import {
  settings,
  profileAvatar,
  profileNameEl,
  profileDescriptionEl,
  editProfileBtn,
  newPostBtn,
  avatarEditBtn,
  editProfileModal,
  newPostModal,
  previewModal,
  avatarModal,
  deleteModal,
  editProfileForm,
  addCardForm,
  avatarForm,
  deleteForm,
  nameInput,
  descriptionInput,
  imageInput,
  captionInput,
  avatarInput,
  cardsList,
  cardTemplate,
  handleAddCardSubmit,
} from "../utils/constants.js";

// VALIDATION
import {
  enableValidation,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";

enableValidation(settings);

// API INSTANCE
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5a1d0a6b-552b-434f-ae89-d4d2dc0ea465",
    "Content-Type": "application/json",
  },
});

const previewImg = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
document.querySelector(".profile__avatar").src = avatarImg;
document.querySelector(".header__logo").src = logoImg;
document.querySelector(".profile__edit-btn").style.backgroundImage =
  `url(${editIcon})`;
document.querySelector(".profile__add-btn").style.backgroundImage =
  `url(${addIcon})`;
document.querySelector(".profile__avatar-edit-btn").style.backgroundImage =
  `url(${editIconLight})`;
document.querySelectorAll(".modal__close-btn").forEach((btn) => {
  btn.style.backgroundImage = `url(${closeIcon})`;
});
document.querySelectorAll("modal__close-btn_type_preview").forEach((btn) => {
  btn.style.backgroundImage = `url(${closePreview})`;
});

// MODALS
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const opened = document.querySelector(".modal_is-opened");
    if (opened) closeModal(opened);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");

  document.addEventListener("keydown", handleEscClose);

  const form = modal.querySelector("form");
  if (form) resetValidation(form, settings);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

// overlay + close
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (
      evt.target === modal ||
      evt.target.closest(".modal__close-btn") ||
      evt.target.closest(".modal__cancel-btn")
    ) {
      closeModal(modal);
    }
  });
});

// PROFILE EDIT
editProfileBtn.addEventListener("click", () => {
  nameInput.value = profileNameEl.textContent;
  descriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const btn = evt.submitter;
  btn.textContent = "Saving...";

  api
    .updateUserInfo({
      name: nameInput.value,
      about: descriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => (btn.textContent = "Save"));
});

// AVATAR
// Edit avatar
avatarEditBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const btn = evt.submitter;
  btn.textContent = "Saving...";

  api
    .updateAvatar({ avatar: avatarInput.value })
    .then((data) => {
      profileAvatar.src = data.avatar;
      avatarForm.reset();
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => (btn.textContent = "Save"));
});

// CARDS
let selectedCard;
let selectedCardId;

function createCard(data) {
  const card = cardTemplate.content.querySelector(".card").cloneNode(true);

  const img = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-btn");
  const deleteBtn = card.querySelector(".card__delete-btn");

  img.src = data.link;
  img.alt = data.name;
  title.textContent = data.name;

  // like state
  const isLiked = data.isLiked;

  if (isLiked) {
    likeBtn.classList.add("card__like-btn_active");
  }

  likeBtn.addEventListener("click", () => {
    const liked = likeBtn.classList.contains("card__like-btn_active");

    const request = liked ? api.unlikeCard(data._id) : api.likeCard(data._id);

    request
      .then(() => {
        likeBtn.classList.toggle("card__like-btn_active");
      })
      .catch(console.error);
  });

  // delete
  deleteBtn.addEventListener("click", () => {
    selectedCard = card;
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  // preview
  img.addEventListener("click", () => {
    previewImg.src = data.link;
    previewImg.alt = data.name;
    previewCaption.textContent = data.name;

    openModal(previewModal);
  });

  return card;
}

// DELETE CARD
deleteForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const btn = evt.submitter;
  btn.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      selectedCard = null;
      selectedCardId = null;
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => (btn.textContent = "Delete"));
});

// ADD CARD
newPostBtn.addEventListener("click", () => openModal(newPostModal));

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const btn = evt.submitter;
  btn.textContent = "Saving...";

  api
    .addCard({
      name: captionInput.value,
      link: imageInput.value,
    })
    .then((data) => {
      const card = createCard(data);
      cardsList.prepend(card);

      addCardForm.reset();
      const submitBtn = evt.submitter;
      disableButton(submitBtn, settings);

      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => (btn.textContent = "Save"));
});
// INITIAL LOAD
let currentUserId;
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([user, cards]) => {
    currentUserId = user._id;

    //  set profile
    profileNameEl.textContent = user.name;
    profileDescriptionEl.textContent = user.about;
    profileAvatar.src = user.avatar;

    const cardsArray = cards;

    cardsArray
      .slice()
      .reverse()
      .forEach((cardData) => {
        const cardElement = createCard(cardData);
        if (cardElement) {
          cardsList.append(cardElement);
        }
      });
  })
  .catch((err) => console.error("API ERROR:", err));
