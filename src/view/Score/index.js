import htmlToElement from '../../utils/htmlToElement';
import { changeCategories, generateQuestion } from '../Category/category';
import Score from './index.html';
import './index.sass';

const score = htmlToElement(Score);

function getDataURL(url) {
  return fetch(url)
    .then((response) => response.blob()).then((blob) => URL.createObjectURL(blob));
}

async function download(url, name) {
  const a = document.createElement('a');
  a.href = await getDataURL(url);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function questionsHtml(questionsArray, answers) {
  const questionsAllWrap = score.querySelector('.questions-category-score');
  questionsArray.forEach((question, index) => {
    const wrapQuestion = document.createElement('div');
    wrapQuestion.classList.add('result-score', answers[index]);

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('img');
    const image = new Image();
    image.src = `https://raw.githubusercontent.com/horndron/image-data/master/img/${question.imageNum}.jpg`;
    imageWrap.append(image);

    const downloadImage = document.createElement('button');
    downloadImage.classList.add('download');
    downloadImage.setAttribute(
      'download',
      `https://raw.githubusercontent.com/horndron/image-data/master/full/${question.imageNum}full.jpg`,
    );
    downloadImage.setAttribute('data-name', `${question.imageNum}full.jpg`);
    imageWrap.append(downloadImage);
    wrapQuestion.append(imageWrap);

    const description = document.createElement('div');
    description.classList.add('description');
    description.innerHTML = `<p class="name">${question.name}</p>
    <p>${question.author}, ${question.year}</p>`;
    wrapQuestion.append(description);
    questionsAllWrap.append(wrapQuestion);
  });

  const questionInfo = document.createElement('div');
  questionInfo.classList.add('information');

  score.append(questionInfo);

  score.addEventListener('click', (event) => {
    if (event.target.closest('.result-score')) {
      event.target.closest('body').classList.add('preview');
      questionInfo
        .innerHTML = `
        ${event.target.closest('.result-score').innerHTML}
        <button class="btn btn-close">Close</button>`;
    }

    if (event.target.classList.contains('btn-close')) {
      event.target.closest('body').classList.remove('preview');
    }

    if (event.target.classList.contains('download')) {
      download(event.target.getAttribute('download'), event.target.dataset.name);
    }
  });
}

function backToCategories(objUrl) {
  const linkBack = score.querySelector('.back-categories');
  linkBack.href = `#/${objUrl.resource}`;
  linkBack.textContent = `❮ Categories ${objUrl.resource}`;
}

function scoreHtml(objUrl) {
  const currentCategory = changeCategories(objUrl.resource)[objUrl.id_category - 1];
  const questions = generateQuestion(
    objUrl.id_category,
    objUrl.id_question,
    currentCategory,
  );
  questionsHtml(questions, currentCategory.score);
  backToCategories(objUrl);
  return score;
}

export default scoreHtml;
