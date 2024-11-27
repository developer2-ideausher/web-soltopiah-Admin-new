"use client";
import FilterBar from "@/components/FilterBar";
import SingleCM from "@/components/SingleCM";
import SingleEM from "@/components/SingleEM";
import React, { useEffect, useState } from "react";
import Export from "../../../../icons/Export";
import EarningsChart from "@/components/DashBoardNew/EarrningsChart";
import Star from "../../../../icons/Star";
import NoDataIcon from "../../../../icons/NoDataIcon";
import LoaderLarge from "@/components/LoaderLarge";
import RobinPagination from "@/components/Pagination";
import {
  revenueChart,
  revenueStats,
  tableApi,
} from "@/Services/Api/Earning-Management/earning";
import dayjs from "dayjs";
import { getTopGuides } from "@/Services/Api/Dashboard/DashboardApi";
import RevenueChart from "@/components/RevenueChart";
import { truncateDescription, truncateName } from "@/Utilities/helper";
import SearchBar from "@/components/AddSearchBar";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState("a");
  const [data, setData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [guideData, setGuideData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [timePeriod, setTimePeriod] = useState("weekly");

  const fetchChartData = async (period) => {
    const result = await revenueChart(period);
    if (result.status) {
      console.log(result.data);
      setChartData(result.data);
    } else {
      console.error(result.message);
    }
  };
  const fetchData = async (tableData, page) => {
    setLoading(true);
    setData([]);
    const result = await tableApi(tableData, page);
    if (result.status) {
      console.log(result.data.results);
      setData(result.data.results);
      setTotalPages(result.data.totalPages);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  const fetchGuideData = async () => {
    setLoading(true);
    setGuideData([]);

    const result = await getTopGuides();
    if (result.status) {
      console.log(result.data);
      setGuideData(result.data);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  const fetchStatsData = async () => {
    setLoading(true);
    const result = await revenueStats();
    if (result.status) {
      console.log(result.data);
      setStatsData(result.data);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const tableData =
      table === "a"
        ? "SubscriptionRevenue"
        : table === "b"
        ? "GuideSessionBookingRevenue"
        : "DonationRevenue";
    setCurrentPage(1);
    fetchData(tableData, currentPage);
    fetchGuideData();
    fetchChartData(timePeriod);
    fetchStatsData()
  }, [table, currentPage, timePeriod]);
  return (
    <div className="w-full flex flex-col font-sans">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl2 font-semibold text-[#17161D]">
          Earning Management
        </h2>
        <div className="bg-white border border-[#DCDBE1] py-[10px] px-3 rounded-lg flex flex-row items-center gap-2">
          <Export />
          <p className="text-sm font-sans font-normal text-userblack">Export</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-5 mt-5">
        <div className="bg-white rounded-xl px-5 py-4">
          <h6 className="font-normal text-[#606B6C] text-xs">Total Revenue</h6>
          <h4 className="text-xl text-[#121616] font-bold mt-3">{"$"+" "+statsData?.totalPlatformEarnings}</h4>
        </div>
        {/* <div className="bg-white rounded-xl px-5 py-4">
          <h6 className="font-normal text-[#606B6C] text-xs">
            Total Guide Revenue To Be Released
          </h6>
          <h4 className="text-xl text-[#121616] font-bold mt-3">$90k</h4>
        </div> */}
        <div className="bg-white rounded-xl px-5 py-4">
          <h6 className="font-normal text-[#606B6C] text-xs">
            Subscription Revenue
          </h6>
          <h4 className="text-xl text-[#121616] font-bold mt-3">{"$ " + (
            statsData?.earningsByRevenueSource?.find(item => item._id === "SubscriptionRevenue")?.platformEarnings || 0
          )}</h4>
        </div>
        <div className="bg-white rounded-xl px-5 py-4">
          <h6 className="font-normal text-[#606B6C] text-xs">
            Sessions Revenue
          </h6>
          <h4 className="text-xl text-[#121616] font-bold mt-3"> {"$ " + (
            statsData?.earningsByRevenueSource?.find(item => item._id === "GuideSessionBookingRevenue")?.platformEarnings || 0
          )}</h4>
        </div>
      </div>
      <div className="flex  justify-between gap-10 mt-6">
        <div className="lg:w-full xl:w-1/2 2xl:w-1/2 bg-white rounded-xl p-5 flex flex-col  gap-4">
          <div className="flex flex-row justify-between items-center ">
            <p className="text-base font-sans font-bold text-[#2A2D3E]">
              Earning Trends
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
            <RevenueChart
              userData={chartData.SubscriptionRevenue || []}
              guideData={chartData.GuideSessionBookingRevenue || []}
              timePeriod={timePeriod}
            />
          </div>
          <div className="flex flex-row justify-center gap-10">
            <div className="gap-2 flex flex-row items-center">
              <p className="border w-8 border-[#0F75BC] border-dashed"></p>
              <p className="text-sm font-inter font-light text-[#121616]">
                Subscriptions
              </p>
            </div>
            <div className="gap-2 flex flex-row items-center">
              <p className="border w-8 border-[#0F75BC] "></p>
              <p className="text-sm font-inter font-light text-[#121616]">
                Bookings
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-full xl:w-1/2 2xl:w-1/2 bg-white p-5 rounded-xl flex flex-col gap-6">
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
      </div>
      <div className="flex items-center mt-12 border-b border-[#DDDDDD]">
        <button
          onClick={() => setTable("a")}
          className={`py-2 px-6 ${
            table === "a" ? "text-[#252322] bg-[#0000000D]" : "text-[#838383]"
          } font-sans font-semibold text-base`}
        >
          Subscription payment
        </button>
        <button
          onClick={() => setTable("b")}
          className={`py-2 px-6 ${
            table === "b" ? "text-[#252322] bg-[#0000000D]" : "text-[#838383]"
          } font-sans font-semibold text-base`}
        >
          Session Payment
        </button>
        <button
          onClick={() => setTable("c")}
          className={`py-2 px-6 ${
            table === "c" ? "text-[#252322] bg-[#0000000D]" : "text-[#838383]"
          } font-sans font-semibold text-base`}
        >
          Donation Payment
        </button>
      </div>
      <div className="flex flex-col mt-5">
        {/* <SearchBar /> */}
        <SearchBar showAddButton={false}/>
        
        {table === "a" && (
          <div className="w-full overflow-x-scroll booking-table-wrapper">
            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center grid grid-cols-earning justify-between p-4">
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Guide Name
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Payment Amount
                </span>

                <span className="text-[#666576] font-sans font-normal text-sm">
                  Transaction ID
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Payment Date
                </span>
              </div>
            </div>
            {loading && (
              <div className="flex justify-center items-center bg-white">
                <LoaderLarge />
              </div>
            )}

            {!loading && data.length === 0 && (
              <div className="text-center bg-white text-lg font-semibold text-gray-600 p-4">
                No data yet.
              </div>
            )}
            <div className="flex flex-col bg-white min-w-fit w-full">
              {data &&
                data.map((item, index) => (
                  <div
                    key={item._id || index}
                    className=" grid grid-cols-earning justify-between border-b border-[#E9E9EC] items-center p-4"
                  >
                    <div className="text-userblack w-full flex  gap-2 font-sans font-semibold text-base ">
                      <img
                        src="/Frame1.png"
                        alt="frame"
                        className="w-11 h-11 rounded-full"
                      />
                      <div className="flex flex-col  gap-1">
                        <p className="flex flex-row items-center">
                          {item.user?.firstName + " " + item.user?.lastName}
                        </p>
                        <p className="font-normal">{item.user?._id}</p>
                      </div>
                    </div>
                    <span className="text-userblack flex items-center gap-2 font-sans font-normal text-base ">
                      $ {item.amount}
                    </span>
                    <span
                      title={item.payment?.checkoutSessionId}
                      className="text-userblack flex items-center gap-2 font-sans font-normal text-base break-all cursor-pointer"
                    >
                      {truncateName(item.payment?.checkoutSessionId)}
                    </span>
                    <span className="text-userblack flex items-center gap-2 font-sans font-normal text-base ">
                      {dayjs(item.createdAt).format("DD/MM/YYYY,HH:mm")}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
        {table === "b" && (
          <div className="w-full overflow-x-scroll booking-table-wrapper">
            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center grid grid-cols-earningSession justify-between p-4">
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Guide Name
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Transaction ID
                </span>

                <span className="text-[#666576] font-sans font-normal text-sm">
                  Total Amount
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Payment Date
                </span>
              </div>
            </div>
            {loading && (
              <div className="flex justify-center items-center bg-white">
                <LoaderLarge />
              </div>
            )}

            {!loading && data.length === 0 && (
              <div className="text-center bg-white text-lg font-semibold text-gray-600 p-4">
                No data yet.
              </div>
            )}
            <div className="flex flex-col bg-white min-w-fit w-full">
              {data &&
                data.map((item, index) => (
                  <div
                    key={item._id || index}
                    className=" grid grid-cols-earningSession justify-between border-b border-[#E9E9EC] items-center p-4"
                  >
                    <div className="text-userblack flex items-center gap-2 font-sans font-semibold text-base ">
                      <img
                        src={item.guide?.profilePic || "/Frame1.png"}
                        alt="frame"
                        className="w-11 h-11 rounded-full"
                      />
                      <div className="flex flex-col  gap-1">
                        <p>
                          {item.guide?.firstName + " " + item.guide?.lastName}
                        </p>
                        <p className="font-normal">{item.guide?.email}</p>
                      </div>
                    </div>
                    <span className="text-userblack flex items-center gap-2 font-sans font-normal text-base ">
                      <span
                        title={item.payment?.checkoutSessionId}
                        className="text-userblack flex items-center gap-2 font-sans font-normal text-base break-all cursor-pointer"
                      >
                        {truncateName(item.payment?.checkoutSessionId) || "Na"}
                      </span>{" "}
                    </span>
                    <span className="text-userblack flex items-center gap-2 font-sans font-normal text-base ">
                      $ {item.amount}
                    </span>
                    <span className="text-userblack flex items-center gap-2 font-sans font-normal text-base ">
                      {dayjs(item.createdAt).format("DD/MM/YYYY,HH:mm")}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
        {table === "c" && (
          <div className="w-full overflow-x-scroll booking-table-wrapper">
            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center grid grid-cols-earningSession justify-between p-4">
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Guide Name
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Transaction ID
                </span>

                <span className="text-[#666576] font-sans font-normal text-sm">
                  Total Amount
                </span>
                <span className="text-[#666576] font-sans font-normal text-sm">
                  Payment Date
                </span>
              </div>
            </div>
            {loading && (
              <div className="flex justify-center items-center bg-white">
                <LoaderLarge />
              </div>
            )}

            {!loading && data.length === 0 && (
              <div className="text-center bg-white text-lg font-semibold text-gray-600 p-4">
                No data yet.
              </div>
            )}
            <div className="flex flex-col bg-white min-w-fit w-full">
              {data &&
                data.map((item, index) => (
                  <div
                    key={item._id || index}
                    className=" grid grid-cols-earningSession justify-between border-b border-[#E9E9EC] items-center p-4"
                  >
                    <div className="text-userblack flex items-center gap-2 font-sans font-semibold text-base ">
                      <img
                        src={item.guide?.profilePic || "/Frame1.png"}
                        alt="frame"
                        className="w-11 h-11 rounded-full"
                      />
                      <div className="flex flex-col  gap-1">
                        <p>
                          {item.guide?.firstName + " " + item.guide?.lastName}
                        </p>
                        <p className="font-normal">{item.guide?.email}</p>
                      </div>
                    </div>
                    <span className="text-userblack flex items-center gap-2 font-sans font-normal text-base ">
                      {truncateName(item.payment?.checkoutSessionId) || "Na"}
                    </span>
                    <span className="text-userblack flex items-center gap-2 font-sans font-normal text-base ">
                      $ {item.amount}
                    </span>
                    <span className="text-userblack flex items-center gap-2 font-sans font-normal text-base ">
                      {dayjs(item.createdAt).format("DD/MM/YYYY,HH:mm")}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
        <RobinPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          disabled={loading}
        />
      </div>
    </div>
  );
}
