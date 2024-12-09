"use client";
import React, { useEffect, useState, Suspense } from "react";
import Export from "../../../../../../icons/Export";
import Phone from "../../../../../../icons/Phone";
import Email from "../../../../../../icons/Email";
import Frame1 from "../../../../../../public/Frame1.png";
import GuideCards from "@/components/GuideCards";
import Link from "next/link";
import BackButton from "@/components/BackButton";

import { useSearchParams } from "next/navigation";
import { getToken } from "@/Services/Cookie/userCookie";
import LoaderLarge from "@/components/LoaderLarge";
import { truncateName } from "@/Utilities/helper";
import dayjs from "dayjs";
import html2canvas from "html2canvas";

function Page({ params }) {
  const { info } = params;

  const [IdData, setIdData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    const element = document.getElementById("right-side"); // or any other element you want to capture
    const titleElement = document.getElementById("titleName");
  const titleText = titleElement ? titleElement.textContent.trim() : "Record";
    html2canvas(element, {
      useCORS: true,
      logging: true,
      renderer: {
        type: 'canvas',
        quality: 1,
      },
    }).then(canvas => {
      const imageDataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${titleText}-${dayjs().format("DD-MM-YYYY")}.png`;
      link.href = imageDataURL;
      link.click();
    });
  };




  useEffect(() => {
    getIdDataApi();
  }, []);
  const token = getToken();
  const getIdDataApi = () => {
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,

      redirect: "follow",
    };

    fetch(process.env.NEXT_PUBLIC_URL + "/guides/" + info, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setIdData(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col gap-7 ">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-5">
          <Link href="/guide-management">
            <BackButton />
          </Link>
          <p id="titleName" className="text-xl2 font-semibold text-userblack font-sans">
            Guide Management
          </p>
        </div>

        <div className="flex flex-row items-center gap-5">
          {/* <select className="py-[10px] px-3 border border-[#DCDBE1] rounded-lg text-sm font-sans font-normal text-userblack focus:outline-none">
            <option value="1">Feb 10 - Feb 16, 22</option>
          </select> */}
          <button onClick={handleExport} className="bg-white border border-[#DCDBE1] py-[10px] px-3 rounded-lg flex flex-row items-center gap-2">
            <Export />
            <p className="text-sm font-sans font-normal text-userblack">
              Export
            </p>
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center  items-center p-10 w-full ">
          <LoaderLarge />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {IdData && (
            <>
              {" "}
              <div className="bg-white flex flex-row gap-3 justify-between py-3 px-5 rounded-xl ">
                <div className="flex flex-col gap-3 border border-[#CE8F9C] rounded-md p-3 w-5/12">
                  <div className="flex flex-row items-start gap-3">
                    <img
                      className="w-8 h-8 object-cover rounded-md"
                      src={
                        IdData.profilePic ? IdData.profilePic.url : Frame1.src
                      }
                      alt="Guide Image"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-xl font-sans font-semibold text-userblack">
                        {IdData?.firstName + " " + IdData?.lastName}
                      </p>
                      <p className="text-base font-sans font-semibold text-[#AE445A]">
                        {IdData?.services}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col  gap-1">
                    <div className="flex flex-row items-center gap-2">
                      <Phone />
                      <p className="text-base font-sans font-normal text-[#71737F]">
                        {IdData.phone ? IdData.phone : "No phone added"}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <Email />
                      <p className="text-base font-sans font-normal text-[#71737F]">
                        {IdData.email ? IdData.email : "No email added"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-2 justify-between  border border-[#CE8F9C] rounded-md p-3 w-4/12">
                  <div className="text-base font-sans w-full font-normal text-[#71737F]">
                    <p>Total Services</p>
                    <p>Service Category</p>
                    <p>Focus Area</p>
                  </div>
                  <div className="w-full flex flex-col  items-center">
                    <p>:</p>
                    <p>:</p>
                    <p>:</p>
                  </div>
                  <div className="text-base font-sans font-semibold w-full text-userblack">
                    <p>{IdData.services?.length}</p>
                    <p>NAN</p>
                    <p>
                      {IdData.specialization
                        ? truncateName(IdData.specialization)
                        : "No Services Added"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 border border-[#CE8F9C] rounded-md p-3 w-3/12">
                  <div className="flex flex-row  gap-5">
                    <p className="text-base font-sans font-normal text-[#71737F]">
                      Total Revenue{" "}
                    </p>
                    <p>:</p>
                    <p className="text-userblack font-sans font-semibold text-base">
                      {" "}
                      {"$ "+IdData.totalMoneyWithdrawn}
                    </p>
                  </div>
                  <div className="flex flex-row  gap-5">
                    <p className="text-base font-sans font-normal text-[#71737F]">
                      Audio Revenue{" "}
                    </p>
                    <p>:</p>
                    <p className="text-userblack font-sans font-semibold text-base">
                      {" "}
                      {"$ " + IdData.totalAudioRevenue}
                    </p>
                  </div>
                  <div className="flex flex-row  gap-5">
                    <p className="text-base font-sans font-normal text-[#71737F]">
                      Video Revenue{" "}
                    </p>
                    <p>:</p>
                    <p className="text-userblack font-sans font-semibold text-base">
                      {" "}
                      {"$ " + IdData.totalVideoRevenue}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white  p-5 rounded-xl border flex flex-col gap-10 border-[#E9E9EC]">
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-sans font-semibold text-userblack">
                    Soul module data
                  </p>
                  <div className="grid  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 justify-between items-center">
                    <Link href={`/guide-management/guide-info/${info}/participated-Challenges/`}><GuideCards Title="Participated challenges" /></Link>
                    <Link href={`/guide-management/guide-info/${info}/communities-Participated/`}><GuideCards Title="Community participation" /></Link>
                    <Link href={`/guide-management/guide-info/${info}/communities-Created/`}><GuideCards Title="Communities created" /></Link>
                    <Link href={`/guide-management/guide-info/${info}/challenges-Created/`}
                    ><GuideCards Title="Challenges created" /></Link>
                    <Link
                      href={`/guide-management/guide-info/${info}/guide-Friends/`}
                    >
                      <GuideCards Title="Friends" />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-20">
                  <p className="text-xl font-sans font-semibold text-userblack">
                    Mindful hub data
                  </p>
                  <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 justify-between items-center">
                    <Link
                      href={`/guide-management/guide-info/${info}/video-Watched/`}
                    >
                      <GuideCards Title=" Video Created" />
                    </Link>
                    <Link
                      href={`/guide-management/guide-info/${info}/audio-Listened/`}
                    >
                      <GuideCards Title=" Audio Created" />
                    </Link>
                    <Link
                      href={`/guide-management/guide-info/${info}/guide-courses/`}
                    >
                      <GuideCards Title="Course" />
                    </Link>
                    <Link
                      href={`/guide-management/guide-info/${info}/guide-bookings/`}
                    >
                      <GuideCards Title="Guide bookings" />
                    </Link>
                    <Link
                      href={`/guide-management/guide-info/${info}/live-created/`}
                    >
                      <GuideCards Title="Live created" />
                    </Link>
                    <Link
                      href={`/guide-management/guide-info/${info}/quick-reads`}
                    >
                      <GuideCards Title="Quick reads" />
                    </Link>
                    <Link
                      href={`/guide-management/guide-info/${info}/session-booked`}
                    >
                      <GuideCards Title="Session Booked" />
                    </Link>
                    <Link
                      href={`/guide-management/guide-info/${info}/content-uploaded`}
                    >
                      <GuideCards Title="Content uploaded" />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Page;
