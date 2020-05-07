const path = require("path");
const Ip2region = require("node-ip2region");

const dbPath = path.join(__dirname, "./ip2region.db");
const ip2 = Ip2region.create(dbPath);

// const ip2 = new Ip2region({ dbPath });

const data = ip2.memorySearchSync("100.35.78.45");

console.log(data);
