import {useLocation, useOutlet} from 'react-router-dom';
import NavBar from './NavBar';
import Credits from '../misc/Credits';
import {AnimatePresence} from 'framer-motion';
import {useState} from 'react';

export default function NavbarWrapper() {
  const location = useLocation();
  const AnimatedOutlet = () => {
    const o = useOutlet();
    const [outlet] = useState(o);

    return <>{outlet}</>;
  };
  return (
    <>
      <NavBar />
      <AnimatePresence mode="wait">
        <AnimatedOutlet key={location.pathname} />
      </AnimatePresence>
      {/* <Credits /> */}
    </>
  );
}
