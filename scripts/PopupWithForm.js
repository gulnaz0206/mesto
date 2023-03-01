import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector)

        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = this._formElement.querySelector('.popup__input')
    }

    _getInputValues = () => {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[popup__name] = input.value
        })
        return this._formValues
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (event) => {
            this._handleFormSubmit(event, this._getInputValues())
            this.close()
        })
    }

    close = () => {
        super.close()
        this._formElement.reset()
    }
}