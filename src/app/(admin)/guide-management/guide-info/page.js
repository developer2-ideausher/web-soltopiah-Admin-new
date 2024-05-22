import React from "react";
import Export from "../../../../../icons/Export";
import Phone from "../../../../../icons/Phone";
import Email from "../../../../../icons/Email";
import Rectangle from "../../../../../public/Rectangle.png";
import GuideCards from "@/components/GuideCards";
import Link from "next/link";
import BackButton from "@/components/BackButton";

function page() {
  return (
    <div className="flex flex-col gap-7 ">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-5">
          <Link href="/guide-management">
            <BackButton />
          </Link>
          <p className="text-xl2 font-semibold text-userblack font-sans">
            Guide Management
          </p>
        </div>

        <div className="flex flex-row items-center gap-5">
          <select className="py-[10px] px-3 border border-[#DCDBE1] rounded-lg text-sm font-sans font-normal text-userblack focus:outline-none">
            <option value="1">Feb 10 - Feb 16, 22</option>
          </select>
          <div className="bg-white border border-[#DCDBE1] py-[10px] px-3 rounded-lg flex flex-row items-center gap-2">
            <Export />
            <p className="text-sm font-sans font-normal text-userblack">
              Export
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="bg-white flex flex-row gap-3 justify-between py-3 px-5 rounded-xl ">
          <div className="flex flex-col gap-3 border border-[#CE8F9C] rounded-md p-3 w-5/12">
            <div className="flex flex-row  gap-3">
              <img src={Rectangle.src} alt="" />
              <div className="flex flex-col gap-1">
                <p className="text-xl font-sans font-semibold text-userblack">
                  Albert Flores
                </p>
                <p className="text-base font-sans font-semibold text-[#AE445A]">
                  Yoga
                </p>
              </div>
            </div>
            <div className="flex flex-col  gap-1">
              <div className="flex flex-row items-center gap-2">
                <Phone />
                <p className="text-base font-sans font-normal text-[#71737F]">
                  84102947210
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Email />
                <p className="text-base font-sans font-normal text-[#71737F]">
                  jessica.hanson@example.com
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-5 border border-[#CE8F9C] rounded-md p-3 w-4/12">
            <div className="text-base font-sans font-normal text-[#71737F]">
              <p>Total Services</p>
              <p>Service Category</p>
              <p>Focus Area</p>
            </div>
            <div>
              <p>:</p>
              <p>:</p>
              <p>:</p>
            </div>
            <div className="text-base font-sans font-semibold text-userblack">
              <p>12</p>
              <p>12</p>
              <p>Yoga</p>
            </div>
          </div>
          <div className="flex flex-row gap-5 border border-[#CE8F9C] rounded-md p-3 w-3/12">
            <div className="flex flex-row  gap-5">
              <p className="text-base font-sans font-normal text-[#71737F]">
                Total Revenue{" "}
              </p>
              <p>:</p>
              <p className="text-userblack font-sans font-semibold text-base">
                {" "}
                $33200 monthly
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white  p-5 rounded-xl border flex flex-col gap-10 border-[#E9E9EC]">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-sans font-semibold text-userblack">
              Soul module data
            </p>
            <div className="grid  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 justify-between items-center">
              <GuideCards Title="Participated challenges" />
              <GuideCards Title="Community participation" />
              <GuideCards Title="Communities created" />
              <GuideCards Title="Challenges created" />
              <GuideCards Title="Friends" />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-20">
            <p className="text-xl font-sans font-semibold text-userblack">
              Mindful hub data
            </p>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 justify-between items-center">
              <GuideCards Title="15 Video Watched" />
              <GuideCards Title="12 Audio Listened" />
              <GuideCards Title="Course" />
              <GuideCards Title="Guide bookings" />
              <Link href="/guide-management/guide-info/live-created">
                <GuideCards Title="Live created" />
              </Link>
              <Link href="/guide-management/guide-info/quick-reads">
                <GuideCards Title="Quick reads" />
              </Link>
              <Link href="/guide-management/guide-info/session-booked">
                <GuideCards Title="Session Booked" />
              </Link>
             <Link href="/guide-management/guide-info/content-uploaded"><GuideCards Title="Content uploaded" /></Link> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
