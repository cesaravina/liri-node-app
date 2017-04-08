var keys = require("./keys.js");
var fs = require("fs");
var twitter = require('twitter');
var twitterID = '1905225721';
var spotify = require ('spotify');
var request = require ('express');
var express = require ('express');
var router = express.Router();

var client = new twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});

var command = process.argv[2];
var inputName = '';



if(command==='do-what-it-says'){
	fs.readFile('random.txt', 'utf8', function(err, data){
		var pretierData = data.split(',');
		command = pretierData[0];

		if(command==='my-tweets'){
			twitterFunction();
		}

		else if(command==='spotify-this-song'){
			theInputName();
			spotifyFunction(pretierData[1])

		}

		else if(command==='movie-this'){
			theInputName();
			omdbFunction(pretierData[1])

		}

	})
}else{





	if(command==='my-tweets'){
		twitterFunction();
	}





	else if(command==='spotify-this-song'){
		theInputName();
		spotifyFunction(inputName);



	}




	else if(command==='movie-this'){
		theInputName();
		omdbFunction(inputName);

	};

};






function theInputName(){

	var nodeArgs = process.argv;
	for (var i=3; i<nodeArgs.length; i++){

		if(i>3 && i<nodeArgs.length){

			inputName = inputName + "+" + nodeArgs[i];

		}

		else{

			inputName += nodeArgs[i];

		}
	}
}





function spotifyFunction(value){
	spotify.search({type: 'track', query: value }, function(err, data){
		if (err) {
			console.log('Error occurred: '+ err);
			return;
		}else if(value===""){
			var songUrl = "https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE";
			request(songUrl, function(err, response, body){

				var errorSpotifyLog = ["======================",
				"Your song on Spofity",
				"Artist Name : " + JSON.parse(body).artist[0].name,
				"Song Name: " + JSON.parse(body).name,
				"Preview: " + JSON.parse(body).preview_url,
				"Album Name: " + JSON.parse(body).album.name,
				"======================"
				]

				for (var i = 0; i<errorSpotifyLog.length; i++){
					fs.appendFile("log.txt", errorSpotifyLog[i]+ "\n", function(err){
					} )
					console.log(errorSpotifyLog[i])
				}

			})
		}else{

			var spotifylogText = ["======================",
			"Your song on Spofity",
			"Artist Name: " + data.tracks.items[0].artists[0].name,
			"Song Name: " + data.tracks.items[0].name,
			"Preview: " + data.tracks.items[0].preview_url,
			"Album Name: " + data.tracks.items[0].album.name,
			"======================"
			]

			for (var i=0; i<spotifylogText.length; i++){
				fs.appendFIle("log.txt", spotifylogText[i] + "\n", function(err){
				})
				console.log(spotifylogText[i]);
			}

		}
	})
}





function omdbFunction(value){

	var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&r=json";
	console.log(queryUrl);

	if (value === ""){

		queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json"
		request (queryUrl, function(error, response, body){

			var errorOmdbLog = ["======================",
			"Your movie on OMDB", 
			"Title: " + JSON.parse(body).Title,
			"Release Year: " + JSON.parse(body).Year,
			"Rating: " + JSON.parse(body).imdbRating,
			"Country of production: " + JSON.parse(body).Country,
			"Language: " + JSON.parse(body).Language,
			"Plot: " + JSON.parse(body).Plot,
			"Actors: " + JSON.parse(body).Actors,
			"Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value,
			"https://www.rottentomatoes.com/m/"+value,
			"======================"
			];

			for (var i = 0; i<errorOmdbLog.length; i++){
				fs.appendFIle("log.txt", errorOmdbLog[i]+ "\n", function(err){
				});
				console.log(errorOmdbLog[i]);
			}

		});
	}else{

		request(queryUrl, function(error, response, body){


			if(!error && response.status === 200){

				var omdblogText = ["======================",
				"Your movie on OMDB",
				"Title: " + JSON.parse(body).Title,
				"Release Year: " + JSON.parse(body).Year,
				"Rating: " + JSON.parse(body).imdbRating,
				"Country of production: " + JSON.parse(body).Country,
				"Language: " + JSON.parse(body).Language,
				"Plot: " + JSON.parse(body).Plot,
				"Actors: " + JSON.parse(body).Actors,
				"Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value,
				"https://www.rottentomatoes.com/m/"+value,
				"======================"
				];

				for (var i=0; i<omdblogText.length; i++){
					fs.appendFIle("log.txt", omdblogText[i]+"\n", function(err){
					});
					console.log(omdblogText[i]);
				};



			}

		});
	}
}



function twitterFunction(){
	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if(!error){

			for (var i=0; i<20; i++){

				var twitterLogText = ["======================",
				"My Tweets",
				tweets[i].created_at,
				tweets[i].text,
				"======================"
				];

				fs.appendFIle("log.txt", twitterLogText[i]+"\n", function(err){
				});
				console.log(twitterLogText[i]);
			}
		}
	})
}


 

