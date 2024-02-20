const req = require('request');

req('https://api.thecatapi.com/v1/breeds/search?q=sib', (error, response, body) => {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', body);


});
