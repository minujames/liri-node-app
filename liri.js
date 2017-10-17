
var inputArgs = process.argv;

if(inputArgs.length === 2){
  return console.log("Please enter a command for liri");
}

var command = inputArgs[2];

var queryString = inputArgs.slice(3).join("+");
console.log("qStr: ", queryString);

doAction(command, queryString);

function doAction(command, queryString){
  switch(command){
    case 'my-tweets': 
      getTweets();
      break;
    case 'spotify-this-song':
      spotifySong(queryString);
      break;
    case 'movie-this':
      getMovieInfo(queryString);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default: 
      console.log("Invalid command");
  }
}

function getTweets(){
  var twitterKeys = require("./keys.js");
  var Twitter = require('twitter');
  var twitterClient = new Twitter(twitterKeys);

  var params = {screen_name: 'MichelleObama', count: 20};
  twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      tweets.forEach(function(tweet, index){
        console.log("--------------------------------------------------");
        console.log(index + 1, tweet.text);
        console.log("Created At: ", tweet.created_at);
        console.log("--------------------------------------------------");
      });
    }
  });
}

function spotifySong(song){
  var songName =  (song === undefined || song === "") ? "The Sign": song; //inputArgs[3];

  var Spotify = require('node-spotify-api');
 
  var spotify = new Spotify({
    id: 'b82b7d215c52431d855a0e11160402a8',
    secret: '376bd62095bd4ff5880f9b62c8a3e6a0'
  });
   
  spotify.search({ type: 'track', query: songName}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    data.tracks.items.forEach(function(track){
      var artistsArray = [];
      track.artists.forEach(function(artist){
        artistsArray.push(artist.name);
      });

      console.log("--------------------------------------------------");
      console.log("Artists: ", artistsArray.join(", "));
      console.log("Song Name: ", track.name);
      console.log("Preview Link: ", track.preview_url);
      console.log("Album: ", track.album.name)
      console.log("--------------------------------------------------");
    });
  });
}

function getMovieInfo(movie){

  var request = require("request");
  var movieName = (movie === undefined || movie === "")? "Mr. Nobody." : movie;
  console.log(movieName);

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=40e9cece&type=movie";

  request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {
    var movieObj = JSON.parse(body);

    console.log("--------------------------------------------------");
    console.log("Title: ", movieObj.Title);
    console.log("Release Year: ", movieObj.Year);
    console.log("IMDB Rating: ", movieObj.imdbRating);

    for(let rating of movieObj.Ratings){
      if(rating.Source.match(/Rotten Tomatoes/i)){
        console.log("Rotten Tomatoes Rating: ", rating.Value);
        break;
      }
    }

    console.log("Country: ", movieObj.Country);
    console.log("Language: ", movieObj.Language);
    console.log("Plot: ", movieObj.Plot);
    console.log("Actors: ", movieObj.Actors);
    console.log("--------------------------------------------------");    
  }
});

}

function doWhatItSays(){
  var fs = require("fs");
  var readline = require('readline');

  var rl = readline.createInterface({
    input: fs.createReadStream('random.txt')
  });

  rl.on('line', function (line) {
    console.log(line);
    var dataArr = line.split(",");
    doAction(dataArr[0], dataArr[1]);
  });
}


