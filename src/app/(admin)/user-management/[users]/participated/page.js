"use client";
import BackButton from "@/components/BackButton";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import UserDetailsBox from "@/components/UserManagement/UserDetailsBox";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Profile2 from "../../../../../../public/Profile2.png";
import newImage from "../../../../../../public/newImage.png";
import { useRouter } from "next/navigation";
import { userParticipated } from "@/Services/Api/UserManagement/user";
import LoaderLarge from "@/components/LoaderLarge";

function Page({ params }) {
  const router = useRouter();
  const { users } = params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    const result = await userParticipated(users);
    if (result.status) {
      console.log(result.data.results);
      setData(result.data.results);
      setLoading(false);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <div onClick={() => router.back()}>
          <BackButton />
        </div>
        <p className="text-userblack font-semibold text-xl2 font-sans">
          Users management -{" "}
          <span className="text-[#AE445A]">Participated challenges</span>{" "}
        </p>
      </div>
      <UserDetailsBox />
      <div className="flex flex-col">
        <SearchBar />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-userParticipatedTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Name
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Description
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Duration
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Categories
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Created By
              </span>
            </div>
          </div>
          {loading && (
            <div className="flex justify-center items-center">
              <LoaderLarge />
            </div>
          )}

          {!loading && data.length === 0 && (
            <div className="text-center text-md font-semibold text-gray-600 bg-white p-4">
              No data yet.
            </div>
          )}
          <div className="flex flex-col bg-white min-w-fit w-full">
            {data &&
              data.map((item, index) => (
                <div key={item._id || index} className=" grid grid-cols-userParticipatedTable justify-between border-b border-[#E9E9EC] items-center p-4">
                  <div className="text-userblack font-sans flex flex-row items-center gap-3 font-semibold text-base">
                    <img src={newImage.src} alt="" />
                    <p>{item.firstName}</p>
                  </div>
                  <span className="text-userblack w-[350px] font-sans font-semibold text-base">
                    {item.description}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-base">
                    {item.duration}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-base">
                    {item.categroy}
                  </span>

                  <div className="font-sans font-normal text-base">
                    {item.firstName}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default Page;
