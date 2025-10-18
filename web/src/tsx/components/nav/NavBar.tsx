import Countdown from './Countdown';
import NavLinks from './NavLinks';
import {Link} from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="z-40 w-full flex px-2 md:px-6 xl:px-12 py-8 fixed top-0 ">
      <div className="mx-auto w-full flex text-center bg-white h-20 rounded-3xl shadow-figma">
        <Link to={'/'}>
          <img
            className="object-contain my-auto mx-8 h-full"
            alt="Foro XIX"
            src={'/LOGO YIPAO TRANSPARENTE.png'}
            width={100}
            height={75}
          />
        </Link>
        <Countdown nav />
        <NavLinks />
      </div>
    </div>
  );
}
