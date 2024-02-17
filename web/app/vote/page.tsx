"use client"

import Collapsable from "@/app/util/collapsable";
import Candidate from "@/app/util/candidate";
import ElectOptions from "@/app/util/electoptions";
import {useState} from "react";
import Navbar from "@/app/navbar";

export default function VotePage() {
    let [president, setPresident] = useState<string | null>()

    return <>
        <Navbar />

        <div className="p-10 text-center justify-center bg-amber-100">
            <p className="font-bold text-6xl underline">
                CAST YOUR VOTE
            </p>
            <p className="pt-5">
                Click on the candidates that you are voting for
            </p>
        </div>

        <ElectOptions left={
            <Candidate img="/candidate/snorlax.png" fullName="Snorlax" description='Running on the campaign of "putting people to sleep"' />
        } middle={
            <p className="text-center text-2xl font-bold">President</p>
        } right={
            <Candidate img="/candidate/elmo.png" fullName="Elmo" description="Is your friend"/>
        } />

        <hr className="fill-gray-100" />

        <ElectOptions left={
            <Candidate img="/candidate/homer.jpg" fullName="Homer Simpson" description="A nuclear engineer, and astronaut"/>
        } middle={
            <p className="text-center text-2xl font-bold">Vice President</p>
        } right={
            <Candidate img="/candidate/brick.avif" fullName="A brick" description="Just a brick I found outside"/>
        } />

        <hr className="fill-gray-100" />

        <ElectOptions left={
            <Candidate img="/candidate/wes.png" fullName="Wes" description="Our solidity engineer"/>
        } middle={
            <p className="text-center text-2xl font-bold">Vice-Vice President</p>
        } right={
            <Candidate img="/candidate/mystery.jpg" fullName="Anyone else" description="Literally just anyone else, maybe a child"/>
        } />

        <hr className="fill-gray-100" />

        <ElectOptions left={
            <Candidate img="/candidate/business.jpg" fullName="Lord Business" description="Look at him, he seems friendly"/>
        } middle={
            <p className="text-center text-2xl font-bold">Secretly running the world</p>
        } right={
            <Candidate img="/candidate/hatsune.jpg" fullName="Hatsune Miku" description=""/>
        } />

    </>
}