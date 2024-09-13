"use client"
import React, { useEffect, useState } from "react";

import SearchBar from "@/components/SearchBar";
import GreenDot from "../../../../icons/GreenDot";
import MenuDots from "../../../../icons/MenuDots";
import Link from "next/link";
import RedDot from "../../../../icons/RedDot";
import BlueDot from "../../../../icons/BlueDot";
import { getAllUsersApi } from "@/Services/Api/UserManagement/user";
import LoaderLarge from "@/components/LoaderLarge";
import dayjs from "dayjs";

function Page() {
  const[data,setData] = useState([])
  const [loading,setLoading]=useState(false)
  const fetchData= async()=>{
    setLoading(true)
    const result = await getAllUsersApi()
    if (result.status){
      console.log(result.data.results)
      setData(result.data.results)
    }
    else{
      console.log(result.message)
    }
    setLoading(false)
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="flex flex-col gap-7">
      <p className="text-userblack font-semibold text-xl2 font-sans">Users</p>

      <div className="flex flex-col">
        <SearchBar />
        <div className="w-full overflow-x-scroll booking-table-wrapper">
          <div className="bg-[#F0F2F5] min-w-fit w-full">
            <div className="items-center grid grid-cols-userTable justify-between p-4">
              <span className="text-[#666576] font-sans font-normal text-sm">
                Users
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                User ID
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Account created
              </span>

              <span className="text-[#666576] font-sans font-normal text-sm">
                User Type
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                status
              </span>
              <span className="text-[#666576] font-sans font-normal text-sm">
                Action
              </span>
            </div>
          </div>
          {loading && (
            <div className="flex justify-center bg-white items-center p-10 w-full ">
              <LoaderLarge />
            </div>
            )}
          <div className="flex flex-col bg-white min-w-fit w-full ">
            {data && data.map((item,index)=>(
                <Link key={item._id || index} href="/user-management/users">
                <div className=" grid grid-cols-userTable justify-between border-b border-[#E9E9EC] items-center p-4">
                  <div className="flex flex-row items-center gap-2">
                    <img src={item.profilePic?.url || "Profile.png"} alt="" className="w-11 h-11 rounded-full" />
                    <div className="flex flex-col ">
                      <p className="text-sm font-sans font-bold text-[#252322]">
                        {item.firstName} {item.lastName}
                      </p>
                      <p className="text-base font-normal font-sans text-[#666576]">
                        {item.phone || "--"}
                      </p>
                    </div>
                  </div>
                  <span className="text-userblack  font-sans font-semibold text-sm">
                    {item._id.slice(-4)}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm">
                    {dayjs(item.createdAt).format("MM/DD/YYYY")}
                  </span>
                  <span className="text-userblack font-sans font-semibold text-sm">
                    {item.__t}
                  </span>
                  {item.isBlocked=="false"?(<div className=" py-1 px-3 w-[100px] rounded-md border-[#B9F4C8] border font-sans  font-semibold text-sm flex flex-row items-center gap-2 text-[#2BAB4B]">
                    <GreenDot />
                    <p>InActive</p>
                  </div>):<div className=" py-1 px-3 w-[100px] rounded-md border-[#B9F4C8] border font-sans  font-semibold text-sm flex flex-row items-center gap-2 text-[#2BAB4B]">
                    <GreenDot />
                    <p>Active</p>
                  </div>}
                  
                  <span className="text-userblack font-sans font-semibold text-sm flex flex-row items-center gap-5">
                    <p>Unblock</p>
                    <p>Block</p>
                  </span>
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
