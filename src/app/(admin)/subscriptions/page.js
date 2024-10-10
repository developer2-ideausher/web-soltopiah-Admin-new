"use client";
import React, { useEffect, useState } from "react";
import Export from "../../../../icons/Export";
import Plus from "../../../../icons/Plus";
import Sort from "../../../../icons/Sort";
import Filter from "../../../../icons/Filter";
import SearchIcon from "../../../../icons/SearchIcon";
import EarningsChart from "@/components/DashBoardNew/EarrningsChart";
import Link from "next/link";
import { getSubscriptionData, patchSwitch } from "@/Services/Api/Subscriptions/Subs";
import dayjs from "dayjs";
import { Switch } from "@mui/material";
import LoaderLarge from "@/components/LoaderLarge";
import { getImageCacheRemover } from "@/Services/Api/Badges/BadgesApi";

function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);

    const result = await getSubscriptionData();
    if (result.status) {
      console.log(result.data);
      setData(result.data);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
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
        <p className="text-xl2 font-semibold text-userblack font-sans">
          Subscription
        </p>
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
      <div className="flex flex-col gap-4 bg-white midxl:w-3/5  xl:w-3/5 2xl:w-2/5 rounded-xl p-8">
        <div className="flex flex-row items-center justify-between">
          <p className="text-base font-sans font-bold text-userblack">
            Subscription
          </p>
          <select className="py-2 px-3 rounded-lg border border-[#DCDBE1]">
            <option value="1">Weekly</option>
          </select>
        </div>
        <EarningsChart />
        <div className="flex flex-row justify-center items-center gap-10">
          <div className=" flex flex-row items-center gap-2">
            <p className="border border-dashed border-[#0F75BC] w-8"></p>
            <p className="font-sans text-base font-normal text-userblack">
              Anually
            </p>
          </div>
          <div className=" flex flex-row items-center gap-2">
            <p className="border border-[#0F75BC] w-8"></p>
            <p className="font-sans text-base font-normal text-userblack">
              Monthly
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="bg-white py-3 px-5 rounded-t-lg w-full flex flex-row items-center justify-between">
          <div className="flex flex-row gap-4 items-center">
            <div className="border py-2 px-4 rounded-md border-[#DCDBE1] w-[340px] flex flex-row items-center gap-2">
              <SearchIcon />
              <input type="text" placeholder="Search in users" />
            </div>
            <div className="bg-white border border-[#DCDBE1] py-2 px-3 rounded-lg flex flex-row items-center gap-2">
              <Filter />
              <p className="text-sm font-sans font-normal text-userblack">
                Filters
              </p>
            </div>
            <div className="bg-white border border-[#DCDBE1] py-2 px-3 rounded-lg flex flex-row items-center gap-2">
              <Sort />
              <p className="text-sm font-sans font-normal text-userblack">
                Sort
              </p>
            </div>
            <div className="bg-white border border-[#DCDBE1] py-2 px-3 rounded-lg flex flex-row items-center gap-2">
              <Export />
              <p className="text-sm font-sans font-normal text-userblack">
                Export
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-3">
            <Link href="/subscriptions/add-subscription">
              <button className="rounded-lg py-2 px-3 flex flex-row items-center gap-3 border border-[#DCDBE1]">
                <p>Add</p>
                <Plus />
              </button>
            </Link>
          </div>
        </div>
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
                      {item.recurringInterval ==="year" ? "Annual":"Monthly"}
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
      </div>
    </div>
  );
}

export default Page;
