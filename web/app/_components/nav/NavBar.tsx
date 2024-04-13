import Image from "next/image"
import Link from "next/link"
import Countdown from "./Countdown"
import NavLinks from "./NavLinks"

export default function NavBar() {
    return <div className="absolute z-50 w-full flex bg-transparent px-12 py-8">
        <div suppressHydrationWarning className="mx-auto w-full flex text-center bg-white h-20 rounded-3xl shadow-xl">
            <Link href={"/"}><Image className="object-contain my-auto mx-8 h-full" alt="Foro XVII" src={'/logo-small.png'} width={100} height={75}/></Link>
            <Countdown />
            <NavLinks />
        </div>
    </div>
}