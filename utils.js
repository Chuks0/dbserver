const fs = require("fs");
const path = require("path");

let utilsList = {};
const descriptions = {
  q: `
  /**
   * Terminate the Node.js process
   * /`,
  quit: `
  /**
   * Terminate the Node.js process
   * /`,
  exit: `
  /**
   * Terminate the Node.js process
   * /`,
  getFilesFromPath: `
  /**
   * Retrieves a list of files from the specified directory path and logs their names to the console.
   *
   * @param {string} path - The path of the directory. Defaults to the current directory if not provided.
   */`,
  highlightWord: `
  /**
   * Changes the color of the words in the string.
   *
   * @param {string} text - Original Text.
   * @param {string} word - Words you want to chage.
   * @param {number} color - New Color (31 Red, 32 Green, 33 Yellow, 34 Blue, 35 Magenta, 36 Cyan, 37 White)
   * @returns {string} The text with color chages.
   */`,
  help: `
  /**
   * Displays help information for specified commands or all available commands.
   *
   * @param {string[]} commands - An array of command names for which help information is requested.
   *                              If empty, help information for all available commands is displayed.
   */`,
};

const comands = () => utilsList;
const comandDescriptions = () => descriptions;

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
    const string = "Initialized: Utilities List";
    console.log(string);
  } catch (error) {
    console.error("Initialization failed:", error);
  }
}

module.exports = {
  initialize,
  utils,
  comands,
  comandDescriptions,
  convertFileToArray,
};
