console.log('The bot is starting');

var Twit = require('twit');
var request = require('request');
var cheerio = require('cheerio');

var ROOT = 'https://pitchfork.com';

var T = new Twit({
  consumer_key:         'c7OFtiQpCevBgpU2EPfUIjF2P',
  consumer_secret:      'PaZARttJhvTOI8YwzIKBB4qv03RALlZc6XpMb5LzDbiQaIsgFA',
  access_token:         '943617299814211586-gkIA0VcmUcu5QQRj4tkSVSTXbErCm3L',
  access_token_secret:  'wGDeJGWGlVYZP22U27MSaGV1snnH8UoKbtPYoCxhVEGuD',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


tweetSong();

// Check the song and tweet every 12 hours
setInterval(tweetSong, 1000*60*60*12);

function tweetSong(){
	let output = Promise.resolve(findBestSong());


	output.then(function(v) {
	  	let tweetStatus = 'I recommend that you give a listen to ' + v;
	  	  	console.log(tweetStatus);
		var tweet = { 
			status: tweetStatus
		}
		if(shouldTweet(tweetStatus)){
			console.log("It's okay to tweet out.");
			T.post('statuses/update', tweet, tweeted);
		} else {
			console.log("I already tweeted this out, I don't want to spam.");
		}

	
		
	}, function(e) {
	  console.log(e); // TypeError: Throwing
	});
}


// False means don't tweet anything
function shouldTweet(tweetStatus){
	T.get('search/tweets', { q: tweetStatus, count: 1 }, function(err, data, response) {
	  if(data['statuses'][0]['user']['name'] == 'MusicRec')
	  {
	  	return false;
	  } else {
	  	return true;
	  }
	})
}

function findBestSong(){
	var url = 'https://pitchfork.com/reviews/best/tracks/';

	return new Promise((resolve, reject) => {
		request(url, (err, res, body) => {
			if (err) return reject(err);

			var $ = cheerio.load(body);
			var bestArtist = $('div.track-hero').find('ul.artist-list').text();
			var bestTrack = $('div.track-hero').find('h2.title').text();

			return resolve(bestTrack + " by " + bestArtist);
		})
	}).catch((err) => {
			console.error(err);
		})
}

function gotData(err, data, response){
	var tweets = data.statuses;
	for(var i = 0; i < tweets.length; i++){
		console.log(tweets[i].text);
	}
}

function tweeted(err, data, response){
	if(err){
		console.log("Something went wrong! Perhaps it was already posted.");
	} else {
		console.log(data);
	}
}