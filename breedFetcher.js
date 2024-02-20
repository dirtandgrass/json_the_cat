const req = require('request');




// search thecatapi with the query parameter
const queryBreedInfo = async query => {
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


(async() => {
  // get the query
  const query = process.argv[2];
  if (!query) return console.log("Usage node breedFetcher.js <breed name>");

  try {
    const data = await queryBreedInfo(query);
    console.log(data.length + " result(s) found");
    data.forEach(breed => {
      console.log("Breed: " + breed.name);
      console.log("Description: " + breed.description);
    });
  } catch (error) {
    console.log(error);
  }


})();
