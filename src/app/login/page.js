"use client"
import Link from "next/link";
import React, { useState } from "react";

function page() {
    const [showLogin,setShowlogin]= useState(false)
    const handleClick=()=>{
        setShowlogin(!showLogin)
    }
  return (
    <div className="flex flex-row h-screen ">
      <div className="w-1/2 bg-primary flex justify-center items-center">
        <img src="LoginImage.png" alt="" />
      </div>

      {!showLogin && <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="flex flex-col gap-6 w-full lg:p-20 xl:p-32 2xl:40">
            <p className="text-primary font-sans font-semibold lg:text-3xl xl:text-4xl 2xl:text-4xl">Login</p>
            <div className="flex flex-col gap-2">
                <p className="text-base font-sans font-semibold text-[#2E2E37]">Mobile number</p>
                <input type="number" placeholder="Enter mobile number" className="py-4 px-4 rounded-lg bg-[#EEEEF6] text-[#2E2E37] text-lg font-normal font-sans xl:w-full 2xl:w-[600px]" />
            </div>
            <button onClick={handleClick} className="bg-primary py-4 px-4 rounded-lg text-base font-sans font-semibold text-white xl:w-full 2xl:w-[600px] ">Verify</button>
            
        </div>
        
      </div>}
      {showLogin && <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="flex flex-col gap-6 w-full lg:p-20 xl:p-32 2xl:40">
            <p className="text-primary font-sans font-semibold lg:text-3xl xl:text-4xl 2xl:text-4xl">Verification</p>
            <div className="flex flex-col gap-4">
                <p className="text-base font-sans font-semibold text-[#2E2E37]">Please enter the 6-digit code sent to <br/> <span className="font-bold">+91-3434343434</span> </p>
                <div className="flex flex-row items-center  gap-4 xl:w-full 2xl:w-[600px]">
                    <input type="number" placeholder="_" className="bg-[#EEEEF6] p-5 lg:w-[52.67px]  xl:w-[52.67px]  2xl:w-[82.67px] rounded-lg xl:text-lg 2xl:text-2xl font-sans font-medium text-[#82829B]"/>
                    <input type="number" placeholder="_" className="bg-[#EEEEF6] p-5 lg:w-[52.67px]  xl:w-[52.67px]  2xl:w-[82.67px] rounded-lg xl:text-lg 2xl:text-2xl font-sans font-medium text-[#82829B]"/>
                    <input type="number" placeholder="_" className="bg-[#EEEEF6] p-5 lg:w-[52.67px]  xl:w-[52.67px]  2xl:w-[82.67px] rounded-lg xl:text-lg 2xl:text-2xl font-sans font-medium text-[#82829B]"/>
                    <input type="number" placeholder="_" className="bg-[#EEEEF6] p-5 lg:w-[52.67px]  xl:w-[52.67px]  2xl:w-[82.67px] rounded-lg xl:text-lg 2xl:text-2xl font-sans font-medium text-[#82829B]" maxLength="1"/>
                    <input type="number" placeholder="_" className="bg-[#EEEEF6] p-5 lg:w-[52.67px]  xl:w-[52.67px]  2xl:w-[82.67px] rounded-lg xl:text-lg 2xl:text-2xl font-sans font-medium text-[#82829B]"/>
                    <input type="number" placeholder="_" className="bg-[#EEEEF6] p-5 lg:w-[52.67px]  xl:w-[52.67px]  2xl:w-[82.67px] rounded-lg xl:text-lg 2xl:text-2xl font-sans font-medium text-[#82829B]"/>
                    
                    
                    
                </div>
            </div>
            <Link href="/dashboard"><button className="bg-primary py-4 px-4 rounded-lg text-base font-sans font-semibold text-white xl:w-full 2xl:w-[600px]  " >Verify</button></Link>
            
        </div>
        
      </div>}
      
    </div>
  );
}

export default page;
