"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LiveSessionImage from "../../../../../public/LiveSessionImage.png";
import Frame1 from "../../../../../public/Frame1.png";
import { useRouter, useSearchParams } from "next/navigation";
import { getToken } from "@/Services/Cookie/userCookie";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import Modal from "@/components/Modal";
import Declaration from "postcss/lib/declaration";
import DeclineModal from "@/components/DeclineModal";
import { getOnelive } from "@/Services/Api/LiveManagament/Live";

dayjs.extend(utc);

function Page({ params }) {
  const [requestData, setRequestData] = useState(null);
  const { id } = params;

  const router = useRouter();

  

  const fetchData = async () => {
    // setLoading(true);

    const result = await getOnelive(id);
    if (result.status) {
      console.log(result.data);
      setRequestData(result.data);
    } else {
      console.error(result.message);
    }
    // setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      
      <div className="flex flex-col gap-7">
        <div className="flex flex-row items-center gap-5">
          <Link href="/live-manage">
            <BackButton />
          </Link>
          <p className="text-userblack font-semibold text-xl2 font-sans">
            View live session
          </p>
        </div>
        {requestData && (
          <div className="flex flex-col gap-5">
            <img
              src={
                requestData.banner
                  ? requestData.banner.url
                  : LiveSessionImage.src
              }
              alt=""
              className="w-[690px] h-[400px] rounded-md "
            />
            <div className="flex flex-col gap-5 w-4/5">
              <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">
                  Title
                </p>
                <p className="text-xl text-[#414554] font-normal font-sans">
                  {requestData.title}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">
                  Description
                </p>
                <p className="text-xl text-[#414554] font-normal font-sans">
                  {requestData.description}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">
                  Date
                </p>
                <p className="text-xl text-[#414554] font-normal font-sans">
                  {dayjs(requestData.startDate).format("MMM DD YYYY")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">
                  Time
                </p>
                <p className="text-xl text-[#414554] font-normal font-sans">
                  {dayjs(requestData.startDate).utc().format("hh:mm A")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-sans font-semibold text-[#888A94]">
                  Hosted by
                </p>
                <div className="flex flex-row items-center gap-2">
                  <img
                    className="h-8 w-8 object-cover rounded-full"
                    src={
                      requestData.guide && requestData.guide.profilePic
                        ? requestData.guide.profilePic.url
                        : Frame1.src
                    }
                    alt=""
                  />
                  <p className="text-xl text-userblack font-semibold font-sans">
                    <p>
                      {requestData.guide === null
                        ? "Removed Guide"
                        : (requestData.guide.firstName
                            ? requestData.guide.firstName
                            : requestData.guide._id.slice(-4)) +
                          " " +
                          (requestData.guide.lastName
                            ? requestData.guide.lastName
                            : "")}
                    </p>
                  </p>
                </div>
              </div>
             
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Page;
