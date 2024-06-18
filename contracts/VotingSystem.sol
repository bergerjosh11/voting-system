// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Poll {
        uint id;
        string question;
        string[] options;
        mapping(uint => uint) votes;
        bool isActive;
    }

    Poll[] public polls;
    uint public pollCount;

    function createPoll(string memory _question, string[] memory _options) public {
        Poll storage newPoll = polls.push();
        newPoll.id = pollCount++;
        newPoll.question = _question;
        newPoll.options = _options;
        newPoll.isActive = true;
    }

    function vote(uint _pollId, uint _optionId) public {
        require(_pollId < pollCount, "Poll does not exist.");
        require(_optionId < polls[_pollId].options.length, "Invalid option.");
        require(polls[_pollId].isActive, "Poll is not active.");

        polls[_pollId].votes[_optionId]++;
    }

    function getPollResults(uint _pollId) public view returns (uint[] memory) {
        require(_pollId < pollCount, "Poll does not exist.");

        uint[] memory results = new uint[](polls[_pollId].options.length);
        for (uint i = 0; i < polls[_pollId].options.length; i++) {
            results[i] = polls[_pollId].votes[i];
        }
        return results;
    }
}
