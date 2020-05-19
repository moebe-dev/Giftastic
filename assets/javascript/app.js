$(document).ready(function () {
  var topics = ["Mr. Robot", "Silicon Valley", "Black Mirror", "Westworld", "The Big Bang Theory", "Altered Carbon", "The Feed", "Halt and Catch Fire", "Shark Tank", "South Park", "Rick and Morty", "You TV Show", "Ozark", "Friends", "The 100"];

  function displayInfo() {
    $('#show-view').empty();
    var topic = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=Vt1lGP9hVqZcgDPECztZFyx0jWEgeyf8";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        if (response.pagination.total_count == 0) {
          alert('Sorry, There Are No Gifs For This Topic!');
          var itemindex = topics.indexOf(topic);
          if (itemindex > -1) {
            topics.splice(itemindex, 1);
            renderButtons();
          }
        }

        var results = response.data;
        for (var j = 0; j < results.length; j++) {
          var newTopicDiv = $("<div class='show-name'>");
          var pRating = $('<p>').text('Rating: ' + results[j].rating.toUpperCase());
          var pTitle = $('<p>').text('Title: ' + results[j].title.toUpperCase());
          var gifURL = results[j].images.fixed_height_still.url;
          var gif = $('<img>');
          gif.attr('src', gifURL);
          gif.attr('data-still', results[j].images.fixed_height_still.url);
          gif.attr('data-animate', results[j].images.fixed_height.url);
          gif.attr('data-state', 'still');
          gif.addClass('animate-gif');
          newTopicDiv.append(pRating);
          newTopicDiv.append(pTitle);
          newTopicDiv.append(gif);
          $('#show-view').prepend(newTopicDiv);
        }
      });
  };

  function renderButtons() {
    $('.buttons-view').empty();
    for (var i = 0; i < topics.length; i++) {
      var createButtons = $('<button>');
      createButtons.addClass('topic btn btn-info');
      createButtons.attr('data-name', topics[i]);
      createButtons.text(topics[i]);
      $('.buttons-view').append(createButtons);
    }
  }

  function removeButton() {
    $("#show-view").empty();
    var topic = $(this).attr('data-name');
    var itemindex = topics.indexOf(topic);
    if (itemindex > -1) {
      topics.splice(itemindex, 1);
      renderButtons();
    }
  }

  function playGif() {
    var state = $(this).attr('data-state');
    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    }
    else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  }

  $("#add-show").on("click", function (event) {
    event.preventDefault();
    var show = $("#show-input").val().trim();
    if (topics.toString().toLowerCase().indexOf(show.toLowerCase()) != -1) {
      alert("Topic Already Exists");
    }
    else {
      topics.push(show);
      renderButtons();
    }
  });

  $(document).on("click", ".topic", displayInfo);
  $(document).on("click", ".animate-gif", playGif);
  $(document).on("dblclick", ".topic", removeButton);

  renderButtons();

});
