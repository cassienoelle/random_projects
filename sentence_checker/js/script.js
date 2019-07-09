"use strict";

/*****************

Quiz Questions
Cassie Smith

Just randomly show some pre-determined quiz questions
Basic study tool

******************/

let numQuestions = 4;
let nextQuestion;
let $content;
let $sentences = [];
let $longSentences = [];
let $count = 0;
let $button;
let $text;
let $currentSentence;
let $currentText = [];

$(document).ready(function() {

  $content = $('#content');
  console.log($currentText);
  $sentences = $text.split(".");
  console.log($sentences);
  countWords($sentences);


});

function countWords(array) {
  for (let i = 0; i < array.length; i++) {
    $currentSentence = array[i].split(" ");
    if ($currentSentence[0] = " ") {
      $currentSentence.shift();
    }
    if ($currentSentence.length > 20) {
      console.log($currentSentence.length +': ' + array[i]);
      $content = $currentSentence.length +': ' + array[i];
      $currentText.push($content);
    }
  }
}
