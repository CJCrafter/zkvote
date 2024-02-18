import IconButton from "@/components/iconbutton";
import Image from "next/image";
import s from "./navbar.module.scss";

export default function Navbar() {
    return (
        <>
            <nav className={s.navbar}>
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