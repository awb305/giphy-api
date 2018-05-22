// variables 

var athleteArray = ['LeBron James', 'Stephen Curry', 'Kevin Durant', 'Dwyane Wade', 'Michael Jordan', 'Kobe Bryant', 'lionel Messi', 'Cristiano Ronaldo', 'Neymar', 'Luis Suárez', 'Zlatan Ibrahimović', 'Tom Brady', 'Von Miller', 'Julio Jones', 'Antonio Brown', 'Aaron Rodgers', 'Ezekiel Elliot'];


//functions

function renderButtons() {
    $("#buttons-view").empty();
    athleteArray.forEach(function(i){
        var button = $('<button>');
        button.attr('data-name', i);
        button.addClass('btn btn-link');
        button.text(i);
        $("#buttons-view").append(button);
    });
  }



//main 

$(document).ready(function(){

    renderButtons();

    $("#addAthlete").on("click", function(event) {
    event.preventDefault();
    var name = $("#athlete-input").val()
    athleteArray.push(name);
    renderButtons();
    });

    $('body').on('click', '.btn.btn-link', function(){
    
        var athlete = $(this).attr("data-name");
        var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=Le2UREEC9T9vjEuuDOWrRcI7RsEGr4ZE&q=' + athlete +'&limit=12&offset=0&rating=PG&lang=en';
        
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
  
            console.log(response);
            
            var athleteDiv = $('#athlete-div');
            athleteDiv.empty();

            var gifArray = response.data;

            gifArray.forEach(function(i){
              var fullImage = $('<div>');
              fullImage.addClass('col-sm-3');
              fullImage.addClass('card')
              
              var image = $('<img>');
              image.attr('src', i.images.fixed_height_still.url);
              image.attr('data-state', 'still');
              image.attr('data-still', i.images.fixed_height_still.url);
              image.attr('data-animate', i.images.fixed_height.url);
              image.addClass('card-img-top gif');
              fullImage.append(image);
              
              var rating = $('<div>');
              rating.addClass('card-body');
              rating.text(i.rating);
              fullImage.append(rating);

              athleteDiv.append(fullImage);
            })
        });
      }).on('click', '.gif', function (){

        var state = $(this).attr("data-state");
   
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }

      });

});