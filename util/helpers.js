const utils = require("../utils");

const q = () => {
  console.log("Exiting server...");
  process.exit(); // Terminate the Node.js process
};

const quit = () => {
  console.log("Exiting server...");
  process.exit(); // Terminate the Node.js process
};

const exit = () => {
  console.log("Exiting server...");
  process.exit(); // Terminate the Node.js process
};

/**
 * Displays help information for specified commands or all available commands.
 *
 * @param {string[]} commands - An array of command names for which help information is requested.
 *                              If empty, help information for all available commands is displayed.
 */
const help = (commands = []) => {
  if (commands.length > 0) {
    // Display help information for the specified commands
    for (const command of commands) {
      let string = `\n----------------------------------------------------------------\nCommand\t-\t${command}\n\t${
        utils.comandDescriptions()[command]
      }\n`;
      string = utils.comands()["highlightWord"](string, "Command", 32);
      string = utils.comands()["highlightWord"](string, command, 31);
      console.log(string);
    }
  } else {
    // Display help information for all available commands
    for (let command in utils.comands()) {
      let string = `\n---------------------------------------------------------------
      \nCommand\t-\t${command}\n\t${utils.comandDescriptions()[command]}\n`;
      string = utils.comands()["highlightWord"](string, "Command", 32);
      string = utils.comands()["highlightWord"](string, command, 31);
      console.log(string);
    }
  }
};

module.exports = { help, q, exit, quit };
