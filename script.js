/*********************************************** DOCUMENT.READY *****************************************/
$(document).ready(function () {
    //hiding all other wrappers beside the landing page
    // $('#read, #watch, #listen').hide();

    randomizeOptions();

    $(".now-button").click(nowClicked);
 
    $("#startOver").click(function () {
        iWant.queueArray = [];
        iWant.displayArray = [];

    });


});//////end of document.ready

/*********************************************** GLOBAL VARIABLES *****************************************/
var iWant = {

    verbArray: ["read","listen","watch"],
    nounArray: ["cats","dogs"],
    queueArray: [],
    displayArray: [],
    selectedVerb : null,
    selectedNoun: "cats"
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
            displayRead();
        }
    })
}

/****************** WATCH AJAX ***************************/

/**
 * watchAjax - calls youtube API using search criteria, returns array of video objects containing title and ID of each. Returns max 50 results.
 */

function watchAjax() {
    $.ajax({

        dataType: 'json',
        data: {
            q: iWant.selectedNoun,
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
            term: iWant.selectedNoun,
            media: "music"
        },
        method: 'GET',
        url: "https://itunes.apple.com/search",
        success: function (response) {
            if (response) {
                console.log("music", response);

                //push response into queueArray
                for(i=0; i<response.results.length; i++){
                    iWant.queueArray.push(response.results[i]);
                }

                console.log("array before randomize", iWant.queueArray);
                //randomize method on queue array
                var currentIndex = iWant.queueArray.length;
                var randomIndex;

                while (currentIndex > 0) {//if there are still indexes left to look at
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;

                    /*switches two indexes with use of variable for storing value of first to be switched*/
                    var swap = iWant.queueArray[currentIndex];
                    iWant.queueArray[currentIndex] = iWant.queueArray[randomIndex];
                    iWant.queueArray[randomIndex] = swap;
                }

                console.log("array after randomize", iWant.queueArray);
                //call displayListen function
                //displayListen();

            } else {
                console.log("music error", response);

                //return error message
            }
        }

    });

    $.ajax({

        dataType: 'jsonp',
        data: {
            term: input,
            media: "podcast"
        },
        method: 'GET',
        url: "https://itunes.apple.com/search",
        success: function (response) {
            if (response) {
                console.log("podcast," , response);

                //push response into queueArray
                for(i=0; i<response.results.length; i++){
                    iWant.queueArray.push(response.results[i]);
                }

                console.log("array before randomize", iWant.queueArray);
                //randomize method on queue array
                var currentIndex = iWant.queueArray.length;
                var randomIndex;

                while (currentIndex > 0) {//if there are still indexes left to look at
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;

                    /*switches two indexes with use of variable for storing value of first to be switched*/
                    var swap = iWant.queueArray[currentIndex];
                    iWant.queueArray[currentIndex] = iWant.queueArray[randomIndex];
                    iWant.queueArray[randomIndex] = swap;
                }

                console.log("array after randomize", iWant.queueArray);

                // return results array
                return response;

            } else {
                //return error message
                console.log("podcast error", response);
            }
        }

    });
}

/**************************************** Display Functions ********************************************************/


/******************DISPLAY READ ****************************/

/**
 * displayRead - takes the values of each object in the queueArray and injects them into the DOM
 */

function displayRead() {
    $('#landing').hide();
    $('#read').show();

    for(i = 0; i <= 3; i++) {
        var tweet = iWant.queueArray[i];
        var tweetdiv = '#tweet' + i;
        var avatar = tweetdiv + ' .avatar';
        var text = tweetdiv + ' .text';
        var name = tweetdiv + ' .name';
        var userName = tweetdiv + ' .userName';
        var retweets = tweetdiv + ' .retweets';
        var favorites = tweetdiv + ' .favorites';
        
        $(avatar).attr('src', tweet.avatarUrl);
        $(text).text(tweet.text);
        $(name).text(tweet.name);
        $(userName).text(tweet.userName);
        $(retweets).text(tweet.retweets);
        $(favorites).text(tweet.favorites);
        
    }
}

/******************DISPLAY WATCH ***************************/

/**
 * displayWatch - displays
 */
/******************DISPLAY LISTEN TO ***********************/

/**
 * displayListen - pulls a random song/podcast out of the queueArray and displays that item in the listen element of the page
 */

