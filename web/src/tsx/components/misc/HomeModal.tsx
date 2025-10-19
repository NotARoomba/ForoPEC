import {easeInOut, motion} from 'framer-motion';
import LinkButton from './LinkButton';

export default function HomeModal() {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{ease: easeInOut, delay: 0.3, duration: 0.5}}
      className="bg-white flex flex-col mx-auto w-5/6 md:w-[28rem] z-10 h-fit py-8 my-auto translate-y-16 2xl:ml-auto 2xl:mr-28 rounded-3xl shadow-figma">
      <div className="m-auto w-full">
      <img
      alt="XIX Foro Pensando en Colombia"
      className="w-3/5 md:w-3/4 mx-auto"
      src={'/LOGO YIPAO TRANSPARENTE.png'}
      />
      <br className="my-6 lg:flex hidden" />
      <LinkButton
      text="Inscríbete"
      href="https://forms.gle/Ct8RmJE8LLbvpcLG9"
      color="bg-flag-yellow"
      />
      <LinkButton
      text="Inscripción Ponencias"
      href="https://form.jotform.com/242767197619674"
      color="bg-flag-blue"
      />
      <LinkButton
      text="Inscripción Sponsors"
      href="https://docs.google.com/forms/d/e/1FAIpQLSd16IInv1xYTtwoKknCT4Yz5g1NqilMB3mT0kEDCuy17CHPCA/viewform"
      color="bg-flag-red"
      />
      </div>
    </motion.div>
  );
}
