"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import communityImage from "../../../../../public/communityImage.png";
import Girl from "../../../../../public/Girl.png";
import RedEdit from "../../../../../icons/RedEdit";
import RedRecycle from "../../../../../icons/RedRecycle";
import RedDown from "../../../../../icons/RedDown";
import GreenThumbsUp from "../../../../../icons/GreenThumbsUp";
import { getToken } from "@/Services/Cookie/userCookie";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

function Page() {
  const [challengeData, setChallengeData] = useState(null);
  const searchParams = useSearchParams();
  const reqId = searchParams.get("requestID");
  const [setVideos, setShowVideos] = useState(false);
  const handleClick = () => {
    setShowVideos(!setVideos);
  };
  const token = getToken();

  const getOnceChallengeApi = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,

      redirect: "follow",
    };

    fetch(process.env.NEXT_PUBLIC_URL + "/challenges/" + reqId, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setChallengeData(result.data);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getOnceChallengeApi();
  }, []);
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row gap-5 items-center">
        <Link href="/challenge-module">
          <BackButton />
        </Link>
        <p className="text-xl2 font-sans font-semibold text-userblack">
          Challenge Details page
        </p>
      </div>
      {challengeData && (
        <div className="bg-white p-5 rounded-xl flex flex-col gap-10 border border-[#E9E9EC]">
          <div className="bg-[#F8F9FD] p-3 rounded-md flex flex-row items-start gap-5">
            <img className="w-24 h-24 object-cover rounded-lg" src={challengeData.thumbnail?challengeData.thumbnail.url:communityImage.src}/>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-row items-center justify-between">
                <p className="text-sm font-sans font-normal text-[#71737F]">
                  Challnege Detail
                </p>
                <p className="py-1 px-4 bg-[#08A03C1A] border border-[#08A03C33] rounded-full text-sm font-semibold font-sans text-[#08A03C]">
                  Subscription only
                </p>
              </div>
              <p className="text-3xl font-sans font-semibold text-black">
               {challengeData.title}
              </p>
              <div>
                <p className="text-sm font-sans font-semibold text-black">
                  {dayjs(challengeData.startDate).format("MMM DD,YYYY") }
                  {/* + { Meditation }+ {Type} */}
                </p>
              </div>
              <p className="text-[#4F546B] font-sans text-sm font-normal w-[95%]">
                {challengeData.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="bg-[#DADDF1] p-1 rounded-full w-1/5 flex flex-row justify-between items-center gap-3">
              <button
                onClick={handleClick}
                className={` ${
                  setVideos ? "bg-[#DADDF1]" : "bg-white"
                } rounded-full p-2 w-full`}
              >
                Videos
              </button>
              <button
                onClick={handleClick}
                className={` ${
                  setVideos ? "bg-white" : ""
                } rounded-full p-2 w-full`}
              >
                Forum
              </button>
            </div>
            {!setVideos && (
              <div className="flex flex-col gap-3">
              {challengeData.chapters.map((chapter, index) => (
                <div
                  key={chapter._id}
                  className="flex flex-row justify-between items-start border border-[#E7E8EA] p-3 rounded-md"
                >
                  <div className="flex flex-row items-start gap-3 w-[90%] ">
                    <img className="w-20 h-20 object-cover rounded-lg" src={chapter.thumbnail.url} alt="" />
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-sans font-normal text-[#AE445A]">
                        Chapter {index + 1}
                      </p>
                      <p className="text-base font-sans font-semibold text-userblack ">
                        {chapter.title}
                      </p>
                      <p className="gap-1 flex flex-row items-center text-xs font-sans font-medium text-[#3090E9]">
                        {chapter.type.charAt(0).toUpperCase() + chapter.type.slice(1)}{" "}
                        <span className="bg-[#3090E9] w-1 h-1 rounded-full"></span>{" "}
                        <span>{chapter.durationInMinutes} min </span>
                      </p>
                      <p className="text-[#6D6D6D] text-sm font-sans font-normal">
                        {chapter.description || "No description provided."}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <RedEdit />
                    <RedRecycle />
                  </div>
                </div>
              ))}
            </div>
          )}
            {setVideos && (
              <div className="flex flex-col gap-3">
                <form className="flex flex-col gap-2">
                  <p className="text-sm font-sans font-semibold text-[#71737F]">
                    Add Day 5 Thread
                  </p>
                  <textarea
                    className="py-3 px-4 border border-[#E7E5E4] rounded-xl text-sm font-sans font-normal text-black"
                    placeholder="Ex . 12 sessions completed"
                  ></textarea>
                  <button className="p-4 rounded-lg bg-[#AE445A] w-2/12  text-base font-sans font-black text-white">
                    Save
                  </button>
                </form>
                <div className="py-3 px-4 rounded-xl border border-[#E7E5E4] bg-white flex flex-col gap-2">
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                      <p className="text-xl2 font-sans font-semibold text-userblack">
                        Soltopiah
                      </p>
                      <p className="text-xs font-sans font-semibold text-[#888A94]">
                        Day 4
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <RedEdit />
                      <RedRecycle />
                    </div>
                  </div>
                  <p className="text-base font-sans font-semibold text-userblack">
                    Exited for day four?
                  </p>
                  <div className="flex flex-row items-center gap-3">
                    <p className="text-[#3090E9] text-sm font-sans font-semibold uppercase">
                      Reply
                    </p>
                    <div className="flex flex-row items-center gap-1">
                      <p className="text-sm font-sans font-semibold text-[#AE445A]">
                        12 replies
                      </p>
                      <RedDown />
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <p className="text-xs font-sans font-normal text-[#08A03C]">
                        32 likes
                      </p>
                      <GreenThumbsUp />
                    </div>
                  </div>
                </div>
                <div className="py-3 px-4 rounded-xl border border-[#E7E5E4] bg-white flex flex-col gap-2">
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                      <p className="text-xl2 font-sans font-semibold text-userblack">
                        Soltopiah
                      </p>
                      <p className="text-xs font-sans font-semibold text-[#888A94]">
                        Day 3
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <RedEdit />
                      <RedRecycle />
                    </div>
                  </div>
                  <p className="text-base font-sans font-semibold text-userblack">
                    How was it? making a change!
                  </p>
                  <div className="flex flex-row items-center gap-3">
                    <p className="text-[#3090E9] text-sm font-sans font-semibold uppercase">
                      Reply
                    </p>
                    <div className="flex flex-row items-center gap-1">
                      <p className="text-sm font-sans font-semibold text-[#AE445A]">
                        12 replies
                      </p>
                      <RedDown />
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <p className="text-xs font-sans font-normal text-[#08A03C]">
                        32 likes
                      </p>
                      <GreenThumbsUp />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
