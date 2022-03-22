import { Question } from './Question';

export class Category {
  constructor(index, name, questionArray) {
    this.index = index;
    this.name = name;
    this.questionArray = questionArray;
    this.score = [];
    this.tempScore = [];
  }

  generateQuestion(questionNumber) {
    const question = new Question(this.questionArray[questionNumber]);
    return question.questionHtml();
  }

  categoryHtml() {
    const catWrapper = document.createElement('a');
    catWrapper.setAttribute(
      'href',
      `#/${this.questionArray[0].type}/${this.index + 1}/question/1`,
    );
    catWrapper.classList.add('category');

    const result = this.score.filter((item) => item === 'true').length;
    if (result > 0) {
      catWrapper.classList.add('result');
    }

    const nameScore = document.createElement('div');
    nameScore.classList.add('name-score');
    nameScore.innerHTML = `
      <p class='name'>${this.name}</p>
      <p class="score"><span class='score-value'>${result}</span>/10</p>
      `;
    catWrapper.append(nameScore);

    const imgWrap = document.createElement('div');
    imgWrap.classList.add('img');
    imgWrap.innerHTML = `
    <div class="img">
      <a class="link-score-category" 
      href="#/${this.questionArray[0].type}/${+this.index + 1}/score">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="#000" 
      xmlns="http://www.w3.org/2000/svg">
        <path d="M21.9077 8.26094C21.8025 7.92078 21.6091 7.61758 21.3488
         7.38492C21.0885 7.15226 20.7716 6.99921 20.433 6.94272L15.1205 
         6.04277L12.6578 1.05433C12.5009 0.736759 12.2632 0.470365 11.9706 
         0.284378C11.6781 0.0983913 11.342 0 10.9993 0C10.6567 0 10.3206 
         0.0983913 10.028 0.284378C9.73549 0.470365 9.49773 0.736759 9.34086 
         1.05433L6.87814 6.04277L1.56574 6.94272C1.22752 7.0001 0.911003 
         7.15348 0.650909 7.38604C0.390815 7.61859 0.1972 7.92133 0.0913058 
         8.26104C-0.0145881 8.60074 -0.0286682 8.96429 0.0506104 
         9.31179C0.129889 9.65929 0.299463 9.97731 0.540726 10.231L4.33114 
         14.2139L3.51072 19.7585C3.45808 20.1117 3.49989 20.4731 3.63156 
         20.8031C3.76323 21.1331 3.97966 21.4188 4.25704 21.6289C4.53441 
         21.839 4.862 21.9652 5.20376 21.9938C5.54553 22.0223 5.88823 21.9521 
         6.19417 21.7908L10.9993 19.2639L15.8046 21.7908C16.1106 21.9518 
         16.4532 22.0218 16.7949 21.9931C17.1365 21.9643 17.4639 21.8381 
         17.7412 21.6281C18.0185 21.4181 18.2349 21.1325 18.3666 
         20.8027C18.4984 20.4729 18.5404 20.1116 18.4881 19.7585L17.6677 
         14.2139L21.4581 10.231C21.7001 9.97781 21.8702 9.65978 21.9496 
         9.31208C22.0289 8.96438 22.0144 8.60058 21.9077 8.26094ZM20.4167 
         9.15434L16.1052 13.6849L17.0385 19.9917C17.0501 20.0672 17.0414 
         20.1446 17.0133 20.2153C16.9853 20.286 16.939 20.3472 16.8797 
         20.3922C16.8203 20.4371 16.7502 20.4641 16.677 20.47C16.6038 
         20.476 16.5305 20.4607 16.4652 20.4259L10.9993 17.5516L5.53344 
         20.426C5.4681 20.4608 5.39479 20.4761 5.32164 20.4701C5.24848 
         20.4642 5.17833 20.4372 5.11897 20.3923C5.0596 20.3473 5.01334 
         20.2861 4.9853 20.2154C4.95726 20.1447 4.94854 20.0673 4.96011 
         19.9918L5.89351 13.6849L1.58201 9.1543C1.53053 9.10007 1.49435 
         9.03213 1.47744 8.9579C1.46054 8.88367 1.46356 8.80602 1.48618 
         8.73346C1.50879 8.6609 1.55013 8.59624 1.60566 8.54654C1.66119 
         8.49684 1.72878 8.46403 1.801 8.45171L7.84371 7.42807L10.645 
         1.75391C10.6785 1.68604 10.7293 1.6291 10.7918 1.58934C10.8543 1.54959 
         10.9261 1.52856 10.9993 1.52856C11.0726 1.52856 11.1444 1.54959 
         11.2069 1.58934C11.2694 1.6291 11.3202 1.68604 11.3537 1.75391L14.155 
         7.42807L20.1977 8.45171C20.2699 8.46403 20.3375 8.49684 20.393 
         8.54654C20.4485 8.59624 20.4899 8.6609 20.5125 8.73346C20.5351 
         8.80602 20.5381 8.88367 20.5212 8.9579C20.5043 9.03213 20.4682 
         9.10007 20.4167 9.1543L20.4167 9.15434Z"/>
      </svg>
      <p>Score</p>
      </a>
    </div>
    `;
    catWrapper.append(imgWrap);
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/horndron/image-data/master/img/${this.questionArray[0].imageNum}.jpg`;
    img.onload = () => {
      imgWrap.querySelector('.img').prepend(img);
    };

    return catWrapper;
  }

  scoreValue(value) {
    this.score.push(
      this.questionArray[this.questionNumber].author === value ? 'true' : 'false',
    );
  }
}

export default Category;
