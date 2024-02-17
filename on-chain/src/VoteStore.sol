// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteStore {
    uint256[] private s_spentTickets;
    uint256 private s_votesForA;
    uint256 private s_votesForB;

    mapping(uint256 => bool) private spentTicketMapping;

    error VoterAlreadyVoted(uint256 _ticket);

    modifier notVoted(uint256 _spentTicket) {
        if(spentTicketMapping[_spentTicket]){
            revert VoterAlreadyVoted(_spentTicket);
        }
        _;
    }

    function hasVoted(uint256 _spentTicket) public view returns (bool) {
        return spentTicketMapping[_spentTicket];
    }

    function vote(uint256 _ticket, bool _votedFor) public notVoted(_ticket) {
        if(_votedFor){
            s_votesForA++;
        } else {
            s_votesForB++;
        }

        s_spentTickets.push(_ticket);
    } 

    function howManyVoters() public view returns (uint256) {
        return s_spentTickets.length;
    }

    function getResult() public view returns (uint256, uint256) {
        return (s_votesForA, s_votesForB);
    }
}