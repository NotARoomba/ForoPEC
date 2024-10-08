import {CountdownTimeProps} from '../../../../src/tsx/utils/Types';

export default function CountdownTime({remaining}: CountdownTimeProps) {
  return (
    <div className="text-center text-sm my-auto mx-2 ">
      <span className="text-2xl xl:text-2xl ">
        {('0' + remaining).slice(remaining.toString().length > 2 ? -3 : -2)}
      </span>
      {/* {' '}{unit} */}
    </div>
  );
}
