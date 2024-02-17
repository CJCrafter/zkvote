import ButtonList from "@/app/util/panelbuttonlist";
import PanelButton from "@/app/util/panelbutton";

export default function Home() {
    return (
        <div className="m-5">
            <div className="m-2 border-2 bg-blue-300">
                <p className="p-2 text-black text-center text-2xl">Election Chain</p>

            </div>

            {/* Big panel buttons for registering and voting */}
            <ButtonList>
                <PanelButton href="/register" text="Register" description="Register to vote" />
                <PanelButton href="/vote" text="Vote" description="Vote in the 2024 election" />
            </ButtonList>
        </div>
    );
}
