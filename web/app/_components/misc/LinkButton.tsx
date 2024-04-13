import { LinkButtonProps } from "@/app/_libs/Types";
import Link from "next/link";

export default function LinkButton({text, color, href}: LinkButtonProps) {
    return <Link href={href} className={"w-96 rounded-full hover:opacity-90 hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 h-16 text-center my-2 text-white flex px-12 py-2 text-2xl font-bold mx-auto " + color}><p className="m-auto">{text}</p></Link>
}