
import Image from "next/image";
import Navbar from "./navbar";
import ButtonList from "@/components/panelbuttonlist";
import PanelButton from "@/components/panelbutton";

export default function Home() {
    return (
        <main>
            <div className="relative bg-[url('/rect3.png')] bg-cover bg-blue-600 top-0 left-0 w-screen h-screen">
                <Navbar/>

                <div className="pt-80 text-center align-middle">
                    <div className="
                        font-nasa text-9xl
                        text-white
                        bg-black p-2
                    ">
                        VOTE
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <div className="flex justify-center items-center">
                        <ButtonList>
                            <PanelButton href="/register" text="Register" description="Register to vote"/>
                            <PanelButton href="/vote" text="Vote" description="Vote in the 2024 election"/>
                        </ButtonList>
                    </div>
                </div>
            </div>
        </main>
    );
}
