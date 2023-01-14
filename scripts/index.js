const popupProfile = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit');
const popupCloseButtonElement = popupProfile.querySelector('.popup__close-button');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupInputName = popupProfileForm.querySelector('.popup__input_type_name');
const popupInputJob = popupProfileForm.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupSubmitButton = popupProfile.querySelector('.popup__submit-button');

const openPopup = function (popup) {
    popup.classList.add('popup_opened');
}

const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
}

function submitProfileInfo (event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closePopup(popupProfile);
}

popupOpenButtonElement.addEventListener('click', function() {
     openPopup(popupProfile);
    popupInputName.value = profileName.textContent;
    popupInputJob.value = profileJob.textContent;
    });
popupCloseButtonElement.addEventListener('click', function() {
    closePopup(popupProfile)});
popupProfileForm.addEventListener('submit', submitProfileInfo);