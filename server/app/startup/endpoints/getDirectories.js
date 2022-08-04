const fs = require('fs-extra');

module.exports = async (path) => {
  return await fs.readdir(path);
};
