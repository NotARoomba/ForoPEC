'use client';
import {useEffect, useState} from 'react';
import {CountdownProps} from '../../utils/Types';

export default function Countdown({nav}: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState(
    new Date('2024/10/20').getTime() - Date.now(),
  );
  useEffect(() => {
    const dateInterval = setInterval(() => {
      setTimeRemaining(new Date('2024/10/20').getTime() - Date.now());
    }, 1000);
    return () => clearInterval(dateInterval);
  }, []);

  return (
    <div
      className={
        'font-roboto justify-around h-8 my-auto max-w-96 w-fit 2xl:px-6 z-10 align-middle font-bold  text-center text-xl rounded-xl shadow-figma' +
        (nav
          ? ' lg:flex hidden bg-flag-yellow text-white'
          // : ' flex lg:hidden mx-auto bg-gradient-to-br from-flag-yellow from-40% via-flag-blue via-50% to-flag-red to-60%  bg-clip-text text-transparent')
         : ' flex lg:hidden mx-auto text-black font-sans')
      }>
        <span className="text-2xl xl:text-2xl  my-auto mx-2">
        {('0' + Math.floor(timeRemaining / (1000 * 60 * 60 * 24))).slice(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)).toString().length > 2 ? -3 : -2)} : {('0' + Math.floor(timeRemaining / (1000 * 60 * 60))).slice(-2)} : {('0' + Math.floor(timeRemaining / (1000 * 60))).slice(-2)} : {('0' + Math.floor(timeRemaining / (1000))).slice(-2)}
      </span>
      {/* <CountdownTime
        remaining={Math.floor(timeRemaining / (1000 * 60 * 60 * 24))}
        unit={'Dias'}
      />
      <b className="my-auto">:</b>
      <CountdownTime
        remaining={Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)}
        unit={'Horas'}
      />
      <b className="my-auto">:</b>
      <CountdownTime
        remaining={Math.floor((timeRemaining / (1000 * 60)) % 60)}
        unit={'Minutos'}
      />
      <b className="my-auto">:</b>
      <CountdownTime
        remaining={Math.floor((timeRemaining / 1000) % 60)}
        unit={'Segundos'}
      /> */}
    </div>
  );
}
