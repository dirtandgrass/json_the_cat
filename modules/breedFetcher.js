const req = require("request");
// search thecatapi with the query parameter
const breedFetcher = async query => {
  return new Promise((resolve,reject) => {
    req(`https://api.thecatapi.com/v1/breeds/search?q=${query}`, (error, response, body) => {

      // http request error
      if (error) reject(error);
      // http response error
      if (response.statusCode !== 200) reject(`${response.statusCode}:\n${body}`);

      // valid response (but could have no results)
      const jsonBody = JSON.parse(body);

      // no results
      if (jsonBody.length === 0) reject("No results found");

      // results
      resolve(jsonBody);
    });
  });
};


// uses a callback to return the description of the breed, so can follow activity
const fetchBreedDescription = (breedName,callback) => {
  const p = breedFetcher(breedName);
  p.then(data => {
    callback(null,data[0].description);
  }).catch(error => {
    callback(error,null);
  });
};


const catEmojis = ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾","🐈‍⬛"];
const randomCatEmoji = () => {
  return catEmojis[Math.floor(Math.random() * catEmojis.length)];
};

module.exports = { breedFetcher, fetchBreedDescription, randomCatEmoji };