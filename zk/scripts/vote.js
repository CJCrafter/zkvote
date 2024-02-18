const appRoot = require('app-root-path');
const { verify } = require("./utils/verify.js");
const { download } = require("./utils/downloadProof.js");
const result = require(`${appRoot}/result.json`);
const prompt = require('prompt-sync')();

async function vote() {
    const { proof, publicSignals } = require(`${appRoot}/ticket.json`);
    const vote = prompt('Enter person you want to vote ( a or b ): ');
    if(result["spentTickets"][publicSignals[1]] != 1 && await verify(proof, publicSignals)){
        result["votes"][vote] += 1;
        result["votingID"] = publicSignals[0];
        result["spentTickets"][publicSignals[1]] = 1;
        download(result, "result");
        console.log("Vote casted successfully");
    } else {
        console.log("Vote failed, wrong ticket or already spent ticket");
    }
}
if (require.main === module) {
    vote()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
}

// ----------------------------------------------------------

async function svVote(
    vote,
    ticket
) {

    console.log("--- svVote ---")
    console.log(vote);
    console.log(ticket);

    const svproof = ticket.proof;
    const svpublicSignals = ticket.publicSignals;
    if(result["spentTickets"][svpublicSignals[1]] != 1 && await verify(svproof, svpublicSignals)){
        result["votes"][vote] += 1;
        result["votingID"] = svpublicSignals[0];
        result["spentTickets"][svpublicSignals[1]] = 1;
        download(result, "result");
        console.log("Vote casted successfully");
    } else {
        console.log("Vote failed, wrong ticket or already spent ticket");
    }
    
}

module.exports = { svVote };