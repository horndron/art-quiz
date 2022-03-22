import htmlToElement from '../../utils/htmlToElement';
import { Category } from '../../Components/Category';
import images from '../../js/images';
import Categories from './categories.html';
import './categories.sass';

const splitArr = (arr, chunks) => [
  ...Array(chunks),
].map((_, c) => arr.filter((n, index) => index % chunks === c));

const questionsArrayArtist = [];
const questionsArrayPictures = [];

images.map((item, index) => {
  if (index % 2 === 0) {
    questionsArrayArtist.push({ ...item, type: 'artist' });
  } else {
    questionsArrayPictures.push({ ...item, type: 'pictures' });
  }
});

const questionsArrayArtistRounds = splitArr(questionsArrayArtist, 12);
const questionsArrayPicturesRounds = splitArr(questionsArrayPictures, 12);
const categoryNames = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twenty',
];
const categoryArtist = [];
const categoryPictures = [];

questionsArrayArtistRounds.map((item, index) => {
  const newCategory = new Category(index, categoryNames[index], item);

  if (localStorage.getItem(`artist${newCategory.name}`)) {
    newCategory.score = JSON.parse(localStorage.getItem(`artist${newCategory.name}`));
  } else {
    newCategory.score.length = 0;
  }
  categoryArtist.push(newCategory);
});

questionsArrayPicturesRounds.map((item, index) => {
  const newCategory = new Category(index, categoryNames[index], item);

  if (localStorage.getItem(`pictures${newCategory.name}`)) {
    newCategory.score = JSON.parse(localStorage.getItem(`pictures${newCategory.name}`));
  } else {
    newCategory.score.length = 0;
  }
  categoryPictures.push(newCategory);
});

const categoriesContent = htmlToElement(Categories);

function pageCategories(value) {
  const ARTIST_CATEGORY = 'artist';
  const PICTURES_CATEGORY = 'pictures';
  const content = categoriesContent.querySelector('.categories');
  content.innerHTML = '';
  let array;
  if (value === ARTIST_CATEGORY) {
    array = categoryArtist;
  }
  if (value === PICTURES_CATEGORY) {
    array = categoryPictures;
  }

  if (array) {
    array.forEach((item) => {
      content.append(item.categoryHtml());
    });

    categoriesContent.append(content);
  }
}

function categories(value) {
  pageCategories(value.resource);
  return categoriesContent;
}

categoriesContent.querySelector('.categories').addEventListener('click', () => {

});

export {
  categoryArtist,
  categoryPictures,
  categories,
  pageCategories,
  categoriesContent,
};
