// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD2Ei8oCdvJf4h6gl2Bg0VJs4jB8ypxsEg",
    authDomain: "complaintdepartment-e7321.firebaseapp.com",
    databaseURL: "https://complaintdepartment-e7321.firebaseio.com",
    storageBucket: "complaintdepartment-e7321.appspot.com",
  };
  firebase.initializeApp(config);

//global variables


// How do we use the APIs?
//
var keywords = 'wife-funny-meme';
var key = 'AIzaSyB-LwbjvB0YnRRuGl-dV3VGGx66ujm-fck';
var cx = '003192956300846753352:1j_2oos-ga0'
var googlequeryURL = 'https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=' + cx + '&searchType=image&q=' + keywords;
var youtubequeryURL = 'https://www.googleapis.com/youtube/v3/search';

//Add firebase and setup initial database

$(document).ready(function(){
//They click on a complaint category
  //If they click a complaint call search.
    //Get keywords from firebase

  //Else if they add a complaint add it, then call search.
    //Bring up a modal

    //User enters description and keywords

    //Add to firebase
//Happens when they click complaint or after adding a complaint.
  function search() {
    var level = 0;
    $.ajax({ url: googlequeryURL, method: 'GET' })
      .done(function(results) {

        //For loop 3 times to display photos
        for (var i = 0; i < results.length; i++) {
          //Add image
          $('#apiInfo').append('<img src="' + results.items[i].link + '">');
          //Add the option to click yess or no, display button and text.

          //If Onclick yes run yes function

          level++;
        }
        //New for loop for the videos 3 times

          //Add videos

          //Add buttons yes/no

          //If click yes run yes function
          level++;
      })
  }

  function feelBetter(){
    //display text from array and return to main screen
  }


})
