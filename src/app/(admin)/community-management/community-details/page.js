import BackButton from "@/components/BackButton";
import Link from "next/link";
import React from "react";
import communityImage from "../../../../../public/communityImage.png";  
import Profile from "../../../../../public/Profile.png";  

function page() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/community-management">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Community Details
        </p>
      </div>
      <div className="bg-white p-5 border border-[#E9E9EC] rounded-xl flex flex-col gap-6">
        <div className="flex flex-row gap-6 p-3 rounded-md bg-[#F8F9FD]">
          <div>
            <img src={communityImage.src} alt="image" />
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-row items-center justify-between">
              <p className="text-[#71737F] font-sans font-normal text-sm">
                Community Detail
              </p>
              <p className="bg-[#FCF1F3] border border-[#B6576B] py-2 px-6 rounded-md text-base font-sans font-semibold text-[#595C69]">
                Private Community
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-[#252322] font-sans font-semibold text-3xl">
                Health is need!!
              </h2>
              <p className="text-sm font-sans font-semibold text-[#414554]">
                {" "}
                Feb 27, 2024{" "}
                <span className="font-normal">( Mental Health )</span> (1500
                members)
              </p>
              <p className="text-[#4F546B] text-sm font-sans font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas blandit, ipsum id bibendum ultricies, magna felis
                tincidunt ante, a consectetur dolor justo non neque. Morbi
                tristique congue sapien, ac porttitor lorem lobortis sit amet.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Etiam malesuada eros neque, in ultrices
                eros rutrum in. Nulla blandit nibh nulla, id dictum enim
                sagittis in. Quisque a tellus ac erat tincidunt pharetra vel
                eget tortor. Nam facilisis felis vitae libero elementum, id
                scelerisque metus fermentum. Sed dolor sapien, sodales eu ex eu,
                tristique molestie libero. Phasellus feugiat odio nec diam
                tristique vehicula. Suspendisse lacinia sapien eu ante
                efficitur, et sceleri
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
        <p className="text-sm font-sans font-normal text-[#71737F]">
          All members list
        </p>
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-communityDetailsTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
              User
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
              Account created
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
              User Type
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
              Subscription
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
              Status
              </span>
              
            </div>
          </div>
          <div className="flex flex-col bg-white min-w-fit w-full ">
            <div className=" grid grid-cols-communityDetailsTable border-b justify-between border-[#E9E9EC] items-center p-4">
              <div className="flex flex-row items-center gap-4">
                <img src={Profile.src} alt="" />
                <div>
                <p className="text-base font-sans font-semibold text-[#252322]">
                Henry Fiat
                </p>
                <p className="text-[#666576] text-base font-sans font-normal">henryfiat@tripcircle3.com</p>
                </div>
                
              </div>
              <span className="text-userblack  font-sans font-semibold text-sm">
              Feb 27, 2022, 23:57
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
              Adult
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
              Free
              </span>
              <span className="font-sans font-semibold text-sm border border-[#08A03C80] py-1 px-2 rounded-md w-[100px] text-center text-[#2BAB4B]">
              Admin
              </span>
              
            </div>
            <div className=" grid grid-cols-communityDetailsTable border-b justify-between border-[#E9E9EC] items-center p-4">
              <div className="flex flex-row items-center gap-4">
                <img src={Profile.src} alt="" />
                <div>
                <p className="text-base font-sans font-semibold text-[#252322]">
                Henry Fiat
                </p>
                <p className="text-[#666576] text-base font-sans font-normal">henryfiat@tripcircle3.com</p>
                </div>
                
              </div>
              <span className="text-userblack  font-sans font-semibold text-sm">
              Feb 27, 2022, 23:57
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
              Adult
              </span>
              <span className="text-userblack font-sans font-semibold text-sm">
              Free
              </span>
              <span className="font-sans font-semibold text-sm border border-[#3090E980] py-1 px-2 rounded-md w-[100px] text-center text-[#3090E9]">
              Member
              </span>
              
            </div>
          </div>
        </div>
        </div>
       
      </div>
    </div>
  );
}

export default page;
