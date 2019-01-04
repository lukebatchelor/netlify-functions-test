const fs = require("fs");
const path = require("path");

const urls = require("./data/urls.json");

const redirectFileStr = Object.entries(urls)
  .map(([short, url]) => `/${short} ${url}`)
  .join("\n");
const redirectsFilePath = path.join(__dirname, "dist", "_redirects");

fs.writeFileSync(redirectsFilePath, redirectFileStr);
