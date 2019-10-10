const fs = require('fs');
const path = require('path');

function isValidAPI(urlPath) {
  const fileSystemPath = path.join(process.cwd(), urlPath);

  // Read the file system and check if the API path + file exists:

  expect(fs.existsSync(fileSystemPath)).toBeTruthy();
  expect(fs.readdirSync(fileSystemPath).length).toBeGreaterThanOrEqual(1);
  return true;
}

module.exports = isValidAPI;
