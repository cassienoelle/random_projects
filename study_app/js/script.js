"use strict";

/*****************

Quiz Questions
Cassie Smith

Just randomly show some pre-determined quiz questions
Basic study tool

******************/

let numQuestions = 4;
let nextQuestion;
let $question;
let $response;

$(document).ready(function() {

  $question = $('#question');
  $response = $('#response');
  loadQuestion();

  $question.on('click', loadQuestion);

});

function loadQuestion() {
  nextQuestion = getRandomElement(cybernetics);
  $question.text(nextQuestion);
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
