// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test, console2} from "../lib/forge-std/src/Test.sol";
import {VoteStore} from "../src/VoteStore.sol";

contract VoteStoreTest is Test {
    VoteStore voteStore;

    //Errors for expect revert

    function setUp() public {
        voteStore = new VoteStore();
    }

    function testVoteForOptionA() public {
        voteStore.vote(1, true);
        (uint256 votesForA, ) = voteStore.getResult();
        assertEq(votesForA, 1, "Vote for A should be counted");
    }

    function testVoteForOptionB() public {
        voteStore.vote(2, false);
        (, uint256 votesForB) = voteStore.getResult();
        assertEq(votesForB, 1, "Vote for B should be counted");
    }

    function testHasVotedAfterVoting() public {
        uint256 ticket = 3;
        voteStore.vote(ticket, true);
        assertTrue(voteStore.hasVoted(ticket), "Voter should be marked as voted");
    }

    function testCannotVoteTwice() public {
        uint256 ticket = 4;
        voteStore.vote(ticket, true);
        vm.expectRevert(VoteStore.VoterAlreadyVoted.selector);
        voteStore.vote(ticket, false); 
    }

    function testHowManyVoters() public {
        voteStore.vote(5, true);
        voteStore.vote(6, false);
        uint256 voters = voteStore.howManyVoters();
        assertEq(voters, 2, "There should be 2 voters");
    }

    function testGetResult() public {
        voteStore.vote(7, true);
        voteStore.vote(8, false);
        voteStore.vote(9, true);
        (uint256 votesForA, uint256 votesForB) = voteStore.getResult();
        assertEq(votesForA, 2, "Votes for A should be 2");
        assertEq(votesForB, 1, "Votes for B should be 1");
    }
}