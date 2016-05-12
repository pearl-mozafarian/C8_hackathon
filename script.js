/*********************************************** DOCUMENT.READY *****************************************/
$(document).ready(function () {
randomizeOptions();
    readAjax();
});//////end of document.ready

/*********************************************** GLOBAL VARIABLES *****************************************/
var iWant = {
    verbArray: ["read","listen to","watch"],
    nounArray: ["cat","dog"],
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
    var randomNoun = iWant.nounArray[generateRandomNumber(iWant.nounArray.length)]
}

/**
 * generateRandomNumber - this function generates a random number to be used in randomize options
 * @param {number}
 * @return {number}
 */
function generateRandomNumber(length) {
   return Math.floor(Math.random()*length);
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

/****************** WATCH ***************************/

/**
 * watchAjax
 */
/****************** LISTON TO ***********************/


/****************** READ LISTON TO ***********************/

/**
 * listenAjax
 */

