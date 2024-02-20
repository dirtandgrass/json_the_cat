const { fetchBreedDescription, breedFetcher } = require('../modules/breedFetcher');
const { assert } = require('chai');

describe('breedFetcher', () => {
  it('returns a string description for a valid breed, asynchronously', async() => {
    const {name, description} = (await breedFetcher('Siberian'))[0];


    const expectedDesc = "The Siberians dog like temperament and affection makes the ideal lap cat and will live quite happily indoors. Very agile and powerful, the Siberian cat can easily leap and reach high places, including the tops of refrigerators and even doors.";
    const expectedName = "Siberian";

    // compare returned description
    assert.equal(expectedDesc, description.trim());
    assert.equal(expectedName, name.trim());
  });

  it('returns an error for an unfound breed, asynchronously', async() => {

    let err = null;
    try {
      await breedFetcher('Rottweiler');
    } catch (error) {
      err = error;
    }
    assert.equal(err, "No results found");
  });
});


describe('fetchBreedDescription', () => {
  it('returns a string description for a valid breed, via callback', (done) => {
    fetchBreedDescription('Siberian', (err, desc) => {
      // we expect no error for this scenario
      assert.equal(err, null);

      const expectedDesc = "The Siberians dog like temperament and affection makes the ideal lap cat and will live quite happily indoors. Very agile and powerful, the Siberian cat can easily leap and reach high places, including the tops of refrigerators and even doors.";

      // compare returned description
      assert.equal(expectedDesc, desc.trim());

      done();
    });
  });

  it('returns an error message via callback if the breed is not found', (done) => {
    fetchBreedDescription('Rottweiler', (err) => {
      // we expect an error for this scenario
      assert.equal(err, "No results found");

      done();
    });
  });
});