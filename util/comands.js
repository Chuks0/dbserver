const fs = require("fs");

/**
 * Retrieves a list of files from the specified directory path and logs their names to the console.
 *
 * @param {string} path - The path of the directory. Defaults to the current directory if not provided.
 */
const getFilesFromPath = (path = "./") => {
  const folderPath = path;
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return;
    }
    console.log(`Files in the folder ${path}:`);
    files.forEach((file) => {
      console.log(file);
    });
  });
};

module.exports = { getFilesFromPath };
