// as request has been deprecated, https://www.npmjs.com/package/request, so node-fetch is suitable alternative with less than a kb size.
const fetch = require("node-fetch");
const defaultOptions = require("../model/DefaultOptions");

const BASE_URL = "https://cataas.com/cat/says/";

/**
 * to fetch the Image responses from API
 * @param {*} catCardOption object 
 */
const fetchCatCard = async ({
  text = defaultOptions.text[0],
  width = defaultOptions.width,
  height = defaultOptions.height,
  size = defaultOptions.size,
  color = defaultOptions.color,
}) => {
  // encodeURIComponent is used to retain the special charaters in text
  const url = `${BASE_URL}${encodeURIComponent(text.trim())}?width=${width}&height=${height}&size=${size}&color=${color}`;
  return fetch(url);
};

exports.fetchCatCard = fetchCatCard;
