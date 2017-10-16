
var inputArgs = process.argv;
// console.log(inputArgs);

if(inputArgs.length === 2){
  return console.log("Please enter a command for liri");
}

var command = inputArgs[2];
switch(command){
  case 'my-tweets': 
    getTweets();
    break;
  case 'spotify-this-song':
    spotifySong();
    break;
  case 'movie-this':
    getMovieInfo();
    break;
  case 'do-what-it-says':
    doWhatItSays();
    break;
  default: 
  console.log("Invalid command");
}

function getTweets(){
  var twitterKeys = require("./keys.js");
  var Twitter = require('twitter');
  var twitterClient = new Twitter(twitterKeys);

  var params = {screen_name: 'MichelleObama', count: 20};
  twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      tweets.forEach(function(tweet, index){
        console.log(index+1, tweet.text);
        console.log(tweet.created_at);
      });
    }
  });
}


function spotifySong(){
  var song = "The Sign";//inputArgs[3];


}

function getMovieInfo(){

}

function doWhatItSays(){

}


