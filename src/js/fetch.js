const searchBar = document.querySelector('.search');
const cocktailList = document.querySelector('.coctails__list');
const cocktailsBox = document.querySelector('.cocktails__wrapper');
const noCocktails = document.querySelector('.coctails-no-found');

const heartActive = `<span class="heart-active">
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
                </span>`;
const heartDisactive = `<span class="heart-disactive">
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
                    <path
                      d="M10.5 17L9.2675 15.921C4.89 12.1035 2 9.58583 2 6.49591C2 3.9782 4.057 2 6.675 2C8.154 2 9.5735 2.66213 10.5 3.70845C11.4265 2.66213 12.846 2 14.325 2C16.943 2 19 3.9782 19 6.49591C19 9.58583 16.11 12.1035 11.7325 15.9292L10.5 17Z"
                      
                    />
                  </svg>
                </span>`;

cocktailList.addEventListener('click', event => {
  const addToFavoriteCocktail = document.querySelector('.add-to-favorite');
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  let { name, include, favorite } = event.target.dataset;
  if (name) {
    const cocktailName = name;
    const cocktailFromLocalStorage = JSON.parse(localStorage.cocktails).find(
      el => el.name === cocktailName
    );
    // !
    // if (include === 'false') {
    //   addToFavoriteCocktail.textContent = 'Add to favorite';
    // }
    // if (include === 'true') {
    //   addToFavoriteCocktail.textContent = 'Remove from favorite';
    // }
    // addToFavoriteCocktail.addEventListener('click', event => {
    //   console.log(cocktailName);
    //   if (event.target.textContent === 'Add to favorite') {
    //     event.target.dataset.include = true;
    //     event.target.dataset.favorite = true;
    //     event.target.textContent = 'Remove from favorite';
    //     const currentFavorites =
    //       JSON.parse(localStorage.getItem('favoriteCocktails')) || [];
    //     currentFavorites.push(cocktailFromLocalStorage);
    //     localStorage.setItem(
    //       'favoriteCocktails',
    //       JSON.stringify(currentFavorites)
    //     );
    //   } else {
    //     event.target.dataset.include = false;
    //     event.target.textContent = 'Add to favorite';
    //     const cocktailFromLocalStorage = JSON.parse(
    //       localStorage.favoriteCocktails
    //     ).filter(el => el.name !== cocktailName);
    //     localStorage.setItem(
    //       'favoriteCocktails',
    //       JSON.stringify(cocktailFromLocalStorage)
    //     );
    //   }
    // });
  } else if (favorite === 'false') {
    event.target.dataset.favorite = true;
    event.target.dataset.include = true;
    const active = event.target;
    active.innerHTML = `Remove${heartActive}`;
    const cocktailName = event.target.previousElementSibling.dataset.name;
    const cocktailFromLocalStorage = JSON.parse(localStorage.cocktails).find(
      el => el.name === cocktailName
    );
    const currentFavorites =
      JSON.parse(localStorage.getItem('favoriteCocktails')) || [];
    currentFavorites.push(cocktailFromLocalStorage);
    localStorage.setItem('favoriteCocktails', JSON.stringify(currentFavorites));
  } else if (favorite === 'true') {
    event.target.dataset.favorite = false;
    event.target.dataset.include = false;
    const active = event.target;

    active.innerHTML = `Add to${heartDisactive}`;
    const cocktailName = event.target.previousElementSibling.dataset.name;
    const cocktailFromLocalStorage = JSON.parse(
      localStorage.favoriteCocktails
    ).filter(el => el.name !== cocktailName);
    localStorage.setItem(
      'favoriteCocktails',
      JSON.stringify(cocktailFromLocalStorage)
    );
  }
});

searchBar.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  if (event.target.searchQuery.value === '') {
    fetchRandom(checkDisplayType());
  } else {
    pagination(fetchByName, event.target.searchQuery.value);
  }
  event.target.reset();
  const burger = document.querySelector('.container-menu');
  burger.classList.add('visually-hidden');
}

async function fetchByName(cocktailName) {
  cocktailList.innerHTML = '';
  return (
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
    )
      .then(response => response.json())
      .then(data => data.drinks)
      // .then(data => addQueryToLocalStorage(data))
      .catch(error => console.log(error))
  );
}

function addQueryToLocalStorage(array) {
  if (array === null) {
    return;
  }
  const newArray = array.map(data => {
    const { strDrink, strInstructions, strDrinkThumb } = data;
    let cocktail = '';
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
      cocktail = 'strIngredient' + i;
      if (data[cocktail]) {
        ingredients.push(data[cocktail]);
      }
    }
    return {
      name: strDrink,
      instruction: strInstructions,
      img: strDrinkThumb,
      ingredients: ingredients,
    };
  });
  localStorage.setItem('cocktails', JSON.stringify(newArray));
  return array;
}

