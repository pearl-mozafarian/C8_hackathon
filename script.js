
$(document).ready(function () {
randomizeOptions();
});//////end of document.ready

/****************GLOBAL VARIABLES*******************/
var iWant = {
    verbArray: ["read","listen to","watch"],
    nounArray: ["cat","dog"],
    queueArray: [],
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

/******************AJAX CALLS **************************************************************/

/****************** READ AJAX ****************************/
function readAjax() {
    $.ajax({
        dataType: 'json',
        data: {
            search_term: iWant.selectedNoun
        },
        method: 'post',
        url: 'http://s-apis.learningfuze.com/hackathon/twitter/index.php',
        success: function(result) {
            for (i=0; i < result.tweets.statuses.length; i++){
                iWant.queueArray[i] = result.tweets.statuses[i].text;
            }
        }
    })
}

/****************** READ WATCH ***************************/

/****************** READ LISTON TO ***********************/

$(document).ready(function() {
    readAjax();
});