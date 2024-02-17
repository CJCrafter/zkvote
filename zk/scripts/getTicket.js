const { generateProof } = require('./utils/generateProof.js');
const { download } = require('./utils/downloadProof.js');
const prompt = require('prompt-sync')();

async function main() {
  const addr = prompt('Enter your account address: ');
  const { proof, publicSignals } = await generateProof(addr);
  let ticket = {
    proof: proof,
    publicSignals: publicSignals
  };
  await download(ticket, "ticket");
}
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

// ----------------------------------------------------------

async function svGetTicket(
  accountAddress
) {
  const addr = accountAddress;
  const { proof, publicSignals } = await generateProof(addr);
  console.log("Proof: ", proof);
  console.log("Public Signals: ", publicSignals);
  let ticket = {
    proof: proof,
    publicSignals: publicSignals
  };
  console.log("Ticket: ", ticket);
  //await download(ticket, "ticket");
  return ticket;
}

module.exports = { svGetTicket };