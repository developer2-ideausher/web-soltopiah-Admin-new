"use client";
import BackButton from "@/components/BackButton";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import UserDetailsBox from "@/components/UserManagement/UserDetailsBox";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import newImage from "../../../../../../public/newImage.png";
import { useRouter } from "next/navigation";
import { getCommunitiesCreated } from "@/Services/Api/UserManagement/user";
import LoaderLarge from "@/components/LoaderLarge";

function Page({ params }) {
  const router = useRouter();
  const { users } = params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const result = await getCommunitiesCreated(users);
    if (result.status) {
      console.log(result.data.results);
      setData(result.data.results);
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
          Users management -
          <span className="text-[#AE445A]"> Community created</span>
        </p>
      </div>
      {/* <UserDetailsBox /> */}
      <div className="flex flex-col">
        <SearchBar />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-userCommunityCreatedTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Community thumbnail
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Description
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Type
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
                No data  yet.
              </div>
            )}
          <div className="flex flex-col bg-white min-w-fit w-full">
            {data &&
              data.map((item, index) => (
                <div
                  key={item._id || index}
                  className=" grid grid-cols-userCommunityCreatedTable justify-between border-b border-[#E9E9EC] items-center p-4"
                >
                  <div className="text-userblack font-sans flex flex-row items-center gap-3 font-semibold text-base">
                    <img src={newImage.src} alt="" />
                    <p>{item.title}</p>
                  </div>
                  <span className="text-userblack font-sans font-semibold text-base">
                    {item.description}
                  </span>

                  <div className="font-sans font-normal text-base">
                    {item.accessibility}
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
