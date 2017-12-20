console.log('The bot is starting');

var Twit = require('twit');

var T = new Twit({
  consumer_key:         'c7OFtiQpCevBgpU2EPfUIjF2P',
  consumer_secret:      'PaZARttJhvTOI8YwzIKBB4qv03RALlZc6XpMb5LzDbiQaIsgFA',
  access_token:         '943617299814211586-gkIA0VcmUcu5QQRj4tkSVSTXbErCm3L',
  access_token_secret:  'wGDeJGWGlVYZP22U27MSaGV1snnH8UoKbtPYoCxhVEGuD',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})