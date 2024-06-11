"use client";
import EarningsChart from "@/components/DashBoardNew/EarrningsChart";
import SessionBookingChart from "@/components/DashBoardNew/SessionBookingChart";
import TopAudioChart from "@/components/dashbaord/TopAudioChart";
import TopCoursesChart from "@/components/dashbaord/TopCoursesChart";
import TopVedioChart from "@/components/dashbaord/TopVideoCharts";
import React, { useEffect, useInsertionEffect, useLayoutEffect } from "react";
import LiveButton from "../../../../icons/LiveButton";
import GreenLive from "../../../../icons/GreenLive";
import Card from "@/components/DashBoardNew/Card";
import BlackDownwardsArrow from "../../../../icons/BlackDownwardsArrow";
import GuidesPieChart from "@/components/DashBoardNew/GuidePieChart";
import CategoryChart from "@/components/DashBoardNew/CategoryChart";
import UseFeature from "@/components/DashBoardNew/UseFeature";
import { useRouter } from "next/navigation";
import { getToken } from "@/Services/Cookie/userCookie";
export default function Page() {
  const router = useRouter();

  const token = getToken();
  useEffect(() => {
    console.log(token);
    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <div className=" flex flex-col gap-11 ">
      <div className="flex flex-row justify-between items-center">
        <p
          onClick={() => router.push("/user-management")}
          className="text-xl2 font-semibold font-sans text-[#17161D]"
        >
          Dashboard
        </p>
        <div className="flex flex-row items-center gap-2">
          <button className="flex flex-row items-center gap-2 py-2 px-3 bg-white rounded-lg border border-[#EE3E3E]">
            <LiveButton />
            <p className="text-sm font-sans font-normal text-[#EE3E3E]">
              Live session
            </p>
          </button>
          <button className="flex flex-row items-center gap-2 py-2 px-3 bg-white rounded-lg border border-[#08A03C]">
            <GreenLive />
            <p className="text-sm font-sans font-normal text-[#08A03C]">
              Quick read
            </p>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 items-center gap-5">
          <Card
            Heading="Total Users"
            Number="31,583"
            color="[#E6FFEC]"
            Percent="12%"
            textColour="[#2BAB4B]"
          />
          <Card
            Heading="Total Subscribers"
            Number="22,785"
            color="[#E6FFEC]"
            Percent="12%"
            textColour="[#2BAB4B]"
          />
          <Card
            Heading="Total Guides"
            Number="10,000"
            color="[#FFF0F1]"
            Percent="5%"
            textColour="[#E43A42]"
          />
          <Card
            Heading="Revenue generated"
            Number="$87.9K"
            color="[#E6FFEC]"
            Percent="12%"
            textColour="[#2BAB4B]"
          />
        </div>
        <div className="flex lg:flex-col xl:flex-row 2xl:flex-row items-center gap-4">
          <div className="lg:w-full xl:w-1/2 2xl:w-1/2 bg-white rounded-xl p-5 flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center ">
              <p className="text-base font-sans font-bold text-[#2A2D3E]">
                Revenue
              </p>

              <select className="focus:outline-none  py-2 px-3 bg-white border border-[#DCDBE1]  rounded-lg text-sm font-sans font-normal text-[#17161D] flex flex-row gap-2">
                <option value="1">Weekly</option>
              </select>
            </div>
            <div className="w-full h-auto ">
              {/* <EarningsChart/> */}
              <SessionBookingChart />
            </div>
            <div className="flex flex-row justify-center gap-10">
              <div className="gap-2 flex flex-row items-center">
                <p className="w-3 h-3 bg-[#DADADA] rounded-[4px]"></p>
                <p className="text-sm font-inter font-light text-[#121616]">
                  Guide
                </p>
              </div>
              <div className="gap-2 flex flex-row items-center">
                <p className="w-3 h-3 bg-black rounded-[4px]"></p>
                <p className="text-sm font-inter font-light text-[#121616]">
                  Subscribers
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-full xl:w-1/2 2xl:w-1/2 bg-white rounded-xl p-5 flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center ">
              <p className="text-base font-sans font-bold text-[#2A2D3E]">
                Newly Joined
              </p>

              <select className="focus:outline-none  py-2 px-3 bg-white border border-[#DCDBE1]  rounded-lg text-sm font-sans font-normal text-[#17161D] flex flex-row gap-2">
                <option value="1">Weekly</option>
              </select>
            </div>
            <div className="w-full h-auto">
              <EarningsChart />
            </div>
            <div className="flex flex-row justify-center gap-10">
              <div className="gap-2 flex flex-row items-center">
                <p className="border w-8 border-[#0F75BC] border-dashed"></p>
                <p className="text-sm font-inter font-light text-[#121616]">
                  Users
                </p>
              </div>
              <div className="gap-2 flex flex-row items-center">
                <p className="border w-8 border-[#0F75BC] "></p>
                <p className="text-sm font-inter font-light text-[#121616]">
                  Guides
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-col xl:flex-row 2xl:flex-row  items-cente justify-between gap-4">
          <div className="lg:w-full xl:w-1/3 2xl:w-1/3 bg-white p-5  rounded-xl flex flex-col gap-6">
            <p className="text-deepBlue  text-base font-sans font-bold">
              Top 5 Guides
            </p>
            <div className="">
              <CategoryChart />
              {/* <TopAudioChart/> */}
            </div>
          </div>
          <div className="lg:w-full  xl:w-1/3  2xl:w-1/3  bg-white p-5 h-auto rounded-xl flex flex-col gap-6">
            <p className="text-deepBlue text-base font-sans font-bold">
              Category Performances
            </p>
            <div className="">
              <CategoryChart />
            </div>
          </div>
          <div className="lg:w-full  xl:w-1/3  2xl:w-1/3  bg-white p-5 h-auto rounded-xl flex flex-col gap-6">
            <p className="text-deepBlue text-base font-sans font-bold">
              Most Used Features
            </p>
            <div className="">
              <UseFeature />
            </div>
          </div>
        </div>
      </div>

      {/* <div className='w-full flex items-center justify-between'>
          <h2 className='text-xl2 font-semibold text-[#17161D]'>Dashboard</h2>
          <div className='flex items-center gap-1 bg-white border-[#DCDBE1] border border-solid rounded-lg p-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16.289 11.9141L10.664 17.5391C10.4871 17.7137 10.2486 17.8116 9.99998 17.8116C9.7514 17.8116 9.51283 17.7137 9.33592 17.5391L3.71092 11.9141C3.5348 11.7379 3.43585 11.4991 3.43585 11.25C3.43585 11.0009 3.5348 10.7621 3.71092 10.5859C3.88704 10.4098 4.12591 10.3109 4.37498 10.3109C4.62405 10.3109 4.86292 10.4098 5.03904 10.5859L9.06248 14.6094V3.125C9.06248 2.87636 9.16125 2.6379 9.33707 2.46209C9.51288 2.28627 9.75134 2.1875 9.99998 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V14.6094L14.9609 10.5859C15.137 10.4098 15.3759 10.3109 15.625 10.3109C15.8741 10.3109 16.1129 10.4098 16.289 10.5859C16.4652 10.7621 16.5641 11.0009 16.5641 11.25C16.5641 11.4991 16.4652 11.7379 16.289 11.9141Z" fill="#666576"/>
            </svg>
            <h6 className='font-normal text-[#17161D] text-xs'>Export</h6>
          </div>
        </div>
        <div className='w-full grid grid-cols-3 gap-5 mt-6'>
          <div className='bg-white rounded-xl px-5 py-4'>
            <h6 className='font-normal text-[#606B6C] text-xs'>Total Sessions</h6>
            <h4 className='text-xl text-[#121616] font-bold mt-3'>1100</h4>
          </div>
          <div className='bg-white rounded-xl px-5 py-4'>
            <h6 className='font-normal text-[#606B6C] text-xs'>Total earnings</h6>
            <h4 className='text-xl text-[#121616] font-bold mt-3'>$87.9K</h4>
          </div>
          <div className='bg-white rounded-xl px-5 py-4'>
            <h6 className='font-normal text-[#606B6C] text-xs'>Total earnings</h6>
            <h4 className='text-xl text-[#121616] font-bold mt-3'>110</h4>
          </div>
          <div className='bg-white rounded-xl px-5 py-4'>
            <h6 className='font-normal text-[#606B6C] text-xs'>Total videos uploaded</h6>
            <h4 className='text-xl text-[#121616] font-bold mt-3'>60</h4>
          </div>
          <div className='bg-white rounded-xl px-5 py-4'>
            <h6 className='font-normal text-[#606B6C] text-xs'>Total videos uploaded</h6>
            <h4 className='text-xl text-[#121616] font-bold mt-3'>110</h4>
          </div>
          <div className='bg-white rounded-xl px-5 py-4'>
            <h6 className='font-normal text-[#606B6C] text-xs'>Total videos uploaded</h6>
            <h4 className='text-xl text-[#121616] font-bold mt-3'>110</h4>
          </div>
        </div> */}
      {/* <div className='w-full grid grid-cols-2 gap-5 mt-6'>
          <SessionBookingChart/>
          <EarningsChart/> 
        </div> */}
      {/* <div className='w-full grid grid-cols-3 gap-5 mt-6'>
          <TopAudioChart/>
          <TopVedioChart/>
          <TopCoursesChart/>
        </div> */}
    </div>
  );
}
