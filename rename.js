const { join } = require('path');
const { readdirSync, renameSync } = require('fs');
const [dir, search, replace] = process.argv.slice(2);
const match = RegExp(search, 'g');
const files = readdirSync(dir);

files
  .filter(file => file.match(match))
  .forEach(file => {
    const filePath = join(dir, file);
    // console.log(match);
    // console.log(filePath);
    const newFilePath = join(dir, file.replace(match, replace)).toLowerCase();
    // console.log(newFilePath);

    renameSync(filePath, newFilePath);
    // renameSync(filePath, filePath.toLowerCase());
  });

// Usage
// node rename.js path/to/directory 'string-to-search' 'string-to-replace'