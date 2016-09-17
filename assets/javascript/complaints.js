var keywords = 'bad-boss-funny';
var gKey = 'AIzaSyB-LwbjvB0YnRRuGl-dV3VGGx66ujm-fck';
var yKey = 'AIzaSyBqbCIjRdfs4cyO4wbp1Mk0n7JERQpTGeY';
var cx = '003192956300846753352:1j_2oos-ga0';
var googlequeryURL = 'https://www.googleapis.com/customsearch/v1?key=' + gKey + '&cx=' + cx + '&searchType=image&q=' + keywords;
var youtubequeryURL = 'https://www.googleapis.com/youtube/v3/search?key=' + yKey + '&part=snippet' + '&order=viewCount' + '&type=video' + '&videoDuration=short' + '&videoEmbeddable=true' + '&q=' + keywords;
var resultNum = 0;
var yesBtn = $('<button id="yes">Yes</button>');
var noBtn = $('<button id="no">No</button>');
//Add firebase and setup initial database

$(document).ready(function(){
//They click on a complaint category
  //Maria - If they click a complaint call search.
    //Get keywords from firebase

  //Maria - Else if they add a complaint add it, then call search.
    //Bring up a modal

    //User enters description and keywords

    //Add to firebase
//Happens when they click complaint or after adding a complaint.
  function search() {
    var level = 0;
    if (resultNum < 2) {
      $.ajax({ url: googlequeryURL, method: 'GET' })
      .done(function (results) {
        console.log("Images");
        console.log(results);

        $('#videoDiv').empty();
        $('#apiInfo').empty();

        //Add image
        $('#apiInfo').append('<img src="' + results.items[resultNum].link + '">');

        //Add the option to click yes or no, display button and text.
        $('#apiInfo').append('Do you feel better yet?');
        $('#apiInfo').prepend(yesBtn, noBtn);

        resultNum++;
        level++;
        console.log(resultNum);

        $('#no').on('click', function () {
          search();
        });

        //TODO: On YES click display text from array and return to main screen
        $('#yes').on('click', function () {
          $('#apiInfo').html('Yay! Glad you feel better.');
          $('#videoDiv').empty();
        });
      });
    }else if (resultNum == 2) {
      $.ajax({ url: youtubequeryURL, method: 'GET' })
        .done(function (results2) {
          console.log("Videos");
          console.log(results2);

          $('#videoDiv').empty();
          $('#apiInfo').empty();

          //Add videos
          $('#videoDiv').append('<iframe width="420" height="315" src="https://www.youtube.com/embed/' + results2.items[results2Num].id.videoId + '?autoplay=1"></iframe>');

          //Add buttons yes/no
          $('#apiInfo').append('Do you feel better yet?');
          $('#apiInfo').prepend(yesBtn, noBtn);

          resultNum++;
          level++;
          console.log(resultNum);

          $('#no').on('click', function () {
            $('#apiInfo').html('You have a major problem. Be careful out there.');
            $('#videoDiv').empty();
          });

          //TODO: On YES click display text from array and return to main screen
          $('#yes').on('click', function () {
            $('#apiInfo').html('Yay! Glad you feel better.');
            $('#apiInfo').empty();
          });
        });
    }
  }

  search();

});
