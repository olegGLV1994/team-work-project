const refs = {
  openFavorite: document.querySelector('.js-link-favorite'),
  menuFavorite: document.querySelector('.header-list-menu'),
  openBurgerFavorite: document.querySelector('.js-burger-favorite'),
  menuBurgerFavorite: document.querySelector('.header-list-burger-menu'),
};

refs.openFavorite.addEventListener('click', openFavoriteMenu);
refs.openBurgerFavorite.addEventListener('click', openFavoriteBurgerMenu);

function openFavoriteMenu(e) {
  e.preventDefault();
  refs.menuFavorite.classList.toggle('visually-hidden');
}

function openFavoriteBurgerMenu(e) {
  e.preventDefault();
  refs.menuBurgerFavorite.classList.toggle('visually-hidden');
}

refs.menuFavorite.addEventListener('click', onFavoritCocktailClick);

function onFavoritCocktailClick(event) {
  const sectionHero = document.querySelector('.hero');
  const sectionCocktails = document.querySelector('.cocktails__wrapper');
  const cocktailsList = document.querySelector('.coctails__list');
  refs.menuFavorite.classList.add('visually-hidden');
  if (event.target.textContent === 'Favorite cocktails') {
    const fromLocalStorage =
      JSON.parse(localStorage.getItem('favoriteCocktails')) ?? [];
    if (Array.isArray(fromLocalStorage) && fromLocalStorage.length !== 0) {
      sectionHero.classList.add('visually-hidden');
      sectionCocktails.firstElementChild.textContent = 'Favorite cocktails';
      const markup = createFavoriteMarkup(fromLocalStorage);
      cocktailsList.innerHTML = markup;
    } else {
      sectionHero.classList.add('visually-hidden');
      const msg = `<h2 class="coctails__title">Favorite Cocktails</h2><p class="alert-message">You haven't added any favorite cocktails yet</p>`;
      sectionCocktails.innerHTML = msg;
    }
  } else {
    // If button is favorite ingridients
  }
  const burger = document.querySelector('.container-menu');
  burger.classList.add('visually-hidden');
}

function createFavoriteMarkup(array) {
  const markup = array
    .map(data => {
      const { name, img } = data;
      const favorite = true;
      const btnText = 'Remove';

      return `<li class="coctails__item">
        <img
          src="${img}"
          alt="${name}"
          width="280"
          class="coctails__image"
        />
        <div class="coctails-info">
          <h3 class="coctails__name">${name}</h3>
          <div class="coctails__btn">
            <button type="button" class="info__btn learn-more-btn" data-name="${name}" data-include="${favorite}">
              Learn more
            </button>
            <button type="button" class="info__btn add-to-btn" data-favorite="${favorite}">
              ${btnText}<span class="heart-active">
                  <svg
                    class="coctails__icon"
                    width="21"
                    height="19"
                    viewBox="0 0 21 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 19L8.9775 17.6332C3.57 12.7978 0 9.60872 0 5.69482C0 2.50572 2.541 0 5.775 0C7.602 0 9.3555 0.838692 10.5 2.16403C11.6445 0.838692 13.398 0 15.225 0C18.459 0 21 2.50572 21 5.69482C21 9.60872 17.43 12.7978 12.0225 17.6436L10.5 19Z"
                      fill="#FD5103"
                    />
                  </svg>
                </span>
            </button>

          </div>
        </div>
      </li>`;
    })
    .join('');
  return markup;
}

export { onFavoritCocktailClick };
