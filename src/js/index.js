import footer from '../view/Footer';
import main from '../view/Main/main';
import settingHtml, { settingsValue } from '../view/Settings/setting';
import { categories } from '../view/Categories/categories';
import category from '../view/Category/category';
import scoreHtml from '../view/Score';
import parseURL from '../utils/parseURL';
import clickSound from '../click.mp3';

const routes = {
  '/': main,
  '/setting': settingHtml,
  '/artist': categories,
  '/pictures': categories,
  '/artist/:id': category,
  '/pictures/:id': category,
  '/artist/:id/score': scoreHtml,
  '/pictures/:id/score': scoreHtml,
};

const clickAudio = new Audio();
clickAudio.src = clickSound;
clickAudio.volume = settingsValue.volume;

const router = async () => {
  const URL_CATEGORIES = 'categories';
  const URL_SCORE = 'score';
  const mainContent = document.querySelector('main');

  let filterURL;
  const request = parseURL();
  if (request.resource === URL_CATEGORIES) {
    filterURL = `/${request.resource}`;
  } else {
    filterURL = (request.resource ? `/${request.resource}` : '/')
      + (request.id_category ? '/:id' : '')
      + (request.question === URL_SCORE ? '/score' : '');
  }

  if (filterURL === '/') {
    document.querySelector('body').classList.add('frontpage');
  } else {
    document.querySelector('body').classList.remove('frontpage');
  }
  mainContent.innerHTML = '';
  mainContent.append(routes[filterURL](request));
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

document.querySelector('footer').append(footer);

document.body.addEventListener('click', () => {
  clickAudio.play();
});
