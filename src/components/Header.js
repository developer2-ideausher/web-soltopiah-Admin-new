"use client";
import React, { useState } from "react";
import Link from "next/link";
import Bellicon from "../../icons/Bellicon";
import ProfileIcon from "../../icons/ProfileIcon";
import Notification from "../../icons/Notification";
import Logout from "../../icons/Logout";
import { removeToken } from "@/Services/Cookie/userCookie";

import useFirebaseAuth from "@/Services/Firebase/useFirebaseAuth";
import { useRouter } from "next/navigation";

function Header() {
  const [showDropDown, setShowDropDown] = useState(false);
  const handleClick = () => {
    setShowDropDown(!showDropDown);
    if (!showDropDown) {
      setTimeout(() => {
        setShowDropDown(false);
      }, 3000);
    }
  };
  const router = useRouter();
  const { logOut } = useFirebaseAuth();
  const handleLogOut = async () => {
    removeToken();
    const res = await logOut();
    if (res.status) {
      router.push("/login");
    }
  };
  return (
    <div className="w-ful bg-[#D4D8F0] p-6 flex justify-end gap-6 ">
      {/* <div className="flex items-center">
        <Bellicon />
      </div> */}
      <button onClick={handleClick} className="flex items-center gap-1">
        {/* <div className="size-8 rounded-full	bg-[#AE445A] flex items-center justify-center text-white text-sm font-black ">
          A
        </div> */}
        <img src="/logo.svg" className="w-12 h-12 object-cover" alt="logo" />

        <h5 className="text-[#393E59]  font-semibold text-sm"> Admin</h5>
      </button>
      {showDropDown && (
        <div className="absolute top-16 p-3 right-2 bg-white rounded-lg w-[176px] shadow-lg flex flex-col gap-6">
          <div className="flex flex-row gap-2">
            {/* <div className="bg-[#AE445A] p-3 rounded-full flex items-center">
              <ProfileIcon />
            </div> */}
            <div className="flex justify-center w-full">
              <p className="text-sm font-semibold text-center font-sans text-deepBlue">
                Admin
              </p>
              {/* <p className="text-xs font-normal font-sans text-[#3090E9]">
                Email@gmail.com
              </p> */}
            </div>
          </div>
          {/* <div className="flex flex-row gap-3 items-center">
            <Notification />

            <p className="font-sans font-normal text-black text-sm">
              Notification setting
            </p>
          </div> */}

          <div
            onClick={handleLogOut}
            className="flex flex-row gap-3 items-center cursor-pointer"
          >
            <Logout />

            <p className="font-sans font-normal text-black text-sm">Logout</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
