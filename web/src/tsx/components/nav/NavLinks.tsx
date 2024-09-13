import {Link, useLocation} from 'react-router-dom';
import {createRef, useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {MouseEvent} from 'react';
import {hexToRgb} from '../../utils/Functions';

const menuItems = ['Inicio', 'Acerca', 'Historia', 'Salones', 'Mapa'];
const colors = ['#A0D4FF', '#f7d4b6', '#52E0D0', '#f7b6d2', '#d2b6f7'];

export default function NavLinks() {
  const [pos, setPos] = useState(0);
  const [width, setWidth] = useState((128 * window.innerWidth) / 1920);
  const [mWidth, setMWidth] = useState((128 * window.innerWidth) / 1920);
  const [mPos, setMPos] = useState(0);
  const [mColor, setMColor] = useState(colors[0]);
  const [color, setColor] = useState(colors[0]);
  const [menu, setMenu] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const linksRef = createRef<HTMLDivElement>(); // Desktop links
  const smallLinksRef = createRef<HTMLDivElement>(); // Mobile links
  const location = useLocation();

  const updatePos = (
    e: MouseEvent<HTMLAnchorElement>,
    index: number,
    isMobile: boolean,
  ) => {
    if (isMobile) {
      setPos(e.currentTarget.offsetTop - (32 * window.innerWidth) / 1920);
      setWidth(e.currentTarget.clientWidth + (64 * window.innerWidth) / 1920);
    } else {
      setPos(e.currentTarget.offsetLeft - (32 * window.innerWidth) / 1920);
      setWidth(e.currentTarget.clientWidth + (64 * window.innerWidth) / 1920);
    }
    setColor(colors[index]);
  };

  const findActiveIndex = () => {
    const currentPath =
      location.pathname === '/' ? 'inicio' : location.pathname.slice(1);
    return menuItems.findIndex(item => item.toLowerCase() === currentPath);
  };

  useEffect(() => {
    const activeIndex = findActiveIndex();
    if (activeIndex !== -1) {
      // Handle for both desktop and mobile links
      setTimeout(() => {
        if (window.innerWidth < 768 && smallLinksRef.current) {
          const activeElement = smallLinksRef.current.children[
            activeIndex
          ] as HTMLAnchorElement;
          if (activeElement) {
            setPos(activeElement.offsetTop - (32 * window.innerWidth) / 1920);
            setWidth(
              activeElement.clientWidth + (64 * window.innerWidth) / 1920,
            );
            setColor(colors[activeIndex]);
          }
        } else if (linksRef.current) {
          const activeElement = linksRef.current.children[
            activeIndex
          ] as HTMLAnchorElement;
          if (activeElement) {
            setPos(activeElement.offsetLeft - (32 * window.innerWidth) / 1920);
            setWidth(
              activeElement.clientWidth + (64 * window.innerWidth) / 1920,
            );
            setColor(colors[activeIndex]);
          }
        }

        if (!hasLoaded) {
          setMPos(-1);
          setMWidth(0);
          setMColor(colors[activeIndex]);
          setHasLoaded(true);
        }
      }, 0); // Delay to ensure the DOM is ready
    }
  }, [location, linksRef, smallLinksRef]);

  return (
    <div className="flex ml-auto">
      {/* Desktop Menu */}
      <motion.div
        onMouseLeave={() => {
          setMPos(-1);
          setMWidth(0);
          setMColor(color);
        }}
        className="h-11 relative bg-pastel-light-blue w-fit mr-5 my-auto rounded-2xl justify-around hidden md:flex shadow-inner-figma"
        animate={{backgroundColor: `rgb(${hexToRgb(mColor, 1.1)})`}}>
        <motion.div
          className="z-[5] left-0 absolute bg-pastel-dark-blue h-11 rounded-2xl shadow-figma"
          transition={{
            type: 'spring',
            damping: 10,
            stiffness: 50,
          }}
          animate={{
            left: mPos === -1 ? pos : mPos,
            width: mWidth === 0 ? width : mWidth,
            backgroundColor: mColor,
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
                setMColor(colors[i]);
              }}
              key={i}
              to={v.toLowerCase() === 'inicio' ? '/' : v.toLowerCase()}
              onClick={e => updatePos(e, i, false)}
              className="my-auto z-20 text-2xl mx-4 xl:mx-8 font-bold">
              {v}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Mobile Menu Toggle Button */}
      <div className="flex md:hidden mr-4">
        <div
          className="flex group items-center flex-col w-16 aspect-square py-3 hover:bg-neutral-200 my-auto rounded-lg ml-auto p-1 align-middle cursor-pointer transition-all"
          onClick={() => setMenu(!menu)}>
          <span
            className={
              'bg-black w-10 block h-1 rounded my-auto duration-300' +
              (menu ? ' -rotate-45 translate-y-[13px]' : ' rotate-0')
            }></span>
          <span
            className={
              'w-10 block h-1 rounded my-auto duration-300' +
              (menu ? ' bg-transparent ' : ' bg-black')
            }></span>
          <span
            className={
              'bg-black w-10 block h-1 rounded my-auto duration-300' +
              (menu ? ' rotate-45 -translate-y-[13px]' : ' rotate-0')
            }></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        onClick={() => setMenu(false)}
        animate={{opacity: menu ? 100 : 0}}
        className="bg-white/60 w-11/12 absolute mx-auto h-fit pb-4 pt-4 top-28 z-20 left-1/2 -translate-x-1/2 rounded-3xl justify-center flex-wrap">
        <motion.div
          onMouseLeave={() => {
            setMPos(-1);
            setMWidth(0);
            setMColor(color);
          }}
          className="h-fit relative bg-pastel-light-blue w-11/12 mx-auto my-auto rounded-2xl justify-around md:hidden z-50 flex shadow-inner-figma"
          animate={{backgroundColor: `rgb(${hexToRgb(mColor, 1.1)})`}}>
          <motion.div
            className="z-[5] translate-x- absolute bg-pastel-dark-blue h-11 rounded-2xl shadow-figma"
            transition={{
              type: 'spring',
              damping: 10,
              stiffness: 50,
            }}
            animate={{
              top: mPos === -1 ? pos : mPos,
              width: mWidth === 0 ? width : mWidth,
              backgroundColor: mColor,
            }}
          />
          <div
            className="flex flex-col mx-auto w-full gap-2 py-2"
            ref={smallLinksRef}>
            {menuItems.map((v, i) => (
              <Link
                onMouseEnter={e => {
                  setMPos(
                    e.currentTarget.offsetTop - (32 * window.innerWidth) / 1920,
                  );
                  setMWidth(
                    e.currentTarget.clientWidth +
                      (64 * window.innerHeight) / 1920,
                  );
                  setMColor(colors[i]);
                }}
                key={i}
                to={v.toLowerCase() === 'inicio' ? '/' : v.toLowerCase()}
                onClick={e => updatePos(e, i, true)}
                className="my-auto z-20 text-2xl mx-4 xl:mx-8 font-bold">
                {v}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
