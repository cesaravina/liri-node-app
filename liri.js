var keys = require(".keys.js");
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
	access_token_key: keys..twitterKeys.access_token_key,
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
}