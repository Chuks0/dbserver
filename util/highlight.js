/**
 * Changes the color of the words in the string.
 *
 * @param {string} text - Original Text.
 * @param {string} word - Words you want to chage.
 * @param {string} color - New Color (
 * reset,bright,dim,underscore,blink,reverse,hidden,black,
 * red,green,yellow,blue,magenta,cyan,white,
 * BGblack,BGred,BGgreen,BGyellow,BGblue,BGmagenta,BGcyan,BGwhite
 * )
 * @returns {string} The text with color chages.
 */
const highlightWord = (text, word, color) => {
  const highlightedText = text.replace(
    new RegExp(word, "g"),
    `${COLOR(color)}${word}\x1b[0m`
  );
  return highlightedText;
};

const COLOR = (key) => {
  let color = "";
  switch (key) {
    case "reset":
      color = "\x1b[0m";
      break;
    case "bright":
      color = "\x1b[1m";
      break;
    case "dim":
      color = "\x1b[2m";
      break;
    case "underscore":
      color = "\x1b[4m";
      break;
    case "blink":
      color = "\x1b[5m";
      break;
    case "reverse":
      color = "\x1b[7m";
      break;
    case "hidden":
      color = "\x1b[8m";
      break;
    case "black":
      color = "\x1b[30m";
      break;
    case "red":
      color = "\x1b[31m";
      break;
    case "green":
      color = "\x1b[32m";
      break;
    case "yellow":
      color = "\x1b[33m";
      break;
    case "blue":
      color = "\x1b[34m";
      break;
    case "magenta":
      color = "\x1b[35m";
      break;
    case "cyan":
      color = "\x1b[36m";
      break;
    case "white":
      color = "\x1b[37m";
      break;
    case "BGblack":
      color = "\x1b[40m";
      break;
    case "BGred":
      color = "\x1b[41m";
      break;
    case "BGgreen":
      color = "\x1b[42m";
      break;
    case "BGyellow":
      color = "\x1b[43m";
      break;
    case "BGblue":
      color = "\x1b[44m";
      break;
    case "BGmagenta":
      color = "\x1b[45m";
      break;
    case "BGcyan":
      color = "\x1b[46m";
      break;
    case "BGwhite":
      color = "\x1b[47m";
      break;

    default:
      break;
  }
  return color;
};

module.exports = {
  highlightWord,
};
