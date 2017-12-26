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

let output = Promise.resolve(findBestSong());

output.then(function(v) {
  console.log(v);
}, function(e) {
  console.log(e); // TypeError: Throwing
});

console.log(output);

function findBestSong(){
	var url = 'https://pitchfork.com/reviews/best/tracks/';

	return new Promise((resolve, reject) => {
		request(url, (err, res, body) => {
			if (err) return reject(err);

			var $ = cheerio.load(body);
			//console.log(body);
			var bestArtist = $('div.track-hero').find('ul.artist-list').text();
			var bestTrack = $('div.track-hero').find('h2.title').text();
			console.log(bestArtist);
			console.log(bestTrack);
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