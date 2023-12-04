const cors = require("cors");
const readline = require("readline");
const express = require("express");
require("dotenv").config();
const { PORT } = process.env;
const routingUtils = require("./middleware/routingUtils");
const utils = require("./utils");

const users = require("./_users/routs");
const questions = require("./_questions/routs");
const answers = require("./_answers/routs");
const db = require("./sql/database.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routingUtils.routingLoger);

app.use("/users", users);
app.use("/questions", questions);
app.use("/answers", answers);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

rl.on("line", async (input) => {
  const [command, ...args] = input.trim().split(" ");
  if (command === "help" || command === "h") {
    utils.comands()["help"](args);
  } else if (command in utils.comands()) {
    utils.comands()[command](...args);
  } else {
    let helptest = "Please use help to see list of commands\n";
    helptest = utils
      .comands()
      ["highlightWord"](
        helptest,
        "Please use help to see list of commands",
        "dim"
      );
    let log = utils
      .comands()
      ["highlightWord"](
        `\nInvalid command: ${command}`,
        "Invalid command:",
        "dim"
      );
    log = utils.comands()["highlightWord"](log, command, "red");
    console.log(log);
    console.log(helptest);
  }
  rl.prompt();
});

// start server with node index.js or npm start
const server = app.listen(PORT, async () => {
  let string = "\t→\tSrarting server...";
  string = utils.highlightWord(string, "Srarting server...", "dim");
  string = utils.highlightWord(string, "→", "green");
  console.log(string);
  await Promise.all([utils.initialize(), db.connect()]);
  string = `\t→\tServer is listening on http://localhost:${PORT}`;
  string = utils.highlightWord(string, "→", "dim");
  string = utils.highlightWord(string, "→", "green");
  string = utils.highlightWord(string, "Server is listening on", "dim");
  string = utils.highlightWord(string, "http://localhost:", "blue");
  string = utils.highlightWord(string, `${PORT}`, "cyan");
  console.log(string);
  rl.prompt();
});

//Gracefully handle server shutdown
process.on("SIGINT", async () => {
  let string = "\t→\tShutting down server...";
  string = utils.highlightWord(string, "→", "green");
  string = utils.highlightWord(string, "Shutting down server...", "dim");
  console.log(string);
  await Promise.all([db.disconnect()]);
  server.close(() => {
    string = "\t→\tServer: Closed";
    string = utils.highlightWord(string, "→", "dim");
    string = utils.highlightWord(string, "→", "green");
    string = utils.highlightWord(string, "Server:", "dim");
    string = utils.highlightWord(string, "Closed", "bright");

    console.log(string);
    process.exit(); // Terminate the Node.js process after closing the server
  });
});
