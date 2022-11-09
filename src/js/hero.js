import { Select } from './select/select';
import { fetchByLetter, pagination } from './fetch';
const select = new Select('#select', {
  selectedId: 'A',
});

// console.log(select.selectedId);

const input = document.querySelector('#select');

input.addEventListener('click', onInputClick);

function onInputClick(event) {
  console.log('before if');
  if (event.path[0].classList.contains('select__item')) {
    console.log(select.selectedId);
    try {
      console.log('try');
      pagination(fetchByLetter, select.selectedId);
    } catch (error) {
      console.log(error);
    }

    // const screenHeight = document.documentElement.clientHeight;
    // console.log(screenHeight);
    // const cardHeight = document
    //   .querySelector('.coctails__list')
    //   .getBoundingClientRect().top;
    // console.log(cardHeight);
    // window.scrollBy({
    //   top: cardHeight * 100,
    //   behavior: 'smooth',
    // });
  }
}
const fillter__list = document.querySelector('.fillter__list');
const getTabletTemplate = () => {
  const filterArr = [];
  for (let i = 65; i <= 90; i += 1) {
    filterArr.push(
      `<li class="item" data-type="item""><button  data-id="&#${i}" type="button" class="fillter_button">&#${i}</button></li>`
    );
  }
  for (let i = 49; i <= 57; i += 1) {
    filterArr.push(
      `<li class="item" data-type="item" "><button data-id="&#${i}" type="button" class="fillter_button">&#${i}</button></li>`
    );
  }
  filterArr.push(
    `<li class="item" data-type="item" ><button data-id="&#48" type="button" class="fillter_button">&#48</button></li>`
  );

  fillter__list.insertAdjacentHTML('beforeend', filterArr.join(''));
  // return selectArr;
};

getTabletTemplate();

fillter__list.addEventListener('click', fillterClick);
let currentEl;
function fillterClick(event) {
  const symbol = event.target.dataset.id;

  if (event.path[0].classList.contains('fillter_button')) {
    if (currentEl) {
      currentEl.classList.remove('fillter_button--current');
    }
    try {
      pagination(fetchByLetter, symbol);
    } catch (error) {
      console.log(error);
    }

    currentEl = event.path[0];

    event.path[0].classList.add('fillter_button--current');
  }
}
