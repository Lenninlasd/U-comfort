const fs = require('fs')
const d3 = require("d3")
const path = require('path')
global.fetch = require('node-fetch')

const csvFolder = '../csv/'
const argv = process.argv[2];
const csvFiles = isCSVfile(argv) ? [argv] : fs.readdirSync(csvFolder).filter(isCSVfile);

csvFiles.map(writeJson);

function writeJson(csvName) {
    const file = path.resolve(__dirname, `../csv/${csvName}`);
    const csvdata = fs.readFileSync(file, 'utf8');
    const jsondata = d3.csvParse(csvdata);

    const targetName = `${csvName.slice(0,-4)}.json`;
    const targetPath = path.resolve(__dirname, `../json/${targetName}`);

    fs.writeFileSync(targetPath, JSON.stringify(jsondata, undefined, '\t'));
    console.log(targetName + ' generated!');
}

function isCSVfile(f) {
    return f && f.slice(-4) === '.csv' ? true : false;
}
