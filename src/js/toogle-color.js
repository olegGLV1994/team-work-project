const refs = {
  body: document.querySelector('body'),
  label: document.querySelector('.theme-switch__label'),
};
const input = document.querySelector('#themeSwitch');

refs.label.addEventListener('click', themeSwitcher);

function themeSwitcher() {
  refs.body.classList.toggle('change-toggle-color');
  const span = document.querySelectorAll('.heart-disactive');
  span.forEach(el => el.classList.toggle('dark'));
  const p = document.querySelector('.hero__filter__text');
  p.classList.toggle('dark');

  const theme = localStorage.getItem('theme');
  if (theme === null || theme === 'light') {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

function checkTheme() {
  const theme = localStorage.getItem('theme');
  const span = document.querySelectorAll('.heart-disactive');
  if (theme === null || theme === 'light') {
    return;
  } else {
    input.checked = true;
    const body = document.querySelector('body');
    body.classList.toggle('change-toggle-color');
    span.forEach(el => el.classList.toggle('dark'));
    const p = document.querySelector('.hero__filter__text');
    p.classList.toggle('dark');
  }
}

checkTheme();

export { themeSwitcher };
