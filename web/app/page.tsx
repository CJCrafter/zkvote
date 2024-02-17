import ButtonList from "@/app/util/panelbuttonlist";
import PanelButton from "@/app/util/panelbutton";
import Image from "next/image";
import Navbar from "@/app/navbar";

export default function Home() {
    return (
        <main>
            <Navbar />

            <div align="center">
                <Image
                    src="/i-voted.png"
                    width={720}
                    height={100}
                    alt="woman voting"
                />
            </div>

            {/* Big panel buttons for registering and voting */}
            <div className="flex justify-center items-center">
            <ButtonList>
                <PanelButton href="/register" text="Register" description="Register to vote"/>
                <PanelButton href="/vote" text="Vote" description="Vote in the 2024 election"/>
            </ButtonList>
            </div>
        </main>
    );
}
