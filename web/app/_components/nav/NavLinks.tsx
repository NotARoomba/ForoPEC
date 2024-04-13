'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion"
import { MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
const menuItems = [
    "Inicio",
    "Acerca",
    "Salones",
    "Programacion",
    "Mapa"
  ];
export default function NavLinks() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [pos, setPos] = useState(0);
    const [width, setWidth] = useState(128);
    const updatePos = (e: MouseEvent<HTMLAnchorElement>) => {
      console.log(e.currentTarget.offsetLeft)
      setPos(e.currentTarget.offsetLeft - 32)
      setWidth(e.currentTarget.clientWidth + 64)
    }
    const pathname = usePathname()
  useEffect(() => {
    if (pathname == "/") {
      setPos(0);
      setWidth(128);
    }
  }, [pathname])
    return (<div className="h-11 relative bg-pastel-light-blue w-5/12 ml-auto mr-5 my-auto rounded-3xl justify-around flex shadow-inner-lg">
    <motion.div className=" z-10 left-0 absolute bg-pastel-dark-blue h-11 rounded-3xl shadow-xl" transition={{
  type: "spring",
  damping: 10,
  stiffness: 50
}} animate={{left: pos, width}} />
    {menuItems.map((v, i) => <Link key={i} href={v.toLowerCase() == "inicio" ? "/" : v.toLowerCase()} onClick={(e) => updatePos(e)} className=" my-auto z-20 text-2xl font-bold">{v}</Link>)}
    </div>);
    
}