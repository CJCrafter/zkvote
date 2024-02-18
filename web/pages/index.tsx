
import Image from "next/image";
import ButtonList from "@/components/panelbuttonlist";
import PanelButton from "@/components/panelbutton";
import GridWormCanvas from "@/components/worm";
import s from "./index.module.scss";
import { useState } from "react";

export default function Home() {

    let [hiddenButton, setHiddenButton] = useState(false);

    return (
        <main className={s.main}>
            {/* <div className="relative bg-[url('/rect3.png')] bg-cover bg-blue-600 top-0 left-0 w-screen h-screen"> */}

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
                        <a href="#vote" onClick={() => setHiddenButton(true)}>
                            VOTE
                        </a>
                    )
                }

                {
                    hiddenButton ? (
                        <div className={s.identity}>
                            <input type="text" placeholder="Name" />

                        </div>
                    ) : ''
                }
            </div>
        </main>
    );
}
