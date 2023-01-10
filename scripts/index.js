const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');

const openPopup = function (event) {
    popupElement.classList.add('popup_opened');
    console.log('Open popup clicked');
}

const closePopup = function () {
    popupElement.classList.remove('popup_opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
