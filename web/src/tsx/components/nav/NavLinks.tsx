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
  const [color, setColor] = useState(colors[0]);
  const [menu, setMenu] = useState(false);
  const linksRef = createRef<HTMLDivElement>();
  const smallLinksRef = createRef<HTMLDivElement>();
  const updatePos = (e: MouseEvent<HTMLAnchorElement>) => {
    setPos((window.innerWidth < 768 ? e.currentTarget.offsetTop : e.currentTarget.offsetLeft) - (32 * window.innerWidth) / 1920);
    setWidth(e.currentTarget.clientWidth + (64 * window.innerWidth) / 1920);
    console.log(`rgb(${hexToRgb(color, 0.8)})`, color)
  };
  const location = useLocation();
  useEffect(() => {
    if (location.pathname == '/') {
      setPos(0);
      setWidth(
        linksRef.current
          ? linksRef.current.children[0].clientWidth +
              (window.innerWidth < 1280 ? 32 : 64)
          : 128,
      );
    }
  }, [location, linksRef]);
  useEffect(() => {
    if (location.pathname == '/' && window.innerWidth < 768) {
      setPos(0);
      setWidth(
        smallLinksRef.current
          ? smallLinksRef.current.children[0].clientWidth +
              (window.innerWidth < 1280 ? 32 : 64)
          : 128,
      );
    }
  }, [location, smallLinksRef]);
  return (
    <div className='flex ml-auto'><motion.div
      onMouseLeave={() => {
        setMPos(-1);
        setMWidth(0);
        console.log(color)
        setMColor(color)
      }}
      className="h-11 relative bg-pastel-light-blue w-fit  mr-5 my-auto rounded-2xl justify-around hidden md:flex shadow-inner-figma" animate={{backgroundColor: `rgb(${hexToRgb(mColor, 1.1)})`}}>
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
    <div className='flex md:hidden  mr-4'>
    <div
          className="flex group items-center flex-col w-16 aspect-square py-3 hover:bg-neutral-200 my-auto rounded-lg ml-auto p-1 align-middle  cursor-pointer transition-all "
          onClick={() => setMenu(!menu)}
        >
          <span
            className={
              "bg-black w-10 block h-1 rounded my-auto duration-300" +
              (menu ? " -rotate-45 translate-y-[13px]" : " rotate-0")
            }
          ></span>
          <span
            className={
              " w-10 block h-1 rounded my-auto duration-300" +
              (menu ? " bg-transparent " : " bg-black")
            }
          ></span>
          <span
            className={
              "bg-black w-10 block h-1 rounded my-auto duration-300" +
              (menu ? " rotate-45 -translate-y-[13px]" : " rotate-0")
            }
          ></span>
        </div>
      </div>
      <motion.div
        onClick={() => setMenu(false)}
        animate={{opacity: menu? 100 : 0}}
        className={
          " bg-white/60 w-11/12 absolute mx-auto h-fit pb-4 pt-4 top-28 z-20 left-1/2 -translate-x-1/2 rounded-3xl justify-center flex-wrap" +
         "" // (menu ? " animate-show" : " animate-hide hidden")
        }
      >
        <motion.div
      onMouseLeave={() => {
        setMPos(-1);
        setMWidth(0);
        console.log(color)
        setMColor(color)
      }}
      className="h-fit relative bg-pastel-light-blue w-11/12 mx-auto my-auto rounded-2xl justify-around md:hidden z-50 flex shadow-inner-figma" animate={{backgroundColor: `rgb(${hexToRgb(mColor, 1.1)})`}}>
      {/* <motion.div onMouseMove={onMouseMove} className=" z-10 left-0 absolute bg-pastel-dark-blue/50 h-11 rounded-3xl shadow-xl" transition={{
  type: "spring",
  damping: 10,
  stiffness: 50
}} animate={{left: , width}} /> */}
      <motion.div
        className=" z-[5] translate-x- absolute bg-pastel-dark-blue h-11 rounded-2xl shadow-figma"
        transition={{
          type: 'spring',
          damping: 10,
          stiffness: 50,
        }}
        animate={{
          top: mPos == -1 ? pos : mPos,
          width: mWidth == 0 ? width : mWidth,
          backgroundColor: mColor
        }}
      />
      <div className="flex flex-col mx-auto w-full gap-2 py-2" ref={smallLinksRef}>
        {menuItems.map((v, i) => (
          <Link
            onMouseEnter={e => {
              setMPos(
                e.currentTarget.offsetTop - (32 * window.innerWidth) / 1920,
              );
              setMWidth(
                e.currentTarget.clientWidth + (64 * window.innerHeight) / 1920,
              );
              setMColor(colors[i])
            }}
            key={i}
            to={v.toLowerCase() == 'inicio' ? '/' : v.toLowerCase()}
            onClick={e => {updatePos(e);setColor(colors[i])}}
            className=" my-auto z-20 text-2xl mx-4 xl:mx-8 font-bold ">
            {v}
          </Link>
        ))}
      </div>
    </motion.div>
        {/* <NavButton route="/play" text="Play" />
        <NavButton route="/leaderboards" text="Leaderboards" />
        {localStorage.getItem("userID") ? (
          <NavButton route="/profile" text="Profile" />
        ) : (
          <NavButton route="/login" text="Login" />
        )} */}
        {/* <ThemeButton theme={theme} changeTheme={changeTheme}  /> */}
      </motion.div>
    </div>
  );
}
