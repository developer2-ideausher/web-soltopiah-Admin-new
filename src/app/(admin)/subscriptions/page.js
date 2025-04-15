"use client";
import React, { useEffect, useState } from "react";
import Export from "../../../../icons/Export";
import Plus from "../../../../icons/Plus";
import Sort from "../../../../icons/Sort";
import Filter from "../../../../icons/Filter";
import SearchIcon from "../../../../icons/SearchIcon";
import EarningsChart from "@/components/DashBoardNew/EarrningsChart";
import Link from "next/link";
import {
  getSubscriptionData,
  patchSwitch,
  subsChartApi,
} from "@/Services/Api/Subscriptions/Subs";
import dayjs from "dayjs";
import { Switch } from "@mui/material";
import LoaderLarge from "@/components/LoaderLarge";
import { getImageCacheRemover } from "@/Services/Api/Badges/BadgesApi";
import RobinPagination from "@/components/Pagination";
import SearchBar from "@/components/AddSearchBar";
import html2canvas from "html2canvas";
import SubsBarChart from "./subscriptionChart";
import SubsLineChart from "./subscriptionChart";

function Page() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("monthly");
  // const [totalPages, setTotalPages] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);
  const handleExport = async () => {
    const element = document.getElementById("right-side"); // or any other element you want to capture
    const titleElement = document.getElementById("titleName");
    const titleText = titleElement ? titleElement.textContent.trim() : "Record";
    html2canvas(element, {
      useCORS: true,
      logging: true,
      renderer: {
        type: "canvas",
        quality: 1,
      },
    }).then((canvas) => {
      const imageDataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${titleText}-${dayjs().format("DD-MM-YYYY")}.png`;
      link.href = imageDataURL;
      link.click();
    });
  };
  const fetchData = async (page) => {
    setLoading(true);
    setData([]);
    const result = await getSubscriptionData(page);
    if (result.status) {
      console.log(result.data);
      setData(result.data);
      // setTotalPages(result.data.totalPages);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  const fetchChartData = async (filter) => {
    const result = await subsChartApi(filter);
    if (result.status) {
      console.log("chartData", result.data);
      setChartData(result.data);
      // setTotalPages(result.data.totalPages);
    } else {
      console.error(result.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchChartData(filter);
  }, [filter]);

  const handleToggle = async (index) => {
    const user = data[index];
    const newStatus = !user.isActive;

    setData((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index].isActive = newStatus;
      return updatedUsers;
    });
    const result = await patchSwitch(user._id, newStatus);
    if (!result.status) {
      console.error(result.message);
      setData((prevUsers) => {
        const revertedUsers = [...prevUsers];
        revertedUsers[index].isActive = !newStatus;
        return revertedUsers;
      });
    }
  };

  const truncateDescription = (desc, maxLength) => {
    if (desc.length > maxLength) {
      return desc.substring(0, maxLength) + "...";
    }
    return desc;
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between items-center">
        <p
          id="titleName"
          className="text-xl2 font-semibold text-userblack font-sans"
        >
          Subscription
        </p>
        <div className="flex flex-row items-center gap-5">
          {/* <select className="py-[10px] px-3 border border-[#DCDBE1] rounded-lg text-sm font-sans font-normal text-userblack focus:outline-none">
            <option value="1">Feb 10 - Feb 16, 22</option>
          </select> */}
          <button
            onClick={handleExport}
            className="bg-white border border-[#DCDBE1] py-[10px] px-3 rounded-lg flex flex-row items-center gap-2"
          >
            <Export />
            <p className="text-sm font-sans font-normal text-userblack">
              Export
            </p>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white midxl:w-3/5  xl:w-3/5 2xl:w-2/5 rounded-xl p-8">
        <div className="flex flex-row items-center justify-between">
          <p className="text-base font-sans font-bold text-userblack">
            Subscription
          </p>
          <select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="py-2 px-3 rounded-lg border border-[#DCDBE1]"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        {console.log("chartData in page", chartData)}
        <SubsLineChart chartData={chartData} />
      </div>
      {/* <div className="flex flex-col">
        <SearchBar
          showFilters={false}
          sort={false}
          showSearch={false}
          route="/subscriptions/add-subscription"
        />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-subscriptionTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Title
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Description
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Type
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Date
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                No. Of Users
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Revenue
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Status
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm"></span>
            </div>
          </div>
          {loading && (
            <div className="flex justify-center items-center bg-white">
              <LoaderLarge />
            </div>
          )}

          {!loading && data.length === 0 && (
            <div className="text-center text-md font-semibold text-gray-600 bg-white p-4">
              No data yet.
            </div>
          )}
          <div className="flex flex-col bg-white min-w-fit w-full ">
            {data &&
              data.map((item, index) => (
                <Link
                  key={item._id || index}
                  href={`/subscriptions/${item._id}`}
                >
                  <div className=" grid grid-cols-subscriptionTable justify-between border-b border-[#E9E9EC] items-center p-4">
                    <div className="text-[#252322] font-sans font-semibold text-base flex flex-row items-center gap-4">
                      <img
                        src={getImageCacheRemover(
                          item.thumbnail?.url,
                          "/newImage.png"
                        )}
                        alt="thumbnail"
                        className="rounded-md w-11 h-11"
                      />
                      <p className="capitalize break-all ">
                        {item.displayName}
                      </p>
                    </div>
                    <span className="text-userblack font-sans font-semibold text-sm w-9/12">
                      {truncateDescription(item.description, 40)}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm capitalize">
                      {item.recurringInterval === "year" ? "Annual" : "Monthly"}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      {dayjs(item.createdAt).format("DD/MM/YYYY")}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm ml-4">
                      {item.subscribedUsersCount}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      {"$"} {item.totalRevenueGenerated}
                    </span>
                    <span
                      className={`${
                        item.isActive ? "text-[#2BAB4B]" : "text-[#AB2B2B]"
                      } font-sans font-semibold text-base flex flex-row items-center gap-2`}
                    >
                      <p> {item.isActive ? "Active" : "Inactive"}</p>
                    </span>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Switch
                        checked={item.isActive}
                        onChange={() => handleToggle(index)}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#2BAB4B",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "#2BAB4B",
                            },
                          "& .MuiSwitch-switchBase": {
                            color: "#AB2B2B",
                          },
                          "& .MuiSwitch-switchBase + .MuiSwitch-track": {
                            backgroundColor: "#AB2B2B",
                          },
                        }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Page;
