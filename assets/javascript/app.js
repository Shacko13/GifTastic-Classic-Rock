$(document).ready(function() {
	var topics = ["Led Zeppelin", "Pink Floyd", "The Who", "The Allman Brothers Band", "Van Halen", "Queen", "Lynyrd Skynyrd", "The Doors", "The Rolling Stones", "AC/DC"];


	function showBandsButtons() {
		$("#bandButtons").empty();
		  for (var i = 0; i < topics.length; i++) {
		  	var gifButton = $("<button>");
		  	  gifButton.addClass("band");
		  	  gifButton.attr("data-name", topics[i]);
		  	  gifButton.text(topics[i]);

		$("#bandButtons").append(gifButton);
	}
  }
	showBandsButtons();

$(document).on("click", ".band", function() {
	var b = $(this).html();
	console.log(b);

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=80c2d6bffdf5475bb0b4b08fe44bf797&limit=10";
		console.log(queryURL);
		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response) {
			var results = response.data;
				console.log(results);

			$("#gifsArea").empty();
		  		for (var j = 0; j < results.length; j++) {
		  		  var gifDiv = $("<div>");
		  		  var gifImage = results[j].images.fixed_height.url;
		  		  var still = results[j].images.fixed_height_still.url;
		  			  console.log(gifImage);
		  		  var bandImage = $("<img>").attr("src", still).attr("data-animate", gifImage).attr("data-still", still);
		  		  bandImage.attr("data-state", "still");
			$("#gifsArea").prepend(bandImage);
		 	bandImage.on("click", playsGif);

		 		  var rating = results[j].rating;
		 			  console.log(rating);
		 		  var showRating = $("<p>").text("Rating: " + rating);
			$("#gifsArea").prepend(showRating);

		  }

		});

		function playsGif() {
			var state = $(this).attr("data-state");
			    console.log(state);
			if (state == "still") {
				$(this).attr("src", $(this).data("animate"));
				$(this).attr("data-state", "animate");
			} else {
				$(this).attr("src", $(this).data("still"));
				$(this).attr("data-state", "still");
			}
		}

	})

	 	$(document).on("click", "#addBand", function() {
    		if ($("#addBands-input").val().trim() == "") {
      		  alert("Entry cannot be blank");
   			} else {
    		var bands = $("#addBands-input").val().trim();
    		topics.push(bands);
    		$("#addBands-input").val("");
    		showBandsButtons();
    		return false;
    		}

    });

	});



