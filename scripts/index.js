const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileSaveBtn = editProfileModal.querySelector(".modal__save-btn");
const modalSaveBttn = newPostModal.querySelector(".modal__save-btn");
const newPostBtn = document.querySelector("#profile-add-btn");
const profileImageInput = newPostModal.querySelector("#profile-image-input");
const profileCaptionInput = newPostModal.querySelector(
  "#profile-caption-input"
);
const addCardForm = document.querySelector("#add-card-form");
editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  editProfileModal.classList.add("modal__is-opened");
});

profileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal__is-opened");
});
newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal__is-opened");
});
newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal__is-opened");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal__is-opened");
  console.log(handleEditProfileSubmit);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const imageUrl = profileImageInput.value;
  const imageCaption = profileCaptionInput.value;
  //newPostModal.classList.remove("modal__is-opened");
  //addCardForm.reset();
  console.log(imageUrl, imageCaption);
}
addCardForm.addEventListener("submit", handleAddCardSubmit);
