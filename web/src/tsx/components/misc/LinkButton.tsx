import {LinkButtonProps} from '../../utils/Types';
import {Link} from 'react-router-dom';

export default function LinkButton({text, color, href}: LinkButtonProps) {
  return (
    <Link
      to={href}
      reloadDocument={false}
      className={
        'w-11/12 2xs:w-3/4 rounded-full hover:opacity-90 hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 2xs:h-12 sm:h-16 text-center my-2 text-white flex px-2 sm:px-12 py-2 text-xl sm:text-2xl font-bold mx-auto ' +
        color
      }>
      <p className="m-auto">{text}</p>
    </Link>
  );
}
