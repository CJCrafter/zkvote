const express = require('express');
const app = express();
const port = 3000;
const appRoot = require('app-root-path');

const { generateVoterData } = require(`${appRoot}/scripts/utils/genVoterData.js`);
const { svGetTicket } = require(`${appRoot}/scripts/getTicket.js`);
const { svVote } = require(`${appRoot}/scripts/vote.js`);
const { verify } = require(`${appRoot}/scripts/utils/verify.js`);

const rpcURL = 'https://ethereum-sepolia.publicnode.com';

const { Web3 } = require('web3');

const web3 = new Web3(rpcURL);

const contractABI = [

    {
        "inputs": [],
        "name": "VoterAlreadyVoted",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "getResult",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_spentTicket",
                "type": "uint256"
            }
        ],
        "name": "hasVoted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "howManyVoters",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_ticket",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "_votedFor",
                "type": "bool"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
const contractAddress = '0x73D240aAef9838B49C7341d519B5Cc962a16D671'; // Contract address on the blockchain
const contract = new web3.eth.Contract(contractABI, contractAddress);

const account = '0x5428B20B352a0863F0178295AE66db9862378F31'
const privateKey = '20a3f9f3fbf483e5e15809d88728c5fa0a6fcc3cd1f2b094cf211d3c8bbb8ef3'

// Middleware to parse JSON bodies
app.use(express.json());

// GET check balance on chain
app.post("/api/hasvoted", async (req, res) => {
    try {
        const { addr } = req.body;
        const hasVoted = await contract.methods.hasVoted(addr).call();
        res.json({ hasVoted });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// GET get ticket
app.get('/api/getTicket', async (req, res) => {
    try {
        const { addr } = req.query;
        console.log(addr);
        const ticket = await svGetTicket(addr);
        console.log(ticket);
        res.json({ ticket });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// POST endpoint
app.post('/api/votechain', async (req, res) => {
    try {
        console.log(req.body);
        const { vote, ticket } = req.body;

        let jsonticket = JSON.parse(ticket)["ticket"];
        console.log(jsonticket);
        console.log("--------------------");

        const svproof = jsonticket.proof;
        const svpublicSignals = jsonticket.publicSignals;
        const hasVoted = await contract.methods.hasVoted(svpublicSignals[1]).call();
        console.log(hasVoted);

        const isVerified = await verify(svproof, svpublicSignals);
        console.log(isVerified);

        if (hasVoted == false && isVerified == true) {
            // sign and send transaction
            const tx = contract.methods.vote(svpublicSignals[1], vote == "a" ? true : false);
            const data = tx.encodeABI();
            const nonce = await web3.eth.getTransactionCount(account, 'latest');
            const gasPrice = await web3.eth.getGasPrice();
            const gasLimit = 3000000;
            const chainId = await web3.eth.net.getId();
            const txData = {
                from: account,
                to: contractAddress,
                data,
                gas: gasLimit,
                gasPrice,
                nonce,
                chainId
            };

            const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey);
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

            res.json({ success: "Vote casted successfully" });
        } else {
            console.log("Vote failed, wrong ticket or already spent ticket");
            res.json({ error: "Vote failed, wrong ticket or already spent ticket" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// POST endpoint
app.post('/api/vote', (req, res) => {
    try {
        console.log(req.body);
        const { vote, ticket } = req.body;

        let jsonticket = JSON.parse(ticket)["ticket"];
        console.log(jsonticket);
        console.log("--------------------");

        svVote(vote, jsonticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Listen on a port
app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});