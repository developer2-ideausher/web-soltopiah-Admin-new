'use client'
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({interval, handler, className}) => {
  const [timeLeft, setTimeLeft] = useState(interval);

  useEffect(() => {
    const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));

    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(()=>{
    if(timeLeft == 0){
        handler(false);
    }   
  },[timeLeft])
  return (
    <span className={'text-[#ff3b3b] text-sm font-semibold ml-1'}>
      {`Resend in ${timeLeft}s`}
    </span>
  );
};

export default CountdownTimer;