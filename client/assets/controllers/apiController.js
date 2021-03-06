app.controller('apiController', function($scope, $location, $cookies){
  var self = this;

  $scope.user_name = $cookies.get('userName');

  console.log("cookies", $cookies.get('userName'));
  $(document).ready(function() {

  var OMDB_BASE_URL = "https://www.omdbapi.com/?i=";
  var GUIDE_BOX_API_KEY = 'rKqSP9tWheryWwVDGrdBaAZemausGy95';
  var GUIDE_BOX_BASE_URL = 'https://api-public.guidebox.com/v1.43/us/' + GUIDE_BOX_API_KEY + '/search/movie/title/';
  var quota = $.getJSON('https://api-public.guidebox.com/v1.43/us/' + GUIDE_BOX_API_KEY + '/quota', function(data){
    console.log(data);
  });
  var IMDB_URL = "https://www.imdb.com/title/";
  var ROTTEN_URL = "https://www.rottentomatoes.com/m/";

  //display popular movies by default on main page
  function defaultDisplayData(start=0, end=2) {
    var movieSearchURL = 'https://api-public.guidebox.com/v1.43/us/' + GUIDE_BOX_API_KEY + '/movies/all/' + start +'/' + end;
    $.getJSON(movieSearchURL, displaySearchData)
  }

  //search any movie title
  function getSearchDataFromApi(searchTerm, callback) {
      var query = GUIDE_BOX_BASE_URL + searchTerm + '/fuzzy';
      $.getJSON(query, callback)
  };

  // grab ratings from OMDB api call
  function getDataFromOMDB(imdbLink) {
    var search = OMDB_BASE_URL + imdbLink;
    $.getJSON(search, function(omdb){
      imdb_rating = omdb.imdbRating;
      var meta_rating = omdb.Metascore;
    });
  };

  function displaySearchData(data){
  var emptyImage = 'https://static-api.guidebox.com/misc/default_movie_240x342.jpg';
  if (data.results) {
    data.results.forEach(function(item) {
      var image = item.poster_240x342;
      if (image != emptyImage) {
        //get movie details if image exists from api
        var trailerLinksURL = 'https://api-public.guidebox.com/v1.43/US/' + GUIDE_BOX_API_KEY + '/movie/' + item.id;
        //grab individual elements from movies to display in dom
        $.getJSON(trailerLinksURL, function(data){
          var movieCard = '';
          var rated = data.rating;
          var genre = data.genres[0].title;
          var movieDescription = data.overview;
          var imdbLink = IMDB_URL + data.imdb;
          getDataFromOMDB(data.imdb);
          console.log('Movie object', data)
          var rottenTomatoes = ROTTEN_URL + data.rottentomatoes;
          var commonSenseMedia = data.common_sense_media;
          var metaCritic = data.metacritic;
          var trailerVideo = data.trailers.web[0].embed;
          var watchLinks = data.purchase_web_sources[0].link;
          var description =
            "<div class='cardDescription hidden'>" +
              "<h1 class='movie-title'>" + data.title + "</h1>" + "<button>Add to your CliqReel</button>"+
              "<h3 class='mpaa-rating'> Rated: " + rated +
              "<a class='commonsense' target='_blank' title='Common Sense Media' href=" + commonSenseMedia + " ><i class='fa fa-check-circle-o' aria-hidden='true'></i></a><br>" +"</h3>" +
              "<h5 class='genre'> Genre: " + genre + "</h5>" +
              "<div class='movieLinks'>" +
              "<a href=" + trailerVideo + " rel='trailervideo' autoplay title='Trailer' data-featherlight='iframe'>"+
                "<i class='fa fa-youtube-play fa-2x' aria-hidden='true'></i>" +
                "</a>" +
                "<a target='_blank' title='IMDB' href=" + imdbLink + "><i class='fa fa-imdb fa-2x' aria-hidden='true'></i></a>" +
                "<a target='_blank' title='Rotten Tomatoes' href=" + rottenTomatoes +"><i class='fa fa-circle fa-2x' aria-hidden='true'></i></a>" +
                "<a target='_blank'  title='Metacritic' href=" + metaCritic +"><i class='fa fa-meetup fa-2x' aria-hidden='true'></i></a>" +
              "</div>" +
              "<span class='movieText'>" + movieDescription + "</span><br>" +
              "<h5 class='watch'> Rent or Buy </h5>" + "<a target='_blank'  title='Rent/Buy' href=" + watchLinks +"><i class='fa fa-film fa-2x' aria-hidden='true'></i></a>" +
            "</div>";
            movieCard = "<div class='movieContainer'><img class='movieCard' src=" + image + ">" + description + "</div>";
          $('.js-search-results').append(movieCard);
        });
      }
    });
  } else {
    resultElement += '<p> no results <p>';
    ('.js-search-results').append(resultElement);
    }
  };

  $(document).on('click','.movieCard', function(){
    $(this).addClass("active");
    $(this).parent().find('.cardDescription').removeClass('hidden');
    $(this).parent().find('.cardDescription').hide();
    $('.movieCard').hide();
    $('.active').show();
    $(this).animate({
          left: '30px'
      }, 1000);
    $(this).parent().find('.cardDescription').show(1000);
  });

  $(document).on('click', '.active', function(){
    $(this).removeClass('active');
    $('.movieCard').show();
    $('.cardDescription').addClass('hidden');
  });

  //wait for a submit click
  function watchSubmit(){
    $('.js-search-form').submit(function(event){
      $('.js-search-results').empty();
      event.preventDefault();
      var query = $(this).find('.js-query').val();
      getSearchDataFromApi(query, displaySearchData);
    });
  }

  //show footer when scrolling to end of page
  $(window).scroll(function(){
      if ($(window).scrollTop() == $(document).height() - $(window).height()) {
          $('footer').show()
      } else {
        $('footer').hide();
      }
  });

  $(function(){
    $('.description').hide();
    $('footer').hide();
    defaultDisplayData();
    watchSubmit();
  });

  self.logout = function(){
    $cookies.remove('userID');
    $cookies.remove('userName');
    self.user_id   = '';
    self.user_name = '';
    $location.url('/login');
  }
  if ($cookies.get('userID') != null && $cookies.get('userID') != '' &&
      $cookies.get('userName') != null && $cookies.get('userName') != '' ) {
        self.user_id   = $cookies.get('userID');
        self.user_name = $cookies.get('userName');
        // self.index();
  } else {
    // No cookies - go home.
    // $location.url('/login');
  }
})

});

//load more content once you reach bottom of page
// $(window).scroll(function() {
//    if($(window).scrollTop() + $(window).height() == $(document).height()) {
//       start = end + 1;
//       end = start + 1;
//       defaultDisplayData(start, end);
//       displaySearchData();
//    }
// });

