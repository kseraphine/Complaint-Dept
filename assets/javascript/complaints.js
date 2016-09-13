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

$(document).ready(function(){

  $.ajax({ url: googlequeryURL, method: 'GET' })
    .done(function(results) {
      console.log("------------------------------------")
      console.log("URL: " + googlequeryURL);
      console.log("------------------------------------")
      console.log(results);
      console.log("------------------------------------")
    })





})
