import {easeInOut, motion} from 'framer-motion';
import LinkButton from './LinkButton';
import Countdown from '../nav/Countdown';

export default function HomeModal() {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{ease: easeInOut, delay: 0.3, duration: 0.5}}
      className="bg-white flex flex-col mx-auto 2xl:min-w-128 w-5/6 md:w-auto z-10 h-fit py-8 my-auto translate-y-16 2xl:ml-auto 2xl:mr-28 rounded-3xl shadow-figma">
      <div className="m-auto w-full">
        <img
          alt="XVIII Foro Pensando en Colombia"
          className="w-3/4 mx-auto"
          src={'/foro-logo.png'}
        />
        <br className="my-6 lg:flex hidden" />
        <Countdown />
        <LinkButton
          text="Inscribete"
          href="https://google.com"
          color="bg-flag-yellow"
        />
        <LinkButton
          text="Inscripcion de ponencias"
          href="https://google.com"
          color="bg-flag-blue"
        />
        <LinkButton
          text="Inscripcion de sponsors"
          href="https://google.com"
          color="bg-flag-red"
        />
      </div>
    </motion.div>
  );
}
