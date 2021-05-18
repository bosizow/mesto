const cardsList = document.querySelector('.card-list');

const profile = document.querySelector('.profile');

const addButton = profile.querySelector('.profile__button_type_add');
const editButton = profile.querySelector('.profile__button_type_edit');

const userName = profile.querySelector('.profile__name');
const userAbout = profile.querySelector('.profile__about');

const popupTypeAdd = document.querySelector('.popup_type_add');
const formTypeAdd = popupTypeAdd.querySelector('.popup__form');
const inputTitlePopupTypeAdd = popupTypeAdd.querySelector('.form__input_type_title');
const inputLinkPopupTypeAdd = popupTypeAdd.querySelector('.form__input_type_link');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const formTypeEdit = popupTypeEdit.querySelector('.popup__form');
const inputNamePopupTypeEdit = popupTypeEdit.querySelector('.form__input_type_name');
const inputAboutPopupTypeEdit = popupTypeEdit.querySelector('.form__input_type_about');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupDescription = popupTypeImage.querySelector('.popup__image-description');

const buttonsClose = document.querySelectorAll('.popup__button_type_close');
const popupOverlays = document.querySelectorAll('.popup__overlay');

// добавление карточек из массива
initialCards.forEach((item) => {
  addCard(item);
});

// функции открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function openPopupTypeAdd() {
  openPopup(popupTypeAdd);
}

function openPopupTypeEdit() {

  inputNamePopupTypeEdit.value = userName.textContent;
  inputAboutPopupTypeEdit.value = userAbout.textContent;

  openPopup(popupTypeEdit);
}

function openPopupTypeImage(link, description) {

  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', description);
  popupDescription.textContent = description;

  openPopup(popupTypeImage);
}

// функции закрытия popup
function closeOpenedPopup() {
  const openPopup = findOpenedPopup();
  closePopup(openPopup);
}

function findOpenedPopup() {
  const openPopup = document.querySelector('.popup_opened');
  return openPopup;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// функция изменения имени и профессии
function editUserInfo(evt) {
  evt.preventDefault();

  userName.textContent = inputNamePopupTypeEdit.value;
  userAbout.textContent = inputAboutPopupTypeEdit.value;

  closeOpenedPopup();
}

function addCard(item){
  // принимает объект карточки
  // создает экземпляр класса Card
  // добавляет его в началао узла cardsList

  const cardElement = new Card(item).createCard();
  cardsList.prepend(cardElement);
}

function addCardFromForm(evt) {
  // отменяет перезагрузку страницы при отправке формы
  // получает данные этой формы
  // обрабатывает их и отправляет в функцию добавления картоки
  // потом закрывает попап

  evt.preventDefault();

  const cardFromForm = {
    name: inputTitlePopupTypeAdd.value,
    link: inputLinkPopupTypeAdd.value,
  }

  inputLinkPopupTypeAdd.value = null;
  inputTitlePopupTypeAdd.value = null;

  addCard(cardFromForm);

  closeOpenedPopup();
}

function closeByEscape(evt) {
  if(evt.key === 'Escape'){
    closeOpenedPopup();
  }
}

// валидация
new FormValidator(validationSetting, formTypeAdd).enableValidation();
new FormValidator(validationSetting, formTypeEdit).enableValidation();

// отслеживаем клики и отправления форм
addButton.addEventListener('click', openPopupTypeAdd);
formTypeAdd.addEventListener('submit', addCardFromForm);

editButton.addEventListener('click', openPopupTypeEdit);
formTypeEdit.addEventListener('submit', editUserInfo);

buttonsClose.forEach((item) => {item.addEventListener('click', closeOpenedPopup)});
popupOverlays.forEach((item) => {item.addEventListener('click', closeOpenedPopup)});

export { openPopupTypeImage };
import Card from './class/Card.js';
import initialCards from './cards.js';
import FormValidator from './class/FormValidator.js';
import validationSetting from './validator-setting.js';

