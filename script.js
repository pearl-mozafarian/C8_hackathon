
$(document).ready(function () {
randomizeOptions();
});//////end of document.ready

/****************GLOBAL VARIABLES*******************/
var iWant = {
    verbArray: ["read","listen to","watch"],
    nounArray: ["cat","dog"],
    selectedVerb : null,
    selectedNoun: null
};
/*****************LANDING PAGE FUNCTIONS***********/
//randomizeOptions function for randomizing verbs and nouns in landing page

function randomizeOptions() {
    var randomVerb = iWant.verbArray[generateRandomNumber(iWant.verbArray.length)];
    var randomNoun = iWant.nounArray[generateRandomNumber(iWant.nounArray.length)]
}
//this function generates a random number to be used in randomize options
function generateRandomNumber(length) {
   return Math.floor(Math.random()*length);
}