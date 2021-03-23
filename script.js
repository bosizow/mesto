// инофрмация о пользователе
let userName = document.querySelector('.profile__name');
let userAbout = document.querySelector('.profile__about');
// кнопка редактирования
let editButton = document.querySelector('.profile__button_type_edit');
// popup Edit
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__button_type_close');
let inputName = popup.querySelector('.popup__input_type_name');
let inputAbout = popup.querySelector('.popup__input_type_about');
let formEdit = popup.querySelector('.popup__form_type_edit');

// функция открытия popup
function openPopup() {
  // логика: добавлять селектор popup_opened блоку popup_type_edit (popup)
  popup.classList.add('popup_opened');
  // заполнить значение аргумента value тега popup__input_type_name
  inputName.value = userName.textContent;
  // заполнить значение аргумента value тега popup__input_type_about
  inputAbout.value = userAbout.textContent;
}

// функция закрытия popup
function closePopup() {
  // логика: убирать селектор popup_opened у блока popup_type_edit (popup)
  popup.classList.remove('popup_opened');
}

// функция изменения имени и профессии
function changeUserInfo(evt) {
  // отменяем перезагрузку страницы
  evt.preventDefault();

  // меняем значения имя и профессию на странице
  userName.textContent = inputName.value;
  userAbout.textContent = inputAbout.value;

  // закрываем
  closePopup();
}

// отслеживаем клики по кнопкам
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formEdit.addEventListener('submit', changeUserInfo);
