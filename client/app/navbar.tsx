import Image from "next/image";
import PanelButton from "@/app/util/panelbutton";
import IconButton from "@/app/util/iconbutton";

export default function Navbar() {
    return (
        <>
            <nav className="bg-white text-black flex justify-between items-center p-4">
                <Image
                    src="/zk-logo.svg"
                    width={128}
                    height={64}
                    alt="logo"
                />

                <div className="links flex gap-4 justify-center">
                    <IconButton href="" name="Contact" logo="/contact-button.svg" />
                    <span>|</span>
                    <IconButton href="" name="Language" logo="/language-button.svg" />

                </div>
            </nav>

        </>
    )
}