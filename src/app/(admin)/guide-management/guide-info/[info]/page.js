"use client";
import React, { useEffect, useState, Suspense } from "react";
import Export from "../../../../../../icons/Export";
import Phone from "../../../../../../icons/Phone";
import Email from "../../../../../../icons/Email";
import Frame1 from "../../../../../../public/Frame1.png";
import GuideCards from "@/components/GuideCards";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { saveAs } from "file-saver";

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

  const handleDownload = async (url, fileName, fileType) => {
    try {
      if (["jpeg", "jpg", "png", "gif"].includes(fileType)) {
        const imageBlob = await fetch(url).then((res) => res.blob());
        saveAs(imageBlob, fileName);
      } else if (fileType === "pdf") {
        const pdfBlob = await fetch(url).then((res) => res.blob());
        saveAs(pdfBlob, fileName);
      } else {
        toast.error("Unsupported file type");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error downloading file as link is broken");
    }
  };

  const handleExport = async () => {
    const element = document.getElementById("right-side");
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
          {/* <button
            onClick={() =>
              handleDownload(
                "https://media-hosting.imagekit.io/80919cd391b740c7/9040034f5d635f46a4fb92128964fcca.jpg?Expires=1839932497&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=VXnckACkpiyPFXCek0iqH~FbWFx8hXoyomrIGES6Gl8GuwYNJgj94equWqYvyelmXlTYu1ovr2-~QNgneIPz~2zXtHVflRSW7ZvucZE0qy5ToPC-mmxTPI-Y8HRfEsAQnFtHPVIznYyKwFiU2SFI9AoclB7LcknqMgECoUHXGdXz5Dqoshw33LFXwg~6DLfYTRU72tlW-Xc0OQws04w6aRvJ--Y~Y1JVV5Wv5AkCMYKAzauzMsxY2lnZL1C6Wu7tlLSOdvLb~z-89Q4s-Dhvvy7QRMF1IQHKCOf4BImi-AUR2N5A4HW~03cy0IYbC81M0dnJVDldFPRlmF8DhTlFJQ__",
                "photo",
                "pdf"
              )
            }
          >
            try download
          </button> */}
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
                  <div className="text-base font-sans w-1/3 font-normal text-[#71737F]">
                    <p>Total Services</p>
                    {/* <p>Service Category</p> */}
                    <p>Focus Area</p>
                  </div>
                  <div className="w-1/3 flex flex-col  items-center">
                    <p>:</p>

                    <p>:</p>
                  </div>
                  <div className="text-base font-sans font-semibold w-1/3 text-userblack">
                    <p>Na</p>

                    <p
                      title={
                        IdData.specializedCategories &&
                        IdData.specializedCategories.length > 0
                          ? IdData.specializedCategories
                              .map((a) => a.title)
                              .join(", ")
                          : "No Services Added"
                      }
                      className="truncate w-[90%]"
                    >
                      {IdData.specializedCategories &&
                      IdData.specializedCategories.length > 0
                        ? IdData.specializedCategories
                            .map((a) => a.title)
                            .join(", ")
                        : "No Services Added"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-start justify-between border border-[#CE8F9C] rounded-md p-3 w-3/12">
                  <div className="flex flex-col w-full  gap-2">
                    <p className="text-base font-sans font-normal text-[#71737F] truncate">
                      Total Revenue
                    </p>

                    <p className="text-base font-sans font-normal text-[#71737F] truncate">
                      Audio Revenue
                    </p>

                    <p className="text-[#71737F] font-sans font-normal text-base truncate">
                      Video Revenue
                    </p>
                  </div>
                  <div className="w-full flex flex-col gap-2  items-center">
                    <span>:</span>
                    <span>:</span>
                    <span>:</span>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <p
                      title={"$ " + IdData.totalMoneyWithdrawn}
                      className="text-base text-userBlack font-sans font-semibold truncate"
                    >
                      {"$ " + IdData.totalMoneyWithdrawn}
                    </p>
                    <p
                      title={"$ " + IdData.totalAudioRevenue}
                      className="text-userBlack font-sans font-semibold text-base truncate"
                    >
                      {" "}
                      {"$ " + IdData.totalAudioRevenue}
                    </p>
                    <p
                      title={"$ " + IdData.totalVideoRevenue}
                      className="text-userBlack font-sans font-semibold text-base truncate"
                    >
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
                        <div
                          className={`flex flex-row items-start ${
                            eduData.degrees.length > 2
                              ? "overflow-x-scroll booking-table-wrapper  w-[98%]"
                              : ""
                          } gap-3  pb-1`}
                        >
                          {eduData?.degrees.map((item, index) => (
                            <div
                              key={item._id || index}
                              className="border-[#CE8F9C] border max-w-96 rounded-lg min-w-96"
                            >
                              <div className="flex flex-col items-center justify-center p-2 bg-[#ACADDB] rounded-t-md">
                                {item.file?.type === "pdf" ? (
                                  <a
                                    href={item?.file?.url}
                                    target="_blank"
                                    className="text-xl font-semibold  font-sans px-4  hover:cursor-pointer flex items-center min-h-40 "
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
                                <p
                                  title={item.name}
                                  className="truncate w-[80%]"
                                >
                                  {item.name}
                                </p>
                                <div className="flex gap-2">
                                  <a
                                    className="hover:cursor-pointer"
                                    href={item?.file?.url}
                                    target="_blank"
                                  >
                                    <Download />
                                  </a>

                                  <button
                                    onClick={() =>
                                      handleDownload(
                                        item?.file?.url,
                                        item?.name || "Guide-Education",
                                        item?.file?.type
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
                        <div
                          className={`flex flex-row items-start ${
                            eduData.certifications.length > 2
                              ? "overflow-x-scroll booking-table-wrapper  w-[98%]"
                              : ""
                          } gap-3  pb-1`}
                        >
                          {eduData?.certifications.map((item, index) => (
                            <div
                              key={item._id || index}
                              className="border-[#CE8F9C] border max-w-96 rounded-lg min-w-96"
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
                                <p
                                  title={item?.name}
                                  className="truncate w-[80%]"
                                >
                                  {item.name}
                                </p>
                                <div className="flex gap-2">
                                  <a
                                    className="hover:cursor-pointer"
                                    href={item?.file?.url}
                                    target="_blank"
                                  >
                                    <Download />
                                  </a>

                                  <button
                                    onClick={() =>
                                      handleDownload(
                                        item?.file?.url,
                                        item?.name || "Guide-Certification",
                                        item?.file?.type
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
                  {!loading && eduData && eduData.degrees.length === 0 && (
                    <p>No Education data added</p>
                  )}
                  {!loading &&
                    eduData &&
                    eduData.certifications.length === 0 && (
                      <p>No Certification data added</p>
                    )}
                </div>
              </div>
               <div className="flex flex-col gap-2 w-full">
            <p className="text-xl font-sans font-semibold mb-3 text-[#17161D]">
              Onboarding Questions
            </p>
            {IdData?.onboarding?.questionnaire?.length === 0 && (
              <p>No Onboarding Questions added</p>
            )}
            {IdData?.onboarding?.questionnaire?.map((ques, idxx) => (
              <div key={ques._id || idxx} className="flex flex-col gap-2">
                <p className="text-[#13171E] font-semibold text-[18px] break-words max-w-[600px] ">
                  {idxx + 1 + ". " + ques?.question ?? "--"}
                </p>
                <p className="border bg-[#F8F9FD] w-2/5 px-4 py-3 rounded-lg text-[#13171EB2] font-normal hover:shadow-lg">
                  {ques?.answer ?? "--"}
                </p>
              </div>
            ))}
          </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Page;
