"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import communityImage from "../../../../../public/communityImage.png";
import Profile from "../../../../../public/Profile.png";
import {
  getGroupMembersApi,
  getOnegroupApi,
} from "@/Services/Api/CommunityManagement/GetOneGroup";
import dayjs from "dayjs";
import LoaderLarge from "@/components/LoaderLarge";

function Page({ params }) {
  const { details } = params;
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async (details) => {
    setLoading(true);
    const result = await getOnegroupApi(details);
    if (result.status) {
      console.log(result.data);
      setData(result.data);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  const fetchTableData = async (details) => {
    const result = await getGroupMembersApi(details);
    if (result.status) {
      console.log(result.data.results);
      setTableData(result.data.results);
    } else {
      console.error(result.message);
    }
  };
  useEffect(() => {
    fetchData(details);
    fetchTableData(details);
  }, []);

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
      {loading ? (
        <div className="flex justify-center  items-center p-10 w-full">
          <LoaderLarge />
        </div>
      ) : (
        <div className="bg-white p-5 border border-[#E9E9EC] rounded-xl flex flex-col gap-6">
          <div className="flex flex-row gap-6 p-3 rounded-md bg-[#F8F9FD]">
            <div>
              <img
                src={data.photo?.url || communityImage.src}
                className="w-[100px] h-[100px] rounded-md"
                alt="image"
              />
            </div>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-row items-center justify-between">
                <p className="text-[#71737F] font-sans font-normal text-sm">
                  Community Detail
                </p>
                <p className="bg-[#FCF1F3] border border-[#B6576B] py-2 px-6 rounded-md text-base font-sans font-semibold text-[#595C69]">
                  {data.type == "public"
                    ? "Public Community"
                    : "Private Community"}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-[#252322] font-sans font-semibold text-3xl">
                  {data.name}
                </h2>
                <p className="text-sm font-sans font-semibold text-[#414554]">
                  {dayjs(data.createdAt).format("MM/DD/YYYY")}
                  <span className="font-normal"> ( Mental Health )</span>{" "}
                  {data.participantsCount}
                </p>
                <p className="text-[#4F546B] text-sm font-sans font-normal">
                  {data.description}
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
                  <span className="text-[#666576] font-sans font-normal text-sm text-center">
                    Role
                  </span>
                </div>
              </div>
              <div className="flex flex-col bg-white min-w-fit w-full ">
                {tableData &&
                  tableData.map((item, index) => (
                    <div
                      key={item._id || index}
                      className=" grid grid-cols-communityDetailsTable border-b justify-between border-[#E9E9EC] items-center p-4"
                    >
                      <div className="flex flex-row items-center gap-4">
                        <img
                          src={item.user?.profilePic?.url || Profile.src}
                          className="w-11 h-11 rounded-full"
                          alt="profilePic"
                        />
                        <div>
                          <p className="text-base font-sans font-semibold text-[#252322]">
                            {item.user?.firstName} {item.user?.lastName}
                          </p>
                          <p className="text-[#666576] text-base font-sans font-normal">
                            {item.user?.email}
                          </p>
                        </div>
                      </div>
                      <span className="text-userblack  font-sans font-semibold text-sm">
                        {dayjs(item.createdAt).format("DD/MM/YYYY")}
                      </span>
                      <span className="text-userblack font-sans font-semibold text-sm">
                        {item.user?.__t}
                      </span>
                      <span className="text-userblack font-sans font-semibold text-sm">
                        Free
                      </span>
                      {item.role == "member" ? (
                        <span className="font-sans font-semibold text-sm border border-[#3090E980] py-1 px-2 rounded-md w-[100px] text-center text-[#3090E9]">
                          Member
                        </span>
                      ) : (
                        <span className="font-sans font-semibold text-sm border border-[#08A03C80] py-1 px-2 rounded-md w-[100px] text-center text-[#2BAB4B]">
                          Admin
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
