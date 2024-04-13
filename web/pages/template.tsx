'use client';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0, duration: 100 },
  exit: { opacity: 0, x: 0, y: 200, duration: 200 },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode='sync'>
    <motion.main className='h-full'
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'linear', duration: 1 }}
    >
      {children}
    </motion.main></AnimatePresence>
  );
}