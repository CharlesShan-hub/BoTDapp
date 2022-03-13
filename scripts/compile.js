const fs = require('fs-extra');
const path = require('path');
var solc = require('solc');
const smtchecker = require('solc/smtchecker');
const smtsolver = require('solc/smtsolver');


// cleanup
const compiledDir = path.resolve(__dirname, '../compiled');
fs.removeSync(compiledDir);
fs.ensureDirSync(compiledDir);

// compile 
const contractPath = path.resolve(__dirname,'../contracts', 'Connect.sol');
const contractSource = fs.readFileSync(contractPath, 'utf8').toString(); 


var input = {
  language: 'Solidity',
  sources: {
    'Connect.sol': {
      content: contractSource
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

var result = JSON.parse(solc.compile(JSON.stringify(input)));

// check errors
if (Array.isArray(result.errors) && result.errors.length) {
       throw new Error(result.errors[0]);
}

// save to disk
Object.keys(result.contracts).forEach(subName => {
	Object.keys(result.contracts[subName]).forEach(name => {
		const contractName = name;
		const filePath = path.resolve(compiledDir,`${contractName}.json`);
		fs.outputJsonSync(filePath, result.contracts[subName][name]);
		console.log(`save compiled contract ${contractName} to ${filePath}`);
	});
});