const functions = require("firebase-functions");
const cors = require("cors");
const readline = require("readline");
const express = require("express");
require("dotenv").config();
const { USERNAME, PASSWORD, SQLPASSWORD, PORT } = process.env;
const routingUtils = require("../middleware/routingUtils");
const utils = require("./utils");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routingUtils.routingLoger);

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
        ["highlightWord"](`\nInvalid command: ${command}`, command, 31)
    );
    console.log(helptest);
  }
  rl.prompt();
});

app.get("/test", async (req, res) => {
  res.send("It works!!");
});
exports.app = functions.https.onRequest(app);

// const server = app.listen(PORT, async () => {
//   console.log("Srarting server...");
//   await Promise.all([utils.initialize()]);
//   console.log(`Server is listening on http://localhost:${PORT}`);
//   rl.prompt();
// });

// Gracefully handle server shutdown
// process.on("SIGINT", () => {
//   console.log("Shutting down server...");
//   server.close(() => {
//     console.log("Server closed");
//     process.exit(); // Terminate the Node.js process after closing the server
//   });
// });
