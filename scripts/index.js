const cardsList = document.querySelector('.card-list');

const card = document.querySelector('#card').content;

const profile = document.querySelector('.profile');

const addButton = profile.querySelector('.profile__button_type_add');
const editButton = profile.querySelector('.profile__button_type_edit');

const userName = profile.querySelector('.profile__name');
const userAbout = profile.querySelector('.profile__about');

const popupTypeAdd = document.querySelector('.popup_type_add');
const formPopupTypeAdd = popupTypeAdd.querySelector('.popup__form');
const buttonClosePopupTypeAdd = popupTypeAdd.querySelector('.popup__button_type_close');
const inputTitlePopupTypeAdd = popupTypeAdd.querySelector('.popup__input_type_title');
const inputLinkPopupTypeAdd = popupTypeAdd.querySelector('.popup__input_type_link');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const formPopupTypeEdit = popupTypeEdit.querySelector('.popup__form');
const buttonClosePopupTypeEdit = popupTypeEdit.querySelector('.popup__button_type_close');
const inputNamePopupTypeEdit = popupTypeEdit.querySelector('.popup__input_type_name');
const inputAboutPopupTypeEdit = popupTypeEdit.querySelector('.popup__input_type_about');

const popupTypeImage = document.querySelector('.popup_type_image');
const buttonClosePopupTypeImage = popupTypeImage.querySelector('.popup__button_type_close');

// добавление карточек из массива
const cardsListArr = initialCards.map((item) => {

  const newCard = card.cloneNode(true);

  const newCardImage = newCard.querySelector('.card__image');
   const newCardDescription = newCard.querySelector('.card__description');

   newCardImage.setAttribute('src', item.link);
   newCardImage.setAttribute('alt', item.name);
   newCardDescription.textContent = item.name;

   return newCard;
});

cardsList.prepend(...cardsListArr);

// функции открытия popup
function openPopupTypeAdd() {
  popupTypeAdd.classList.add('popup_opened');
}

function openPopupTypeEdit() {

  inputNamePopupTypeEdit.value = userName.textContent;
  inputAboutPopupTypeEdit.value = userAbout.textContent;

  popupTypeEdit.classList.add('popup_opened');
}

function openPopupTypeImage(link, description) {

  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupDescription = popupTypeImage.querySelector('.popup__image-description');

  // тут ошибка в консоли
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', description);
  popupDescription.textContent = description;

  popupTypeImage.classList.add('popup_opened');
}

// функции закрытия popup
function closePopup() {
  const popupIsOpened = document.querySelector('.popup_opened');
  popupIsOpened.classList.remove('popup_opened');
  popupIsOpened.classList.add('popup_close');
  // popupIsOpened.setAttribute('style', 'animation: closing .2s linear;');
}

// функция изменения имени и профессии
function editUserInfo(evt) {
  evt.preventDefault();

  userName.textContent = inputNamePopupTypeEdit.value;
  userAbout.textContent = inputAboutPopupTypeEdit.value;

  closePopup();
}

// функция добавления новой карточки
function addCard(evt) {
  evt.preventDefault();

  const newCard = card.cloneNode(true);

  const newCardImage = newCard.querySelector('.card__image');
  const newCardDescription = newCard.querySelector('.card__description');

  newCardImage.setAttribute('src', inputLinkPopupTypeAdd.value);
  newCardImage.setAttribute('alt', inputTitlePopupTypeAdd.value);
  newCardDescription.textContent = inputTitlePopupTypeAdd.value;

  cardsList.prepend(newCard);

  closePopup();
}

// отслеживаем клики и отправления форм
addButton.addEventListener('click', openPopupTypeAdd);
buttonClosePopupTypeAdd.addEventListener('click', closePopup);
formPopupTypeAdd.addEventListener('submit', addCard);

editButton.addEventListener('click', openPopupTypeEdit);
buttonClosePopupTypeEdit.addEventListener('click', closePopup);
formPopupTypeEdit.addEventListener('submit', editUserInfo);

buttonClosePopupTypeImage.addEventListener('click', closePopup);

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
