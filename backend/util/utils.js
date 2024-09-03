const fs = require('fs');

function createRandomId ({totalChar = 2, totalNumber = 4}) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';

  // Generate the first two random letters
  const randomLetters = Array.from({length: totalChar}, () => letters[Math.floor(Math.random() * letters.length)]).join('');

  // Generate the last four random digits
  const randomDigits = Array.from({length: totalNumber}, () => digits[Math.floor(Math.random() * digits.length)]).join('');

  // Combine the letters and digits
  return randomLetters + randomDigits;
}

function checkDirectoryExists(directoryPath) {
  return fs.existsSync(directoryPath) && fs.lstatSync(directoryPath).isDirectory();
}

function createDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
    // console.log(`Directory '${directoryPath}' created.`);
  } else {
    // console.log(`Directory '${directoryPath}' already exists.`);
  }
}

function moveFileToPath(destinationPath, filename) {
  filename.mv(destinationPath, function (err) {
    if (err) {
      console.log(err)
    } else {
      // console.log("... successfully uploaded ... " + destinationPath)
    }
  })
}

function cleanFileName(filename) {
  // Remove spaces and symbols, allowing only alphanumeric characters and dots for file extensions
  return filename.replace(/[^a-zA-Z0-9.]/g, '');
}

function deleteDirectory(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.rmSync(directoryPath, { recursive: true, force: true });
  } else {
  }
}

module.exports = {
  createRandomId,
  checkDirectoryExists,
  createDirectory,
  moveFileToPath,
  cleanFileName,
  deleteDirectory
}