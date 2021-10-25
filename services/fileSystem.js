const fs = require("fs");

const saveDB = (data, file) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const readDB = (file) => {
  if (!fs.existsSync(file)) {
    return null;
  }

  const info = fs.readFileSync(file, { encoding: "utf8" });
  const data = JSON.parse(info);

  return data;
};

module.exports = { saveDB, readDB };
