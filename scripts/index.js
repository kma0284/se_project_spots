const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileCloseBtn = editProfileModal.querySelector("#profile__close-btn");
const profileForm = document.forms["profile-form"];
const profileSaveBtn = editProfileModal.querySelector("#profile_save-btn");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const modalCloseBtn = document.querySelector(".modal__close-btn");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector("#profile-add-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const profileImageInput = newPostModal.querySelector("#profile-image-input");
const profileCaptionInput = newPostModal.querySelector(
  "#profile-caption-input"
);
const addCardForm = document.querySelector("#add_card_form");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModal);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
});

modalCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});
newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});
function handleEditProfileSubmit(evt) {
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
  evt.preventDefault();
}
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  const imageUrl = profileImageInput.value;
  const imageCaption = profileCaptionInput.value;
  closeModal(newPostModal);

  addCardForm.reset();
  console.log(imageUrl, imageCaption);
  evt.preventDefault();
}
addCardForm.addEventListener("submit", handleAddCardSubmit);
