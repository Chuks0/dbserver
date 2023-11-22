const mysql = require("mysql2/promise");
const { highlightWord } = require("../util/highlight");
const { _NETID, _DATABASEPASSWORD, _DATABASEPREFIX, _HOSTNAME } = process.env;
let connection;

async function connect() {
  try {
    let hostURL = `Connecting to database: ${_HOSTNAME}/${
      _DATABASEPREFIX + _NETID
    } as ${_NETID}`;
    hostURL = highlightWord(hostURL, _HOSTNAME, 33);
    hostURL = highlightWord(hostURL, _DATABASEPREFIX, 33);
    hostURL = highlightWord(hostURL, _NETID, 33);
    console.log(hostURL);

    // Establishing a connection
    connection = await mysql.createConnection({
      host: _HOSTNAME,
      user: _NETID,
      password: _DATABASEPASSWORD,
      database: _DATABASEPREFIX + _NETID,
    });

    let string = "Database: Connected";
    string = highlightWord(string, "Connected", 32);
    console.log(string);

    await fetchQuestionById(1); // Assuming you have a function for this
  } catch (error) {
    let string = "Database: Failed to connect";
    string = highlightWord(string, "Failed to connect", 31);
    console.error(string, error);
  }
}

async function disconnect() {
  if (connection) {
    try {
      // Closing the connection
      await connection.end();
      let string = "Database: Disconnected";
      string = highlightWord(string, "Disconnected", 35);
      console.log(string);
    } catch (error) {
      let string = "Database: Failed to disconnect";
      string = highlightWord(string, "Failed to disconnect", 31);
      console.error(string, error);
    }
  }
}

async function fetchQuestionById(questionId) {
  try {
    const [rows, fields] = await connection.execute(
      "SELECT * FROM questions WHERE id = ?",
      [questionId]
    );
    console.log("Fetched question:", rows[0]);
  } catch (error) {
    console.error("Error fetching question:", error);
  }
}

module.exports = { connect, disconnect };
