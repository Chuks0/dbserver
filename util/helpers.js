const utils = require("../utils");
const { disconnect } = require("../sql/database.js");
const { server } = require("../index");

const q = () => {
  shutdown(); // Terminate the Node.js process
};

const quit = () => {
  shutdown(); // Terminate the Node.js process
};

const exit = () => {
  shutdown(); // Terminate the Node.js process
};

async function shutdown() {
  console.log("Shutting down server...");
  await Promise.all([disconnect()]);
  server.close(() => {
    console.log("Server closed");
    process.exit(); // Terminate the Node.js process after closing the server
  });
}

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
      string = utils.comands()["highlightWord"](string, "Command", 35);
      string = utils.comands()["highlightWord"](string, command, 36);
      console.log(string);
    }
  } else {
    // Display help information for all available commands
    for (let command in utils.comands()) {
      let string = `\n---------------------------------------------------------------
      \nCommand\t-\t${command}\n\t${utils.comandDescriptions()[command]}\n`;
      string = utils.comands()["highlightWord"](string, "Command", 35);
      string = utils.comands()["highlightWord"](string, command, 36);
      console.log(string);
    }
  }
};

module.exports = { help, q, exit, quit };
