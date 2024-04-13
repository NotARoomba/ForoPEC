'use client'
import { useEffect, useState } from "react";
import CountdownTime from "./CountdownTime";

export default function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState(
    new Date("2024/10/20").getTime() - Date.now(),
  ); 
  useEffect(() => {
    const dateInterval = setInterval(() => {
        setTimeRemaining(new Date("2024/10/20").getTime() - Date.now());
    }, 1000);
    return () => clearInterval(dateInterval);
  }, []);
  
  return (
    <div suppressHydrationWarning className="bg-yellow-400 text-white font-roboto flex justify-around h-8 px-6 z-10 align-middle font-bold  text-center text-xl my-auto rounded-xl drop-shadow-xl shadow-black">
      <CountdownTime
        remaining={Math.floor(timeRemaining / (1000 * 60 * 60 * 24))}
        unit={"D"}
      />
      <b className="my-auto">:</b>
      <CountdownTime
        remaining={Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)}
        unit={"H"}
      />
      <b className="my-auto">:</b>
      <CountdownTime
        remaining={Math.floor((timeRemaining / (1000 * 60)) % 60)}
        unit={"M"}
      />
      <b className="my-auto">:</b>
      <CountdownTime
        remaining={Math.floor((timeRemaining / 1000) % 60)}
        unit={"S"}
      />
    </div>
  );
}
