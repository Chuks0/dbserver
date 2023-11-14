/**
 * Changes the color of the words in the string.
 *
 * @param {string} text - Original Text.
 * @param {string} word - Words you want to chage.
 * @param {number} color - New Color (31 Red, 32 Green, 33 Yellow, 34 Blue, 35 Magenta, 36 Cyan, 37 White)
 * @returns {string} The text with color chages.
 */
const highlightWord = (text, word, color) => {
  const highlightedText = text.replace(
    new RegExp(word, "g"),
    `\x1b[${color}m${word}\x1b[0m`
  );
  return highlightedText;
};

module.exports = {
  highlightWord,
};