async function fetchByLetter(letter) {
  cocktailList.innerHTML = '';
  return (
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
      .then(response => response.json())
      .then(data => data.drinks)
      // .then(data => addQueryToLocalStorage(data))
      .catch(error => console.log(error))
  );
}

async function pagination(callback, searchValue) {
  const data = await callback(searchValue);
  const addToLocal = await addQueryToLocalStorage(data);
  let currentPage = 1;
  let cardsPerPage = checkDisplayType();

  async function displayList(array, cards, page) {
    if (array === null) {
      cocktailsBox.classList.add('visually-hidden');
      noCocktails.classList.remove('visually-hidden');
      return;
    } else {
      cocktailsBox.classList.remove('visually-hidden');
      noCocktails.classList.add('visually-hidden');
    }
    const start = cards * (page - 1);
    const end = start + cards;
    const paginatedData = array.slice(start, end);
    const markup = await createMarkup(paginatedData);
  }

  function displayPagination(array, cards) {
    const pagination = document.querySelector('.pagination');
    if (pagination) {
      pagination.remove();
    }

    const pagesCount = Math.ceil(array.length / cards);
    if (pagesCount === 1) {
      return;
    }
    const ulEl = document.createElement('ul');
    ulEl.classList.add('pagination');

    for (let i = 0; i < pagesCount; i += 1) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl);
    }
    cocktailsBox.appendChild(ulEl);
    ulEl.addEventListener('click', event => {
      if (event.target.nodeName !== 'LI') {
        return;
      }
      const activePage = document.querySelector('.pagination__item--active');
      activePage.classList.remove('pagination__item--active');
      const pageToActivate = event.path[0];
      pageToActivate.classList.add('pagination__item--active');
      currentPage = event.target.textContent;
      displayList(data, cardsPerPage, currentPage);
    });
  }

  function displayPaginationBtn(page) {
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__item');
    liEl.innerText = page;
    if (currentPage === page) {
      liEl.classList.add('pagination__item--active');
    }
    return liEl;
  }

  try {
    await displayList(data, cardsPerPage, currentPage);
    displayPagination(data, cardsPerPage);
  } catch (error) {}
}

function checkDisplayType() {
  let quantity;
  if (window.innerWidth >= 1280) {
    quantity = 9;
  } else if (window.innerWidth >= 768) {
    quantity = 6;
  } else {
    quantity = 3;
  }
  return quantity;
}

async function createMarkup(array) {
  const markup = array
    .map(data => {
      const { strDrink, strDrinkThumb } = data;
      const localSt = JSON.parse(localStorage.getItem('favoriteCocktails'));
      let favorite;
      if (localSt) {
        favorite =
          localSt.findIndex(el => el.name === strDrink) > -1 ? true : false;
      } else {
        favorite = false;
      }
      let isFavorite;
      let btnText;
      if (favorite) {
        btnText = 'Remove';

        isFavorite = heartActive;
      } else {
        btnText = 'Add to';
        isFavorite = heartDisactive;
      }
      return `<li class="coctails__item">
        <img
          src="${strDrinkThumb}"
          alt="${strDrink}"
          width="280"
          class="coctails__image"
        />
        <div class="coctails-info">
          <h3 class="coctails__name">${strDrink}</h3>
          <div class="coctails__btn">
            <button type="button" class="info__btn learn-more-btn" data-name="${strDrink}" data-include="${favorite}">
              Learn more
            </button>
            <button type="button" class="info__btn add-to-btn" data-favorite="${favorite}">
              ${btnText}${isFavorite}
            </button>

          </div>
        </div>
      </li>`;
    })
    .join('');
  cocktailList.innerHTML = markup;
  return markup;
}

function fetchRandom(quantity) {
  const promises = [];
  for (let i = 0; i < quantity; i += 1) {
    const promise = fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    )
      .then(response => response.json())
      .then(data => data.drinks)
      .catch(error => console.log(error));
    promises.push(promise);
  }
  Promise.all(promises)
    .then(value => value.flat())
    .then(data => addQueryToLocalStorage(data))
    .then(data => createMarkup(data));
}

async function fetchIngridient(ingridient) {
  return fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingridient}`
  )
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
}
fetchRandom(checkDisplayType());

export {
  pagination,
  fetchByLetter,
  fetchIngridient,
  createMarkup,
  heartDisactive,
  heartActive,
};
