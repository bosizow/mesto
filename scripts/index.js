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
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupDescription = popupTypeImage.querySelector('.popup__image-description');

const buttonsClose = document.querySelectorAll('.popup__button_type_close');
const popupOverlays = document.querySelectorAll('.popup__overlay');

// добавление карточек из массива
initialCards.forEach((item) => {
  addCard(item.name, item.link);
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

// функция добавления новой карточки
function createCard(title, link) {

  // принимает 2 аргумента: заголовок карточки и ссылку на изображение
  // клонирует шаблон карточки из template и наполняет полученными данными
  // возвращает карточку

  const newCard = card.cloneNode(true);

  const newCardImage = newCard.querySelector('.card__image');
  const newCardDescription = newCard.querySelector('.card__description');

  newCardImage.setAttribute('src', link);
  newCardImage.setAttribute('alt', title);
  newCardDescription.textContent = title;

  return newCard;
}

function addCard(title,link){
  // принимает 2 аргумента: заголовок карточки и ссылку на изображение
  // создает карточку
  // добавляет её в началао узла cardsList

  const newCard = createCard(title, link);
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

  inputLinkPopupTypeAdd.value = null;
  inputTitlePopupTypeAdd.value = null;

  addCard(titleFromFrom, linkFromForm);

  closeOpenedPopup();
}

function closeByEscape(evt) {
  if(evt.key === 'Escape'){
    closeOpenedPopup();
  }
}


// отслеживаем клики и отправления форм
document.addEventListener('keydown', function (evt) {
  if(evt.key === 'Escape'){
    closeOpenedPopup();
  }
});

addButton.addEventListener('click', openPopupTypeAdd);
formPopupTypeAdd.addEventListener('submit', addCardFromForm);

editButton.addEventListener('click', openPopupTypeEdit);
formPopupTypeEdit.addEventListener('submit', editUserInfo);

buttonsClose.forEach((item) => {item.addEventListener('click', closeOpenedPopup)});
popupOverlays.forEach((item) => {item.addEventListener('click', closeOpenedPopup)});

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
