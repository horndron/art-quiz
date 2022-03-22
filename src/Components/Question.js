import images from '../js/images';
import rightAnswer from '../right-answer.mp3';
import wrongAnswer from '../wrong-answer.mp3';
import roundEnd from '../round.mp3';

const QUESTION_TYPE = ['artist', 'pictures'];
const TRUE_VALUE_TEXT = 'true';
const FALSE_VALUE_TEXT = 'false';

export class Question {
  constructor(category, question, dataQuestion) {
    this.category = category;
    this.currentQuestion = question;
    this.author = dataQuestion.author;
    this.name = dataQuestion.name;
    this.year = dataQuestion.year;
    this.imageNum = dataQuestion.imageNum;
    this.type = dataQuestion.type;
    this.questionContainer = document.createElement('section');
    this.questionContainer.className = 'question';
    this.outputHtml = `<div class="overhidden"></div>
    <div class="container question-container">
        <h1></h1>
      </div><div class="answer-checkers" id="answer-checkers"></div>`;
    this.questionContainer.innerHTML = this.outputHtml;
    this.timer = 0;
  }

  answerVariants(arr) {
    const answers = [];

    if (this.type === QUESTION_TYPE[0]) {
      answers.push(this.author);

      while (answers.length < 4) {
        const randomVariant = this.randomAnswer(arr);
        const variant = arr[randomVariant].author;
        if (arr.indexOf(variant) === -1) {
          answers.push(variant);
        }
      }
    }

    if (this.type === QUESTION_TYPE[1]) {
      answers.push(this.imageNum);

      while (answers.length < 4) {
        const randomVariant = this.randomAnswer(arr);
        const variant = arr[randomVariant].imageNum;
        if (this.author !== arr[randomVariant].author) {
          answers.push(variant);
        }
      }
    }
    this.shuffle(answers);

    return answers;
  }

