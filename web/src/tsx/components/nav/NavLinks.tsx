import {Link, useLocation} from 'react-router-dom';
import {createRef, useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {MouseEvent} from 'react';
import { hexToRgb } from '../../utils/Functions';
const menuItems = ['Inicio', 'Acerca', 'Salones', 'Programacion', 'Mapa'];
const colors = ['#A0D4FF', '#f7d4b6', '#b6f7e0', '#f7b6d2', '#d2b6f7'];
export default function NavLinks() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pos, setPos] = useState(0);
  const [width, setWidth] = useState((128 * window.innerWidth) / 1920);
  const [mWidth, setMWidth] = useState((128 * window.innerWidth) / 1920);
  const [mPos, setMPos] = useState(0);
  const [mColor, setMColor] = useState(colors[0])
  const [color, setColor] = useState(colors[0])
  const linksRef = createRef<HTMLDivElement>();
  const updatePos = (e: MouseEvent<HTMLAnchorElement>) => {
    setPos(e.currentTarget.offsetLeft - (32 * window.innerWidth) / 1920);
    setWidth(e.currentTarget.clientWidth + (64 * window.innerWidth) / 1920);
    console.log(`rgb(${hexToRgb(color, 0.8)})`, color)
  };
  const location = useLocation();
  useEffect(() => {
    if (location.pathname == '/') {
      setPos(0);
      console.log(linksRef.current?.children[0].innerHTML);
      setWidth(
        linksRef.current
          ? linksRef.current.children[0].clientWidth +
              (window.innerWidth < 1280 ? 32 : 64)
          : 128,
      );
    }
  }, [location, linksRef]);
  return (
    <motion.div
      onMouseLeave={() => {
        setMPos(-1);
        setMWidth(0);
        console.log(color)
        setMColor(color)
      }}
      className="h-11 relative bg-pastel-light-blue w-fit ml-auto mr-5 my-auto rounded-2xl justify-around hidden md:flex shadow-inner-figma" animate={{backgroundColor: `rgb(${hexToRgb(mColor, 1.1)})`}}>
      {/* <motion.div onMouseMove={onMouseMove} className=" z-10 left-0 absolute bg-pastel-dark-blue/50 h-11 rounded-3xl shadow-xl" transition={{
  type: "spring",
  damping: 10,
  stiffness: 50
}} animate={{left: , width}} /> */}
      <motion.div
        className=" z-[5] left-0 absolute bg-pastel-dark-blue h-11 rounded-2xl shadow-figma"
        transition={{
          type: 'spring',
          damping: 10,
          stiffness: 50,
        }}
        animate={{
          left: mPos == -1 ? pos : mPos,
          width: mWidth == 0 ? width : mWidth,
          backgroundColor: mColor
        }}
      />
      <div className="flex" ref={linksRef}>
        {menuItems.map((v, i) => (
          <Link
            onMouseEnter={e => {
              setMPos(
                e.currentTarget.offsetLeft - (32 * window.innerWidth) / 1920,
              );
              setMWidth(
                e.currentTarget.clientWidth + (64 * window.innerWidth) / 1920,
              );
              setMColor(colors[i])
            }}
            key={i}
            to={v.toLowerCase() == 'inicio' ? '/' : v.toLowerCase()}
            onClick={e => {updatePos(e);setColor(colors[i])}}
            className=" my-auto z-20 text-2xl mx-4 xl:mx-8 font-bold">
            {v}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
