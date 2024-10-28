"use client";
import EarningsChart from "@/components/DashBoardNew/EarrningsChart";
import SessionBookingChart from "@/components/DashBoardNew/SessionBookingChart";
import React, { use, useEffect, useState } from "react";
import LiveButton from "../../../../icons/LiveButton";
import GreenLive from "../../../../icons/GreenLive";
import Card from "@/components/DashBoardNew/Card";
import UseFeature from "@/components/DashBoardNew/UseFeature";
import { useRouter } from "next/navigation";
import { getToken } from "@/Services/Cookie/userCookie";
import Star from "../../../../icons/Star";
import {
  getRevenueChart,
  getStats,
  getTopCategories,
  getTopGuides,
  getUserGrowth,
} from "@/Services/Api/Dashboard/DashboardApi";
import LoaderSmall from "@/components/LoaderSmall";
import LoaderLarge from "@/components/LoaderLarge";
import NoData from "../../../../icons/NoData";
import NoDataIcon from "../../../../icons/NoDataIcon";
export default function Page() {
  const [guideData, setGuideData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [revenueData,setRevenueData]=useState([])
  const router = useRouter();

  const fetchGuideData = async () => {
    setLoading(true);
    const result = await getTopGuides();
    if (result.status) {
      console.log(result.data);
      setGuideData(result.data);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  const fetchCategroyData = async () => {
    setLoading(true);

    const result = await getTopCategories();
    if (result.status) {
      console.log(result.data);
      setCategoryData(result.data);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  const [timePeriod, setTimePeriod] = useState("weekly");

  const fetchUserData = async (period) => {
    setUserLoading(true);

    const result = await getUserGrowth(period);
    if (result.status) {
      console.log(result.data);
      setUserData(result.data);
    } else {
      console.error(result.message);
    }
    setUserLoading(false);
  };
  const [timeRevenue, setTimeRevenue] = useState("weekly");

  const fetchRevenueData = async (period) => {
    setUserLoading(true);

    const result = await getRevenueChart(period);
    if (result.status) {
      console.log(result.data);
      setRevenueData(result.data);
    } else {
      console.error(result.message);
    }
    setUserLoading(false);
  };

  const fetchStatsData = async () => {
    setLoading(true);

    const result = await getStats();
    if (result.status) {
      console.log(result.data);
      setStatsData(result.data);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGuideData();
    fetchCategroyData();
    fetchStatsData();
  }, []);
  useEffect(() => {
    fetchUserData(timePeriod);
    fetchRevenueData(timeRevenue)
  }, [timePeriod,timeRevenue]);

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
          <button
            onClick={() => router.push("/live-manage")}
            className="flex flex-row items-center gap-2 py-2 px-3 bg-white rounded-lg border border-[#EE3E3E]"
          >
            <LiveButton />
            <p className="text-sm font-sans font-normal text-[#EE3E3E]">
              Live session
            </p>
          </button>
          <button
            onClick={() => router.push("/quickreads")}
            className="flex flex-row items-center gap-2 py-2 px-3 bg-white rounded-lg border border-[#08A03C]"
          >
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
            Number={loading ? <LoaderSmall /> : statsData.totalUsers || "--"}
            color="[#E6FFEC]"
            // Percent="12%"
            // textColour="[#2BAB4B]"
          />
          <Card
            Heading="Total Subscribers"
            Number={
              loading ? <LoaderSmall /> : statsData.totalSubscribers || "--"
            }
            color="[#E6FFEC]"
            // Percent="12%"
            // textColour="[#2BAB4B]"
          />
          <Card
            Heading="Total Guides"
            Number={loading ? <LoaderSmall /> : statsData.totalGuides || "--"}
            color="[#FFF0F1]"
            // Percent="5%"
            // textColour="[#E43A42]"
          />
          <Card
            Heading="Revenue generated $"
            Number={loading ? <LoaderSmall /> : statsData.totalRevenue || "--"}
            color="[#E6FFEC]"
            // Percent="12%"
            // textColour="[#2BAB4B]"
          />
        </div>
        <div className="flex lg:flex-col xl:flex-row 2xl:flex-row items-center gap-4">
          <div className="lg:w-full xl:w-1/2 2xl:w-1/2 bg-white rounded-xl p-5 flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center ">
              <p className="text-base font-sans font-bold text-[#2A2D3E]">
                Revenue
              </p>

              <select
                onChange={(e) => setTimeRevenue(e.target.value)}
                value={timeRevenue} // Bind value to state
                className="focus:outline-none py-2 px-3 bg-white border border-[#DCDBE1] rounded-lg text-sm font-sans font-normal text-[#17161D]"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="w-full h-auto ">
              <SessionBookingChart
              subscriberData={revenueData.SubscriptionRevenue || []}
              guideData={revenueData.GuideSessionBookingRevenue || []}
              timePeriod={timeRevenue} />
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

              <select
                onChange={(e) => setTimePeriod(e.target.value)}
                value={timePeriod} // Bind value to state
                className="focus:outline-none py-2 px-3 bg-white border border-[#DCDBE1] rounded-lg text-sm font-sans font-normal text-[#17161D]"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="w-full h-auto">
              <EarningsChart
                userData={userData.NormalUser || []}
                guideData={userData.Guide || []}
                timePeriod={timePeriod}
              />
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
            {loading && (
              <div className="flex justify-center items-center bg-white">
                <LoaderLarge />
              </div>
            )}
            {!loading && guideData.length === 0 && (
              <div className="flex flex-col items-center justify-center mt-10 gap-4">
                <NoDataIcon />
                <p className="text-[#AE445A] text-base font-sans font-semibold">
                  OOPS! No data found
                </p>
              </div>
            )}
            {guideData &&
              guideData.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center justify-center gap-2">
                    <img src="dash.png" alt="" />
                    <p className="text-[#414554] text-sm font-normal font-sans">
                      {item.firstName} {item.lastName}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1 bg-[#F9882433] py-1 px-2 rounded-full border border-[#F9882436]">
                    <Star />
                    <p className="text-[#B35605] font-sans font-normal text-sm">
                      {item.ratingsAverage}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div className="lg:w-full  xl:w-1/3  2xl:w-1/3  bg-white p-5 h-auto rounded-xl flex flex-col gap-6">
            <p className="text-deepBlue text-base font-sans font-bold">
              Category Performances
            </p>
            {loading && (
              <div className="flex justify-center items-center bg-white">
                <LoaderLarge />
              </div>
            )}
            {!loading && categoryData.length === 0 && (
              <div className="flex flex-col items-center justify-center mt-10 gap-4">
                <NoDataIcon />
                <p className="text-[#AE445A] text-base font-sans font-semibold">
                  OOPS! No data found
                </p>
              </div>
            )}
            {categoryData &&
              categoryData.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center justify-center gap-2">
                    <img src={item.category?.image?.url || "dash.png"} alt="image" className="w-11 h-11 rounded-full object-cover" />
                    <p className="text-[#414554] text-sm font-normal font-sans">
                      {item.category?.title}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1 bg-[#F9882433] py-1 px-2 rounded-full border border-[#F9882436]">
                    <Star />
                    <p className="text-[#B35605] font-sans font-normal text-sm">
                      {item.count}
                    </p>
                  </div>
                </div>
              ))}
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
    </div>
  );
}
