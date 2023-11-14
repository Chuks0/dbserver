const { highlightWord } = require("../util/highlight");

/**
 * Middleware function for logging information about incoming HTTP requests.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the request-response cycle.
 * @returns {void} - Calls the next middleware function after logging request information.
 */
const routingLoger = (req, res, next) => {
  let text = `METHOD: ${req.method}, URL: ${req.url}`;
  text = highlightWord(text, req.method, 31);
  text = highlightWord(text, req.url, 34);
  console.log(text);
  if (req.method !== "GET") {
    console.log(req.body);
  }

  return next();
};

module.exports = {
  routingLoger,
};
