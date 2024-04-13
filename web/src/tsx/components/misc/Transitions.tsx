import { motion } from "framer-motion";
const animationConfiguration = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
export default function Transitions(props: React.PropsWithChildren) {
  return (
    <motion.div
      className="h-full"
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3}}
    >
      {props.children}
    </motion.div>
  );
}
