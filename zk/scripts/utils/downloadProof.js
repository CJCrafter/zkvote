const appRoot = require('app-root-path');
const fs = require('fs');

async function download(proof, filename) {
    var jsonObj = JSON.stringify(proof, null);
    console.log(`\nDownloading ${filename}...\n`);
    console.log(jsonObj);

    try {
        fs.writeFileSync(`${appRoot}/${filename}.json`, jsonObj, 'utf8');
        console.log(`\n${filename} Successfully Downloaded\n`);
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = { download };