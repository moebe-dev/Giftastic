var topics = ["Mr. Robot", "Silicon Valley", "Black Mirror", "Westworld", "The Big Bang Theory", "Altered Carbon", "The Feed", "Halt and Catch Fire", "Shark Tank", "South Park", "Rick and Morty", "You TV Show", "Ozark"];

var button;
var newTopic = "";

var buttonGenerator = function () {

	$("#buttonArea").empty();

	for (i = 0; i < topics.length; i++) {
		button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-warning").attr("data", topics[i]);
		$("#buttonArea").append(button);
	};
}

$("#buttonArea").on("click", ".btn", function () {
	var thing = $(this).attr("data");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thing + "&api_key=Vt1lGP9hVqZcgDPECztZFyx0jWEgeyf8";

	$.ajax({
		url: queryURL,
		method: "GET"

	}).done(function (response) {
		console.log(response);

		var results = response.data;

		for (var i = 0; i < results.length; i++) {
			var topicDiv = $("<div>");


			var p = $("<p>");
			p.text(results[i].rating);
			var p = $("<p>").text("Rating: " + results[i].rating);

			var topicImage = $("<img>").addClass("orangeBorder");


			topicImage.attr("src", results[i].images.fixed_height_still.url);
			topicImage.attr("data-still", results[i].images.fixed_height_still.url);
			topicImage.attr("data-animate", results[i].images.fixed_height.url)
			topicImage.attr("data-state", "still")
			topicImage.addClass("gif");

			topicDiv.append(topicImage);
			topicDiv.append(p);
			$("#gifArea").prepend(topicDiv);
		}
	})
})

$("#gifArea").on("click", ".gif", function (event) {
	event.preventDefault();
	var state = $(this).attr("data-state");
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}

})

$(".submit").on("click", function (event) {
	event.preventDefault();

	newTopic = $("#topic-input").val();
	topics.push(newTopic);
	console.log(topics);
	buttonGenerator();
});

buttonGenerator();
