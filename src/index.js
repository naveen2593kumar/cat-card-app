const { writeFile } = require("fs");
const { join } = require("path");
const blend = require("@mapbox/blend");

const { fetchCatCard } = require("./services/CatCardService");
const normalizeInput = require("./util/InputNormalize");

// handle user inputs
const argv = require("minimist")(process.argv.slice(2), {
  // allow user to pass options in a normalize way like using flags  "-c red" OR "--color red" etc
  alias: { t: 'text', w: 'width', h: 'height', c: 'color', s: 'size' },
});

/**
 * to fetch the cat card from API and merge them in a single image and save it on local
 * @param {*} input 
 */
const makeCatCard = async (input = argv) => {
  const catCardUserInput = normalizeInput(input);

  // create option objects for cat cards
  const catCardOptions = catCardUserInput.text.map(text => ({
    text,
    width: catCardUserInput.width,
    height: catCardUserInput.height,
    color: catCardUserInput.color,
    size: catCardUserInput.size,
  }));

  console.debug('Fetching the images'); // eslint-disable-line no-console
  const catCardResponsePromises = Promise.all(catCardOptions.map((cardOption) => fetchCatCard(cardOption)));

  catCardResponsePromises.then(resolvedCatCardResponses => {
    return Promise.all(resolvedCatCardResponses.map(response => response.buffer()));
  }).then((blendImagesInputList) => {
    console.debug('Images fetched.'); // eslint-disable-line no-console
    // we can provide some kind of layout mapping as well and using 
    // x y attribute and we can offer collage/gallery etc features as well
    // for the moment all images will be added in a row layout
    blend(
      blendImagesInputList
        .map((imageInputBuffer, idx) => ({
          buffer: imageInputBuffer,
          x: catCardUserInput.width * idx, // x position of each image starting first at Zero
          y: 0, // y position of each image starting first at Zero
        })),
      {
        width: catCardUserInput.width * blendImagesInputList.length, // totalWidth of Final Image
        height: catCardUserInput.height, // totalHeight of Final Image
        format: "jpeg" // format of Final Image file
      },
      (err, data) => {
        if (err) {
          console.error('ERROR: [BLEND]', err);
          return;
        }
        const fileOut = join(process.cwd(), `/cat-card.jpg`);
        writeFile(fileOut, data, "binary", (err) => {
          if (err) {
            console.error('ERROR: [FILESYSTEM]', err);
            return;
          }
          console.debug(`The file was saved at ${fileOut}!`);
        });
      })
  }).catch(err => {
    console.error('ERROR: [COMMON]', err);
  });
};

module.exports = makeCatCard;