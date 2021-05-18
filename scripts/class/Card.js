class Card {

  constructor(card) {
    this._name = card.name;
    this._link = card.link;
  }

  _getTemplate() {
    const _cardElement = document.
      querySelector('#card').
      content.
      querySelector('.card').
      cloneNode(true);

    return _cardElement;
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
    // можно ли обращаться из класса к внешним функциям?
    openPopupTypeImage(this._link, this._name);
  }

}

export default Card;
import { openPopupTypeImage } from './../index.js';
