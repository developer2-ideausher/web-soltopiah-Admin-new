"use client";
import React, { useEffect, useState } from "react";

import SearchIcon from "../../../../icons/SearchIcon";

import Profile from "../../../../public/Profile.png";
import {
  getAllBadgesApi,
  getImageCacheRemover,
  switchBadgeApi,
} from "@/Services/Api/Badges/BadgesApi";
import LoaderLarge from "@/components/LoaderLarge";
import Link from "next/link";
import { Switch } from "@mui/material";

function Page() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const result = await getAllBadgesApi();
    if (result.status) {
      console.log(result.data.results);
      setBadges(result.data.results);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleToggle = async (index) => {
    const badge = badges[index];
    console.log(index);
    const newStatus = !badge.isEnabled;

    setBadges((prevBadges) => {
      const updatedBadges = [...prevBadges];
      updatedBadges[index].isEnabled = newStatus;
      return updatedBadges;
    });

    const result = await switchBadgeApi(badge._id, newStatus);
    if (!result.status) {
      console.error(result.message);

      setBadges((prevBadges) => {
        const revertedBadges = [...prevBadges];
        revertedBadges[index].isEnabled = !newStatus;
        return revertedBadges;
      });
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <p className="text-xl2 font-sans font-semibold text-userblack">
        Badges and Rewards
      </p>
      <div className="flex flex-col">
        <div className="bg-white py-3 px-5 rounded-t-lg w-full flex flex-row items-center justify-between">
          <div className="flex flex-row gap-4 items-center">
            <div className="border py-2 px-4 rounded-md border-[#DCDBE1] w-[340px] flex flex-row items-center gap-2">
              <SearchIcon />
              <input type="text" placeholder="Search in users" />
            </div>
          </div>
        </div>
        <div className="w-full  booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-badgeTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Badge
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Awarding Description
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm text-center">
                Status
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Action
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm"></span>
            </div>
          </div>
          {loading && (
            <div className="flex justify-center bg-white items-center p-10 w-full ">
              <LoaderLarge />
            </div>
          )}
          <div>
            {badges &&
              badges.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex flex-col bg-white min-w-fit w-full"
                >
                  <div className=" grid grid-cols-badgeTable justify-between border-b border-[#E9E9EC] items-center p-4">
                    <div className="flex gap-4 items-center ">
                      <img
                        src={getImageCacheRemover(
                          item.photo?.url,
                          "Profile.png"
                        )}
                        alt="badge"
                        className="w-11 h-11 rounded-full"
                      />
                      <p className="text-userblack font-sans font-semibold text-sm capitalize">
                        {item.name}
                      </p>
                    </div>

                    <span className="text-userblack font-sans font-semibold text-sm capitalize">
                      {item.description}
                    </span>
                    <div>
                      <Switch
                        checked={item.isEnabled}
                        onChange={() => handleToggle(index)}
                        color="primary"
                      />
                      <span>
                        {item.isEnabled ? "Activated" : "Deactivated"}
                      </span>
                    </div>
                    <Link href={`/badgesandrewards/${item._id}`}>
                      <span className="text-[#AE445A] font-sans w-[400px]  font-semibold text-sm">
                        Edit
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
