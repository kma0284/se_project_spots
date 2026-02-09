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

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const profileSaveBtn = editProfileModal.querySelector("#profile_save-btn");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector("#profile-add-btn");
const imageInput = newPostModal.querySelector("#profile-image-input");
const captionInput = newPostModal.querySelector("#profile-caption-input");
const addCardForm = document.querySelector("#add_card_form");
//const openModal = (modal) => {
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}
document.addEventListener("mousedown", (evt) => {
  const openedModal = document.querySelector(".modal.modal_is-opened");
  if (openedModal && evt.target === openedModal) {
    closeModal(openedModal);
  }
});
const modalCloseBtns = document.querySelectorAll(".modal__close-btn");
modalCloseBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});
editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModal);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});
const cardSubmitButton = newPostModal.querySelector(".modal__save-btn");
function handleEditProfileSubmit(evt) {
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
  evt.preventDefault();
}
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function newCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  const likeButtonEl = cardElement.querySelector(".card__like-button");
  likeButtonEl.addEventListener("click", () => {
    likeButtonEl.classList.toggle("card__like-button_active");
  });
  const deleteBtnEl = cardElement.querySelector(".card__delete-btn");
  deleteBtnEl.addEventListener("click", () => {
    deleteBtnEl.closest(".card").remove();
  });
  const previewModal = document.querySelector("#preview-modal");
  const previewImageEl = previewModal.querySelector(".modal__image");
  const previewCaptionEl = previewModal.querySelector(".modal__caption");
  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;

    openModal(previewModal);
  });
  return cardElement;
}

function handleAddCardSubmit(evt) {
  disableButton(cardSubmitButton);
  closeModal(newPostModal);
  const inputValue = newCardElement({
    name: captionInput.value,
    link: imageInput.value,
  });
  addCardForm.reset();
  cardsList.prepend(inputValue);
  evt.preventDefault();
}

addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (item) {
  const cardElement = newCardElement(item);
  cardsList.append(cardElement);
});
