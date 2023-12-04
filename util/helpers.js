const utils = require("../utils");

const q = () => {
  shutdown(); // Terminate the Node.js process
};

const quit = () => {
  shutdown(); // Terminate the Node.js process
};

const exit = () => {
  shutdown(); // Terminate the Node.js process
};

// callses SIGINT event
async function shutdown() {
  process.emit("SIGINT");
}

/**
 * Displays help information for specified commands or all available commands.
 *
 * @param {string[]} commands - An array of command names for which help information is requested.
 *                              If empty, help information for all available commands is displayed.
 */
const help = (commands = []) => {
  try {
    if (commands.length > 0) {
      // Display help information for the specified commands
      for (const command of commands) {
        let string = `command ${command} args ${
          utils.comands()[`${command}`].length
        }`;
        string = utils
          .comands()
          ["highlightWord"](
            string,
            utils.comands()[`${command}`].length,
            "green"
          );
        string = utils.comands()["highlightWord"](string, "command", "dim");
        string = utils.comands()["highlightWord"](string, "args", "dim");
        string = utils.comands()["highlightWord"](string, command, "blue");
        console.log(string);
      }
    } else {
      // Display help information for all available commands
      for (let command in utils.comands()) {
        let string = ` command ${command} args ${
          utils.comands()[`${command}`].length
        }`;
        string = utils
          .comands()
          ["highlightWord"](
            string,
            utils.comands()[`${command}`].length,
            "green"
          );
        string = utils.comands()["highlightWord"](string, "command", "dim");
        string = utils.comands()["highlightWord"](string, "args", "dim");
        string = utils.comands()["highlightWord"](string, command, "blue");
        console.log(string);
      }
    }
  } catch (err) {}
};

module.exports = { help, q, exit, quit };
