"use client"

import { useRef } from "react";

export default function OTP({children, className, digits=6, handler}) {
    const inputRefs = useRef([]);
    let value = []
    const addInputIntoRefArray = (index, el) => {
        inputRefs.current[index] = el
    }
    const handleInputChange = (index, e) => {
        e.currentTarget.value = parseInt(e.currentTarget.value) % 10;
        value[index] = parseInt(e.currentTarget.value) % 10;
        const nextIndex = index + 1;
        if (nextIndex < inputRefs.current.length) {
            inputRefs.current[nextIndex].querySelectorAll("input")[0].focus()
        }
        else{
            let returnString = ""
            inputRefs.current[index].querySelectorAll("input")[0].blur();
            for(let i=0;i<value.length; i++){
                if(value[i]){
                    returnString = returnString.concat(value[i])
                }
                else{
                    inputRefs.current[i].querySelectorAll("input")[0].focus()
                    break;
                }
            }
            if(returnString.length == parseInt(digits)){
                handler(returnString,true)
            }
        }
    }

    if(parseInt(digits)==4) return (
        <div ref={ref} className={"w-auto grid grid-cols-6 gap-3 my-3"}>
            <div className='max-w-12'>
                <input type="number" min="0" max="9" className="rounded-lg text-center outline outline-[#EDEDED] focus:outline-[#FF0000] outline-1" placeholder="-" />
            </div>
            <div className='max-w-12'>
                <input type="number" min="0" max="9" className="rounded-lg text-center outline outline-[#EDEDED] focus:outline-[#FF0000] outline-1" placeholder="-" />
            </div>
            <div className='max-w-12'>
                <input type="number" min="0" max="9" className="rounded-lg text-center outline outline-[#EDEDED] focus:outline-[#FF0000] outline-1" placeholder="-" />
            </div>
            <div className='max-w-12'>
                <input type="number" min="0" max="9" className="rounded-lg text-center outline outline-[#EDEDED] focus:outline-[#FF0000] outline-1" placeholder="-" />
            </div>
        </div>
    )

    return (
        <div className={"w-auto grid grid-cols-6 gap-10 my-1"}>
            {[...Array(parseInt(digits))].map((_, index) => (<div key={`otp-input-${index}`} className='w-full bg-[#EEEEF6]' ref={(el) => addInputIntoRefArray(index, el)}>
                <input type="number" min="0" max="9" className="rounded-lg w-full text-center outline bg-[#EEEEF6] outline-[#EDEDED] py-4 focus:outline-[#FF0000] outline-1" index={index} onChange={(e) => handleInputChange(index, e)} />
                </div>
            ))}
        </div>
    )
}