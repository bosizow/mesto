const showInputError = (form, input, errorMessage, set) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(set.inputErrorClass);
  errorElement.textContent = errorMessage;
}

const hideInputError = (form, input, set) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(set.inputErrorClass);
  errorElement.textContent = '';
}

const hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, button, set) => {
  if(hasInvalidInput(inputList)){
    button.classList.add(set.inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(set.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}

const checkInputValidity = (form, input, set) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, set);
  } else {
    hideInputError(form, input, set);
  }
}

const setEventListeners = (form, set) => {
  const inputList = Array.from(form.querySelectorAll(set.inputSelector));
  const button = form.querySelector(set.submitButtonSelector);
  toggleButtonState(inputList, button, set);

  inputList.forEach((input) => {
    input.addEventListener('input', function (evt) {
      checkInputValidity(form, input, set);
      toggleButtonState(inputList, button, set);
    });
  });
}

const enableValidation = (set) => {
  const formList = document.querySelectorAll(set.formSelector);
  formList.forEach((form) => {
    setEventListeners(form, set);
  })
}

// настройка валидации
const validationSetting = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button_type_submit',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
}

enableValidation(validationSetting);
