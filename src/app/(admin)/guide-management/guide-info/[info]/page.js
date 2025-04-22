"use client";
import React, { useEffect, useState, Suspense } from "react";
import Export from "../../../../../../icons/Export";
import Phone from "../../../../../../icons/Phone";
import Email from "../../../../../../icons/Email";
import Frame1 from "../../../../../../public/Frame1.png";
import GuideCards from "@/components/GuideCards";
import Link from "next/link";
import BackButton from "@/components/BackButton";

import LoaderLarge from "@/components/LoaderLarge";
import { truncateName } from "@/Utilities/helper";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import { getGuideByID, guideEducation } from "@/Services/Api/Guide/GuideApi";
import Eye from "../../../../../../icons/Eye";
import Download from "../../../../../../icons/Download";
import { toast } from "react-toastify";

function Page({ params }) {
  const { info } = params;

  const [IdData, setIdData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eduData, setEduData] = useState(null);

  const handleDownload = async (url, fileName) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
  
      if (response.ok) {
        const blobResponse = await fetch(url);
        const blob = await blobResponse.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      } else {
        toast.error('File not found'); 
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('The file could not be downloaded as the link is broken');
    }
  };
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

  useEffect(() => {
    fetchData();
    fetchEduData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    const result = await getGuideByID(info);

    if (result.status) {
      console.log(result.data.results);
      setIdData(result.data);
    } else {
      console.error(result.message);
    }

    setLoading(false);
  };
  const fetchEduData = async () => {
    try {
      setLoading(true);
      const result = await guideEducation(info);

      if (result.status) {
        console.log(result.data);
        setEduData(result.data);
      }

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  // const getIdDataApi = () => {
  //   setLoading(true);

  //   const myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Bearer " + token);
  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,

  //     redirect: "follow",
  //   };

  //   fetch(process.env.NEXT_PUBLIC_URL + "/guides/" + info, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result.data);
  //       setIdData(result.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLoading(false);
  //     });
  // };
  return (
    <div className="flex flex-col gap-7 ">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-5">
          <Link href="/guide-management">
            <BackButton />
          </Link>
          <p
            id="titleName"
            className="text-xl2 font-semibold text-userblack font-sans"
          >
            Guide Management
          </p>
        </div>

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
      {loading ? (
        <div className="flex justify-center  items-center p-10 w-full ">
          <LoaderLarge />
        </div>
      ) : (
        <div className="flex flex-col gap-5 overflow-y-scroll 2xl:max-h-[70vh] booking-table-wrapper max-h-[62vh]">
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
                      {"$ " + IdData.totalMoneyWithdrawn}
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
              <div className="bg-white  p-5 rounded-xl border  flex flex-col gap-10 border-[#E9E9EC] ">
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-sans font-semibold text-userblack">
                    Soul module data
                  </p>
                  <div className="grid  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 justify-between items-center">
                    <Link
                      href={`/guide-management/guide-info/${info}/participated-Challenges/`}
                    >
                      <GuideCards Title="Participated challenges" />
                    </Link>
                    <Link
                      href={`/guide-management/guide-info/${info}/communities-Participated/`}
                    >
                      <GuideCards Title="Community participation" />
                    </Link>
                    <Link
                      href={`/guide-management/guide-info/${info}/communities-Created/`}
                    >
                      <GuideCards Title="Communities created" />
                    </Link>
                    <Link
                      href={`/guide-management/guide-info/${info}/challenges-Created/`}
                    >
                      <GuideCards Title="Challenges created" />
                    </Link>
                    <Link
                      href={`/guide-management/guide-info/${info}/guide-Friends/`}
                    >
                      <GuideCards Title="Friends" />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-5">
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
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-sans font-semibold text-userblack">
                    Academic Journey
                  </p>
                  {!loading &&
                    eduData &&
                    eduData.degrees &&
                    eduData.degrees.length > 0 && (
                      <div className="flex flex-col gap-2 mb-4">
                        <p className="text-base font-sans font-semibold text-userblack">
                          Education
                        </p>
                        <div className="flex flex-row items-start  gap-3 w-full">
                          {eduData?.degrees.map((item, index) => (
                            <div
                              key={item._id || index}
                              className="border-[#CE8F9C] border rounded-lg w-3/12"
                            >
                              <div className="flex flex-col items-center justify-center p-2 bg-[#ACADDB] rounded-t-md">
                                {item.file?.type === "pdf" ? (
                                  <a
                                    href={item?.file?.url}
                                    target="_blank"
                                    className="text-xl font-semibold font-sans px-4  hover:cursor-pointer flex items-center min-h-40 "
                                  >
                                    Pdf
                                  </a>
                                ) : (
                                  <img
                                    className="object-contain max-h-40 min-h-40"
                                    src={item?.file?.url || "/image01.png"}
                                    alt=""
                                  />
                                )}
                              </div>
                              <div className="flex flex-row justify-between items-center w-full py-2 px-3">
                                <p className="truncate">{item.name}</p>
                                <div className="flex gap-2">
                                  <a
                                    className="hover:cursor-pointer"
                                    href={item?.file?.url}
                                    target="_blank"
                                  >
                                    <Download />
                                  </a>

                                  <button
                                    className="hover:cursor-pointer"
                                    onClick={() =>
                                      handleDownload(
                                        item?.file?.url,
                                        item?.file?.name || "Guide-Education"
                                      )
                                    }
                                  >
                                    <Eye />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  {!loading &&
                    eduData &&
                    eduData.certifications &&
                    eduData.certifications.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <p className="text-base font-sans font-semibold text-userblack">
                          Certifications
                        </p>
                        <div className="flex flex-row items-start  gap-3 w-full">
                          {eduData?.certifications.map((item, index) => (
                            <div
                              key={item._id || index}
                              className="border-[#CE8F9C] border rounded-lg w-3/12"
                            >
                              <div className="flex flex-col items-center justify-center p-2 bg-[#ACADDB] rounded-t-md">
                                {item.file?.type === "pdf" ? (
                                  <a
                                    href={item?.file?.url}
                                    target="_blank"
                                    className="text-xl font-semibold font-sans px-4  hover:cursor-pointer flex items-center min-h-40 "
                                  >
                                    Pdf
                                  </a>
                                ) : (
                                  <img
                                    className="object-contain  max-h-40  min-h-40"
                                    src={item?.file?.url || "/image01.png"}
                                    alt=""
                                  />
                                )}
                              </div>
                              <div className="flex flex-row justify-between items-center w-full py-2 px-3">
                                <p className="truncate">{item.name}</p>
                                <div className="flex gap-2">
                                  <a
                                    className="hover:cursor-pointer"
                                    href={item?.file?.url}
                                    target="_blank"
                                  >
                                    <Download />
                                  </a>

                                  <button
                                    className="hover:cursor-pointer"
                                    onClick={() =>
                                      handleDownload(
                                        item?.file?.url,
                                        item?.file?.name || "Guide-Certificate"
                                      )
                                    }
                                  >
                                    <Eye />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
