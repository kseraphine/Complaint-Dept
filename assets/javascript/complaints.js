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
var gKey = 'AIzaSyB-LwbjvB0YnRRuGl-dV3VGGx66ujm-fck';
var yKey = 'AIzaSyBqbCIjRdfs4cyO4wbp1Mk0n7JERQpTGeY';
var cx = '003192956300846753352:1j_2oos-ga0';
var googlequeryURL = 'https://www.googleapis.com/customsearch/v1?key=' + gKey + '&cx=' + cx + '&searchType=image&q=' + keywords;
var youtubequeryURL = 'https://www.googleapis.com/youtube/v3/search?key=' + yKey + '&part=snippet' + '&order=viewCount' + '&type=video' + '&videoDuration=short' + '&videoEmbeddable=true' + '&q=' + keywords;
var resultNum = 0;
var level = 1;
var usedImages = [];
//var yesBtn = $('<button id="yes">Yes</button>');
//var noBtn = $('<button id="no">No</button>');
var complaintCategory;
var level1 = [
  'Your problem isn\'t the problem your reaction is the problem.',
  'Your problem is not knowing you\'re the problem',
  'Oh really? You know what that sounds like?   Not a problem',
  'I fail to see the problem here',
  'I going to file this one under \"Y\" for \"Your problem, not mine\"',
  'Relax – we\'re ALL crazy. It\'s not a competition',
  'Sorry about your first world problem',
  'Your problem is like  when your phone only charges if you angle and bend the cable a certain way',
];
var level2 = ['The only way to deal with your problem is…order a pizza!',
  'Alcohol probably won\'t fix your problems…but isn\'t it worth a shot or two?',
  'Don\'t take life so seriously. You\'ll never get out of it alive',
  'Always remember that you are absolutely unique, just like everyone else',
  'Whatever your problem is the answer is not in the fridge',
  'Face your problems\, don\'t facebook them',
  'But did you die?',
];
var level3 = ['Even bacon can\'t solve your problem!',
  'You\'ve got 99 problems…',
  'Running away from your problems counts as exercising.',
  'Whoooa',
  'It\'s time to relax',
  'Keep calm and chill',
  'Just relax and accept the crazy',
];

$(document).ready(function(){

	$(document).on('click', '.chosen-complaint', function(event) {
		$(this)
	});

	//User clicks complaint category
	$('.carousel-item').on('click', function() {

	    complaintCategory = $(this).attr('data-category');
	    $('#complaint-list').empty();
	    console.log('Category: ' + complaintCategory);

    	database.ref('complaints/' + complaintCategory).on("child_added", function(childSnapshot) {

      		var currentComplaint = childSnapshot.val().complaint;

	    	console.log(currentComplaint);
	    	$('#category').text(complaintCategory);

			//Get complains for selected category
      		$('#complaint-list').append('<p class="chosen-complaint" data-complaint="' + currentComplaint + '">' + currentComplaint + '</p>');

			//Click specific complaint from list
	      	$('.chosen-complaint').on('click', function() {
	      		console.log('clicked');

	      	   	var chosenComplaint = $(this).data('complaint');
	      	   	console.log(chosenComplaint);

				// Find all dinosaurs that are at least three meters tall.
				console.log(complaintCategory);
				var ref = firebase.database().ref('complaints/' + complaintCategory);

				ref.orderByChild("complaint").equalTo(chosenComplaint).on("child_added", function(snapshot) {
				  	console.log(snapshot.key);
				  	keywords = snapshot.val().keywords;
				  	console.log(keywords);
					googlequeryURL = 'https://www.googleapis.com/customsearch/v1?key=' + gKey + '&cx=' + cx + '&searchType=image&q=' + keywords;
					youtubequeryURL = 'https://www.googleapis.com/youtube/v3/search?key=' + yKey + '&part=snippet' + '&order=viewCount' + '&type=video' + '&videoDuration=short' + '&videoEmbeddable=true' + '&q=' + keywords;
					search();
					console.log(googlequeryURL);
				  	//$('#modal2').html(keywords);
				  	$('#modal2').openModal();
				 
				});
    
      });


	});

	$('#complaint-list').append('<p><a class="waves-effect waves-light modal-trigger" href="#modal1">File a complaint</a></p>');

	$('.modal-trigger').leanModal();

  });

	//On click add a complaint

   $('#submit-complaint').on('click', function() {
    
      var complaint = $('#complaint').val();
      var complaintKeywords = $('#keywords').val().trim().replace(/,/g, '').split(" ") + 'funny' ;
    
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
	    if (resultNum < 2) {
			$.ajax({ url: googlequeryURL, method: 'GET' })
			.done(function (results) {
			console.log("Images");
			console.log(results);

			$('#videoDiv').empty();
			$('#apiInfo').empty();

			var n = Math.floor(Math.random() * 9);

			while(usedImages.indexOf(n) != -1) {
			  n = Math.floor(Math.random() * 9);
			}

	        usedImages.push(n);
	        var randomImg = results.items[n].link;
	        console.log("N=" + n);
	        //Add image
	        $('#apiInfo').append('<img src="' + randomImg + '">');

	        //Add the option to click yes or no, display button and text.
	        //$('#apiInfo').prepend(yesBtn, noBtn);

	        resultNum++;
	        level++;
	        console.log("ResultNum " + resultNum);

	        $('#btnNo').on('click', function () {
	          console.log("level " + level);
	          search();
	        });

	        //On YES click display text from array and return to main screen
	        $('#btnYes').on('click', function () {
	          $('#apiInfo').empty();
	          $('#videoDiv').empty();
	          messages();
	          level = 0;
	        });
      });
    }else if (resultNum == 2) {
      $.ajax({ url: youtubequeryURL, method: 'GET' })
        .done(function (results2) {
          console.log("Videos");
          console.log(results2);

          $('#videoDiv').empty();
          $('#apiInfo').empty();

          var n2 = Math.floor(Math.random() * 4);
          var randomVid = results2.items[n2].id.videoId;
          console.log("N2=" + n2);
          //Add videos
          $('#videoDiv').append('<iframe width="420" height="315" src="https://www.youtube.com/embed/' + randomVid + '?autoplay=1"></iframe>');

          //Add buttons yes/no
          $('#apiInfo').append('Do you feel better yet?');
          //$('#apiInfo').prepend(yesBtn, noBtn);

          resultNum++;

          console.log("ResultNum " + resultNum);

          $('#btnNo').on('click', function () {
            $('#apiInfo').html('You have a major problem. Be careful out there.');
            $('#videoDiv').empty();
            level = 1;
          });

          //On YES click display text from array and return to main screen
          $('#btnYes').on('click', function () {
            $('#apiInfo').empty();
            $('#videoDiv').empty();
            messages();
            level = 1;
          });
        });
    }
  }
  function messages(){
    if (level == 1) {
      $('#apiInfo').html(level1[Math.floor(Math.random() * level1.length)]);
    }else if (level == 2) {
      $('#apiInfo').html(level2[Math.floor(Math.random() * level2.length)]);
    }else {
      $('#apiInfo').html(level3[Math.floor(Math.random() * level3.length)]);
    }
  };
  //search();

});
