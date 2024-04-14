'use client';
import {useEffect, useState} from 'react';
import CountdownTime from './CountdownTime';
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
        '    font-roboto  justify-around h-8 max-w-96 w-fit my-6  2xl:px-6 z-10 align-middle font-bold  text-center text-xl rounded-xl shadow' +
        (nav
          ? ' lg:flex hidden bg-flag-yellow text-white'
          : ' flex lg:hidden mx-auto bg-white text-black')
      }>
      <CountdownTime
        remaining={Math.floor(timeRemaining / (1000 * 60 * 60 * 24))}
        unit={'D'}
      />
      <b className="my-auto">:</b>
      <CountdownTime
        remaining={Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)}
        unit={'H'}
      />
      <b className="my-auto">:</b>
      <CountdownTime
        remaining={Math.floor((timeRemaining / (1000 * 60)) % 60)}
        unit={'M'}
      />
      <b className="my-auto">:</b>
      <CountdownTime
        remaining={Math.floor((timeRemaining / 1000) % 60)}
        unit={'S'}
      />
    </div>
  );
}
