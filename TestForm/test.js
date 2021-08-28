"use strict";
import quizItems from "./test-data.js";

const quizAnswers = {
  ...quizItems.map((item) => {
    return item.answer;
  }),
};

const userAnswers = {};

function calculateRightAnswers(rightAnswers, userAnswers) {
  let result = {};

  for (let key in rightAnswers) {
    if (userAnswers[key] === rightAnswers[key]) {
      result[key] = true;
    } else {
      result[key] = false;
    }
  }

  return result;
}

function calculateScore(result) {
  
  let finalScore = 0;
  for (let key in result){
    if(result[key] === true){
    finalScore += 20;}
  };

  return finalScore;
}

function getScoreText(finalScore) {
  const scoreArea = refs.modal.querySelector('#total-scores');
  const scoreTextArea = refs.modal.querySelector('#score-text');

  let textarea = (finalScore > 60) ? 'Отлично! Ты хорошо меня знаешь!' : 'Придется узнать меня получше';
  let area = `${finalScore}`;

  insertion(scoreArea, area);
 insertion(scoreTextArea, textarea);
}

function insertion(insertPoint, insertValue) {
  return insertPoint.insertAdjacentHTML("afterbegin", insertValue)
}

const refs = {
  testBlock: document.querySelector(".quiz-test"),
  openModalButton: document.querySelector('button[data-action="open-modal"]'),
  closeModalButton: document.querySelector('button[data-action="close-modal"]'),
  modal: document.querySelector('.modal'),
};

const testSections = createTestSections(quizItems);
insertion(refs.testBlock, testSections);

function createTestSectionMarkup({ question, choices, questionNum }) {
  const markup = `
    <div class="quiz-test-question">
        <h2 class="title">Вопрос ${questionNum}</h2>
        <span class="score">20 Баллов</span>
        <p class="question">${question}</p>
        <label for="${questionNum - 1}">
        <input type="radio" value="1" name="${
          questionNum - 1
        }" class="radio-button">${choices[0]}<br>
        </label>
        <label for="${questionNum - 1}">
        <input type="radio" value="2" name="${
          questionNum - 1
        }" class="radio-button">${choices[1]}<br>
        </label>
        <label for="${questionNum - 1}">
        <input type="radio" value="3" name="${
          questionNum - 1
        }" class="radio-button">${choices[2]}<br>
        </label>
    </div> 
    `;

  return markup;
}

function createTestSections(testData) {
  return testData.map((testItem) => createTestSectionMarkup(testItem)).join("");
}

refs.testBlock.addEventListener("submit", handleSubmit);
// refs.testBlock.addEventListener('click', handlerClick);

// function handlerClick(){
//   let checkedRadios = 0;
//   const allRadios = document.querySelectorAll('input');

//   allRadios.forEach(radio =>{
//     if(radio.checked){
//       checkedRadios += 1;
//     }
//   })

//   if(checkedRadios < 5 && checkedRadios === 0){
//     refs.openModalButton.setAttribute('disabled', true);
//   }
// }
    

function handleSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  formData.forEach((value, name) => {
    userAnswers[name] = Number(value);
  });

  let result = calculateRightAnswers(quizAnswers, userAnswers);
  let calculated = calculateScore(result);
  
  getScoreText(calculated);
}

refs.openModalButton.addEventListener("click", handleClickOpen);
refs.closeModalButton.addEventListener("click", handleClickClose);

function handleClickOpen() {
  const body = document.querySelector("body");
  body.classList.add("show-modal");
}

function handleClickClose() {
  const body = document.querySelector("body");
  body.classList.remove("show-modal");

  radioDisable()
}

function radioDisable() {
  const allRadios = document.querySelectorAll('input');
  allRadios.forEach(radio => {
    radio.setAttribute('disabled', true);
  })
  
}


 