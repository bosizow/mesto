class Card {

  constructor({name, link}, element, openFunction) {
    this._name = name;
    this._link = link;
    this._element = element.cloneNode(true);
    this._elementImage = this._element.querySelector('.card__image');
    this._elementDescription = this._element.querySelector('.card__description');
    this._openFunction = openFunction;
  }

  createCard() {
    this._setEventListner();

    this._elementImage.setAttribute('src', this._link);
    this._elementImage.setAttribute('alt', this._name);
    this._elementDescription.textContent = this._name;

    return this._element;
  }

  // повесить слушателей событий
  _setEventListner() {
    this._element.addEventListener('click', (evt) => {

      if(evt.target.classList.contains('card__image')) {

        this._openFunction(this._link, this._name);

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

}

export default Card;
