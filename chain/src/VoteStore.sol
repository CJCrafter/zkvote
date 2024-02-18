// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteStore {
    uint256[] private s_spentTickets;
    uint256 private s_votesForA;
    uint256 private s_votesForB;
    Candidate[] private s_candidates;

    mapping(uint256 => bool) private spentTicketMapping;
    mapping(string => uint256) internal nameToArrayIndex;

    error VoterAlreadyVoted();

    struct Candidate {
        string name;
        uint256 votes;
    }

    constructor(){
        //So the name to array mapping works
        s_candidates.push(Candidate("",0));
    }

    modifier notVoted(uint256 _spentTicket) {
        if(spentTicketMapping[_spentTicket]){
            revert VoterAlreadyVoted();
        }
        _;
    }

    function hasVoted(uint256 _spentTicket) public view returns (bool) {
        return spentTicketMapping[_spentTicket];
    }

    function vote(uint256 _ticket, string calldata _name) public notVoted(_ticket) {
        require(bytes(_name).length > 0);

        if(nameToArrayIndex[_name] == 0){
            s_candidates.push(Candidate(_name, 1));
            nameToArrayIndex[_name] = s_candidates.length - 1;
        }
        else{
            ++s_candidates[nameToArrayIndex[_name]].votes;
        }

        s_spentTickets.push(_ticket);
        spentTicketMapping[_ticket] = true;
    } 

    function howManyVoters() public view returns (uint256) {
        return s_spentTickets.length;
    }

    function getResult() public view returns (Candidate[] memory) {
        return s_candidates;
    }

    function getNumberOfCandidates() public view returns (uint256) {
        return s_candidates.length - 1;
    }
}