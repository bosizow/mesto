const cardsList = document.querySelector('.card-list');
const card = document.querySelector('#card').content;

const profile = document.querySelector('.profile');

const addButton = profile.querySelector('.profile__button_type_add');
const editButton = profile.querySelector('.profile__button_type_edit');

const userName = profile.querySelector('.profile__name');
const userAbout = profile.querySelector('.profile__about');

const popupTypeAdd = document.querySelector('.popup_type_add');
const formPopupTypeAdd = popupTypeAdd.querySelector('.popup__form');
const inputTitlePopupTypeAdd = popupTypeAdd.querySelector('.form__input_type_title');
const inputLinkPopupTypeAdd = popupTypeAdd.querySelector('.form__input_type_link');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const formPopupTypeEdit = popupTypeEdit.querySelector('.popup__form');
const inputNamePopupTypeEdit = popupTypeEdit.querySelector('.form__input_type_name');
const inputAboutPopupTypeEdit = popupTypeEdit.querySelector('.form__input_type_about');

const popupTypeImage = document.querySelector('.popup_type_image');

const buttonClose = document.querySelectorAll('.popup__button_type_close');
const popupOverlay = document.querySelectorAll('.popup__overlay');

// добавление карточек из массива
initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

const cardsListArr = Array.from(document.querySelectorAll('.card'));

// функции открытия popup
function openPopupTypeAdd() {
  popupTypeAdd.classList.add('popup_opened');
  popupTypeAdd.classList.remove('popup_close');
}

function openPopupTypeEdit() {

  inputNamePopupTypeEdit.value = userName.textContent;
  inputAboutPopupTypeEdit.value = userAbout.textContent;

  popupTypeEdit.classList.add('popup_opened');
  popupTypeEdit.classList.remove('popup_close');
}

function openPopupTypeImage(link, description) {

  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupDescription = popupTypeImage.querySelector('.popup__image-description');

  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', description);
  popupDescription.textContent = description;

  popupTypeImage.classList.add('popup_opened');
  popupTypeImage.classList.remove('popup_close');
}

// функции закрытия popup
function closePopup() {
  const popupIsOpened = document.querySelector('.popup_opened');
  popupIsOpened.classList.remove('popup_opened');
  popupIsOpened.classList.add('popup_close');
}

// функция изменения имени и профессии
function editUserInfo(evt) {
  evt.preventDefault();

  userName.textContent = inputNamePopupTypeEdit.value;
  userAbout.textContent = inputAboutPopupTypeEdit.value;

  closePopup();
}

// функция добавления новой карточки
function addCard(title,link){
  // принимает 2 аргумента: заголовок карточки и ссылку на изображение
  // клонирует шаблон карточки из template и наполняет полученными данными
  // добавляет изображение в началао узла cardsList

  const newCard = card.cloneNode(true);

  const newCardImage = newCard.querySelector('.card__image');
  const newCardDescription = newCard.querySelector('.card__description');

  newCardImage.setAttribute('src', link);
  newCardImage.setAttribute('alt', title);
  newCardDescription.textContent = title;

  cardsList.prepend(newCard);
}

function addCardFromForm(evt) {
  // отменяет перезагрузку страницы при отправке формы
  // получает данные этой формы
  // обрабатывает их и отправляет в функцию добавления картоки
  // потом закрывает попап

  evt.preventDefault();

  const linkFromForm = inputLinkPopupTypeAdd.value;
  const titleFromFrom = inputTitlePopupTypeAdd.value;

  addCard(titleFromFrom, linkFromForm);

  closePopup();
}

// отслеживаем клики и отправления форм
document.addEventListener('keydown', function (evt) {
  if(evt.key === 'Escape'){
    closePopup();
  }
});

addButton.addEventListener('click', openPopupTypeAdd);
formPopupTypeAdd.addEventListener('submit', addCardFromForm);

editButton.addEventListener('click', openPopupTypeEdit);
formPopupTypeEdit.addEventListener('submit', editUserInfo);

buttonClose.forEach((item) => {item.addEventListener('click', closePopup)});
popupOverlay.forEach((item) => {item.addEventListener('click', closePopup)});

cardsList.addEventListener('click', function(evt){
  const eventTarget = evt.target;

  if(eventTarget.classList.contains('card__button_type_like')){
    eventTarget.classList.toggle('card__button_type_like-checked');
  }

  if(eventTarget.classList.contains('card__button_type_delete')){
    const eventTargetParentElement = eventTarget.parentElement;
    eventTargetParentElement.remove(eventTargetParentElement);
  }

  if(eventTarget.classList.contains('card__image')){
    const eventTargetImage = eventTarget.src;
    const eventTargetDescription = eventTarget.alt;

    openPopupTypeImage(eventTargetImage, eventTargetDescription);
  }
})


// валидация

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

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

const validationSetting = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button_type_submit',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
}

enableValidation(validationSetting);
