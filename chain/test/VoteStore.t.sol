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

    function testInitialVoteCount() public {
        assertEq(voteStore.getNumberOfCandidates(), 0);
    }

    function testVote() public {
        voteStore.vote(1, "Alice");
        assertEq(voteStore.howManyVoters(), 1);
    }

    function testMultipleVotesForSameCandidate() public {
        voteStore.vote(1, "Alice");
        voteStore.vote(2, "Alice");
        assertEq(voteStore.howManyVoters(), 2);
        VoteStore.Candidate[] memory candidates = voteStore.getResult();
        assertEq(candidates[1].votes, 2);
    }

    function testVoterAlreadyVoted() public {
        voteStore.vote(1, "Alice");
        vm.expectRevert(VoteStore.VoterAlreadyVoted.selector);
        voteStore.vote(1, "Bob");
    }

    function testHasVoted() public {
        voteStore.vote(1, "Alice");
        assertTrue(voteStore.hasVoted(1));
    }
}