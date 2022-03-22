import { Question } from '../../Components/Question';
import { settingsValue } from '../Settings/setting';
import { categoryArtist, categoryPictures } from '../Categories/categories';
import './category.sass';

function changeCategories(value) {
  const ARTIST_CATEGORY = 'artist';
  if (value === ARTIST_CATEGORY) {
    return categoryArtist;
  }
  return categoryPictures;
}

function generateQuestion(cat, question, catObj) {
  const questionsCategory = [];

  catObj.questionArray.forEach((item) => {
    questionsCategory.push(new Question(cat, question, item));
  });
  return questionsCategory;
}

function scoreGetValue(arr) {
  const TRUE_VALUE_TEXT = 'true';
  const result = arr.filter((item) => item === TRUE_VALUE_TEXT).length;
  return result;
}

function scoreRaundOutput(parentElement, categoryObj, objuRL) {
  const RAUND_SCORE = 'score';
  if (objuRL.score_raund === RAUND_SCORE) {
    const scoreElem = parentElement.querySelector('.answer-checkers');
    const nextQuiz = `${objuRL.resource}`;
    const scoreValue = scoreGetValue(categoryObj.score);
    scoreElem.removeAttribute('id');
    scoreElem.classList.add('score-result');
    scoreElem.closest('section.question').classList.add('answer-result');

    scoreElem.innerHTML = `<div class="img"></div>
    <p class="title">Congratulations!</p>
    <p class="description">
    <span class="score-value">${scoreValue}</span>/<span>10</span>
    </p>
    <div class="btn-wrap">
    <a class="btn home" href="#/">Home</a>
    <a class="btn" href="#/${objuRL.id_category === 12 ? '' : nextQuiz}">Next quiz</a>
    </div>
    `;

    const img = new Image();
    img.src = '../images/congralation.svg';
    img.onload = () => {
      scoreElem.querySelector('.img').append(img);
    };
    scoreElem.addEventListener('click', (event) => {
      localStorage.setItem(
        `${objuRL.resource}${categoryObj.name}`,
        JSON.stringify(categoryObj.score),
      );

      if (event.target.classList.contains('home')) {
        document.querySelector('header').innerHTML = '';
      }
    });
  }
}

function category(objUrl) {
  const currentCategory = changeCategories(objUrl.resource)[objUrl.id_category - 1];
  const questions = generateQuestion(
    objUrl.id_category,
    objUrl.id_question,
    currentCategory,
  );
  const currentQuestion = questions[objUrl.id_question - 1];
  const currentQuestionHtml = questions[objUrl.id_question - 1]
    .questionHtml(currentCategory.tempScore);
  if (objUrl.id_question < 10) {
    questions[objUrl.id_question].questionHtml(currentCategory.tempScore);
  }
  if (objUrl.score_raund) {
    currentCategory.score = currentCategory.tempScore.map((item) => item);
    currentCategory.tempScore.length = 0;
  }

  scoreRaundOutput(currentQuestionHtml, currentCategory, objUrl);

  currentQuestion.timeToAnswer(
    settingsValue,
    currentCategory.tempScore,
    objUrl.score_raund,
  );
  return currentQuestionHtml;
}

export { changeCategories, generateQuestion };
export default category;
