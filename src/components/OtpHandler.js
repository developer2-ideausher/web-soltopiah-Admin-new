// "use client"

// import React, { useEffect, useRef, useState } from "react";

// export default function OTP({handler}) {
    
//   const [inputs, setInputs] = useState(['', '', '', '', '', '']);
//   const inputRefs = useRef([
//     React.createRef(),
//     React.createRef(),
//     React.createRef(),
//     React.createRef(),
//     React.createRef(),
//     React.createRef(),
//   ]);
//   const handleInputChange = (index, value) => {
//     const newInputs = [...inputs];
//     newInputs[index] = value;
//     setInputs(newInputs);

//     if (value) {
//       if (index < 5) {
//         inputRefs.current[index + 1].current.focus();
//       } else {
//           // Call parent handler if all inputs are not empty
//         let temp = ''
//         newInputs.map((item)=>{
//           temp = temp + item
//         })
//         handler(temp)
//       }
//     }
//   };
//   useEffect(()=>{
//     inputRefs.current[0].current.focus();
//   },[])
//   return (
//     <div className={"w-auto grid grid-cols-6 gap-10 xs:gap-2 sm:gap-3 md:gap-3 my-1"}>
//       {inputs.map((input, index) => (
//         <input
//           key={index}
//           type="text"
//           value={input}
//           onChange={(e) => handleInputChange(index, e.target.value)}
//           ref={inputRefs.current[index]}
//           min="0" max="1"
//           maxLength={1}
//           className="rounded-lg w-full text-center outline bg-[#EEEEF6] outline-[#EDEDED] py-4 focus:outline-[#232946] outline-1"
//         />
//       ))} 
//     </div>
//   )
// }


import { cn } from "@/Utilities/cn";
import { useRef, useState } from "react";

export default function OTP({ className, digits = 6, handler }) {
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState(Array(digits).fill(""));

    const handleInputChange = (index, e) => {
        const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numeric characters
    
        if (value.length > 0) {
            const newOtp = [...otp];
            newOtp[index] = value[0]; // Always overwrite the current value
            setOtp(newOtp);
    
            // Move to the next input if this is not the last digit
            if (index < digits - 1) {
                inputRefs.current[index + 1]?.focus();
            }
    
            // Trigger the handler if all inputs are filled
            if (newOtp.every((digit) => digit !== "")) {
                handler(newOtp.join(""), true);
            }
        }
    };    

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            e.preventDefault(); // Prevent default behavior
            const newOtp = [...otp];

            if (otp[index]) {
                // Clear the current input
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                // Move focus to the previous input if empty
                inputRefs.current[index - 1]?.focus();
                newOtp[index - 1] = ""; // Clear the previous input
                setOtp(newOtp);
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            // Navigate to the previous input
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < digits - 1) {
            // Navigate to the next input
            inputRefs.current[index + 1]?.focus();
        }
    };

    return (
        <div className={cn(`w-auto grid grid-cols-${digits} gap-3 my-3`, className)} style={{ gridTemplateColumns: `repeat(${digits}, minmax(0, 1fr))` }}>
            {Array.from({ length: digits }).map((_, index) => (
                <input
                    key={`otp-input-${index}`}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                   className="rounded-lg w-full text-center outline bg-[#EEEEF6] outline-[#EDEDED] py-4 focus:outline-[#232946] outline-1"
                    value={otp[index]}
                    onChange={(e) => handleInputChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    placeholder="-"
                />
            ))}
        </div>
    );
}
