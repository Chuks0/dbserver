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
    helptest = utils.comands()["highlightWord"](helptest, "help", 32);
    console.log(
      utils
        .comands()
        ["highlightWord"](`\nInvalid command: ${command}`, command, 33)
    );
    console.log(helptest);
  }
  rl.prompt();
});

// start server with node index.js or npm start
const server = app.listen(PORT, async () => {
  console.log("Srarting server...");
  await Promise.all([utils.initialize(), db.connect()]);
  console.log(`Server is listening on http://localhost:${PORT}`);
  rl.prompt();
});

//Gracefully handle server shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await Promise.all([db.disconnect()]);
  server.close(() => {
    console.log("Server closed");
    process.exit(); // Terminate the Node.js process after closing the server
  });
});

module.exports = { server };
