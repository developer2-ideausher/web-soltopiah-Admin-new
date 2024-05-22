"use client";
import React, { useState } from "react";
import Link from "next/link";
import Bellicon from "../../icons/Bellicon";
import ProfileIcon from "../../icons/ProfileIcon";
import Notification from "../../icons/Notification";
import Logout from "../../icons/Logout";

function Header() {
  const [showDropDown, setShowDropDown] = useState(false);
  const handleClick = () => {
    setShowDropDown(!showDropDown);
  };
  return (
    <div className="w-ful bg-[#D4D8F0] p-6 flex justify-end gap-6 ">
      <div className="flex items-center">
        <Bellicon />
      </div>
      <button onClick={handleClick} className="flex items-center gap-2">
        <div className="size-8 rounded-full	bg-[#AE445A] flex items-center justify-center text-white text-sm font-black ">
          A
        </div>
        <h5 className="text-[#393E59] font-semibold text-sm">Rahul Admin</h5>
      </button>
      {showDropDown && (
        <div className="absolute top-16 p-3 bg-white rounded-lg w-[176px] shadow-lg flex flex-col gap-6">
          <div className="flex flex-row gap-2">
            <div className="bg-[#AE445A] p-3 rounded-full flex items-center">
              <ProfileIcon />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold font-sans text-deepBlue">
                Rahul Admin
              </p>
              <p className="text-xs font-normal font-sans text-[#3090E9]">
                Email@gmail.com
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <Notification />

            <p className="font-sans font-normal text-black text-sm">
              Notification setting
            </p>
          </div>
          <Link href="/login">
            <div className="flex flex-row gap-3 items-center">
              <Logout />

              <p className="font-sans font-normal text-black text-sm">Logout</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
