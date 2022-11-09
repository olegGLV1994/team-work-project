const getTemplate = () => {
  const selectArr = [];
  for (let i = 65; i <= 90; i += 1) {
    selectArr.push(
      `<li class="select__item" data-type="item" data-id="&#${i}">&#${i}</li>`
    );
  }
  for (let i = 49; i <= 57; i += 1) {
    selectArr.push(
      `<li class="select__item" data-type="item" data-id="&#${i}">&#${i}</li>`
    );
  }
  selectArr.push(
    `<li class="select__item" data-type="item" data-id="&#48">&#48</li>`
  );

  //   select__list.insertAdjacentHTML('beforeend', selectArr.join(''));
  return selectArr;
};

export class Select {
  constructor(selector, options) {
    this.el = document.querySelector(selector);
    this.wrap = document.querySelector('.select__list');
    this.input = document.querySelector('.select__input');
    this.selectedId = options.selectedId;

    this.#render();
    this.#setup();
  }

  #render() {
    // const { data } = this.options;
    this.el.classList.add('select');

    this.wrap.innerHTML = getTemplate().join('');
    this.input.textContent = this.selectedId;
    this.el
      .querySelector(`[data-id="${this.selectedId}"]`)
      .classList.add('selected');
  }
  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.closeSelectOnClick = this.closeSelectOnClick.bind(this);

    this.el.addEventListener('click', this.clickHandler);

    // this.options = options;
  }

  clickHandler(event) {
    const { type } = event.target.dataset;
    // console.log(type);
    if (type === 'input') {
      this.toggle();
      document.addEventListener('click', this.closeSelectOnClick);
    } else if (type === 'item') {
      const id = event.target.dataset.id;
      this.select(id);
    }
  }
  get isOpen() {
    return this.el.classList.contains('open');
  }

  select(id) {
    this.selectedId = id;

    this.input.textContent = this.selectedId;

    this.el
      .querySelectorAll('[data-type="item"]')
      .forEach(el => el.classList.remove('selected'));

    this.el.querySelector(`[data-id="${id}"]`).classList.add('selected');

    this.close();
  }
  closeSelectOnClick(event) {
    const { type } = event.target.dataset;

    if (type !== 'input') {
      const element = document.querySelector('#select');
      element.classList.remove('open');
      document.removeEventListener('click', this.closeSelectOnClick);
    }
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.el.classList.add('open');
  }

  close() {
    this.el.classList.remove('open');
  }
  destroy() {
    this.el.removeEventListener('click', this.clickHsndler);
    this.el.innerHTML = '';
  }
}
