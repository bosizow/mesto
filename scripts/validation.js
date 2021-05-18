// настройка валидации
const validationSetting = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button_type_submit',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
}

class FormValidator {

  constructor(validationSetting, validtionElement) {
    this._set = validationSetting;
    this._elem = validtionElement;
    this._button = this._elem.querySelector(this._set.submitButtonSelector);
    this._inputsList = Array.from(this._elem.querySelectorAll(this._set.inputSelector));
  }

  _showInputError(_input, _errorMessage) {
    const _errorElement = this._elem.querySelector(`.${_input.id}-error`);
    _input.classList.add(this._set.inputErrorClass);
    _errorElement.textContent = _errorMessage;
  }

  _hideInputError(_input) {
    const _errorElement = this._elem.querySelector(`.${_input.id}-error`);
    _input.classList.remove(this._set.inputErrorClass);
    _errorElement.textContent = '';
  }

  _checkInputValidity(_input) {
    if (!_input.validity.valid) {
      this._showInputError(_input, _input.validationMessage);
    } else {
      this._hideInputError(_input);
    }
  }

  _toggleButtonState() {

    if(this._hasInvalidInput()){
      this._button.classList.add(this._set.inactiveButtonClass);
      this._button.setAttribute('disabled', true);
    } else {
      this._button.classList.remove(this._set.inactiveButtonClass);
      this._button.removeAttribute('disabled');
    }
  }

  _hasInvalidInput() {
    return this._inputsList.some((_inputElement) => {
      return !_inputElement.validity.valid;
    })
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._elem.addEventListener('submit', function(evt) {
      evt.preventDefault();
      this._toggleButtonState();
    })

    this._inputsList.forEach((_input) => {
      _input.addEventListener('input', () => {
        this._checkInputValidity(_input);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._elem.addEventListener('submit', evt => evt.preventDefault())
    this._setEventListeners()
  }
}

const newValidathion = new FormValidator(validationSetting, firstForm);
newValidathion.enableValidation();
