import initialCards from './data.js';

const cardsContainer = document.querySelector('.elements');//секция карточек

const popupProfile = document.querySelector('.popup__edit_profile');//попап редактирования
const popupOpenButtonElement = document.querySelector('.profile__edit');//кнопка открытия попапа ручка
const popupCloseButtonElement = popupProfile.querySelector('.popup__close-button');//кнопка закрытия попапа редактирования
const popupProfileForm = popupProfile.querySelector('.popup__edit_form');//форма попапа редактирования профиля
const popupInputName = popupProfileForm.querySelector('.popup__input_type_name');//инпут имя в попапе
const popupInputJob = popupProfileForm.querySelector('.popup__input_type_job');//инпут вид деятельности в попапе
const profileName = document.querySelector('.profile__name');//строка имя в секции профиль
const profileJob = document.querySelector('.profile__job');//строка вида деятельности в секции профиль
const popupSubmitButton = popupProfile.querySelector('.popup__submit-button');//кнопка сохранения данных профиля

//Попап добавления новой карточки
const popupAddCard = document.querySelector('.popup__create_card');//попап добавления карточки
const popupOpenAddCardElement = document.querySelector('.profile__button');//кнопка открытия попапа плюс
const popupPlaceName = popupAddCard.querySelector('.popup__input_type_place');//инпут места в попапе
const popupPlaceLink = popupAddCard.querySelector('.popup__input_type_link');//инпут ссылки в попапе
const popupCreateButton = popupAddCard.querySelector('.popup__create-button');//кнопка сохранения добавления новых кароточек
const popupCloseCardElement = popupAddCard.querySelector('.popup__close-button');//кнопка закрытия попапа добавления
const popupAddCardForm = popupAddCard.querySelector('#add-form');//форма попапа добавления карточки

//const sectionGallery = document.querySelector('.elements');//секция карточек


const popupBig = document.querySelector('#popup-big-picture');//попап большой картинки карточки места
const popupImageBig = document.querySelector('.popup__image');//большая картинка карточки места
const popupHeadingBig = document.querySelector('.popup__image_heading');//название большой карточки места
const popupBigImageCloseButton = document.querySelector('.popup__close'); //кнопка закрытия 

//const cardTemplate = document.querySelector('#card__template').content.querySelector('.element');//темплейт?
// const cardGallery = document.querySelector('.elements');

const handleDeleteCard = (event) => {
    event.target.closest('.element').remove();
}
const handleLikeCard = (event) => {
    event.target.closest('.element__like').classList.toggle('element__like_active');
}

function createCard(card) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardPicture = cardElement.querySelector('.celement__image');
    const cardTitle = cardElement.querySelector('.element__caption');
    cardPicture.src = card.link;
    cardPicture.alt = card.name;
    cardTitle.textContent = card.name;
    const deleteButtonElement = cardElement.querySelector('.card__delete-button');
    deleteButtonElement.addEventListener('click', handleDeleteCard);

    const likeButtonElement = cardElement.querySelector('.card__like-button');
    likeButtonElement.addEventListener('click', handleLikeCard);

    cardPicture.addEventListener('click', () => {
        popupImageBig.src = card.link;
        popupImageBig.alt = card.name;
        popupHeadingBig.textContent = card.name;
    })
    return cardElement;
}

const renderInitalCards = (item) => {
    cardsContainer.prepend(createCard(item));
}

initialCards.forEach((item) => {
    renderInitalCards(item);
})

const openPopup = function (popup) {
    popup.classList.add('popup_opened');
}
popupOpenButtonElement.addEventListener('click', function () {
    openPopup(popupProfile)
});
popupOpenAddCardElement.addEventListener('click', function () {
    openPopup(popupAddCard);
});


const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
}

const closePopupOverlayClick = (event) => {
    if (!event.target.closest('.popup__container')) {
        closePopup(event.target)
    }
}


popupCloseButtonElement.addEventListener('click', function () {
    closePopup(popupProfile)
});
popupCloseCardElement.addEventListener('click', function () {
    closePopup(popupAddCard)
});

function submitProfileInfo(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closePopup(popupProfile);
}

function submitFormCard(event) {
    event.preventDefault();
    renderInitalCards({
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

popupCloseButtonElement.addEventListener('click', function () {
    closePopup(popupProfile)
});
popupProfileForm.addEventListener('submit', submitProfileInfo);

popupBigImageCloseButton.addEventListener('click', function () {
    closePopup(popupBig)
});

popupProfile.addEventListener('click', closePopupOverlayClick);
popupAddCard.addEventListener('click', closePopupOverlayClick);
popupBig.addEventListener('click', closePopupOverlayClick);

popupAddCardForm.addEventListener('submit', submitFormCard);


// const togglePopup = function (popup) {
//     popup.classList.toggle('popup_opened')
// }

// popupOpenButtonElement.addEventListener('click', function () {
//     togglePopup(popupProfile)
// });
// popupOpenAddCardElement.addEventListener('click', function () {
//     togglePopup(popupAddCard)
// });
// popupCloseButtonElement.addEventListener('click', function () {
//     togglePopup(popupProfile)
// });
// popupCloseCardElement.addEventListener('click', function () {
//     togglePopup(popupAddCard)
// });

