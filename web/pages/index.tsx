import Image from "next/image";
import ButtonList from "@/components/panelbuttonlist";
import PanelButton from "@/components/panelbutton";
import GridWormCanvas from "@/components/worm";
import s from "./index.module.scss";
import React, {useEffect, useState} from "react";
import IconButton from "@/components/iconbutton";

export default function Home() {

    let [hiddenButton, setHiddenButton] = useState(false);
    const [leftVotes, setLeftVotes] = useState(0);
    const [rightVotes, setRightVotes] = useState(0);
    const finalLeftVotes = 56_312_384;
    const finalRightVotes = 32_497_382;

    const countVotes = (setVotes: React.Dispatch<React.SetStateAction<number>>, finalVotes: number) => {
        const duration = 10000; // Duration of the animation in milliseconds
        const updateInterval = 10; // How often to update the count, in milliseconds
        const totalSteps = duration / updateInterval; // Total number of updates
        const votesPerStep = finalVotes / totalSteps; // Votes to add each update

        let currentVotes = 0;
        const counter = setInterval(() => {
            currentVotes += votesPerStep;
            if (currentVotes >= finalVotes) {
                currentVotes = finalVotes; // Ensure we end exactly on the final number
                clearInterval(counter);
            }
            setVotes(Math.ceil(currentVotes));
        }, updateInterval);
    };

    useEffect(() => {
        countVotes(setLeftVotes, finalLeftVotes);
        countVotes(setRightVotes, finalRightVotes);
    }, []);

    return (
        <main className={s.main}>
            {/* <div className="relative bg-[url('/rect3.png')] bg-cover bg-blue-600 top-0 left-0 w-screen h-screen"> */}

            {/* invisible header */}
            <header className={s.header}>
                <div className={s.righttest}>
                    <IconButton href={""} name={"Languages"} logo={"/language-button.svg"}/>
                    <div className={s.space}/>
                    <IconButton href={""} name={"Help"} logo={"/contact-button.svg"}/>
                </div>
            </header>

            <div className={s.cards}>
                <div className={`${s.card} ${s.left}`}>
                    <img src="/snorlax.png" alt="snorlax" className={s.snorlax}/>
                    <div className={`${s.amount} ${s.leftamount}`}>
                        <div className={s.percentage}>
                            {leftVotes} votes
                        </div>
                    </div>
                </div>
                <div className={`${s.card} ${s.right}`}>
                    <img src="/elmo.png" alt="elmo" className={s.elmo}/>
                    <div className={`${s.amount} ${s.rightamount}`}>
                        <div className={s.percentage}>
                            {rightVotes} votes
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.voter} id="vote">
                <GridWormCanvas className={s.worm}/>

                {
                    hiddenButton ? '' : (
                        <a href="#vote" onClick={() => setHiddenButton(true)}>
                            VOTE
                        </a>
                    )
                }

                {
                    hiddenButton ? (
                        <div className={s.identity}>
                            <input type="text" placeholder="Name"/>

                        </div>
                    ) : ''
                }
            </div>
        </main>
    );
}
