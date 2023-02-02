import initialCards from './data.js';

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

const handleDeleteCard = (event) => {
    event.target.closest('.element').remove();
}
const handleLikeCard = (event) => {
    event.target.closest('.element__like').classList.toggle('element__like_active');
}

//Инициализация карточек
const createCard = (card) => {
    const cardElement = cardTemplate.cloneNode(true);

    const cardPicture = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__caption');
    cardPicture.src = card.link;
    cardPicture.alt = card.name;
    cardTitle.textContent = card.name;

    const deleteButtonElement = cardElement.querySelector('.element__delete-button');
    deleteButtonElement.addEventListener('click', handleDeleteCard);

    const likeButtonElement = cardElement.querySelector('.element__like');
    likeButtonElement.addEventListener('click', handleLikeCard);

    cardPicture.addEventListener('click', () => {
        popupImageBig.src = card.link;
        popupImageBig.alt = card.name;
        popupHeadingBig.textContent = card.name;
        openPopup(popupBig);
    })

    return cardElement;
}

const renderInitalCards = (item) => {
    cardsContainer.prepend(createCard(item));
}

initialCards.forEach((item) => {
    renderInitalCards(item);
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

// popupOpenAddCardElement.addEventListener('click', function () {
//     openPopup(popupAddCard);
// });


// const closePopupOverlayClick = (event) => {
//     if (!event.target.closest('.popup__container')) {
//         closePopup(event.target)
//     }
// }

// popupCloseButtonElement.addEventListener('click', function () {
//     closePopup(popupProfile)
// });
// popupCloseCardElement.addEventListener('click', function () {
//     closePopup(popupAddCard)
// });

// popupBigImageCloseButton.addEventListener('click', function () {
//     closePopup(popupBig);
// })

function submitProfileInfo(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closePopup(popupProfile);
}

function submitFormCard(event) {
    console.log('add card');
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

// popupCloseButtonElement.addEventListener('click', function () {
//     closePopup(popupProfile)
// });
popupProfileForm.addEventListener('submit', submitProfileInfo);

// popupProfile.addEventListener('click', closePopupOverlayClick);
// popupAddCard.addEventListener('click', closePopupOverlayClick);
// popupBig.addEventListener('click', closePopupOverlayClick);

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