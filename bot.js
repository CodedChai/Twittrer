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

var params = { 
	q: 'end of the world since:2012-12-21', 
	count: 1
};

//T.get('search/tweets', params, gotData);

findBestSong();

function findBestSong(){
	var url = 'https://pitchfork.com/reviews/best/tracks/';

	return new Promise((resolve, reject) => {
		request(url, (err, res, body) => {
			if (err) return reject(err);

			var $ = cheerio.load(body);
			//console.log(body);
			var bestTrack = $('div.track-hero').text();
			console.log(bestTrack);
			return resolve(bestTrack);
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