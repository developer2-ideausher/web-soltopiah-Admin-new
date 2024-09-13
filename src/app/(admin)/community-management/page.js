"use client";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";
import MenuDots from "../../../../icons/MenuDots";
import Pagination from "@/components/Pagination";
import Backspace from "../../../../icons/Backspace";
import TopRightArrow from "../../../../icons/TopRightArrow";
import GreyCross from "../../../../icons/GreyCross";
import Link from "next/link";
import Notification from "../../../../icons/Notification";
import PushNotif from "../../../../icons/PushNotif";
import Block from "../../../../icons/Block";
import { getToken } from "@/Services/Cookie/userCookie";
import { getAllCommunitiesApi } from "@/Services/Api/CommunityManagement/GetAllCommunities";
import dayjs from "dayjs";
import LoaderLarge from "@/components/LoaderLarge";

function Page() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const result = await getAllCommunitiesApi();

    if (result.status) {
      console.log(result.data.results);
      setCommunities(result.data.results);
    } 
    else {
      console.error(result.message);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-7 ">
      <p className="text-xl2 font-sans font-semibold text-userblack">
        Community Management
      </p>
      <div className="flex flex-col">
        <SearchBar />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-communityTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Community name
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Description
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Date created
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                Created by
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Members
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Community type
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm"></span>
            </div>
          </div>
          {loading && (
            <div className="flex justify-center bg-white items-center p-10 w-full ">
              <LoaderLarge />
            </div>
            )}
          <div className="flex flex-col bg-white min-w-fit w-full ">
            {communities &&
              communities.map((item, index) => (
                <Link
                  key={item._id || index}
                  href={`community-management/${item._id}`}
                >
                  <div className=" grid grid-cols-communityTable justify-between border-b border-[#E9E9EC] items-center p-4 relative">
                    <div className="text-[#252322] font-sans font-semibold text-base flex flex-row items-center gap-2">
                      <img
                        src={item.photo?.url || "newImage.png"}
                        alt="photo"
                        className="w-11 h-11 rounded-lg"
                      />
                      <p>{item.name}</p>
                    </div>
                    <span className="text-userblack w-[250px] font-sans font-semibold text-sm truncate">
                      {item.description}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      {dayjs(item.createdAt).format("MMM/DD/YYYY")}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      {item.groupOwner?.firstName} {item.groupOwner?.lastName}
                    </span>
                    <span className="text-userblack font-sans font-semibold text-sm">
                      {item.participantsCount ||0}
                    </span>
                    <div className="w-[150px] ">
                      {item.type == "public" ? (
                        <div className="border border-[#393E59] bg-[#F1F3FB] rounded-md p-3 ">
                          <p className=" text-[#595C69] font-sans font-semibold text-base text-center capitalize">
                            {item.type}
                          </p>
                        </div>
                      ) : (
                        <div className="border border-[#B6576B] bg-[#FCF1F3] rounded-md p-3 ">
                          <p className=" text-[#595C69] font-sans font-semibold text-base text-center">
                            Private
                          </p>
                        </div>
                      )}
                    </div>

                    {/* <button onClick={handleClick} className="text-[#08A03C] font-sans font-semibold text-sm">
             <MenuDots />
           </button>
           {showPopUp && (
             <div className="bg-[#FDF8F9] border-[#D7A1AC] border p-3 rounded-xl shadow-lg w-[166px]  absolute right-12 top-8 flex flex-col gap-3">
               <div className="flex flex-row items-center justify-between">
                 <p className="text-sm font-sans font-normal text-userblack">
                   Action
                 </p>
                 <button onClick={handleClick}>
                   <GreyCross />
                 </button>
               </div>
               <Link href={'/community-management/community-details'}>
                 <div className="flex flex-row items-center gap-3">
                   <TopRightArrow />
                   <p className="text-sm font-sans font-normal text-[#753B5B]">
                     Open full view
                   </p>
                 </div>
               </Link>
               <Link href='/community-management/community-details'><div className="flex flex-row items-center gap-3">
                   <PushNotif />
                   <p className="text-sm font-sans font-normal text-[#753B5B]">
                   Push notification
                   </p>
                 </div></Link>
               

               <div className="flex flex-row items-center gap-3">
                 <Block />
                 <p className="text-sm font-sans font-normal text-[#EE3E3E]">
                 Block member
                 </p>
               </div>
             </div>
           )} */}
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default Page;
