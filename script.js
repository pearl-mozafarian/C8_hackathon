/*********************************************** DOCUMENT.READY *****************************************/
$(document).ready(function () {

    randomizeOptions();

    $(".now-button").click(nowClicked);
    
    listenAjax("cats");
    
    readAjax();

});//////end of document.ready

/*********************************************** GLOBAL VARIABLES *****************************************/
var iWant = {

    verbArray: ["read","listen","watch"],
    nounArray: ["cats","dogs"],
    queueArray: [],
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
 * @param length {number}
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
    iWant.selectedNoun = $(".noun").val();
    iWant.selectedVerb = $(".verb").val();
    switch (iWant.selectedVerb) {
        case "read": readAjax();
            break;
        case "listen": listenAjax();
            break;
        case "watch": watchAjax();
            break;
    }
}
/**************************************** AJAX CALLS ********************************************************/

/****************** READ AJAX ****************************/

/**
 * readAjax - pulling text of tweets from twitter api, and creating object with username, and text of tweet
 */

function readAjax() {
    $.ajax({
        dataType: 'json',
        data: {
            search_term: iWant.selectedNoun,
        },
        method: 'post',
        url: 'http://s-apis.learningfuze.com/hackathon/twitter/index.php',
        success: function(result) {
            for (i=0; i < result.tweets.statuses.length; i++){
                var tweet = result.tweets.statuses[i];

                var username = tweet.user.screen_name;
                var text = tweet.text;
                var name = tweet.user.name;
                var avatarUrl = tweet.user.profile_image_url_https;
                var retweets = tweet.retweet_count;
                var favorites = tweet.favorite_count;

                var tweet_object = {
                    'avatarUrl': avatarUrl,
                    'name': name,
                    'userName': '@' + username,
                    'text': text,
                    'retweets': retweets,
                    'favorites': favorites
                };

                iWant.queueArray.push(tweet_object);
            }
        }
    })
}

/****************** WATCH AJAX ***************************/

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


/****************** READ LISTEN TO ***********************/

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

/**************************************** Display Functions ********************************************************/


/******************DISPLAY READ ****************************/

/**
 * displayRead
 */
/******************DISPLAY WATCH ***************************/

/**
 * displayWatch
 */
/******************DISPLAY LISTEN TO ***********************/

/**
 * displayListen
 */

