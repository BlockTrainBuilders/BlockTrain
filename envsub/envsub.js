const envsub = require('envsub');
const fs = require("fs");

inputFileName = process.argv.slice(2)[0];
if (fs.existsSync(inputFileName)) {
    envsub({
        templateFile: inputFileName,
        outputFile: '/dev/null'
    })
        .then(({ outputContents }) => console.log(outputContents));
} else {
    console.log("usage: node envsub.js inputfile.yml");
}
