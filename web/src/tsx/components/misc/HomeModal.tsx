import {easeInOut, motion} from 'framer-motion';
import LinkButton from './LinkButton';

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
        <LinkButton
          text="Inscríbete"
          href="https://form.jotform.com/240504794808664"
          color="bg-flag-yellow"
        />
        <LinkButton
          text="Inscripción de Ponencias"
          href="https://form.jotform.com/241005426313644"
          color="bg-flag-blue"
        />
        <LinkButton
          text="Inscripción de Sponsors"
          href="https://www.jotform.com/build/241007126492348"
          color="bg-flag-red"
        />
      </div>
    </motion.div>
  );
}
