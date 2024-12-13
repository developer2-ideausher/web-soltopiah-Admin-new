"use client"

import React, { useEffect, useRef, useState } from "react";

export default function OTP({handler}) {
    
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    if (value) {
      if (index < 5) {
        inputRefs.current[index + 1].current.focus();
      } else {
          // Call parent handler if all inputs are not empty
        let temp = ''
        newInputs.map((item)=>{
          temp = temp + item
        })
        handler(temp)
      }
    }
  };
  useEffect(()=>{
    inputRefs.current[0].current.focus();
  },[])
  return (
    <div className={"w-auto grid grid-cols-6 gap-10 xs:gap-2 sm:gap-3 md:gap-3 my-1"}>
      {inputs.map((input, index) => (
        <input
          key={index}
          type="text"
          value={input}
          onChange={(e) => handleInputChange(index, e.target.value)}
          ref={inputRefs.current[index]}
          min="0" max="1"
          maxLength={1}
          className="rounded-lg w-full text-center outline bg-[#EEEEF6] outline-[#EDEDED] py-4 focus:outline-[#232946] outline-1"
        />
      ))} 
    </div>
  )
}