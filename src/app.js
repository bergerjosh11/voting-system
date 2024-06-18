const contractAddress = 'CONTRACT_ADDRESS';
const contractABI = [ /* ABI from compiled contract */ ];

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const votingContract = new web3.eth.Contract(contractABI, contractAddress);

document.getElementById('createPollForm').onsubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const question = document.getElementById('question').value;
    const options = document.getElementById('options').value.split(',');
    await votingContract.methods.createPoll(question, options).send({ from: accounts[0] });
};

document.getElementById('voteForm').onsubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const pollId = document.getElementById('pollId').value;
    const optionId = document.getElementById('optionId').value;
    await votingContract.methods.vote(pollId, optionId).send({ from: accounts[0] });
};

document.getElementById('resultsForm').onsubmit = async (e) => {
    e.preventDefault();
    const pollId = document.getElementById('resultsPollId').value;
    const results = await votingContract.methods.getPollResults(pollId).call();
    document.getElementById('results').innerText = 'Results: ' + results.join(', ');
};
