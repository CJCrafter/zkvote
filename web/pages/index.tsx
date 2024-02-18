
import Image from "next/image";
import ButtonList from "@/components/panelbuttonlist";
import PanelButton from "@/components/panelbutton";
import GridWormCanvas from "@/components/worm";
import s from "./index.module.scss";
import { useState } from "react";
import IconButton from "@/components/iconbutton";

export default function Home() {

    let [hiddenButton, setHiddenButton] = useState(false);
    let [voterid, setVoterid] = useState('');
    let [canvote, setCanvote] = useState(false);
    let [hasticket, setHasticket] = useState(false);
    let [ticket, setTicket] = useState<any>();

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

    return (
        <main className={s.main}>
            {/* <div className="relative bg-[url('/rect3.png')] bg-cover bg-blue-600 top-0 left-0 w-screen h-screen"> */}

            {/* invisible header */}
            <header className={s.header}>
                <div className={s.righttest}>
                    <IconButton href={""} name={"Languages"} logo={"/language-button.svg"} />
                    <div className={s.space} />
                    <IconButton href={""} name={"Help"} logo={"/contact-button.svg"} />
                </div>
            </header>

            <div className={s.cards}>
                <div className={`${s.card} ${s.left}`}>
                    <img src="/snorlax.png" alt="snorlax" className={s.snorlax} />
                    <div className={`${s.amount} ${s.leftamount}`}>
                        <div className={s.percentage}>
                            56,312,384 votes
                        </div>
                    </div>
                </div>
                <div className={`${s.card} ${s.right}`}>
                    <img src="/elmo.png" alt="elmo" className={s.elmo} />
                    <div className={`${s.amount} ${s.rightamount}`}>
                        <div className={s.percentage}>
                            56,312,384 votes
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.voter} id="vote">
                <GridWormCanvas className={s.worm} />

                {
                    hiddenButton ? '' : (
                        <a href="#vote" onClick={() => {
                            console.log('vote');
                            setHiddenButton(true);
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
                            <div className={s.identity}>
                                <input type="text" placeholder="Voter ID"
                                    onChange={(e) => {
                                        setVoterid(e.target.value);
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        checkValidVoter(voterid);
                                    }}
                                >continue</button>
                            </div>
                    ) : ''
                }
            </div>
        </main>
    );
}
