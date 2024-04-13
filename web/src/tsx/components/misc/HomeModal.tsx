import { easeInOut, motion } from "framer-motion";
import LinkButton from "./LinkButton";

export default function HomeModal() {
    return <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{ease: easeInOut, delay: 0.3, duration: 0.5}} className="bg-white flex flex-col min-w-128 z-10 min-h-136 my-auto translate-y-16 ml-auto mr-28 rounded-3xl">
        <div className="m-auto"><img alt="XVIII Foro Pensando en Colombia" width={550}
  height={350}  className="w-3/4 mx-auto"  src={"/foro-logo.png"} />
  <br className="my-6" />
  <LinkButton text="Inscribete" href="https://google.com" color="bg-flag-yellow" />
  <LinkButton text="Inscripcion de ponencias" href="https://google.com" color="bg-flag-blue" />
  <LinkButton text="Inscripcion de sponsors" href="https://google.com" color="bg-flag-red" /></div>
    </motion.div>
}