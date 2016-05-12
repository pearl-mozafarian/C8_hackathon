/*********************************************** DOCUMENT.READY *****************************************/
$(document).ready(function () {
randomizeOptions();
});//////end of document.ready

/*********************************************** GLOBAL VARIABLES *****************************************/
var iWant = {
    verbArray: ["read","listen","watch"],
    nounArray: ["cat","dog"],
    selectedVerb : null,
    selectedNoun: null
};
/********************************** LANDING PAGE FUNCTIONS ************************************************/


/**
 * randomizeOptions - randomizeOptions function for randomizing verbs and nouns in landing page
 */

function randomizeOptions() {
    var randomVerb = iWant.verbArray[generateRandomNumber(iWant.verbArray.length)];
    var randomNoun = iWant.nounArray[generateRandomNumber(iWant.nounArray.length)];
    console.log("random verb: ", randomVerb);
    displayOptions(randomVerb, randomNoun);
}

/**
 * generateRandomNumber - this function generates a random number to be used in randomize options
 * @param {number}
 * @return {number}
 */
function generateRandomNumber(length) {
   return Math.floor(Math.random()*length);
}
/**
 * displayOptions - this function generates a random number to be used in randomize options
 * @param {string, string}
 */
function displayOptions(randomVerb, randomNoun) {
    $(".noun").val(randomNoun);
    $(".verb option").attr("selected" , false);
    switch (randomVerb){
        case "listen": $(".verb option[value='listen']").attr("selected" , true);
            break;
        case "watch": $(".verb option[value='watch']").attr("selected" , true);
            break;
        case "read": $(".verb option[value='read']").attr("selected" , true);
            break;
    }
}

/**
 * nowClicked
 * @param 
 * @return 
 */

function nowClicked() {
    
}
/**************************************** AJAX CALLS ********************************************************/

/****************** READ AJAX ****************************/

/**
 * readAjax
 */
/****************** WATCH ***************************/

/**
 * watchAjax
 */
/****************** LISTON TO ***********************/

/**
 * listenAjax
 */

/**************************************** Display Functions ********************************************************/


/******************DISPLAY READ ****************************/

/**
 * displayRead
 */
/******************DISPLAY WATCH ***************************/

/**
 * displayWatch
 */
/******************DISPLAY LISTON TO ***********************/

/**
 * displayListen
 */