  randomAnswer(arr) {
    return Math.floor(Math.random() * arr.length);
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  prepereHeaderQuestions() {
    const CROSS_SYMBOL = '&#x2716';
    const header = document.querySelector('header');
    header.innerHTML = '';
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('container');

    const homeReturn = document.createElement('div');
    homeReturn.classList.add('home-return');
    homeReturn.innerHTML = `
    <button class="btn-cancel cancel">${CROSS_SYMBOL}</button>
    <p class="title">Where do you want to go out?</p>
    <div class="btn-wrap">
      <a href="#/" class="btn home">Home</a>
      <a class="btn home" href="#/${this.type}">Categories</a>
    </div>`;
    headerContainer.appendChild(homeReturn);

    homeReturn.addEventListener('click', (event) => {
      const body = event.target.closest('body');

      if (event.target.classList.contains('home')) {
        body.classList.remove('close-category');
        headerContainer.innerHTML = '';
      }

      if (event.target.classList.contains('cancel')) {
        body.classList.remove('close-category');
      }
    });

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-question');
    closeBtn.innerHTML = `${CROSS_SYMBOL}`;
    headerContainer.appendChild(closeBtn);

    closeBtn.addEventListener('click', (event) => {
      const body = event.target.closest('body');
      body.classList.add('close-category');
    });

    const timeToAnswer = document.createElement('div');
    timeToAnswer.classList.add('time-to-answer');
    headerContainer.appendChild(timeToAnswer);

    header.classList.add('header');
    header.append(headerContainer);
  }

  questionHtml(arrTmpScore) {
    this.prepereHeaderQuestions();

    const questionElement = this.questionContainer
      .querySelector('.question-container');
    const answerWrap = document.createElement('div');
    answerWrap.classList.add('answer-variant');
    const answerArr = this.answerVariants(images);

    if (this.type === 'artist') {
      questionElement.querySelector('h1')
        .textContent = 'Who is the author of this picture?';
      const imgWrap = document.createElement('div');
      imgWrap.classList.add('img');
      questionElement.append(imgWrap);
      const listAnswer = this.getListAnswerQuestion(arrTmpScore);

      const image = new Image();
      image.src = `https://raw.githubusercontent.com/horndron/image-data/master/img/${this.imageNum}.jpg`;
      image.onload = () => {
        questionElement.querySelector('.img').append(image);
        questionElement.querySelector('.img').append(listAnswer);
      };

      for (let i = 0; i < answerArr.length; i += 1) {
        const answer = document.createElement('div');
        answer.classList.add('btn');
        answer.setAttribute('data-value', answerArr[i]);
        answer.textContent = answerArr[i];
        answerWrap.append(answer);
      }
    }

    if (this.type === 'pictures') {
      this.questionContainer.classList.add('pictures-quiz');
      questionElement.querySelector('h1').textContent = `What did pictures ${this.author}`;

      for (let index = 0; index < answerArr.length; index += 1) {
        const answer = new Image();
        answer.classList.add('btn', 'pictures');
        answer.setAttribute('data-value', answerArr[index]);
        answer.src = `https://raw.githubusercontent.com/horndron/image-data/master/img/${answerArr[index]}.jpg`;
        answer.onload = () => {
          answerWrap.append(answer);
        };
      }
    }

    questionElement.append(answerWrap);
    const questionNumber = +this.currentQuestion === 10 ? '10/score' : +this.currentQuestion + 1;
    const answerCheckers = this.questionContainer.querySelector('#answer-checkers');
    answerCheckers.innerHTML = `
    <div class="img">
    <img src="https://raw.githubusercontent.com/horndron/image-data/master/img/${this.imageNum}.jpg">
    </div>
    <p class="title">${this.name}</p>
    <p class="description"><span>${this.author}</span>, <span>${this.year}</span></p>
    <a href="#/${this.type}/${this.category}/question/${questionNumber}" class="btn next-question">Next</a>`;

    this.answerListener(arrTmpScore);
    return this.questionContainer;
  }

  answerChecked(value) {
    return (value === this.author && (QUESTION_TYPE.indexOf(this.type) !== -1))
      ? TRUE_VALUE_TEXT : FALSE_VALUE_TEXT;
  }

  answerListener(arr) {
    const buttons = this.questionContainer.querySelector('.answer-variant');
    const nextQuestion = this.questionContainer.querySelector('.next-question');

    const rightAudio = new Audio();
    rightAudio.src = rightAnswer;

    const wrongAudio = new Audio();
    wrongAudio.src = wrongAnswer;

    const roundEndAudio = new Audio();
    roundEndAudio.src = roundEnd;

    buttons.addEventListener('click', (event) => {
      if (event.target.classList.contains('btn')) {
        this.questionContainer.classList.add('answer-result');
        const currentAnswer = this.answerChecked(event.target.dataset.value);
        this.questionContainer
          .querySelector('#answer-checkers').classList.add(currentAnswer);

        if (currentAnswer === TRUE_VALUE_TEXT) {
          rightAudio.play();
        } else {
          wrongAudio.play();
        }

        arr[this.currentQuestion - 1] = currentAnswer;

        nextQuestion.addEventListener('click', () => {
          this.questionContainer.classList.remove('answer-result');

          if (this.currentQuestion === '10') {
            this.questionContainer.classList.add('score-result');
            roundEndAudio.play();
          }
        });
      }
    });
  }

  getListAnswerQuestion(arr) {
    const listAnswer = document.createElement('div');
    listAnswer.classList.add('list-answer');

    for (let index = 0; index < 10; index += 1) {
      const answer = document.createElement('span');
      answer.className = arr[index] ? arr[index] : '';

      listAnswer.append(answer);
    }
    return listAnswer;
  }

  timeToAnswer(settingObj, arrayAnswers, pathScore) {
    const buttons = this.questionContainer.querySelector('.answer-variant');
    let time = settingObj.timeToAnswer;
    const timerValue = document.querySelector('.time-to-answer');
    timerValue.textContent = time;

    if (settingObj.timeGame === TRUE_VALUE_TEXT && pathScore !== 'score') {
      const timeAnswer = setInterval(() => {
        time -= 1;
        timerValue.textContent = time;
        if (time === 0) {
          arrayAnswers[this.currentQuestion - 1] = FALSE_VALUE_TEXT;
          this.questionContainer.classList.add('answer-result');
          this.questionContainer
            .querySelector('#answer-checkers').classList.add(FALSE_VALUE_TEXT);
          clearInterval(timeAnswer);
        }
      }, 1000);

      buttons.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn')) {
          clearInterval(timeAnswer);
        }
      });
    }
  }
}

export default Question;
