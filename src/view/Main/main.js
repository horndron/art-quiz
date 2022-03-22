import htmlToElement from '../../utils/htmlToElement';
import { pageCategories } from '../Categories/categories';
import Main from './main.html';
import './main.sass';

const mainContent = htmlToElement(Main);

mainContent.querySelectorAll('.btn').forEach((item) => {
  item.addEventListener('click', (event) => {
    const { value } = event.target.dataset;
    pageCategories(value);
  });
});

function main() {
  return mainContent;
}

export default main;
