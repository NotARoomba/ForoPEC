import {Link, useLocation} from 'react-router-dom';
import {createRef, useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {MouseEvent} from 'react';
const menuItems = ['Inicio', 'Acerca', 'Salones', 'Programacion', 'Mapa'];
export default function NavLinks() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pos, setPos] = useState(0);
  const [width, setWidth] = useState((128 * window.innerWidth) / 1920);
  const [mWidth, setMWidth] = useState((128 * window.innerWidth) / 1920);
  const [mPos, setMPos] = useState(0);
  const linksRef = createRef<HTMLDivElement>();
  const updatePos = (e: MouseEvent<HTMLAnchorElement>) => {
    setPos(e.currentTarget.offsetLeft - (32 * window.innerWidth) / 1920);
    setWidth(e.currentTarget.clientWidth + (64 * window.innerWidth) / 1920);
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
    <div
      onMouseLeave={() => {
        setMPos(-1);
        setMWidth(0);
      }}
      className="h-11 relative bg-pastel-light-blue w-fit ml-auto mr-5 my-auto rounded-2xl justify-around hidden md:flex shadow-inner-figma">
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
            }}
            key={i}
            to={v.toLowerCase() == 'inicio' ? '/' : v.toLowerCase()}
            onClick={e => updatePos(e)}
            className=" my-auto z-20 text-2xl mx-4 xl:mx-8 font-bold">
            {v}
          </Link>
        ))}
      </div>
    </div>
  );
}
