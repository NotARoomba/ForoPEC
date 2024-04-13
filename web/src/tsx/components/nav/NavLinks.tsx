import { Link, useLocation } from "react-router-dom";
import { MouseEventHandler, ReactElement, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion"
import { MouseEvent } from "react";
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
    const [mWidth, setMWidth] = useState(128);
    const [mPos, setMPos] = useState(0);
    const updatePos = (e: MouseEvent<HTMLAnchorElement>) => {
      console.log(e.currentTarget.offsetLeft)
      setPos(e.currentTarget.offsetLeft - 32)
      setWidth(e.currentTarget.clientWidth + 64)
    }
    const location = useLocation();
  useEffect(() => {
    if (location.pathname == "/") {
      setPos(0);
      setWidth(128);
    }
  }, [location])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - (width/2);
    const y = e.clientY - rect.top;

    setMPos(x)
  };
    return (<div onMouseLeave={() => {setMPos(-1); setMWidth(0)}} className="h-11 relative bg-pastel-light-blue w-5/12 ml-auto mr-5 my-auto rounded-3xl justify-around flex shadow-inner-lg">

{/* <motion.div onMouseMove={onMouseMove} className=" z-10 left-0 absolute bg-pastel-dark-blue/50 h-11 rounded-3xl shadow-xl" transition={{
  type: "spring",
  damping: 10,
  stiffness: 50
}} animate={{left: , width}} /> */}
    <motion.div className=" z-[5] left-0 absolute bg-pastel-dark-blue h-11 rounded-3xl shadow-xl" transition={{
  type: "spring",
  damping: 10,
  stiffness: 50
}} animate={{left: mPos == -1 ? pos : mPos, width: mWidth == 0 ? width : mWidth}} />
    {menuItems.map((v, i) => <Link onMouseEnter={(e) => {setMPos(e.currentTarget.offsetLeft - 32);setMWidth(e.currentTarget.clientWidth + 64)}} key={i} to={v.toLowerCase() == "inicio" ? "/" : v.toLowerCase()} onClick={(e) => updatePos(e)} className=" my-auto z-20 text-2xl font-bold">{v}</Link>)}
    </div>);
    
}