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

const cardsList = document.querySelector('.card-list');
const plug = document.querySelector('#plug').content;
const card = document.querySelector('#card').content;

if(initialCards.length === 0) {

  cardsList.prepend(plug);

} else if (initialCards.length !== 0) {


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

}

// также при удалении всех карточек выводить plug

// инофрмация о пользователе
const userName = document.querySelector('.profile__name');
const userAbout = document.querySelector('.profile__about');
// кнопка редактирования
const editButton = document.querySelector('.profile__button_type_edit');
// popup
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__button_type_close');
const inputName = popup.querySelector('.popup__input_type_name');
const inputAbout = popup.querySelector('.popup__input_type_about');
const formEdit = popup.querySelector('.popup__form_type_edit');

// функция открытия popup
function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = userName.textContent;
  inputAbout.value = userAbout.textContent;
}

// функция закрытия popup
function closePopup() {
  popup.classList.remove('popup_opened');
}

// функция изменения имени и профессии
function changeUserInfo(evt) {
  evt.preventDefault();

  userName.textContent = inputName.value;
  userAbout.textContent = inputAbout.value;

  closePopup();
}

// отслеживаем клики по кнопкам
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formEdit.addEventListener('submit', changeUserInfo);
