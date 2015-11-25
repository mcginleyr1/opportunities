var fs = require('fs');

var fileName = process.argv[2];
var text = fs.readFileSync(fileName, "utf8");
var newFileName = fileName.split(".",1) + ".new.json";

var opportunties = JSON.parse(text);

var out = fs.createWriteStream(fileName, { encoding: "utf8" });
out.write(JSON.stringify(opportunties, null, 2));
out.end(); 

