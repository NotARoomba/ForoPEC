import {LinkButtonProps} from '../../utils/Types';
import {Link} from 'react-router-dom';

export default function LinkButton({text, color, href}: LinkButtonProps) {
  return (
    <Link
      to={href}
      reloadDocument={false}
      className={
        'w-96 rounded-full hover:opacity-90 hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 h-16 text-center my-2 text-white flex px-12 py-2 text-2xl font-bold mx-auto ' +
        color
      }>
      <p className="m-auto">{text}</p>
    </Link>
  );
}
