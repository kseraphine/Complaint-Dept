// Initialize Firebase
var config = {
  apiKey: "AIzaSyD2Ei8oCdvJf4h6gl2Bg0VJs4jB8ypxsEg",
  authDomain: "complaintdepartment-e7321.firebaseapp.com",
  databaseURL: "https://complaintdepartment-e7321.firebaseio.com",
  storageBucket: "complaintdepartment-e7321.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

//global variables
var category;
var complaint;
var keywords;


// How do we use the APIs?
//var keywords = 'wife-funny-meme';
var key = 'AIzaSyB-LwbjvB0YnRRuGl-dV3VGGx66ujm-fck';
var cx = '003192956300846753352:1j_2oos-ga0'
var googlequeryURL = 'https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=' + cx + '&searchType=image&q=' + keywords;
var youtubequeryURL = 'https://www.googleapis.com/youtube/v3/search';

var keywords = 'bad-boss-funny';
var gKey = 'AIzaSyB-LwbjvB0YnRRuGl-dV3VGGx66ujm-fck';
var yKey = 'AIzaSyBqbCIjRdfs4cyO4wbp1Mk0n7JERQpTGeY';
var cx = '003192956300846753352:1j_2oos-ga0';
var googlequeryURL = 'https://www.googleapis.com/customsearch/v1?key=' + gKey + '&cx=' + cx + '&searchType=image&q=' + keywords;
var youtubequeryURL = 'https://www.googleapis.com/youtube/v3/search?key=' + yKey + '&part=snippet' + '&order=viewCount' + '&type=video' + '&videoDuration=short' + '&videoEmbeddable=true' + '&q=' + keywords;
var resultNum = 0;
var yesBtn = $('<button id="yes">Yes</button>');
var noBtn = $('<button id="no">No</button>');

var complaintCategory;

//Add firebase and setup initial database

$(document).ready(function(){


//They click on a complaint category

  $('.carousel-item').on('click', function() {

    complaintCategory = $(this).attr('data-category');
    console.log(complaintCategory);

    //Maria - If they click a complaint call search.
    //Get keywords from firebase
    //display the complaints
    database.ref('complaints').on("child_added", function(childSnapshot) {

      //console.log(childSnapshot.val());

      var currentComplaint = childSnapshot.val().complaint;
      var currentKeywords = childSnapshot.val().keywords;

      //console.log(currentComplaint);
      console.log(currentKeywords);
      $('#category').text(complaintCategory);

    });

  });
  
  //Else if they 



  //Maria - Else if they add a complaint add it, then call search.

    //Bring up a modal

    //User enters description and keywords

    //Add to firebase

    //On click add a complaint

   $('#submit-complaint').on('click', function() {
    
      var complaint = $('#complaint').val();
      var complaintKeywords = $('#keywords').val().trim().replace(/,/g, '').split(" ") + ', meme, ' + 'funny' ;
    
      var newComplaint = {
        complaint: complaint,
        keywords: complaintKeywords,
      }

      if (complaintCategory == 'family') {
        database.ref('complaints/family').push(newComplaint);
      } else if (complaintCategory == 'job') {
        database.ref('complaints/job').push(newComplaint);
      } else if (complaintCategory == 'school') {
        database.ref('complaints/school').push(newComplaint);
      } else if (complaintCategory == 'weather') {
        database.ref('complaints/weather').push(newComplaint);
      };
      console.log(newComplaint.complaint);
      console.log(newComplaint.keywords);
      console.log(complaintCategory);


  });

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
