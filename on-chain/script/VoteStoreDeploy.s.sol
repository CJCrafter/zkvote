// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "../lib/forge-std/src/Script.sol";
import {VoteStore} from "../src/VoteStore.sol";

contract VoteStoreDeploy is Script {
    function run() public {
        vm.startBroadcast();
        VoteStore vote = new VoteStore();
        vm.stopBroadcast();
    }
}