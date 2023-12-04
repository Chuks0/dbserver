const fs = require("fs");
const path = require("path");
const { highlightWord } = require("./util/highlight");

let utilsList = {};

const comands = () => utilsList;

/**
 * Asynchronously loads utility functions from a specified folder and merges them into a global utility object.
 *
 * @param {string} folderPath - The path to the folder containing utility files.
 *                             Defaults to "./util" if not provided.
 * @returns {Promise<object>} - A promise that resolves with the merged utility object.
 *                             The object contains utility functions from the specified folder.
 * @throws {Error} - If there is an error reading the folder or loading utility files.
 */
const utils = async (folderPath = "./util") => {
  new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error("Error reading folder:", err);
        reject(err);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        utilsList = { ...require("./" + filePath), ...utilsList };
      });

      resolve(utilsList);
    });
  });
};

/**
 * Get comments for a given function.
 * @param {Function} func - The function for which to retrieve comments.
 */
function convertFileToArray(filePath) {
  try {
    // Read the contents of the file
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Split the content into an array of lines
    const linesArray = fileContent.split("\n");

    return linesArray;
  } catch (error) {
    console.error("Error reading file:", error.message);
    return [];
  }
}

function objToJson(path, data) {
  const jsonInfo = JSON.stringify(data);
  fs.writeFile(path, jsonInfo, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log(`File saved to ${path}`);
    }
  });
}

function jsonToObj(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      console.log("Parsed JSON:");
      return jsonData;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
}

function objToCSV(path, data) {
  const csv = Papa.unparse(data);

  fs.writeFileSync(path, csv, "utf8");
}
function csvToObj(path) {
  const fileContent = fs.readFileSync(path, "utf8");

  return new Promise((resolve, reject) => {
    Papa.parse(fileContent, {
      header: true, // Assumes the first row contains headers
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error.message);
      },
    });
  });
}

function appendToCSV(filePath, data) {
  const csvRow = objectToCsvRow(data);

  fs.appendFile(filePath, csvRow, (err) => {
    if (err) {
      console.error("Error appending to CSV file:", err);
    } else {
      console.log("Data appended to CSV file successfully.");
    }
  });
}

/**
 * Initialize the utilities
 */
async function initialize() {
  try {
    await utils();
    let string = "\t→\tUtilities: Initialized";
    string = highlightWord(string, "→", "dim");
    string = highlightWord(string, "→", "green");
    string = highlightWord(string, "Utilities:", "dim");
    string = highlightWord(string, "Initialized", "bright");
    console.log(string);
  } catch (error) {
    let string = "\t→\tUtilities: FAILED";
    string = highlightWord(string, "→", "dim");
    string = highlightWord(string, "→", "green");
    string = highlightWord(string, "FAILED", "red");
    string = console.error(string, error);
  }
}

module.exports = {
  initialize,
  utils,
  comands,
  highlightWord,
};
