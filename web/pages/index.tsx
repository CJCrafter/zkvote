
import Image from "next/image";
import ButtonList from "@/components/panelbuttonlist";
import PanelButton from "@/components/panelbutton";
import GridWormCanvas from "@/components/worm";
import s from "./index.module.scss";
import React, {useEffect, useState} from "react";
import IconButton from "@/components/iconbutton";
import anime from 'animejs/lib/anime.min.js';

export default function Home() {

    let [hiddenButton, setHiddenButton] = useState(false);
    let [invalidVoter, setInvalidVoter] = useState(false);
    const [leftVotes, setLeftVotes] = useState(0);
    const [rightVotes, setRightVotes] = useState(0);
    const finalLeftVotes = 1_312_384;
    const finalRightVotes = 1_497_382;

    let [voterid, setVoterid] = useState('');
    let [canvote, setCanvote] = useState(false);
    let [hasticket, setHasticket] = useState(false);
    let [ticket, setTicket] = useState<any>();

    const countVotes = (setVotes: React.Dispatch<React.SetStateAction<number>>, finalVotes: number) => {
        const duration = 1000; // Duration of the animation in milliseconds
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

    async function checkValidVoter(voterid: string) {
        const response = await fetch('/api/voter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ voterid })
        });
        const data = await response.json();
        console.log("---")
        console.log(data);

        if (response.status === 200) {
            setCanvote(true);
        } else {
            setCanvote(false);
            setInvalidVoter(true);
        }
    }

    async function generateTicket(voterid: string) {
        const response = await fetch('/api/ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ voterid })
        });
        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            console.log('ticket generated');
            setTicket(data);
            setHasticket(true);
        } else {
            console.log('ticket not generated');
        }
    }

    async function vote(voterid: string, candidate: string) {
        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ticket, candidate })
        });
        const data = await response.json();
        console.log(data);
    }

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
                    <img src="/amog-us.png" alt="among-us-red-charecter" className={s.elmo}/>
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
                        <a className="votebutton" href="#vote" onClick={() => {
                            console.log('vote');
                            anime({
                                targets: '.votebutton', // Targeting the first element
                                translateX: '0', // Example transformation
                                translateY: '600%', // Another example transformation
                                opacity: [1, 0], // Fading out
                                easing: 'easeInOutQuad',
                                duration: 1000, // Duration of 1 second
                                update: function(anim) {
                                    if (anim.progress > 50) {
                                        setHiddenButton(true);
                                        anime({
                                            targets: '.voterIdButton',
                                            opacity: [0, 1], // Fading in
                                            easing: 'easeInOutQuad',
                                            duration: 500, // Duration of the fade in
                                            begin: function() {
                                                // Ensure this animation only starts once
                                                anim.pause(); // Optional: pause the first animation if it should stop at 50%
                                            }
                                        });
                                    }
                                }
                            }); 
                            
                            setTimeout(() => {
                            setHiddenButton(true); 
                            }, 600);
                        }}>
                            VOTE
                        </a>
                    )
                }

                {
                    hiddenButton ? (
                        canvote ?
                            hasticket ?
                            <div className={s.identity}>
                                <button
                                    onClick={() => {
                                        vote(voterid, 'a');
                                    }}
                                >vote for snorlax</button>
                                <button
                                    onClick={() => {
                                        vote(voterid, 'b');
                                    }}
                                >vote for elmo</button>
                            </div> :
                                <div className={s.identity}>
                                    <button
                                        onClick={() => {
                                            generateTicket(voterid);
                                        }}
                                    >generate ticket</button>
                                </div>
                            :
                            <div className={`${s.identity} voterIdButton`}>
                                <input type="text" placeholder="Voter ID"
                                    onChange={(e) => {
                                        setVoterid(e.target.value);
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        checkValidVoter(voterid);
                                    }}
                                >Submit</button>
                                {invalidVoter ? (
                                    <p className="text-red-600 mt-5 text-lg">
                                        Invalid Voter Id
                                    </p>
                                ) : ''}
                            </div>
                    ) : ''
                }


            </div>
        </main>
    );
}
