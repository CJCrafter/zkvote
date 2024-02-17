const appRoot = require('app-root-path');
const fs = require('fs');
const { voters } = require(`${appRoot}/voters-list.json`);
const { download } = require("./downloadProof.js");

function generateVoterData() {
    let voter = {};
    for(let i = 0; i < voters.length; i++){
        voter[voters[i]] = i;
    }
    download(voter, "voter");
}
if (require.main === module) {
    generateVoterData();
}

module.exports = { generateVoterData };