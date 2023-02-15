import { initialCards, enableValidation } from './data.js';
import { Card }  from './Card.js';
import { FormValidator } from './FormValidator.js';


const cardsContainer = document.querySelector('.elements');//секция карточек

//Попап редактирования карточки
const popupProfile = document.querySelector('.popup_type_profile');//попап редактирования
const popupOpenButtonElement = document.querySelector('.profile__edit');//кнопка открытия попапа ручка
const popupCloseButtonElement = popupProfile.querySelector('.popup__close-button');//кнопка закрытия попапа редактирования
const popupProfileForm = popupProfile.querySelector('.popup-edit-form');//форма попапа редактирования профиля
const popupInputName = popupProfileForm.querySelector('.popup__input_type_name');//инпут имя в попапе
const popupInputJob = popupProfileForm.querySelector('.popup__input_type_job');//инпут вид деятельности в попапе
const profileName = document.querySelector('.profile__name');//строка имя в секции профиль
const profileJob = document.querySelector('.profile__job');//строка вида деятельности в секции профиль
const popupSubmitButton = popupProfile.querySelector('.popup__submit-button');//кнопка сохранения данных профиля

//Попап добавления новой карточки
const popupAddCard = document.querySelector('.popup_type_add-card');//попап добавления карточки
const popupOpenAddCardElement = document.querySelector('.profile__button');//кнопка открытия попапа плюс
const popupPlaceName = popupAddCard.querySelector('.popup__input_type_place');//инпут места в попапе
const popupPlaceLink = popupAddCard.querySelector('.popup__input_type_link');//инпут ссылки в попапе
const popupCreateButton = popupAddCard.querySelector('.popup__create-button');//кнопка сохранения добавления новых кароточек
const popupCloseCardElement = popupAddCard.querySelector('.popup__close-button');//кнопка закрытия попапа добавления
const popupAddCardForm = popupAddCard.querySelector('.popup-add-form');//форма попапа добавления карточки

const popupBig = document.querySelector('.popup_type_big-picture');//попап большой картинки карточки места
const popupImageBig = popupBig.querySelector('.popup__image');//большая картинка карточки места
const popupHeadingBig = popupBig.querySelector('.popup-image-heading');//название большой карточки места
const popupBigImageCloseButton = popupBig.querySelector('.popup__close-button'); //кнопка закрытия 

const cardTemplate = document.querySelector('.card__template').content.querySelector('.element');//темплейт

const openPopupGallery = (link, name) => {
    popupImageBig.src = link;
    popupImageBig.alt = name;
    popupHeadingBig.textContent = name;
    openPopup(popupBig);
}

const createCard = (CardData, templateSelector, handleCardClick) => {
    return new Card(CardData, templateSelector, handleCardClick).createCard();
}

const renderInitalCard = (item) => {
    cardsContainer.prepend(createCard({name: item.name, link: item.link}, '.card__template', openPopupGallery ));
}

initialCards.forEach((item) => {
    renderInitalCard(item);
})

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
})


popupOpenButtonElement.addEventListener('click', function () {
    openPopup(popupProfile);
    profileName.value= popupInputName.textContent ;
    profileJob.value = popupInputJob.textContent;
});

function submitProfileInfo(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closePopup(popupProfile);
}

function submitFormCard(event) {
    event.preventDefault();
    renderInitalCard({
        name: popupPlaceName.value,
        link: popupPlaceLink.value,
    });
    event.target.reset();
    closePopup(popupAddCard)
}

popupOpenButtonElement.addEventListener('click', function () { 
    openPopup(popupProfile);
    popupInputName.value = profileName.textContent;
    popupInputJob.value = profileJob.textContent;
});

popupProfileForm.addEventListener('submit', submitProfileInfo);
popupAddCardForm.addEventListener('submit', submitFormCard);

//для Ecs
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEcs);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEcs);
}

function closePopupByEcs(event) {
    if (event.key ==='Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

popupOpenAddCardElement.addEventListener('click', function () {
    popupCreateButton.setAttribute('disabled', true);
    popupCreateButton.classList.add('popup__button_disabled');
    popupAddCardForm.reset();
    openPopup(popupAddCard)
})

// form validation init

const validatorConfig = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        // inactiveButtonClass: 'popup__button_disabled',
        // inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
    }

const addCardFormValidor = new FormValidator(validatorConfig, popupAddCardForm);
addCardFormValidor.enableValidation();

const editProfileFormValidor = new FormValidator(validatorConfig, popupProfileForm);
editProfileFormValidor.enableValidation();