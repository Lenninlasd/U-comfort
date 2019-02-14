const fs = require('fs')
const d3 = require('d3')
const path = require('path')
global.fetch = require('node-fetch')

const extension = 'js'
const csvFolder = './csv/'
const jsonFolder = './json/'
const argv = process.argv[2]
const csvFiles = isCSVfile(argv) ? [argv] : fs.readdirSync(csvFolder).filter(isCSVfile)

csvFiles.map(writeJson)

function writeJson(csvName) {
  const file = path.resolve(__dirname, `${csvFolder}${csvName}`)
  const csvdata = fs.readFileSync(file, 'utf8')
  const jsondata = d3.csvParse(csvdata)

  const targetName = `${csvName.slice(0, -4)}.${extension}`
  const targetPath = path.resolve(__dirname, `${jsonFolder}${targetName}`)

  //es6 export
  const jsondataStr = 'export default ' + JSON.stringify(jsondata, undefined, '\t')
  fs.writeFileSync(targetPath, jsondataStr)
  /*eslint no-console: ['error', { allow: ['log', 'warn', 'error'] }] */
  console.log(targetName + ' generated!')
}

function isCSVfile(f) {
  return f && f.slice(-4) === '.csv' ? true : false
}
