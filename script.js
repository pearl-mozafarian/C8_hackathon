/*********************************************** DOCUMENT.READY *****************************************/
$(document).ready(function () {
    randomizeOptions();


    listenAjax("cats");
});//////end of document.ready

/*********************************************** GLOBAL VARIABLES *****************************************/
var iWant = {
    verbArray: ["read","listen to","watch"],
    nounArray: ["cats","dogs"],
    selectedVerb : null,
    selectedNoun: null,
    queueArray: []
};
/********************************** LANDING PAGE FUNCTIONS ************************************************/


/**
 * randomizeOptions - randomizeOptions function for randomizing verbs and nouns in landing page
 */

function randomizeOptions() {
    var randomVerb = iWant.verbArray[generateRandomNumber(iWant.verbArray.length)];
    var randomNoun = iWant.nounArray[generateRandomNumber(iWant.nounArray.length)]
}

/**
 * generateRandomNumber - this function generates a random number to be used in randomize options
 * @param length {number}
 * @return {number}
 */
function generateRandomNumber(length) {
   return Math.floor(Math.random()*length);
}

/**************************************** AJAX CALLS ********************************************************/

/****************** READ AJAX ****************************/

/**
 * readAjax
 */
/****************** WATCH AJAX***************************/

/**
 * watchAjax - calls youtube API using search criteria, returns array of video objects containing title and ID of each. Returns max 50 results.
 * @param input {string}
 */

function watchAjax(input) {
    $.ajax({

        dataType: 'json',
        data: {
            q: input,
            maxResults: 50
        },
        method: 'POST',
        url: "http://s-apis.learningfuze.com/hackathon/youtube/search.php",
        success: function (response) {
            if (response.success) {
                console.log(response);
                //push response into resultsArray
                iWant.queueArray.push(response.video);
                
                //call display function with resultsArray
                
                // return results array
            } else {
                console.log(response);

                //return error message
            }
        }

    });
}
/****************** LISTEN TO ***********************/

/**
 * listenAjax - calls iTunes API using search criteria, returns array of
 * @param input {string} - the search term to use
 */

function listenAjax(input) {
    //calls query with music as only criteria first
    $.ajax({

        dataType: 'jsonp',
        data: {
            term: input,
            media: "music"
        },
        method: 'GET',
        url: "https://itunes.apple.com/search",
        success: function (response) {
            if (response.success) {
                console.log(response);
                //push response into resultsArray

                //iWant.queueArray.push(response.video);

                //call second AJAX call with podcast as criteria

                $.ajax({

                    dataType: 'jsonp',
                    data: {
                        term: input,
                        media: "podcast"
                    },
                    method: 'GET',
                    url: "https://itunes.apple.com/search",
                    success: function (response) {
                        if (response.success) {
                            console.log(response);
                            //push response into resultsArray

                            //iWant.queueArray.push(response.video);

                            //call display function with resultsArray

                            // return results array
                        } else {
                            console.log(response);

                            //return error message
                        }
                    }

                });

            } else {
                console.log(response);

                //return error message
            }
        }

    });
}