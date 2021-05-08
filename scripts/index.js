// класс карточки
class Card {

  constructor(card) {
    this._name = card.name;
    this._link = card.link;
  }

  _getTemplate() {
    const cardElement = document.
      querySelector('#card').
      content.
      querySelector('.card').
      cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListner();

    this._element.querySelector('.card__image').setAttribute('src', this._link);
    this._element.querySelector('.card__image').setAttribute('alt', this._name);
    this._element.querySelector('.card__description').textContent = this._name;

    return this._element;
  }

  // повесить слушателей событий
  _setEventListner() {
    this._element.addEventListener('click', (evt) => {

      if(evt.target.classList.contains('card__image')) {

        this._openPopup();

      } else if(evt.target.classList.contains('card__button_type_delete')){

        this._handDeleteClick();

      } else if(evt.target.classList.contains('card__button_type_like')){

        this._handleLikeClick();

      }

    })
  }

  _handleLikeClick() {
    this._element.querySelector('.card__button_type_like').classList.toggle('card__button_type_like-checked');
  }

  _handDeleteClick() {
    this._element.remove();
  }

  _openPopup() {
    openPopupTypeImage(this._link, this._name);
  }

}

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


// отслеживаем клики и отправления форм

addButton.addEventListener('click', openPopupTypeAdd);
formPopupTypeAdd.addEventListener('submit', addCardFromForm);

editButton.addEventListener('click', openPopupTypeEdit);
formPopupTypeEdit.addEventListener('submit', editUserInfo);

buttonsClose.forEach((item) => {item.addEventListener('click', closeOpenedPopup)});
popupOverlays.forEach((item) => {item.addEventListener('click', closeOpenedPopup)});
