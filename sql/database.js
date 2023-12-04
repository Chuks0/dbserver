const mysql = require("mysql2/promise");
const { highlightWord } = require("../util/highlight");
const { _NETID, _DATABASEPASSWORD, _DATABASEPREFIX, _HOSTNAME } = process.env;
const Connection = () => connection;
let connection;

async function connect() {
  try {
    let hostURL = `\t→\tConnecting to database: ${_HOSTNAME}/${
      _DATABASEPREFIX + _NETID
    }`;
    hostURL = highlightWord(hostURL, "→", "dim");
    hostURL = highlightWord(hostURL, "→", "green");
    hostURL = highlightWord(hostURL, "Connecting to database:", "dim");
    hostURL = highlightWord(hostURL, _HOSTNAME + "/", "blue");
    hostURL = highlightWord(hostURL, _DATABASEPREFIX + _NETID, "cyan");
    console.log(hostURL);

    // Establishing a connection
    connection = await mysql.createConnection({
      host: _HOSTNAME,
      user: _NETID,
      password: _DATABASEPASSWORD,
      database: _DATABASEPREFIX + _NETID,
    });

    let string = "\t→\tDatabase: Connected";
    string = highlightWord(string, "→", "dim");
    string = highlightWord(string, "→", "green");
    string = highlightWord(string, "Database:", "dim");
    string = highlightWord(string, "Connected", "bright");
    console.log(string);
  } catch (error) {
    let string = "\t→\tDatabase: Failed to connect";
    string = highlightWord(string, "→", "dim");
    string = highlightWord(string, "→", "green");
    string = highlightWord(string, "Database:", "dim");
    string = highlightWord(string, "Failed to connect", "red");
    console.error(string, error);
  }
}

async function disconnect() {
  if (connection) {
    try {
      // Closing the connection
      await connection.end();
      let string = "\t→\tDatabase: Disconnected";
      string = highlightWord(string, "→", "dim");
      string = highlightWord(string, "→", "green");
      string = highlightWord(string, "Database:", "dim");
      string = highlightWord(string, "Disconnected", "bright");
      console.log(string);
    } catch (error) {
      let string = "\t→\tDatabase: Failed to disconnect";
      string = highlightWord(string, "→", "dim");
      string = highlightWord(string, "→", "green");
      string = highlightWord(string, "Database:", "dim");
      string = highlightWord(string, "Failed to disconnect", "red");
      console.error(string, error);
    }
  }
}

module.exports = { connect, disconnect, Connection };
