const fs = require('fs');
const path = require('path');
const createKeccakHash = require('keccak');
const { promisify } = require('util');

const rootDir = path.resolve(__dirname, '..');

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);


function toChecksumAddress(address) {
  address = address.toLowerCase().replace('0x', '');
  const hash = createKeccakHash('keccak256').update(address).digest('hex');
  let result = '0x';

  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      result += address[i].toUpperCase()
    } else {
      result += address[i]
    }
  }

  return result;
}

module.exports = {
  rootDir,
  readFileAsync,
  writeFileAsync,
  toChecksumAddress,
};