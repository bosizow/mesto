// инофрмация о пользователе
let userName = document.querySelector('.profile__name');
let userAbout = document.querySelector('.profile__about');
// кнопка редактирования
let editButton = document.querySelector('.profile__button_type_edit');
// popup Edit
let editForm = document.querySelector('.popup_type_edit');
let closeButton = editForm.querySelector('.popup__button_type_close');
let submitButton = editForm.querySelector('.popup__button_type_submit');
let inputName = editForm.querySelector('.popup__input_type_name');
let inputAbout = editForm.querySelector('.popup__input_type_about');

// отслеживаем клики по кнопкам
editButton.addEventListener('click', openEditForm);
closeButton.addEventListener('click', closeEditForm);
submitButton.addEventListener('click', changeUserInfo);

// функция открытия popup
function openEditForm() {
  // логика: добавлять селектор popup_opened блоку popup_type_edit (editForm)
  editForm.classList.add('popup_opened');
  // заполнить значение аргумента value тега popup__input_type_name
  inputName.value = userName.textContent;
  // заполнить значение аргумента value тега popup__input_type_about
  inputAbout.value = userAbout.textContent;
}

// функция закрытия popup
function closeEditForm() {
  // логика: убирать селектор popup_opened у блока popup_type_edit (editForm)
  editForm.classList.remove('popup_opened');
}

// функция изменения имени и профессии
function changeUserInfo(evt) {
  // отменяем перезагрузку страницы
  evt.preventDefault();
  // собираем введенную информацию
  let newUserName = editForm.querySelector('.popup__input_type_name').value;
  let newUserAbout = editForm.querySelector('.popup__input_type_about').value;

  // меняем значения имя и профессию на странице
  userName.textContent = newUserName;
  userAbout.textContent = newUserAbout;
  // закрываем
  closeEditForm();
}

// важно сделать так что бы страница не перезагружалась
