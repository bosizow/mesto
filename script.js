const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const content = document.querySelector('.content');
const cardsList = document.querySelector('.card-list');

const plug = document.querySelector('#plug').content;
const card = document.querySelector('#card').content;

const profile = document.querySelector('.profile');

const addButton = profile.querySelector('.profile__button_type_add');
const editButton = profile.querySelector('.profile__button_type_edit');

const userName = profile.querySelector('.profile__name');
const userAbout = profile.querySelector('.profile__about');

const popupTypeAdd = document.querySelector('.popup_type_add');
const formPopupTypeAdd = popupTypeAdd.querySelector('.popup__form');
const buttonClosePopupTypeAdd = popupTypeAdd.querySelector('.form__button_type_close');
const inputNamePopupTypeAdd = popupTypeAdd.querySelector('.form__input_type_name');
const inputLinkPopupTypeAdd = popupTypeAdd.querySelector('.form__input_type_link');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const formPopupTypeEdit = popupTypeEdit.querySelector('.popup__form');
const buttonClosePopupTypeEdit = popupTypeEdit.querySelector('.form__button_type_close');
const inputNamePopupTypeEdit = popupTypeEdit.querySelector('.form__input_type_name');
const inputAboutPopupTypeEdit = popupTypeEdit.querySelector('.form__input_type_about');

inputNamePopupTypeEdit.value = userName.textContent;
inputAboutPopupTypeEdit.value = userAbout.textContent;

if ( Array.isArray(initialCards) && initialCards.length !== 0 ) {

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

} else {

  cardsList.prepend(plug);

}

// также при удалении всех карточек выводить plug

// функции открытия popup
function openPopupTypeAdd() {
  popupTypeAdd.classList.add('popup_opened');

}

function openPopupTypeEdit() {
  popupTypeEdit.classList.add('popup_opened');
}

// функции закрытия popup
function closePopupTypeAdd() {
  popupTypeAdd.classList.remove('popup_opened');
}

function closePopupTypeEdit() {
  popupTypeEdit.classList.remove('popup_opened');
}

// функция изменения имени и профессии
function editUserInfo(evt) {
  evt.preventDefault();

  userName.textContent = inputNamePopupTypeEdit.value;
  userAbout.textContent = inputAboutPopupTypeEdit.value;

  closePopupTypeEdit();
}

// функция добавления новой карточки
function addCard(evt) {
  evt.preventDefault();

  const newCard = card.cloneNode(true);

  const newCardImage = newCard.querySelector('.card__image');
  const newCardDescription = newCard.querySelector('.card__description');

  newCardImage.setAttribute('src', inputLinkPopupTypeAdd.value);
  newCardImage.setAttribute('alt', inputNamePopupTypeAdd.value);
  newCardDescription.textContent = inputNamePopupTypeAdd.value;

  cardsList.prepend(newCard);

  closePopupTypeAdd();
}

// отслеживаем клики и отправления форм
addButton.addEventListener('click', openPopupTypeAdd);
buttonClosePopupTypeAdd.addEventListener('click', closePopupTypeAdd);
formPopupTypeAdd.addEventListener('submit', addCard); // почему-то не работает

editButton.addEventListener('click', openPopupTypeEdit);
buttonClosePopupTypeEdit.addEventListener('click', closePopupTypeEdit);
formPopupTypeEdit.addEventListener('submit', editUserInfo); // почему-то не работает
