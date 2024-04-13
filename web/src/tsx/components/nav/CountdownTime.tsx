import {CountdownTimeProps} from '../../../../src/tsx/utils/Types';

export default function CountdownTime({remaining, unit}: CountdownTimeProps) {
  return (
    <div className="text-center text-base font-roboto my-auto mx-2 text-slate-500">
      <span suppressHydrationWarning className="text-2xl text-white">
        {('0' + remaining).slice(remaining.toString().length > 2 ? -3 : -2)}{' '}
        {unit}
      </span>
      {/*<br />{unit}*/}
    </div>
  );
}
