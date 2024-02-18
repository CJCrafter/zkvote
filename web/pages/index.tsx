
import Image from "next/image";
import ButtonList from "@/components/panelbuttonlist";
import PanelButton from "@/components/panelbutton";
import s from "./index.module.scss";

export default function Home() {
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

                <div className={s.voter}>
                    <div className={s.identity}>
                        <input type="text" placeholder="Enter your voter ID" className={s.input} />
                        <button>continue</button>
                    </div>
                </div>

                {/* <div className="absolute bottom-0 left-0 right-0">
                    <div className="flex justify-center items-center">
                        <ButtonList>
                            <PanelButton href="/register" text="Register" description="Register to vote"/>
                            <PanelButton href="/vote" text="Vote" description="Vote in the 2024 election"/>
                        </ButtonList>
                    </div>
                </div> */}
           {/*  </div> */}
        </main>
    );
}
