
$(document).ready(function () {

});//////end of document.ready

/****************GLOBAL VARIABLES***************/
var iWant = {
    verb: ["read","listen to","watch"]
};
////////////randomizeOptions function for randomizing verbs and nouns in landing page



function readAjax() {
    $.ajax({
        dataType: 'json',
        data: {
            search_term: iWant.selectedNoun,
        }
        method: 'post',
        url: 's-apis.learningfuze.com/hackathon/twitter/index.php',
        success: function(result) {
            for (i=0; i < result.statuses; i++){
                queueArray[i] = result.statuses[i].text;
            }
            console.log(queueArray);
        }
    })
}
