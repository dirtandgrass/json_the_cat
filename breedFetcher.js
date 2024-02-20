const req = require('request');


// search thecatapi with the query parameter
const getBreed = async query => {
  return new Promise((resolve) => {
    req(`https://api.thecatapi.com/v1/breeds/search?q=${query}`, (error, response, body) => {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);



      resolve(body);
    });
  });
};


(async() => {
  const data = await getBreed("pers");
  console.log(data);
})();
