const { breedFetcher,randomCatEmoji } = require('./modules/cats.js');

(async() => {
  // get the query term from the command line
  const query = process.argv[2];
  if (!query) return console.log("Usage node breedFetcher.js <breed name>");


  try {
    const data = await breedFetcher(query);
    // fancy output with emojis
    console.log(`🔍 ${data.length} result(s) found`);
    // show each result
    data.forEach(breed => {
      console.log(`${randomCatEmoji()} ${breed.name} ${randomCatEmoji()}`);
      console.log(breed.description);
    });
  } catch (error) {
    console.log(error);
  }

})(); // run the f(x) immediately
