"use client"

import Collapsable from "@/app/util/collapsable";
import Candidate from "@/app/util/candidate";
import ElectOptions from "@/app/util/electoptions";
import {useState} from "react";
import Navbar from "@/app/navbar";

export default function VotePage() {
    let [president, setPresident] = useState<number | null>(null)

    return <>
        <Navbar />

        <div className="flex">
            <div className="p-5 m-5 w-1/2 justify-center border rounded-2xl">

                <div className="flex items-center">
                    <img src="/candidate/business.jpg" alt="Lord Business" className="rounded-full w-64 h-64" />
                    <div className="ml-4">
                        <h2 className="text-2xl font-semibold">Lord Business</h2>
                        <p className="m-0 text-sm opacity-50">Look at him, he seems friendly</p>
                    </div>
                </div>
            </div>

            <div className="p-5 m-5 w-1/2 justify-center border rounded-2xl">
                <Candidate img="/candidate/hatsune.jpg" fullName="Hatsune Miku" description="ddd" />
            </div>
        </div>
    </>
}